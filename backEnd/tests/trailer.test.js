import { describe, test, expect, jest, beforeEach } from "@jest/globals";

await jest.unstable_mockModule("../Models/Trailer.js", () => ({
    default: jest.fn().mockImplementation(() => ({
        save: jest.fn()
    }))
}));
const { default: Trailer } = await import("../Models/Trailer.js");

const {
    createTrailer,
    getAllTrailers,
    getTrailerById,
    deleteTrailer,
    updateTrailer
} = await import("../Controllers/trailerController.js");

Trailer.findOne = jest.fn();
Trailer.find = jest.fn();
Trailer.findById = jest.fn();
Trailer.findByIdAndDelete = jest.fn();
Trailer.findByIdAndUpdate = jest.fn();

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}
const mockNext = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

// create trailer 
describe("createTrailer", () => {

    test("❌ champs manquants", async () => {
        const req = { body: {} };
        const res = mockRes();

        await createTrailer(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                msg: expect.any(String)
            })
        );

    });
    // rmok


    test("❌ matricule existe déjà", async () => {
        Trailer.findOne.mockResolvedValue({ matricule: "123" });

        const req = {
            body: {
                matricule: "123",
                type: "Volvo",
                capacity: 1000,
                status: "disponible"
            }
        };
        const res = mockRes();

        await createTrailer(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test("✅ création avec succès", async () => {
        Trailer.findOne.mockResolvedValue(null);

        const req = {
            body: {
                matricule: "123",
                type: "Volvo",
                capacity: 1000,
                status: "disponible"
            }
        };

        const res = mockRes();

        await createTrailer(req, res, mockNext);

        expect(Trailer).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                msg: "Remorque créée avec succès"
            })
        );
    });
});
// get all 
describe("getAllTrailers", () => {
    test("✅ retourne tous les remorque", async () => {
        Trailer.find.mockResolvedValue([{ matricule: "TR-1" }]);

        const req = {};
        const res = mockRes();

        await getAllTrailers(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});

// ================= GET BY ID =================
describe("getTrailerById", () => {

    test("❌ remorque non trouvé", async () => {
        Trailer.findById.mockResolvedValue(null);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await getTrailerById(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test("✅ remorque trouvé", async () => {
        Trailer.findById.mockResolvedValue({ _id: "1" });

        const req = { params: { id: "1" } };
        const res = mockRes();

        await getTrailerById(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});
// delete
describe("deleteTrailer", () => {

    test("❌ remorque non trouvé", async () => {
        Trailer.findByIdAndDelete.mockResolvedValue(null);

        const req = { params: { id: "1" } };
        const res = mockRes();

        await deleteTrailer(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test("✅ suppression réussie", async () => {
        Trailer.findByIdAndDelete.mockResolvedValue({ _id: "1" });

        const req = { params: { id: "1" } };
        const res = mockRes();

        await deleteTrailer(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});

// ================= UPDATE =================
describe("updateTrailer", () => {

    test("❌ remorque non trouvé", async () => {
        Trailer.findById.mockResolvedValue(null);

        const req = { params: { id: "1" }, body: {} };
        const res = mockRes();

        await updateTrailer(req, res, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test("✅ update", async () => {
        Trailer.findById.mockResolvedValue({ _id: "1", capacity: 100 });
        Trailer.findByIdAndUpdate.mockResolvedValue({ _id: "1" });

        const req = {
            params: { id: "1" },
            body: { capacity: 200 }
        };

        const res = mockRes();

        await updateTrailer(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});
