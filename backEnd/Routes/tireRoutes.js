import tireController from '../Controllers/tireController.js';
import express from 'express';
const router = express.Router();

// create Tire
router.post('/', tireController.createTire);
router.get('/', tireController.getAllTires);
router.get('/:id', tireController.getTireById);
router.delete('/:id', tireController.deleteTire);
router.put('/:id', tireController.updateTire);

export default router;