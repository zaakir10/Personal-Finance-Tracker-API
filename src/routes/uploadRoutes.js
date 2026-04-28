import express from 'express';
const router = express.Router();
import { uploadProfilePicture } from '../controllers/uploadController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

router.post('/profile-picture', protect, upload.single('image'), uploadProfilePicture);

export default router;
