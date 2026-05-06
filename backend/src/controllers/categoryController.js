import Category from '../models/Category.js';

// @desc    Get all categories for a user
// @route   GET /api/categories
// @access  Private
export const getCategories = async (req, res, next) => {
  try {
    let categories = await Category.find({ user: req.user.id });

    // If user has no categories, seed with defaults
    if (categories.length === 0) {
      const defaults = [
        { name: 'Food', type: 'expense', user: req.user.id },
        { name: 'Rent', type: 'expense', user: req.user.id },
        { name: 'Salary', type: 'income', user: req.user.id },
        { name: 'Utilities', type: 'expense', user: req.user.id },
        { name: 'Transportation', type: 'expense', user: req.user.id },
        { name: 'Entertainment', type: 'expense', user: req.user.id },
        { name: 'Other', type: 'both', user: req.user.id }
      ];
      categories = await Category.insertMany(defaults);
    }

    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
export const createCategory = async (req, res, next) => {
  try {
    const { name, type, color } = req.body;

    const category = await Category.create({
      name,
      type: type || 'both',
      color: color || '#6366f1',
      user: req.user.id
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      return next(new Error('Category already exists'));
    }
    next(error);
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, user: req.user.id });

    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    await category.deleteOne();
    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
