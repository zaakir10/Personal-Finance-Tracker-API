import express from 'express';
const router = express.Router();
import { getAdminOverview } from '../controllers/adminController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

router.get('/overview', protect, authorize('admin'), getAdminOverview);

export default router;
