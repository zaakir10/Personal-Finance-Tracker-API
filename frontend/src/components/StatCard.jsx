import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, colorClass, gradient, trend, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`
        relative overflow-hidden group rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-6 md:p-8 min-h-[150px] sm:min-h-[180px] flex flex-col justify-between transition-all duration-500
        ${gradient
          ? 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 animate-gradient shadow-2xl shadow-indigo-600/40 text-white border border-white/10'
          : 'bg-bg-card/60 backdrop-blur-3xl border border-border hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 shadow-xl shadow-black/5'}
      `}
    >
      {/* Decorative Blur - Only for non-gradient cards */}
      {!gradient && (
        <div className={`absolute -top-12 -right-12 w-32 h-32 blur-[60px] opacity-20 dark:opacity-10 rounded-full ${colorClass?.includes('text-emerald-500') ? 'bg-emerald-500' : colorClass?.includes('text-rose-500') ? 'bg-rose-500' : 'bg-indigo-500'}`} />
      )}

      <div className="flex justify-between items-start z-10">
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
          ${gradient ? 'bg-white/20 text-white shadow-lg shadow-white/10 backdrop-blur-md' : 'bg-indigo-500/5 text-indigo-500 dark:text-indigo-400 dark:bg-white/5'}
          ${colorClass?.includes('text-emerald-500') && !gradient ? 'text-emerald-500 bg-emerald-500/10' : ''}
          ${colorClass?.includes('text-rose-500') && !gradient ? 'text-rose-500 bg-rose-500/10' : ''}
        `}>
          <Icon size={24} />
        </div>

        <div className="flex items-center gap-3">
          {trend !== undefined && (
            <div className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
              ${trend > 0
                ? (gradient ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400')
                : (gradient ? 'bg-white/20 text-white' : 'bg-rose-500/10 text-rose-500 dark:text-rose-400')}
            `}>
              {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
          <button className={`p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${gradient ? 'text-white/50' : 'text-text-muted'}`}>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="mt-8 z-10">
        <span className={`
          block text-[10px] font-black uppercase tracking-[0.2em] mb-2
          ${gradient ? 'text-white/70' : 'text-text-muted'}
        `}>
          {label}
        </span>
        <div className="flex items-baseline gap-1">
          <h2 className={`
            text-3xl md:text-4xl font-black tracking-tighter
            ${gradient ? 'text-white' : (colorClass || 'text-text-main')}
          `}>
            {value}
          </h2>
        </div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </motion.div>
  );
};

export default StatCard;
