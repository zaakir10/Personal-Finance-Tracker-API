import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  Activity, 
  PieChart, 
  ShieldAlert, 
  Ban, 
  CheckCircle2, 
  Trash2,
  Mail,
  Calendar,
  Search,
  Edit,
  X,
  Save
} from 'lucide-react';

const AdminOverview = ({ data, users = [], onToggleStatus, onUpdateUser, onDeleteUser }) => {
  const [activeSubTab, setActiveSubTab] = useState('stats');
  const [userSearch, setUserSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: 'user' });

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const stats = [
    { label: 'Total Users', value: data?.totalUsers || 0, icon: Users, color: '#6366f1' },
    { label: 'Transactions', value: data?.totalTransactions || 0, icon: Activity, color: '#10b981' },
    { label: 'Global Volume', value: `$${(data?.totalVolume || 0).toLocaleString()}`, icon: BarChart3, color: '#8b5cf6' },
    { label: 'Net Movement', value: `$${(data?.netMovement || 0).toLocaleString()}`, icon: PieChart, color: '#f59e0b' },
  ];

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const res = await onUpdateUser(editingUser._id, editFormData);
    if (res.success) {
      setEditingUser(null);
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title">
          <ShieldAlert size={32} className="text-primary" />
          <div>
            <h1>Admin Control Center</h1>
            <p className="text-muted">Platform-wide oversight and user management</p>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeSubTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('stats')}
          >
            Overview Stats
          </button>
          <button 
            className={`admin-tab ${activeSubTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('users')}
          >
            User Management
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'stats' ? (
          <motion.div 
            key="stats"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="admin-stats-view"
          >
            <div className="stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="card admin-stat-card">
                  <div className="admin-stat-icon" style={{ backgroundColor: `${s.color}20`, color: s.color }}>
                    <s.icon size={24} />
                  </div>
                  <div className="admin-stat-info">
                    <span className="text-muted">{s.label}</span>
                    <h3>{s.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-charts-grid">
              <div className="card admin-chart-card">
                <h3>Top Categories (Platform Wide)</h3>
                <div className="admin-category-list">
                  {data?.topCategories?.map((cat, i) => (
                    <div key={i} className="admin-cat-row">
                      <div className="cat-info">
                        <span className="cat-name">{cat._id || 'Uncategorized'}</span>
                        <span className="cat-count">{cat.count} transactions</span>
                      </div>
                      <span className="cat-amount">${cat.totalAmount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="users"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="admin-users-view"
          >
            <div className="users-toolbar">
              <div className="search-box">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="users-table-card card">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u._id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {u.profilePicture ? <img src={u.profilePicture} alt="" /> : u.name.charAt(0)}
                          </div>
                          <div className="user-meta">
                            <span className="user-name">{u.name}</span>
                            <span className="user-email"><Mail size={12} /> {u.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge-role ${u.role}`}>{u.role}</span>
                      </td>
                      <td>
                        <span className="date-cell">
                          <Calendar size={14} />
                          {new Date(u.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td>
                        <span className={`status-pill ${u.status}`}>
                          {u.status === 'active' ? <CheckCircle2 size={14} /> : <Ban size={14} />}
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          {u.role !== 'admin' && (
                            <>
                              <button 
                                className="btn-icon btn-edit"
                                onClick={() => handleEditClick(u)}
                                title="Edit User"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                className={`btn-icon ${u.status === 'active' ? 'btn-ban' : 'btn-unban'}`}
                                onClick={() => onToggleStatus(u._id)}
                                title={u.status === 'active' ? 'Ban User' : 'Unban User'}
                              >
                                {u.status === 'active' ? <Ban size={16} /> : <CheckCircle2 size={16} />}
                              </button>
                              <button 
                                className="btn-icon btn-delete"
                                onClick={() => onDeleteUser(u._id)}
                                title="Delete User"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="modal-overlay" onClick={() => setEditingUser(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content admin-edit-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Edit User Profile</h3>
                <button className="btn-close" onClick={() => setEditingUser(null)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="admin-edit-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={editFormData.name}
                    onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={editFormData.email}
                    onChange={e => setEditFormData({...editFormData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>System Role</label>
                  <select 
                    value={editFormData.role}
                    onChange={e => setEditFormData({...editFormData, role: e.target.value})}
                  >
                    <option value="user">Standard User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Save size={18} /> Update User
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .admin-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .admin-title {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .admin-title h1 {
          font-size: 1.75rem;
          margin-bottom: 0.25rem;
        }

        .admin-tabs {
          display: flex;
          background: rgba(30, 41, 59, 0.4);
          padding: 0.25rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .admin-tab {
          padding: 0.625rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--text-muted);
          background: transparent;
          transition: all 0.2s;
        }

        .admin-tab.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .admin-stat-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
        }

        .admin-stat-icon {
          width: 54px;
          height: 54px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-stat-info h3 {
          font-size: 1.5rem;
          margin-top: 0.25rem;
        }

        .admin-category-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .admin-cat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 0.75rem;
        }

        .cat-info {
          display: flex;
          flex-direction: column;
        }

        .cat-name { font-weight: 700; color: white; }
        .cat-count { font-size: 0.75rem; color: var(--text-muted); }
        .cat-amount { font-weight: 800; color: var(--primary); }

        /* User Management Styles */
        .users-toolbar {
          margin-bottom: 1.5rem;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-card);
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          width: 350px;
        }

        .search-box input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
        }

        .users-table-card {
          padding: 0;
          overflow: hidden;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .admin-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          overflow: hidden;
        }

        .user-avatar img { width: 100%; height: 100%; object-fit: cover; }

        .user-meta { display: flex; flex-direction: column; }
        .user-name { font-weight: 700; color: white; }
        .user-email { font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.25rem; }

        .badge-role {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }
        .badge-role.admin { background: rgba(99, 102, 241, 0.15); color: var(--primary); }
        .badge-role.user { background: rgba(255, 255, 255, 0.05); color: var(--text-muted); }

        .date-cell { font-size: 0.8125rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: capitalize;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          width: fit-content;
        }
        .status-pill.active { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        .status-pill.banned { background: rgba(239, 68, 68, 0.1); color: var(--error); }

        .action-btns { display: flex; gap: 0.5rem; }
        .btn-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .btn-edit:hover { background: rgba(99, 102, 241, 0.15); color: var(--primary); }
        .btn-ban:hover { background: rgba(239, 68, 68, 0.15); color: var(--error); }
        .btn-unban:hover { background: rgba(16, 185, 129, 0.15); color: var(--success); }
        .btn-delete:hover { background: rgba(239, 68, 68, 0.15); color: var(--error); }

        /* Edit Modal */
        .admin-edit-modal {
          max-width: 500px;
          padding: 2.5rem;
        }
        .admin-edit-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        @media (max-width: 900px) {
          .admin-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .admin-tabs { width: 100%; }
          .admin-tab { flex: 1; }
        }
      `}</style>
    </div>
  );
};

export default AdminOverview;
