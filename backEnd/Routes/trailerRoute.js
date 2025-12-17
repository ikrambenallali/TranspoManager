import TrailerController from '../Controllers/trailerController.js';
import express from 'express';
import { isAdmin } from '../middlewares/auth.js';
const router = express.Router();

// create Trailer
router.post('/',isAdmin, TrailerController.createTrailer);
router.get('/', TrailerController.getAllTrailers);
router.get('/:id', TrailerController.getTrailerById);
router.delete('/:id',isAdmin, TrailerController.deleteTrailer);
router.put('/:id',isAdmin, TrailerController.updateTrailer);

export default router;