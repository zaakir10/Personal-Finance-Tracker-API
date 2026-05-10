import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Calendar, Check, Loader2, ArrowUpCircle, ArrowDownCircle, Banknote } from 'lucide-react';

const TransactionModal = ({ isOpen, onClose, onSubmit, categories = [], initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        amount: Math.abs(initialData.amount) || '',
        category: initialData.category || '',
        type: initialData.type || 'expense',
        date: new Date(initialData.date).toISOString().split('T')[0]
      });
    } else {
      setFormData({
        title: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    }, initialData?._id || initialData?.id);

    setIsSubmitting(false);
    if (result?.success || result === undefined) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1000);
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
            className="absolute inset-0 bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 sm:px-8 py-5 sm:py-6 bg-black/[0.02] dark:bg-white/5 border-b border-black/5 dark:border-white/5 shrink-0">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{initialData ? 'Edit Transaction' : 'New Transaction'}</h3>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">Track your financial movement</p>
              </div>
              <button 
                className="p-2 rounded-full text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-white transition-all" 
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </div>

            <form className="p-6 sm:p-8 space-y-6 sm:space-y-8 overflow-y-auto" onSubmit={handleSubmit}>
              {/* Type Selector */}
              <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-950/50 p-1 rounded-2xl border border-black/5 dark:border-white/5 gap-1">
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${formData.type === 'expense' ? 'bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                >
                  <ArrowDownCircle size={18} />
                  Expense
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${formData.type === 'income' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                >
                  <ArrowUpCircle size={18} />
                  Income
                </button>
              </div>

              {/* Amount Input */}
              <div className="flex flex-col items-center justify-center py-2 sm:py-4 group">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-slate-400 dark:text-slate-600 group-focus-within:text-indigo-500 transition-colors">$</span>
                  <input
                    type="number"
                    required
                    step="0.01"
                    placeholder="0.00"
                    className="bg-transparent border-none text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white text-center focus:ring-0 w-full max-w-[200px] placeholder:text-slate-300 dark:placeholder:text-white/5"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    autoFocus
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                    <Tag size={14} className="text-indigo-500" /> Description
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="What was this for?"
                    className="w-full bg-slate-100 dark:bg-slate-800/50 border border-black/10 dark:border-white/5 rounded-2xl py-4 px-6 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                      <Banknote size={14} className="text-indigo-500" /> Category
                    </label>
                    <select
                      required
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border border-black/10 dark:border-white/5 rounded-2xl py-4 px-6 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id || cat._id} value={cat.name || cat}>
                          {cat.name || cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 flex items-center gap-2">
                      <Calendar size={14} className="text-indigo-500" /> Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-slate-100 dark:bg-slate-800/50 border border-black/10 dark:border-white/5 rounded-2xl py-4 px-6 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`
                  w-full py-5 rounded-[1.5rem] font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50
                  ${isSuccess 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20'}
                `}
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : isSuccess ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={24} /></motion.div>
                ) : (
                  <>{initialData ? 'Update Records' : 'Add to Ledger'}</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;
