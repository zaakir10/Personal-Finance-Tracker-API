// @desc    Get predefined categories
// @route   GET /api/categories
// @access  Private
export const getCategories = (req, res) => {
  const categories = [
    { name: 'Food', type: 'expense' },
    { name: 'Rent', type: 'expense' },
    { name: 'Utilities', type: 'expense' },
    { name: 'Transportation', type: 'expense' },
    { name: 'Entertainment', type: 'expense' },
    { name: 'Healthcare', type: 'expense' },
    { name: 'Salary', type: 'income' },
    { name: 'Freelance', type: 'income' },
    { name: 'Investments', type: 'income' },
    { name: 'Other', type: 'both' }
  ];

  res.json({ success: true, data: categories });
};
