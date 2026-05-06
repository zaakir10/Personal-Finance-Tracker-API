import express from 'express';
const router = express.Router();
import { getCategories, createCategory, deleteCategory } from '../controllers/categoryController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.use(protect);
router.get('/', getCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export default router;
