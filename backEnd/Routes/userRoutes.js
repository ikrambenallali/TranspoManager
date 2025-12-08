import UserController from "../Controllers/UserController.js";

import express from 'express';
const router = express.Router();


// create driver 
router.post('/create-driver', UserController.createDriver);

export default router;