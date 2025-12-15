import * as tripController from '../Controllers/TripController.js';
import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();

// Create Trip
router.post('/',isAuthenticated, tripController.createTrip);
// Get All Trips
router.get('/', tripController.getAllTrips);
// Get Trip by ID   
router.get('/:id', tripController.getTripById);
// Update Trip
router.put('/:id',isAuthenticated, tripController.updateTrip);
// Delete Trip
router.delete('/:id', tripController.deleteTrip); 
// Update Trip Status
router.put('/:id/status', isAuthenticated, tripController.updateTripStatus); 
// pdf
router.get('/:id/pdf', tripController.generatePdf);


export default router;