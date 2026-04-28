import express from 'express';
const router = express.Router();
import { register, login, getProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validate, registerSchema, loginSchema } from '../utils/validators.js';

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/profile', protect, getProfile);

export default router;
