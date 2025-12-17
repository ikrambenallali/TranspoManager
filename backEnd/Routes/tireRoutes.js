import tireController from '../Controllers/tireController.js';
import express from 'express';
import { isAdmin } from '../middlewares/auth.js';
const router = express.Router();

// create Tire
router.post('/',isAdmin, tireController.createTire);
router.get('/', tireController.getAllTires);
router.get('/:id', tireController.getTireById);
router.delete('/:id',isAdmin, tireController.deleteTire);
router.put('/:id',isAdmin, tireController.updateTire);

export default router;