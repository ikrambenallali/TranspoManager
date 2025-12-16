import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { createMaintenanceRecord, getMaintenanceRecords, getRecordsByTarget, deleteMaintenanceRecord } from "../Controllers/maintenanceRecordController.js";

import MaintenanceRecord from "../Models/MaintenanceRecord.js";
import MaintenanceRule from "../Models/MaintenanceRule.js";
import Truck from "../Models/Truck.js";
import Trailer from "../Models/Trailer.js";
import Tire from "../Models/Tire.js";

// Mock de la réponse et next
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
describe("createMaintenanceRecord", () => {
  test("❌ rule non trouvée", async () => {
    MaintenanceRule.findById = jest.fn().mockResolvedValue(null);
    const req = { body: { rule: "r1" } };
    const res = mockRes();

    await createMaintenanceRecord(req, res, mockNext);

    expect(MaintenanceRule.findById).toHaveBeenCalledWith("r1");
  });

  test("✅ création réussie", async () => {
    MaintenanceRule.findById = jest.fn().mockResolvedValue({ _id: "r1" });
    MaintenanceRecord.prototype.save = jest.fn().mockResolvedValue(true);

    const req = { body: { targetType: "truck", targetId: "t1", rule: "r1", description: "desc", kmAtMaintenance: 1000 } };
    const res = mockRes();

    await createMaintenanceRecord(req, res, mockNext);

    expect(MaintenanceRule.findById).toHaveBeenCalledWith("r1");
    expect(MaintenanceRecord.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: "Maintenance record saved successfully" }));
  });
});

/* ================= GET ALL ================= */
describe("getMaintenanceRecords", () => {
  test("✅ retourne tous les records avec targetMatricule", async () => {
    // Mock des records de base
    const records = [
      { _id: "1", targetType: "truck", targetId: "t1", rule: {} },
      { _id: "2", targetType: "trailer", targetId: "tr1", rule: {} }
    ];

    // Mock du find, populate, sort, lean
    MaintenanceRecord.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue(records)
    });

    // Mock de findById().select() pour Truck
    Truck.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({ matricule: "TRK123" })
    });

    Trailer.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(null)
    });

    Tire.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(null)
    });

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await getMaintenanceRecords(req, res, next);

    expect(MaintenanceRecord.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ _id: "1", targetMatricule: "TRK123" }),
      expect.objectContaining({ _id: "2", targetMatricule: "N/A" })
    ]));
  });
});




/* ================= GET BY TARGET ================= */
describe("getRecordsByTarget", () => {
  test("✅ retourne records filtrés par targetType & targetId", async () => {
    MaintenanceRecord.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis()
    });

    const req = { params: { targetType: "truck", targetId: "t1" } };
    const res = mockRes();

    await getRecordsByTarget(req, res, mockNext);

    expect(MaintenanceRecord.find).toHaveBeenCalledWith({ targetType: "truck", targetId: "t1" });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

/* ================= DELETE ================= */
describe("deleteMaintenanceRecord", () => {
  test("❌ record non trouvé", async () => {
    MaintenanceRecord.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const req = { params: { id: "m1" } };
    const res = mockRes();

    await deleteMaintenanceRecord(req, res, mockNext);

    expect(MaintenanceRecord.findByIdAndDelete).toHaveBeenCalledWith("m1");
  });

  test("✅ suppression réussie", async () => {
    MaintenanceRecord.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: "m1" });

    const req = { params: { id: "m1" } };
    const res = mockRes();

    await deleteMaintenanceRecord(req, res, mockNext);

    expect(MaintenanceRecord.findByIdAndDelete).toHaveBeenCalledWith("m1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: "Maintenance record deleted successfully" }));
  });
});
