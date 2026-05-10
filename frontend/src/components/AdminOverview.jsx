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
  Save,
  ChevronRight
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
    { label: 'Network Users', value: data?.totalUsers || 0, icon: Users, color: 'text-indigo-500 dark:text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Total Logs', value: data?.totalTransactions || 0, icon: Activity, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Global Volume', value: `$${(data?.totalVolume || 0).toLocaleString()}`, icon: BarChart3, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Net Flow', value: `$${(data?.netMovement || 0).toLocaleString()}`, icon: PieChart, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10' },
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
    <div className="flex flex-col gap-12">
      {/* Admin Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            <ShieldAlert size={12} /> System Administrator
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main tracking-tight leading-tight">Control <span className="text-indigo-600 dark:text-indigo-500">Center.</span></h1>
          <p className="text-text-muted text-lg font-medium max-w-xl">Platform-wide oversight, security protocols, and user-base management.</p>
        </div>

        <div className="flex bg-bg-card/50 p-1.5 rounded-2xl border border-border backdrop-blur-xl">
          <button 
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeSubTab === 'stats' ? 'bg-indigo-600 dark:bg-white text-white dark:text-slate-950 shadow-xl' : 'text-text-muted hover:text-text-main'}`}
            onClick={() => setActiveSubTab('stats')}
          >
            Analytics
          </button>
          <button 
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeSubTab === 'users' ? 'bg-indigo-600 dark:bg-white text-white dark:text-slate-950 shadow-xl' : 'text-text-muted hover:text-text-main'}`}
            onClick={() => setActiveSubTab('users')}
          >
            Directories
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'stats' ? (
          <motion.div 
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Admin Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 md:gap-8">
              {stats.map((s, i) => (
                <div key={i} className="bg-bg-card/40 backdrop-blur-3xl border border-border rounded-[2.5rem] p-8 flex flex-col justify-between min-h-[180px] shadow-2xl shadow-black/5 transition-all hover:scale-[1.02] group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 ${s.bg} ${s.color}`}>
                    <s.icon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{s.label}</span>
                    <h3 className="text-3xl font-black text-text-main tracking-tight mt-1">{s.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Platform Distribution Card */}
            <div className="bg-bg-card/40 backdrop-blur-3xl border border-border rounded-[3rem] p-10 shadow-2xl shadow-black/5 overflow-hidden relative group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full group-hover:bg-indigo-500/20 transition-colors" />
              
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-text-main tracking-tight">Global Category Impact</h3>
                  <p className="text-text-muted font-medium">Visualizing transaction volume across the entire platform.</p>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest bg-indigo-500/5 px-4 py-2 rounded-full border border-indigo-500/10">
                  <Activity size={14} /> Live Engine
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {data?.topCategories?.map((cat, i) => {
                    const maxAmount = Math.max(...(data.topCategories.map(c => c.totalAmount)), 1);
                    return (
                      <div key={i} className="flex justify-between items-center p-4 md:p-6 bg-black/[0.01] dark:bg-white/[0.02] border border-border rounded-[2rem] hover:bg-black/[0.03] dark:hover:bg-white/5 transition-all group/item">
                        <div className="flex flex-col">
                          <span className="font-black text-text-main tracking-tight group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors leading-tight mb-1">{cat._id || 'Uncategorized'}</span>
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{cat.count} Logs recorded</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg md:text-xl font-black text-text-main">${cat.totalAmount.toLocaleString()}</span>
                          <div className="w-full h-1 bg-border rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all" style={{ width: `${Math.min((cat.totalAmount / maxAmount) * 100, 100)}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Search Bar */}
            <div className="relative max-w-md group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Query identity name or secure email..." 
                className="w-full bg-bg-card/50 border border-border rounded-2xl py-4 pl-14 pr-6 text-text-main placeholder:text-text-muted focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>

            {/* User Directory Table */}
            <div className="bg-bg-card/40 backdrop-blur-3xl border border-border rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/[0.02] dark:bg-white/[0.02] border-b border-border">
                      <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted whitespace-nowrap">Identity</th>
                      <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted whitespace-nowrap">Protocol Role</th>
                      <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted whitespace-nowrap">Deployment</th>
                      <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted whitespace-nowrap">Status</th>
                      <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-right whitespace-nowrap">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-all group">
                      <td className="px-4 md:px-8 py-4 md:py-6">
                          <div className="flex items-center gap-3 md:gap-5">
                            <div className="relative shrink-0">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white overflow-hidden shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                                {u.profilePicture ? <img src={u.profilePicture} alt="" className="w-full h-full object-cover" /> : u.name.charAt(0)}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-bg-card ${u.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-black text-text-main group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight mb-1 truncate max-w-[120px] md:max-w-none">{u.name}</span>
                              <span className="text-xs font-medium text-text-muted flex items-center gap-1.5 truncate">
                                <Mail size={12} className="text-slate-400 shrink-0" /> <span className="truncate max-w-[100px] md:max-w-none">{u.email}</span>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20' : 'bg-black/5 dark:bg-white/5 text-text-muted border border-border'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap">
                          <span className="text-xs font-bold text-text-muted flex items-center gap-2">
                            <Calendar size={14} className="opacity-60" />
                            {new Date(u.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6 whitespace-nowrap">
                          <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${u.status === 'active' ? 'text-emerald-500' : 'text-rose-500'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                            {u.status}
                          </div>
                        </td>
                        <td className="px-4 md:px-8 py-4 md:py-6 text-right whitespace-nowrap">
                          <div className="flex justify-end gap-2">
                            {u.role !== 'admin' && (
                              <>
                                <button 
                                  className="p-3 rounded-xl text-text-muted hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                                  onClick={() => handleEditClick(u)}
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  className={`p-3 rounded-xl transition-all ${u.status === 'active' ? 'text-text-muted hover:bg-rose-500/10 hover:text-rose-500' : 'text-text-muted hover:bg-emerald-500/10 hover:text-emerald-500'}`}
                                  onClick={() => onToggleStatus(u._id)}
                                >
                                  {u.status === 'active' ? <Ban size={16} /> : <CheckCircle2 size={16} />}
                                </button>
                                <button 
                                  className="p-3 rounded-xl text-text-muted hover:bg-rose-500/10 hover:text-rose-500 transition-all"
                                  onClick={() => onDeleteUser(u._id)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </>
                            )}
                            <button className="p-3 rounded-xl text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-md"
              onClick={() => setEditingUser(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-bg-card border border-black/10 dark:border-border rounded-[3rem] p-10 md:p-14 shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-3xl font-black text-text-main tracking-tighter leading-none mb-2">Modify Identity</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-muted">Updating protocol access and role</p>
                </div>
                <button 
                  className="p-3 rounded-2xl text-text-muted hover:bg-black/5 dark:hover:bg-white/5 transition-all" 
                  onClick={() => setEditingUser(null)}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Display Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-bg-main/50 border border-border rounded-[1.5rem] py-5 px-6 text-text-main focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                    value={editFormData.name}
                    onChange={e => setEditFormData({...editFormData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Secure Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-bg-main/50 border border-border rounded-[1.5rem] py-5 px-6 text-text-main focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                    value={editFormData.email}
                    onChange={e => setEditFormData({...editFormData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Platform Protocol Role</label>
                  <select 
                    className="w-full bg-bg-main/50 border border-border rounded-[1.5rem] py-5 px-6 text-text-main focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer font-bold"
                    value={editFormData.role}
                    onChange={e => setEditFormData({...editFormData, role: e.target.value})}
                  >
                    <option value="user" className="bg-bg-card">Standard Member</option>
                    <option value="admin" className="bg-bg-card">Administrator Protocol</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    className="flex-1 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-text-main font-black py-5 rounded-[1.5rem] transition-all text-xs uppercase tracking-widest"
                    onClick={() => setEditingUser(null)}
                  >
                    Abort
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-indigo-600 dark:bg-white text-white dark:text-slate-950 font-black py-5 rounded-[1.5rem] shadow-xl transition-all flex items-center justify-center gap-3 hover:bg-indigo-700 dark:hover:bg-slate-100 active:scale-95"
                  >
                    <Save size={20} /> <span className="text-xs uppercase tracking-widest">Update</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOverview;
