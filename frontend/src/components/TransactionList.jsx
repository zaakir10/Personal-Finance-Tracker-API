import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Trash2, Edit2, Calendar, Tag, CreditCard } from 'lucide-react';

const TransactionList = ({ transactions, onViewAll, onDelete, onEdit, showActions = false }) => {
  return (
    <section className="w-full space-y-6">
      <div className="bg-bg-card/40 backdrop-blur-3xl border border-border rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5">
        <div className="flex justify-between items-center px-4 sm:px-8 py-5 sm:py-7 bg-black/[0.02] dark:bg-white/[0.02] border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
              <CreditCard size={18} />
            </div>
            <h3 className="text-xl font-black text-text-main tracking-tight">Ledger Records</h3>
          </div>
          {onViewAll && (
            <button 
              className="px-4 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest transition-all"
              onClick={onViewAll}
            >
              Expand All
            </button>
          )}
        </div>
        
        <div className="divide-y divide-border">
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-text-muted">
                <Tag size={20} />
              </div>
              <p className="text-text-muted font-bold italic tracking-wide">No ledger entries detected</p>
            </div>
          ) : (
            transactions.map((t) => (
              <div 
                key={t.id || t._id} 
                className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6 px-3 sm:px-8 py-4 sm:py-5 transition-all hover:bg-black/[0.02] dark:hover:bg-white/[0.03] group relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity ${t.type === 'income' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`} />

                {/* Icon Wrapper */}
                <div className={`
                  shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12
                  ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}
                `}>
                  {t.type === 'income' ? <ArrowUpRight size={22} /> : <ArrowDownLeft size={22} />}
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm sm:text-base font-black text-text-main group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1 truncate">{t.title}</h4>
                  <div className="flex items-center gap-3 sm:gap-4 text-xs font-bold text-text-muted uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 truncate"><Tag size={12} className="opacity-70 shrink-0" /> {t.category}</span>
                    <span className="hidden sm:flex items-center gap-1.5"><Calendar size={12} className="opacity-70" /> {new Date(t.date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Transaction Amount */}
                <div className="flex items-center gap-2 sm:gap-8 ml-auto shrink-0">
                  <div className="text-right">
                    <span className={`text-base sm:text-xl md:text-2xl font-black tracking-tighter ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                    </span>
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mt-1 sm:hidden">
                      {new Date(t.date).toLocaleDateString()}
                    </p>
                  </div>

                  {showActions && (
                    <div className="flex items-center gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button 
                        className="p-2 sm:p-3 rounded-xl text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main transition-all" 
                        onClick={() => onEdit(t)}
                        title="Modify Entry"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className="p-2 sm:p-3 rounded-xl text-text-muted hover:bg-rose-500/10 hover:text-rose-500 transition-all" 
                        onClick={() => onDelete(t.id || t._id)}
                        title="Purge Record"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TransactionList;
