import express from "express";
import {
    createMaintenanceRule,
    getMaintenanceRules,
    getMaintenanceRuleById,
    updateMaintenanceRule,
    deleteMaintenanceRule
} from "../Controllers/maintenanceRuleController.js";


const router = express.Router();

router.post("/", createMaintenanceRule);
router.get("/", getMaintenanceRules);
router.get("/:id", getMaintenanceRuleById);
router.put("/:id", updateMaintenanceRule);
router.delete("/:id", deleteMaintenanceRule);

export default router;
