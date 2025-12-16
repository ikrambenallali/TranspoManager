import { describe, test, expect, jest, beforeEach } from "@jest/globals";

/* ================= MOCKS ================= */
// Mock pour la chaîne populate() de Mongoose
const mockPopulateChain = (returnValue) => ({
  populate: jest.fn().mockReturnValue({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue(returnValue)
    })
  })
});

// Mock Trip Model
await jest.unstable_mockModule("../Models/Trip.js", () => ({
    default: jest.fn().mockImplementation(() => ({
        save: jest.fn()
    }))
}));

// Mock pdfGenerator
await jest.unstable_mockModule("../utils/pdfGenerator.js", () => ({
    default: jest.fn()
}));

const { default: Trip } = await import("../Models/Trip.js");
const { default: pdfGenerator } = await import("../utils/pdfGenerator.js");

const {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    updateTripStatus,
    generatePdf
} = await import("../Controllers/tripController.js");

// Mock mongoose static methods
Trip.find = jest.fn();
Trip.findById = jest.fn();
Trip.findByIdAndUpdate = jest.fn();
Trip.findByIdAndDelete = jest.fn();

// Mock response
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn();
    res.setHeader = jest.fn();
    return res;
};

const mockNext = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

/* ================= CREATE ================= */

describe("createTrip", () => {

    test("❌ non admin ne peut pas créer un trip", async () => {
        const req = {
            user: { role: "driver" },
            body: {}
        };
        const res = mockRes();

        await createTrip(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("❌ startDate manquant", async () => {
        const req = {
            user: { role: "admin" },
            body: {}
        };
        const res = mockRes();

        await createTrip(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("❌ startDate invalide", async () => {
        const req = {
            user: { role: "admin" },
            body: { startDate: "invalid-date" }
        };
        const res = mockRes();

        await createTrip(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("✅ création réussie", async () => {
        const req = {
            user: { role: "admin" },
            body: { startDate: "2025-01-01", status: "planned" }
        };
        const res = mockRes();

        await createTrip(req, res, mockNext);

        expect(Trip).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true
            })
        );
    });
});

/* ================= GET ALL ================= */

describe("getAllTrips", () => {

    test("✅ retourne tous les trips", async () => {
        Trip.find.mockReturnValue({
            populate: jest.fn().mockReturnThis()
        });

        const req = {};
        const res = mockRes();

        await getAllTrips(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});

/* ================= GET BY ID ================= */

describe("getTripById", () => {

    test("❌ trip non trouvé", async () => {
        Trip.findById.mockResolvedValue(null);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await getTripById(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
    });

    test("✅ trip trouvé", async () => {
        Trip.findById.mockResolvedValue({ _id: "1" });

        const req = { params: { id: "1" } };
        const res = mockRes();

        await getTripById(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});

/* ================= UPDATE ================= */

describe("updateTrip", () => {

    test("❌ rôle non autorisé", async () => {
        const req = {
            user: { role: "guest" },
            params: { id: "1" },
            body: {}
        };
        const res = mockRes();

        await updateTrip(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(403);
    });

    test("❌ trip non trouvé", async () => {
        Trip.findById.mockResolvedValue(null);

        const req = {
            user: { role: "admin" },
            params: { id: "1" },
            body: {}
        };
        const res = mockRes();

        await updateTrip(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("✅ update réussie", async () => {
        Trip.findById.mockResolvedValue({ startDate: "2025-01-01" });
        Trip.findByIdAndUpdate.mockResolvedValue({ _id: "1" });

        const req = {
            user: { role: "admin" },
            params: { id: "1" },
            body: { status: "completed" }
        };
        const res = mockRes();

        await updateTrip(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});

/* ================= DELETE ================= */

describe("deleteTrip", () => {

    test("❌ trip non trouvé", async () => {
        Trip.findByIdAndDelete.mockResolvedValue(null);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await deleteTrip(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test("✅ suppression réussie", async () => {
        Trip.findByIdAndDelete.mockResolvedValue({ _id: "1" });

        const req = { params: { id: "1" } };
        const res = mockRes();

        await deleteTrip(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});

/* ================= UPDATE STATUS ================= */

describe("updateTripStatus", () => {

    test("❌ trip non trouvé", async () => {
        Trip.findByIdAndUpdate.mockResolvedValue(null);

        const req = {
            params: { id: "1" },
            body: { status: "done" }
        };
        const res = mockRes();

        await updateTripStatus(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test("✅ status mis à jour", async () => {
        Trip.findByIdAndUpdate.mockResolvedValue({ _id: "1" });

        const req = {
            params: { id: "1" },
            body: { status: "done" }
        };
        const res = mockRes();

        await updateTripStatus(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});

/* ================= PDF ================= */

describe("generatePdf", () => {

  test("❌ trip non trouvé", async () => {
    Trip.findById.mockImplementation(() => mockPopulateChain(null));

    const req = { params: { id: "1" } };
    const res = mockRes();

    await generatePdf(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockNext.mock.calls[0][0].message).toBe("Trip not found");
    expect(mockNext.mock.calls[0][0].statusCode).toBe(404);
  });

  test("✅ PDF généré", async () => {
    const mockTrip = { _id: "1" };
    Trip.findById.mockImplementation(() => mockPopulateChain(mockTrip));

    pdfGenerator.mockResolvedValue(Buffer.from("PDF"));

    const req = { params: { id: "1" } };
    const res = mockRes();

    await generatePdf(req, res, mockNext);

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    expect(res.setHeader).toHaveBeenCalledWith(
      'Content-Disposition',
      `attachment; filename=trip_${mockTrip._id}.pdf`
    );
    expect(res.send).toHaveBeenCalledWith(Buffer.from("PDF"));
  });
});

