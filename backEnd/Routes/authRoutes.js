import AuthController from '../Controllers/AuthController.js';
import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { loginSchema } from '../validators/authValidator.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

router.post('/login',validate(loginSchema),  AuthController.login);
router.post('/logout', AuthController.logout);
router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
});

export default router;