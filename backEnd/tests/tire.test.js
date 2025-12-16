import { describe, test, expect, jest, beforeEach } from "@jest/globals";

// 🔹 Mock Tire Model
await jest.unstable_mockModule("../Models/Tire.js", () => ({
    default: jest.fn().mockImplementation(() => ({
        save: jest.fn()
    }))
}));

const { default: Tire } = await import("../Models/Tire.js");
const {
    createTire,
    getAllTires,
    getTireById,
    updateTire,
    deleteTire
} = await import("../Controllers/tireController.js");

// 🔹 Mock mongoose static methods
Tire.find = jest.fn();
Tire.findOne = jest.fn();
Tire.findById = jest.fn();
Tire.findByIdAndUpdate = jest.fn();
Tire.findByIdAndDelete = jest.fn();

// 🔹 Mock response
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
const mockNext = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

/* ================= CREATE ================= */
describe("createTire", () => {
    test("❌ truck et trailer présents simultanément", async () => {
        const req = { body: { truck: "T1", trailer: "TR1", position: "front-left" } };
        const res = mockRes();

        await createTire(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
    });

    test("❌ position déjà utilisée", async () => {
        Tire.findOne.mockResolvedValue({ _id: "1" });

        const req = { body: { truck: "T1", position: "front-left" } };
        const res = mockRes();

        await createTire(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
    });

    test("✅ création réussie", async () => {
        Tire.findOne.mockResolvedValue(null);

        const req = { body: { truck: "T1", position: "front-left", etat: "neuf", dateInstallation: "2025-01-01" } };
        const res = mockRes();

        await createTire(req, res, mockNext);

        expect(Tire).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ msg: "Pneu créé avec succès" })
        );
    });
});

/* ================= GET ALL ================= */
describe("getAllTires", () => {
    test("✅ retourne tous les pneus", async () => {
        Tire.find.mockReturnValue({
            populate: jest.fn().mockReturnThis()
        });

        const req = {};
        const res = mockRes();

        await getAllTires(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});

/* ================= GET BY ID ================= */
describe("getTireById", () => {
    test("❌ pneu non trouvé", async () => {
        Tire.findById.mockResolvedValue(null);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await getTireById(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
    });

    test("✅ pneu trouvé", async () => {
        Tire.findById.mockResolvedValue({ _id: "1" });

        const req = { params: { id: "1" } };
        const res = mockRes();

        await getTireById(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});

/* ================= UPDATE ================= */
describe("updateTire", () => {
    test("❌ pneu non trouvé", async () => {
        Tire.findByIdAndUpdate.mockResolvedValue(null);

        const req = { params: { id: "1" }, body: { etat: "usé" } };
        const res = mockRes();

        await updateTire(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
    });

    test("✅ update réussi", async () => {
        const mockTire = { save: jest.fn(), _id: "1" };
        Tire.findByIdAndUpdate.mockResolvedValue(mockTire);

        const req = { params: { id: "1" }, body: { etat: "usé" } };
        const res = mockRes();

        await updateTire(req, res, mockNext);

        expect(mockTire.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });
});

/* ================= DELETE ================= */
describe("deleteTire", () => {
    test("❌ pneu non trouvé", async () => {
        Tire.findByIdAndDelete.mockResolvedValue(null);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await deleteTire(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
    });

    test("✅ suppression réussie", async () => {
        Tire.findByIdAndDelete.mockResolvedValue({ _id: "1" });

        const req = { params: { id: "1" } };
        const res = mockRes();

        await deleteTire(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});
