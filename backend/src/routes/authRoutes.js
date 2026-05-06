import express from 'express';
const router = express.Router();
import { register, login, getProfile, updateDetails, updatePassword } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validate, registerSchema, loginSchema } from '../utils/validators.js';

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/profile', protect, getProfile);
router.put('/update-details', protect, updateDetails);
router.put('/update-password', protect, updatePassword);

export default router;
