import TrailerController from '../Controllers/trailerController.js';
import express from 'express';
const router = express.Router();

// create Trailer
router.post('/', TrailerController.createTrailer);
router.get('/', TrailerController.getAllTrailers);
router.get('/:id', TrailerController.getTrailerById);
router.delete('/:id', TrailerController.deleteTrailer);
router.put('/:id', TrailerController.updateTrailer);

export default router;