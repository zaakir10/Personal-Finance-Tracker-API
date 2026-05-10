import React, { useEffect } from 'react';
import { Wallet, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Logout = ({ onComplete }) => {
  useEffect(() => {
    localStorage.removeItem('token');
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-3xl border border-black/5 dark:border-white/5 rounded-[3rem] p-14 shadow-2xl shadow-black/10 dark:shadow-black/50 flex flex-col items-center gap-8 max-w-sm w-full mx-4"
      >
        <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-600/30">
          <Wallet size={36} className="text-white" />
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle size={52} className="text-emerald-500" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Successfully Signed Out</h2>
          <p className="text-slate-500 font-medium">Redirecting you to the login screen...</p>
        </div>

        <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </motion.div>
    </div>
  );
};

export default Logout;
