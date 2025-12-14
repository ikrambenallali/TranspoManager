import UserController from "../Controllers/UserController.js";

import express from 'express';
const router = express.Router();


// create driver 
router.post('/create-driver', UserController.createDriver);
router.get('/', UserController.getAllUsers);

export default router;