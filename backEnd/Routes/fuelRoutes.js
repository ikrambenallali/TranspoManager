import * as FuelLogController from '../Controllers/FuelLogController.js';
import express from 'express';
const router = express.Router();

// create FuelLog
router.post('/', FuelLogController.createFuelLog);
router.get('/', FuelLogController.getAllFuelLogs);
router.get('/:id', FuelLogController.getFuelLogById);
router.delete('/:id', FuelLogController.deleteFuelLog);
router.put('/:id', FuelLogController.updateFuelLog);

export default router;