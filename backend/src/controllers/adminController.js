import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

// @desc    Get admin overview stats
// @route   GET /api/admin/overview
// @access  Private/Admin
export const getAdminOverview = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    
    // Aggregation for total volume and net movement
    const movement = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalVolume: { $sum: { $abs: "$amount" } },
          netMovement: { $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", { $multiply: ["$amount", -1] }] } }
        }
      }
    ]);

    // Top categories across all users
    const topCategories = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalTransactions,
        totalVolume: movement[0]?.totalVolume || 0,
        netMovement: movement[0]?.netMovement || 0,
        topCategories
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle user status (ban/unban)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.role === 'admin') {
      res.status(400);
      throw new Error('Cannot ban an admin');
    }

    user.status = user.status === 'active' ? 'banned' : 'active';
    await user.save();

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user details (admin only)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.role === 'admin' && req.user.id !== user.id) {
      res.status(400);
      throw new Error('Cannot edit another admin');
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user and all their data
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (user.role === 'admin') {
      res.status(400);
      throw new Error('Cannot delete an admin');
    }

    // Delete all associated transactions
    await Transaction.deleteMany({ user: user._id });
    
    // Delete the user
    await user.deleteOne();

    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
