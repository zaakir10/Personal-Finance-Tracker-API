import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Tag, Loader2, Info, LayoutGrid, Layers } from 'lucide-react';

const CategoryManager = ({ categories, onAdd, onDelete }) => {
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('expense');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    
    setIsSubmitting(true);
    const res = await onAdd({ name: newName, type: newType });
    setIsSubmitting(false);
    
    if (res.success) {
      setNewName('');
    } else {
      alert(res.error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-12"
    >
      {/* Header Section */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest">
          <Layers size={12} /> System Schema
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-main tracking-tight leading-tight">Classification <span className="text-indigo-500">Center.</span></h2>
        <p className="text-text-muted text-lg font-medium max-w-xl">Personalize your financial tracking labels and protocol types.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-6 md:gap-10 items-start">
        {/* Add Category Section */}
        <section className="bg-bg-card/60 backdrop-blur-3xl border border-border rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/20 transition-colors" />
          
          <div className="relative z-10 space-y-10">
            <h3 className="flex items-center gap-4 text-2xl font-black text-text-main tracking-tighter">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                <Plus size={24} strokeWidth={3} />
              </div>
              Initialize Category
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Display Identifier</label>
                <input 
                  type="text" 
                  placeholder="e.g. Subscriptions" 
                  className="w-full bg-bg-main/50 border border-border rounded-[1.5rem] py-5 px-6 text-text-main placeholder:text-text-muted focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Default Protocol</label>
                <div className="grid grid-cols-2 bg-bg-main/50 p-1.5 rounded-[1.5rem] border border-border gap-1.5">
                  <button 
                    type="button" 
                    className={`py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${newType === 'expense' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-text-muted hover:text-text-main'}`} 
                    onClick={() => setNewType('expense')}
                  >
                    Expense
                  </button>
                  <button 
                    type="button" 
                    className={`py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${newType === 'income' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-text-muted hover:text-text-main'}`} 
                    onClick={() => setNewType('income')}
                  >
                    Income
                  </button>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-2xl shadow-indigo-600/20 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <span>Deploy Category</span>
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
            <div className="p-5 bg-indigo-500/5 rounded-2xl flex gap-4 text-text-muted text-xs font-bold leading-relaxed border border-indigo-500/10">
              <Info size={18} className="shrink-0 text-indigo-500 dark:text-indigo-400" />
              <p>Custom identifiers will be synchronized across all transaction entry modules.</p>
            </div>
          </div>
        </section>

        {/* Categories List Section */}
        <section className="bg-bg-card/60 backdrop-blur-3xl border border-border rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 shadow-2xl min-h-[300px] lg:min-h-[600px]">
          <div className="flex items-center justify-between mb-10">
            <h3 className="flex items-center gap-4 text-2xl font-black text-text-main tracking-tighter">
              <div className="w-12 h-12 bg-bg-main border border-border rounded-2xl flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                <Tag size={20} />
              </div>
              Active Directories
            </h3>
            <div className="text-[10px] font-black uppercase tracking-widest text-text-muted bg-bg-main/50 px-4 py-2 rounded-full border border-border">
              {categories.length} Identifiers Logged
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {categories.map((cat) => (
                <motion.div 
                  key={cat._id || cat.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex justify-between items-center p-6 bg-bg-main/30 border border-border rounded-[2rem] hover:bg-bg-main/60 hover:border-indigo-500/30 transition-all group relative overflow-hidden"
                >
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity ${cat.type === 'expense' ? 'bg-rose-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'}`} />

                  <div className="flex flex-col gap-2">
                    <span className="font-black text-text-main group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors tracking-tight text-lg leading-none">{cat.name}</span>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest w-fit ${cat.type === 'expense' ? 'bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'}`}>
                      {cat.type}
                    </span>
                  </div>
                  <button 
                    className="p-3 rounded-xl text-text-muted hover:bg-rose-500/10 hover:text-rose-500 transition-all active:scale-90" 
                    onClick={() => onDelete(cat._id || cat.id)}
                    title="Delete Category"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {categories.length === 0 && (
              <div className="col-span-full py-24 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-bg-main border border-border rounded-3xl flex items-center justify-center text-text-muted">
                  <LayoutGrid size={32} />
                </div>
                <p className="text-text-muted font-black uppercase tracking-[0.2em] text-xs">Zero Schema Mapped</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default CategoryManager;
