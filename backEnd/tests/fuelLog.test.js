import { describe, test, expect, jest, beforeEach } from "@jest/globals";

/* ================= MOCKS ================= */

// Mock FuelLog Model
await jest.unstable_mockModule("../Models/FuelLog.js", () => ({
    default: jest.fn().mockImplementation((data) => ({
        ...data,               // pour que les champs passés au constructeur soient accessibles
        save: jest.fn().mockResolvedValue(true)
    }))
}));

const { default: FuelLog } = await import("../Models/FuelLog.js");
const {
    createFuelLog,
    getAllFuelLogs,
    getFuelLogById,
    updateFuelLog,
    deleteFuelLog
} = await import("../Controllers/fuelLogController.js");

// Mock mongoose static methods
FuelLog.find = jest.fn();
FuelLog.findById = jest.fn();
FuelLog.findByIdAndUpdate = jest.fn();
FuelLog.findByIdAndDelete = jest.fn();

// Mock response
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mock next
const mockNext = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

/* ================= CREATE ================= */
describe("createFuelLog", () => {

    test("✅ création réussie", async () => {
        const req = {
            body: {
                truck: "T1",
                trailer: "R1",
                driver: "D1",
                date: "2025-01-01",
                volume: 100,
                kilometrageDepart: 1000,
                kilometrageArrivee: 1100,
                remarques: "Test"
            }
        };
        const res = mockRes();

        await createFuelLog(req, res, mockNext);

        expect(FuelLog).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            msg: "FuelLog créé avec succès",
            success: true,
            data: expect.objectContaining(req.body)
        }));
    });
});

/* ================= GET ALL ================= */
describe("getAllFuelLogs", () => {
    test("✅ retourne tous les FuelLogs", async () => {
        const mockFuelLogs = [
            { _id: "1", truck: "T1", driver: "D1", trip: "Trip1" }
        ];

        // Simule la chaîne populate de Mongoose
        const mockPopulate = jest.fn().mockResolvedValue(mockFuelLogs);
        FuelLog.find.mockReturnValue({ populate: () => ({ populate: () => ({ populate: mockPopulate }) }) });

        const req = {};
        const res = mockRes();

        await getAllFuelLogs(req, res, mockNext);

        expect(FuelLog.find).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            msg: "Liste de tous les FuelLogs",
            success: true,
            data: mockFuelLogs
        }));
    });
});


/* ================= GET BY ID ================= */
describe("getFuelLogById", () => {

    test("❌ FuelLog non trouvé", async () => {
        FuelLog.findById.mockResolvedValue(null);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await getFuelLogById(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
        expect(mockNext.mock.calls[0][0].message).toBe("FuelLog not found");
    });

    test("✅ FuelLog trouvé", async () => {
        const mockFuelLog = { _id: "1", truck: "T1" };
        FuelLog.findById.mockResolvedValue(mockFuelLog);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await getFuelLogById(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            msg: "FuelLog trouvé",
            success: true,
            data: mockFuelLog
        }));
    });
});

/* ================= UPDATE ================= */
describe("updateFuelLog", () => {

    test("❌ FuelLog non trouvé", async () => {
        FuelLog.findByIdAndUpdate.mockResolvedValue(null);

        const req = { params: { id: "1" }, body: { volume: 150 } };
        const res = mockRes();

        await updateFuelLog(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
        expect(mockNext.mock.calls[0][0].message).toBe("FuelLog not found");
    });

    test("✅ update réussie", async () => {
        const updatedFuelLog = { _id: "1", volume: 150 };
        FuelLog.findByIdAndUpdate.mockResolvedValue(updatedFuelLog);

        const req = { params: { id: "1" }, body: { volume: 150 } };
        const res = mockRes();

        await updateFuelLog(req, res, mockNext);

        expect(FuelLog.findByIdAndUpdate).toHaveBeenCalledWith("1", { volume: 150 }, { new: true });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            msg: "FuelLog mis à jour",
            success: true,
            data: updatedFuelLog
        }));
    });
});

/* ================= DELETE ================= */
describe("deleteFuelLog", () => {

    test("❌ FuelLog non trouvé", async () => {
        FuelLog.findByIdAndDelete.mockResolvedValue(null);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await deleteFuelLog(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
        expect(mockNext.mock.calls[0][0].message).toBe("FuelLog not found");
    });

    test("✅ suppression réussie", async () => {
        const deletedFuelLog = { _id: "1", volume: 100 };
        FuelLog.findByIdAndDelete.mockResolvedValue(deletedFuelLog);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await deleteFuelLog(req, res, mockNext);

        expect(FuelLog.findByIdAndDelete).toHaveBeenCalledWith("1");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            msg: "FuelLog supprimé",
            success: true,
            data: deletedFuelLog
        }));
    });
});
