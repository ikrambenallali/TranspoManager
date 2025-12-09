import TruckController from '../Controllers/TruckController.js';
import express from 'express';
const router = express.Router();

// create truck
router.post('/', TruckController.createTruck);
router.get('/', TruckController.getAllTrucks);
router.get('/:id', TruckController.getTruckById);
router.delete('/:id', TruckController.deleteTruck);
router.put('/:id', TruckController.updateTruck);

export default router;