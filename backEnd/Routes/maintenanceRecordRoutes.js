import express from "express";
import {
    createMaintenanceRecord,
    getMaintenanceRecords,
    getRecordsByTarget,
    deleteMaintenanceRecord
} from "../Controllers/maintenanceRecordController.js";


const router = express.Router();

router.post("/",  createMaintenanceRecord);
router.get("/",  getMaintenanceRecords);
router.get("/:targetType/:targetId",  getRecordsByTarget);
router.delete("/:id",  deleteMaintenanceRecord);

export default router;
