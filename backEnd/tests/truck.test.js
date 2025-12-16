import { describe, test, expect, jest, beforeEach } from "@jest/globals";


await jest.unstable_mockModule("../Models/Truck.js", () => ({
    default: jest.fn().mockImplementation(() => ({
    save: jest.fn()
    }))
}));

await jest.unstable_mockModule("../Models/Trip.js", () => ({
    default: {
    find: jest.fn()
    }
}));

await jest.unstable_mockModule("../Models/FuelLog.js", () => ({
    default: {
    aggregate: jest.fn()
    }
}));

await jest.unstable_mockModule("../Models/MaintenanceRecord.js", () => ({
    default: {
    countDocuments: jest.fn()
    }
}));

await jest.unstable_mockModule("../utils/maintenanceEmitter.js", () => ({
    default: {
    emit: jest.fn()
    }
}));



const { default: Truck } = await import("../Models/Truck.js");
const { default: Trip } = await import("../Models/Trip.js");
const { default: FuelLog } = await import("../Models/FuelLog.js");
const { default: MaintenanceRecord } = await import("../Models/MaintenanceRecord.js");
const { default: maintenanceEmitter } = await import("../utils/maintenanceEmitter.js");

const {
    createTruck,
    getAllTrucks,
    getTruckById,
    deleteTruck,
    updateTruck,
    getFleetReport
} = await import("../Controllers/TruckController.js");



Truck.findOne = jest.fn();
Truck.find = jest.fn();
Truck.findById = jest.fn();
Truck.findByIdAndDelete = jest.fn();
Truck.findByIdAndUpdate = jest.fn();



const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
    return res;
};

const mockNext = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});



// ================= CREATE TRUCK =================
describe("createTruck", () => {

    test("❌ champs manquants", async () => {
        const req = { body: {} };
        const res = mockRes();

        await createTruck(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
    });

    test("❌ matricule existe déjà", async () => {
        Truck.findOne.mockResolvedValue({ matricule: "123" });

        const req = {
            body: {
                matricule: "123",
                marque: "Volvo",
                kilometrage: 1000,
                carburantCapacity: 300,
                status: "active"
            }
        };
        const res = mockRes();

        await createTruck(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test("✅ création avec succès", async () => {
        Truck.findOne.mockResolvedValue(null);

        const req = {
            body: {
                matricule: "456",
                marque: "MAN",
                kilometrage: 2000,
                carburantCapacity: 400,
                status: "active"
            }
        };

        const res = mockRes();

        await createTruck(req, res, mockNext);

        expect(Truck).toHaveBeenCalled(); // constructeur appelé
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                msg: "Camion créé avec succès"
            })
        );
    });
});


// ================= GET ALL TRUCKS =================
describe("getAllTrucks", () => {
    test("✅ retourne tous les camions", async () => {
        Truck.find.mockResolvedValue([{ matricule: "TR-1" }]);

        const req = {};
        const res = mockRes();

        await getAllTrucks(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});


// ================= GET BY ID =================
describe("getTruckById", () => {

    test("❌ camion non trouvé", async () => {
        Truck.findById.mockResolvedValue(null);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await getTruckById(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test("✅ camion trouvé", async () => {
        Truck.findById.mockResolvedValue({ _id: "1" });

        const req = { params: { id: "1" } };
        const res = mockRes();

        await getTruckById(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});


// ================= DELETE =================
describe("deleteTruck", () => {

    test("❌ camion non trouvé", async () => {
        Truck.findByIdAndDelete.mockResolvedValue(null);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await deleteTruck(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test("✅ suppression réussie", async () => {
        Truck.findByIdAndDelete.mockResolvedValue({ _id: "1" });

        const req = { params: { id: "1" } };
        const res = mockRes();

        await deleteTruck(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});


// ================= UPDATE =================
describe("updateTruck", () => {

    test("❌ camion non trouvé", async () => {
        Truck.findById.mockResolvedValue(null);

        const req = { params: { id: "1" }, body: {} };
        const res = mockRes();

        await updateTruck(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test("✅ update + emit maintenance", async () => {
        Truck.findById.mockResolvedValue({ _id: "1", kilometrage: 100 });
        Truck.findByIdAndUpdate.mockResolvedValue({ _id: "1" });

        const req = {
            params: { id: "1" },
            body: { kilometrage: 200 }
        };

        const res = mockRes();

        await updateTruck(req, res, mockNext);

        expect(maintenanceEmitter.emit).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });
});


// ================= FLEET REPORT =================
describe("getFleetReport", () => {

    test("✅ génère le rapport de flotte", async () => {
        Truck.find.mockResolvedValue([{ _id: "1", matricule: "TR-1" }]);

        Trip.find.mockResolvedValue([
            { kilometrageDepart: 10, kilometrageArrivee: 50 }
        ]);

        FuelLog.aggregate.mockResolvedValue([{ total: 40 }]);

        MaintenanceRecord.countDocuments.mockResolvedValue(2);

        const req = {};
        const res = mockRes();

        await getFleetReport(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});
