import * as  TruckController from '../Controllers/TruckController.js';
import express from 'express';
import { isAdmin } from '../middlewares/auth.js';
const router = express.Router();

// create truck
router.get('/fleet-report', TruckController.getFleetReport);
router.post('/',isAdmin, TruckController.createTruck);
router.get('/', TruckController.getAllTrucks);
router.get('/:id', TruckController.getTruckById);
router.delete('/:id',isAdmin, TruckController.deleteTruck);
router.put('/:id', TruckController.updateTruck);

export default router;