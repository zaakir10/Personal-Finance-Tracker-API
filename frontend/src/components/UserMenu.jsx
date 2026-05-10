import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  ChevronDown, 
  Camera, 
  Bell, 
  Activity,
  Heart,
  Cloud,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserMenu = ({ user, onUpload, onLogout, onSettingsOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Premium Profile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-4 p-2 rounded-2xl transition-all duration-500 group
          ${isOpen ? 'bg-bg-card border-border shadow-xl' : 'hover:bg-bg-card/50'}
        `}
      >
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white overflow-hidden shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.name?.charAt(0).toUpperCase()
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-bg-main rounded-full" />
        </div>
        
        <div className="hidden lg:flex flex-col items-start text-left">
          <span className="text-sm font-black text-text-main leading-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{user?.name || 'Protocol User'}</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-1">{user?.role || 'Member'}</span>
        </div>
        
        <ChevronDown size={16} className={`text-text-muted transition-transform duration-500 hidden lg:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Premium Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="absolute right-0 mt-4 w-[280px] sm:w-80 bg-bg-card/80 backdrop-blur-3xl border border-border rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden z-[100] shadow-black/20"
          >
            {/* Dropdown Header */}
            <div className="relative p-6 sm:p-8 bg-black/[0.02] dark:bg-white/[0.02] border-b border-border overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full" />
              
              <div className="relative flex flex-col items-center gap-4">
                <div className="relative group/avatar">
                  <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center font-black text-3xl text-white shadow-2xl shadow-indigo-500/30 overflow-hidden ring-4 ring-bg-card">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt="" className="w-full h-full object-cover" />
                    ) : (
                      user?.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-[2rem] opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <Camera size={24} />
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-black text-text-main tracking-tight">{user?.name}</h4>
                  <p className="text-xs font-bold text-text-muted mt-1 uppercase tracking-widest">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-3 sm:p-4 grid grid-cols-1 gap-1">
              <button 
                onClick={() => { setIsOpen(false); onSettingsOpen(); }}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl text-text-muted hover:bg-indigo-600 hover:text-white transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center group-hover:bg-white/20 group-hover:border-transparent transition-all">
                  <Settings size={18} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-black tracking-tight">Security Access</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Protocol & Auth</span>
                </div>
              </button>

              <button 
                className="flex items-center gap-4 px-6 py-4 rounded-2xl text-text-muted hover:bg-indigo-600 hover:text-white transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-bg-card border border-border flex items-center justify-center group-hover:bg-white/20 group-hover:border-transparent transition-all">
                  <Activity size={18} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-black tracking-tight">Performance</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Usage Metrics</span>
                </div>
              </button>

              <div className="h-px bg-border my-2 mx-4" />

              <button 
                onClick={() => { setIsOpen(false); onLogout(); }}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl text-text-muted hover:bg-rose-600 hover:text-white transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-center group-hover:bg-white/20 group-hover:border-transparent transition-all">
                  <LogOut size={18} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-black tracking-tight">Terminate Session</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Secure Logout</span>
                </div>
              </button>
            </div>

            {/* Dropdown Footer */}
            <div className="p-6 bg-black/[0.02] dark:bg-white/[0.02] border-t border-border flex justify-between items-center">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                <Shield size={14} className="text-indigo-500" /> Secure
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                v4.0.2 <Cloud size={14} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
