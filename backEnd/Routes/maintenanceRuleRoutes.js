import express from "express";
import {
    createMaintenanceRule,
    getMaintenanceRules,
    getMaintenanceRuleById,
    updateMaintenanceRule,
    deleteMaintenanceRule
} from "../Controllers/maintenanceRuleController.js";
import { isAdmin } from "../middlewares/auth.js";


const router = express.Router();

router.post("/",isAdmin, createMaintenanceRule);
router.get("/", getMaintenanceRules);
router.get("/:id", getMaintenanceRuleById);
router.put("/:id",isAdmin, updateMaintenanceRule);
router.delete("/:id",isAdmin, deleteMaintenanceRule);

export default router;
