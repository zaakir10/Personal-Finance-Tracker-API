import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Check, Loader2, ShieldCheck } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, user, onUpdateDetails, onUpdatePassword }) => {
  const [details, setDetails] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (user) {
      setDetails({ name: user.name || '', email: user.email || '' });
    }
  }, [user, isOpen]);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setLoadingDetails(true);
    const res = await onUpdateDetails(details);
    setLoadingDetails(false);
    if (res.success) {
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      alert(res.error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoadingPass(true);
    const res = await onUpdatePassword(passwords);
    setLoadingPass(false);
    if (res.success) {
      setPasswords({ currentPassword: '', newPassword: '' });
      setSuccessMsg('Password changed successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      alert(res.error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[92dvh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 sm:px-8 py-5 sm:py-6 bg-black/[0.02] dark:bg-white/5 border-b border-black/5 dark:border-white/5 shrink-0">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Account Settings</h3>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">Manage your profile and security</p>
              </div>
              <button 
                className="p-2 rounded-full text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-white transition-all" 
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto no-scrollbar">
              <AnimatePresence>
                {successMsg && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0, scale: 0.9 }}
                    animate={{ height: 'auto', opacity: 1, scale: 1 }}
                    exit={{ height: 0, opacity: 0, scale: 0.9 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm font-bold shadow-lg shadow-emerald-500/5 overflow-hidden"
                  >
                    <Check size={18} /> {successMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Profile Details Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-indigo-500 dark:text-indigo-400">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <User size={18} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">Profile Details</h4>
                </div>
                
                <form onSubmit={handleUpdateDetails} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border border-black/10 dark:border-white/5 rounded-2xl py-4 px-6 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      value={details.name}
                      onChange={e => setDetails({...details, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border border-black/10 dark:border-white/5 rounded-2xl py-4 px-6 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      value={details.email}
                      onChange={e => setDetails({...details, email: e.target.value})}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 disabled:opacity-50" 
                    disabled={loadingDetails}
                  >
                    {loadingDetails ? <Loader2 className="animate-spin" size={18} /> : 'Save Profile Changes'}
                  </button>
                </form>
              </section>

              <div className="h-px bg-black/5 dark:bg-white/5 -mx-8" />

              {/* Security Section */}
              <section className="space-y-6 pb-4">
                <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <ShieldCheck size={18} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">Security & Password</h4>
                </div>
                
                <form onSubmit={handleUpdatePassword} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                      <Lock size={12} className="text-slate-400" /> Current Password
                    </label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border border-black/10 dark:border-white/5 rounded-2xl py-4 px-6 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      value={passwords.currentPassword}
                      onChange={e => setPasswords({...passwords, currentPassword: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                      <Lock size={12} className="text-slate-400" /> New Password
                    </label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border border-black/10 dark:border-white/5 rounded-2xl py-4 px-6 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      value={passwords.newPassword}
                      onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-slate-900 dark:bg-white/5 hover:bg-slate-800 dark:hover:bg-white/10 text-white dark:text-white font-bold px-8 py-3 rounded-xl border border-slate-700 dark:border-white/10 transition-all active:scale-95 disabled:opacity-50" 
                    disabled={loadingPass}
                  >
                    {loadingPass ? <Loader2 className="animate-spin" size={18} /> : 'Update Security Key'}
                  </button>
                </form>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
