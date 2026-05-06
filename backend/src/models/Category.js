import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a category name'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense', 'both'],
      default: 'both',
    },
    color: {
      type: String,
      default: '#6366f1',
    }
  },
  { timestamps: true }
);

// Prevent duplicate categories for the same user
categorySchema.index({ user: 1, name: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;
