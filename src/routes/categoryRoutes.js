import express from 'express';
const router = express.Router();
import { getCategories } from '../controllers/categoryController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.get('/', protect, getCategories);

export default router;
