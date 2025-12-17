import express from "express";
import {
    createMaintenanceRecord,
    getMaintenanceRecords,
    getRecordsByTarget,
    deleteMaintenanceRecord
} from "../Controllers/maintenanceRecordController.js";
import { isAdmin } from "../middlewares/auth.js";


const router = express.Router();

router.post("/",isAdmin,  createMaintenanceRecord);
router.get("/",  getMaintenanceRecords);
router.get("/:targetType/:targetId",  getRecordsByTarget);
router.delete("/:id",isAdmin,  deleteMaintenanceRecord);

export default router;
