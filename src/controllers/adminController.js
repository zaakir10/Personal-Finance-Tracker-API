import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

// @desc    Get admin overview
// @route   GET /api/admin/overview
// @access  Private/Admin
export const getAdminOverview = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    
    // Total amounts
    const amounts = await Transaction.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    amounts.forEach(item => {
      if (item._id === 'income') totalIncome = item.total;
      if (item._id === 'expense') totalExpense = item.total;
    });

    // Top spending categories
    const topCategories = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalTransactions,
        financials: {
          totalIncome,
          totalExpense,
          netBalance: totalIncome - totalExpense
        },
        topSpendingCategories: topCategories.map(c => ({ category: c._id, total: c.total }))
      }
    });
  } catch (error) {
    next(error);
  }
};
