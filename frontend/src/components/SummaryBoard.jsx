import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, TrendingDown, Target, Info } from 'lucide-react';

const SummaryBoard = ({ data }) => {
  const breakdown = [
    { label: 'Primary Income', value: data?.income || 0, trend: '+12%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Operational Costs', value: data?.expenses || 0, trend: '-5%', color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { label: 'Net Reserve', value: (data?.income || 0) - (data?.expenses || 0), trend: '+8%', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Detailed Analysis Card */}
      <div className="lg:col-span-2 bg-bg-card/40 backdrop-blur-3xl border border-border rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full group-hover:bg-indigo-500/20 transition-colors" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6 sm:mb-10">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-text-main tracking-tight">Portfolio Distribution</h3>
              <p className="text-text-muted text-sm font-medium">Monthly performance and capital allocation overview.</p>
            </div>
            <div className="p-3 bg-bg-card border border-border rounded-2xl text-indigo-500 shadow-lg">
              <PieChart size={24} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {breakdown.map((item, index) => (
              <div key={index} className="p-6 bg-black/[0.02] dark:bg-white/[0.02] border border-border rounded-[2rem] hover:border-indigo-500/30 transition-all group/item">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-4 block">{item.label}</span>
                <div className="flex items-end justify-between">
                  <h4 className={`text-2xl font-black tracking-tighter ${item.color}`}>
                    ${item.value.toLocaleString()}
                  </h4>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${item.bg} ${item.color}`}>
                    {item.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-text-muted">Efficiency Score</span>
                <span className="text-sm font-black text-text-main">84.2% Optimization</span>
              </div>
            </div>
            <button className="text-text-muted hover:text-indigo-500 transition-colors">
              <Info size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Goal Tracking Card */}
      <div className="bg-indigo-600 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.1),_transparent)]" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-10">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl">
              <Target size={28} />
            </div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">Savings Goal</span>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-black tracking-tight mb-2">Nexus Protocol.</h3>
            <p className="text-indigo-100 font-medium text-sm mb-8">Maintain a 35% savings ratio to reach your quarterly milestone.</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-black">$4,200</span>
                <span className="text-xs font-bold text-indigo-200">of $12,000</span>
              </div>
              <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '35%' }}
                  className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                />
              </div>
            </div>
          </div>

          <button className="mt-10 w-full py-4 bg-white text-indigo-600 font-black rounded-2xl shadow-xl hover:bg-indigo-50 transition-all active:scale-95">
            Optimize Strategy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryBoard;
