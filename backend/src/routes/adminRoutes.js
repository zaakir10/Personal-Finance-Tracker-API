import express from 'express';
const router = express.Router();
import { 
  getAdminOverview, 
  getAllUsers, 
  toggleUserStatus, 
  updateUser,
  deleteUser 
} from '../controllers/adminController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

router.use(protect);
router.use(admin);

router.get('/overview', getAdminOverview);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.put('/users/:id/status', toggleUserStatus);
router.delete('/users/:id', deleteUser);

export default router;
