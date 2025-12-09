import TruckController from '../Controllers/TruckController.js';
import express from 'express';
const router = express.Router();

// create truck
router.post('/create-truck', TruckController.createTruck);
router.get('/all-trucks', TruckController.getAllTrucks);

export default router;