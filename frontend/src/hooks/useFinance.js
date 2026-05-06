import { useState, useEffect, useMemo } from 'react';
import { transactionAPI, categoryAPI, authAPI, uploadAPI, adminAPI } from '../api/api';

export const useFinance = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({ 
    income: { total: 0, categories: [] }, 
    expense: { total: 0, categories: [] } 
  });
  const [adminData, setAdminData] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const profileRes = await authAPI.getProfile();
      const currentUser = profileRes.data?.data || profileRes.data || null;
      setUser(currentUser);

      const requests = [
        transactionAPI.getTransactions(),
        categoryAPI.getCategories(),
        transactionAPI.getMonthlySummary()
      ];

      if (currentUser?.role === 'admin') {
        requests.push(adminAPI.getOverview());
        requests.push(adminAPI.getUsers());
      }

      const results = await Promise.all(requests);
      
      setTransactions(results[0].data?.data || []);
      setCategories(results[1].data?.data || []);
      setSummary(results[2].data?.data || { income: { total: 0, categories: [] }, expense: { total: 0, categories: [] } });
      
      if (currentUser?.role === 'admin') {
        if (results[3]) setAdminData(results[3].data?.data);
        if (results[4]) setAdminUsers(results[4].data?.data);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      if (err.response?.status !== 401) {
        setError('Failed to load data from server.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const addTransaction = async (data) => {
    try {
      await transactionAPI.createTransaction(data);
      await fetchData();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to add' };
    }
  };

  const updateTransaction = async (id, data) => {
    try {
      await transactionAPI.updateTransaction(id, data);
      await fetchData();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to update' };
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await transactionAPI.deleteTransaction(id);
      await fetchData();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to delete' };
    }
  };

  const addCategory = async (data) => {
    try {
      await categoryAPI.createCategory(data);
      await fetchData();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to add category' };
    }
  };

  const removeCategory = async (id) => {
    try {
      await categoryAPI.deleteCategory(id);
      await fetchData();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to delete category' };
    }
  };

  const uploadProfilePic = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadAPI.uploadProfilePicture(formData);
      const newPic = res.data.data.profilePicture;
      setUser(prev => ({ ...prev, profilePicture: newPic }));
      return { success: true, profilePicture: newPic };
    } catch (err) {
      return { success: false, error: 'Upload failed' };
    }
  };

  const updateUserDetails = async (data) => {
    try {
      await authAPI.updateDetails(data);
      setUser(prev => ({ ...prev, ...data }));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Update failed' };
    }
  };

  const updateUserPassword = async (data) => {
    try {
      await authAPI.updatePassword(data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Password update failed' };
    }
  };

  // Admin Management Actions
  const adminToggleUserStatus = async (id) => {
    try {
      await adminAPI.toggleUserStatus(id);
      await fetchData();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to toggle status' };
    }
  };

  const adminUpdateUser = async (id, data) => {
    try {
      await adminAPI.updateUser(id, data);
      await fetchData();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to update user' };
    }
  };

  const adminDeleteUser = async (id) => {
    if (!window.confirm('Are you sure? This will delete the user and ALL their transactions permanently.')) return;
    try {
      await adminAPI.deleteUser(id);
      await fetchData();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Failed to delete user' };
    }
  };

  const chartData = useMemo(() => {
    const dailyData = transactions.reduce((acc, t) => {
      const date = new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      if (!acc[date]) acc[date] = { date, income: 0, expense: 0 };
      if (t.type === 'income') acc[date].income += t.amount;
      else acc[date].expense += Math.abs(t.amount);
      return acc;
    }, {});
    return Object.values(dailyData).reverse();
  }, [transactions]);

  const stats = {
    balance: transactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0),
    income: transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0),
    expenses: transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Math.abs(t.amount), 0),
  };

  return {
    user,
    transactions,
    categories,
    summary,
    adminData,
    adminUsers,
    chartData,
    loading,
    error,
    stats,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    removeCategory,
    uploadProfilePic,
    updateUserDetails,
    updateUserPassword,
    adminToggleUserStatus,
    adminUpdateUser,
    adminDeleteUser,
    refresh: fetchData
  };
};
