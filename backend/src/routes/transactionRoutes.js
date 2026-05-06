import express from 'express';
const router = express.Router();
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getMonthlySummary
} from '../controllers/transactionController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validate, transactionSchema } from '../utils/validators.js';

router.use(protect); // All transaction routes are protected

router.route('/')
  .get(getTransactions)
  .post(validate(transactionSchema), createTransaction);

router.get('/monthly-summary', getMonthlySummary);

router.route('/:id')
  .put(validate(transactionSchema), updateTransaction)
  .delete(deleteTransaction);

export default router;
