import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import MaintenanceRule from "../Models/MaintenanceRule.js";
import {
  createMaintenanceRule,
  getMaintenanceRules,
  getMaintenanceRuleById,
  updateMaintenanceRule,
  deleteMaintenanceRule
} from "../Controllers/maintenanceRuleController.js";

// 🔹 Mock de res et next
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

// 🔹 Clear mocks avant chaque test
beforeEach(() => {
  jest.clearAllMocks();
});

/* ================= CREATE ================= */
describe("createMaintenanceRule", () => {
  test("✅ création réussie", async () => {
    MaintenanceRule.prototype.save = jest.fn().mockResolvedValue(true);

    const req = {
      body: { target: "truck", intervalType: "km", intervalValue: 5000, description: "Check engine" }
    };
    const res = mockRes();

    await createMaintenanceRule(req, res, mockNext);

    expect(MaintenanceRule.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: "Maintenance rule created successfully" }));
  });

  test("❌ erreur save", async () => {
    const error = new Error("DB error");
    MaintenanceRule.prototype.save = jest.fn().mockRejectedValue(error);

    const req = { body: {} };
    const res = mockRes();

    await createMaintenanceRule(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

/* ================= GET ALL ================= */
describe("getMaintenanceRules", () => {
  test("✅ retourne toutes les règles", async () => {
    MaintenanceRule.find = jest.fn().mockReturnValue({ sort: jest.fn().mockResolvedValue([{ _id: "r1" }]) });
    const req = {};
    const res = mockRes();

    await getMaintenanceRules(req, res, mockNext);

    expect(MaintenanceRule.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([{ _id: "r1" }]));
  });

  test("❌ erreur find", async () => {
    const error = new Error("DB error");
    MaintenanceRule.find = jest.fn().mockReturnValue({ sort: jest.fn().mockRejectedValue(error) });
    const req = {};
    const res = mockRes();

    await getMaintenanceRules(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

/* ================= GET BY ID ================= */
describe("getMaintenanceRuleById", () => {
  test("✅ retourne la règle trouvée", async () => {
    MaintenanceRule.findById = jest.fn().mockResolvedValue({ _id: "r1" });
    const req = { params: { id: "r1" } };
    const res = mockRes();

    await getMaintenanceRuleById(req, res, mockNext);

    expect(MaintenanceRule.findById).toHaveBeenCalledWith("r1");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("❌ règle non trouvée", async () => {
    MaintenanceRule.findById = jest.fn().mockResolvedValue(null);
    const req = { params: { id: "r2" } };
    const res = mockRes();

    await getMaintenanceRuleById(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: "Maintenance rule not found" }));
  });

  test("❌ erreur findById", async () => {
    const error = new Error("DB error");
    MaintenanceRule.findById = jest.fn().mockRejectedValue(error);
    const req = { params: { id: "r1" } };
    const res = mockRes();

    await getMaintenanceRuleById(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

/* ================= UPDATE ================= */
describe("updateMaintenanceRule", () => {
  test("✅ update réussi", async () => {
    MaintenanceRule.findByIdAndUpdate = jest.fn().mockResolvedValue({ _id: "r1" });
    const req = { params: { id: "r1" }, body: { description: "updated" } };
    const res = mockRes();

    await updateMaintenanceRule(req, res, mockNext);

    expect(MaintenanceRule.findByIdAndUpdate).toHaveBeenCalledWith(
      "r1",
      { description: "updated" },
      { new: true, runValidators: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: "Maintenance rule updated successfully" }));
  });

  test("❌ règle non trouvée", async () => {
    MaintenanceRule.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
    const req = { params: { id: "r2" }, body: {} };
    const res = mockRes();

    await updateMaintenanceRule(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: "Maintenance rule not found" }));
  });

  test("❌ erreur update", async () => {
    const error = new Error("DB error");
    MaintenanceRule.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
    const req = { params: { id: "r1" }, body: {} };
    const res = mockRes();

    await updateMaintenanceRule(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

/* ================= DELETE ================= */
describe("deleteMaintenanceRule", () => {
  test("✅ suppression réussie", async () => {
    MaintenanceRule.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: "r1" });
    const req = { params: { id: "r1" } };
    const res = mockRes();

    await deleteMaintenanceRule(req, res, mockNext);
    expect(MaintenanceRule.findByIdAndDelete).toHaveBeenCalledWith("r1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: "Maintenance rule deleted successfully" }));
  });

  test("❌ règle non trouvée", async () => {
    MaintenanceRule.findByIdAndDelete = jest.fn().mockResolvedValue(null);
    const req = { params: { id: "r2" } };
    const res = mockRes();

    await deleteMaintenanceRule(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: "Maintenance rule not found" }));
  });

  test("❌ erreur delete", async () => {
    const error = new Error("DB error");
    MaintenanceRule.findByIdAndDelete = jest.fn().mockRejectedValue(error);
    const req = { params: { id: "r1" } };
    const res = mockRes();

    await deleteMaintenanceRule(req, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
