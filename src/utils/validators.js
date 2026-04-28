import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const transactionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  amount: z.number({ invalid_type_error: 'Amount must be a number' }),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Category is required'),
  date: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    next(error);
  }
};
