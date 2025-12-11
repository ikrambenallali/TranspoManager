import * as tripController from '../Controllers/TripController.js';
import express from 'express';
const router = express.Router();

// Create Trip
router.post('/', tripController.createTrip);
// Get All Trips
router.get('/', tripController.getAllTrips);
// Get Trip by ID   
router.get('/:id', tripController.getTripById);
// Update Trip
router.put('/:id', tripController.updateTrip);
// Delete Trip
router.delete('/:id', tripController.deleteTrip);           

export default router;