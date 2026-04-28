import Transaction from '../models/Transaction.js';

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json({ success: true, count: transactions.length, data: transactions });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const transaction = await Transaction.create({
      user: req.user.id,
      title,
      amount,
      type,
      category,
      date: date || Date.now(),
    });

    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res, next) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }

    if (transaction.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to update this transaction');
    }

    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }

    if (transaction.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('Not authorized to delete this transaction');
    }

    await transaction.deleteOne();

    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly summary
// @route   GET /api/transactions/monthly-summary
// @access  Private
export const getMonthlySummary = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    
    // Default to current month/year if not provided
    const currentDate = new Date();
    const targetMonth = month ? parseInt(month) - 1 : currentDate.getMonth();
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();
    
    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59);

    const summary = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id, // Notice _id is used since we are in aggregate
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: "$_id.type",
          categories: {
            $push: {
              category: "$_id.category",
              total: "$total"
            }
          },
          totalAmount: { $sum: "$total" }
        }
      }
    ]);

    const formattedSummary = {
      income: { total: 0, categories: [] },
      expense: { total: 0, categories: [] }
    };

    summary.forEach(item => {
      if (item._id === 'income') {
        formattedSummary.income = { total: item.totalAmount, categories: item.categories };
      } else if (item._id === 'expense') {
        formattedSummary.expense = { total: item.totalAmount, categories: item.categories };
      }
    });

    res.json({ success: true, month: targetMonth + 1, year: targetYear, data: formattedSummary });
  } catch (error) {
    next(error);
  }
};
