import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Tag, Loader2, Info } from 'lucide-react';

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
      className="category-manager"
    >
      <div className="view-header">
        <h2>Category Management</h2>
        <p className="text-muted">Personalize your financial tracking labels</p>
      </div>

      <div className="manager-grid">
        <section className="add-category-section card">
          <h3><Plus size={18} /> Create New</h3>
          <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
              <label>Category Name</label>
              <input 
                type="text" 
                placeholder="e.g. Subscriptions" 
                value={newName}
                onChange={e => setNewName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Default Type</label>
              <div className="type-toggle">
                <button 
                  type="button" 
                  className={newType === 'expense' ? 'active' : ''} 
                  onClick={() => setNewType('expense')}
                >
                  Expense
                </button>
                <button 
                  type="button" 
                  className={newType === 'income' ? 'active' : ''} 
                  onClick={() => setNewType('income')}
                >
                  Income
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="spinner" size={18} /> : 'Add Category'}
            </button>
          </form>
          
          <div className="info-box">
            <Info size={16} />
            <p>Custom categories will appear in the transaction selection dropdown.</p>
          </div>
        </section>

        <section className="category-list-section card">
          <h3><Tag size={18} /> Your Categories</h3>
          <div className="categories-list">
            <AnimatePresence>
              {categories.map((cat) => (
                <motion.div 
                  key={cat._id || cat.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="category-item"
                >
                  <div className="cat-info">
                    <span className="cat-name">{cat.name}</span>
                    <span className={`cat-type-badge ${cat.type}`}>
                      {cat.type}
                    </span>
                  </div>
                  <button 
                    className="btn-delete-cat" 
                    onClick={() => onDelete(cat._id || cat.id)}
                    title="Delete Category"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {categories.length === 0 && (
              <p className="empty-msg">No custom categories yet.</p>
            )}
          </div>
        </section>
      </div>

      <style>{`
        .category-manager {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .manager-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 2rem;
          align-items: start;
        }

        .add-category-section, .category-list-section {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .add-category-section h3, .category-list-section h3 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.125rem;
          color: white;
        }

        .category-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .type-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--bg-main);
          padding: 0.25rem;
          border-radius: 0.75rem;
          gap: 0.25rem;
        }

        .type-toggle button {
          padding: 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          background: transparent;
          transition: all 0.2s;
        }

        .type-toggle button.active {
          background: var(--bg-card);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }

        .info-box {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(99, 102, 241, 0.05);
          border-radius: 0.75rem;
          display: flex;
          gap: 0.75rem;
          color: var(--primary);
          font-size: 0.8125rem;
          line-height: 1.4;
        }

        .categories-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          max-height: 500px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 1rem;
          transition: all 0.2s;
        }

        .category-item:hover {
          border-color: var(--primary);
          background: rgba(255,255,255,0.04);
        }

        .cat-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .cat-name {
          font-weight: 600;
          color: white;
        }

        .cat-type-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 0.125rem 0.375rem;
          border-radius: 4px;
          width: fit-content;
        }

        .cat-type-badge.expense { background: rgba(239, 68, 68, 0.1); color: var(--error); }
        .cat-type-badge.income { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        .cat-type-badge.both { background: rgba(99, 102, 241, 0.1); color: var(--primary); }

        .btn-delete-cat {
          padding: 0.5rem;
          color: var(--text-muted);
          background: transparent;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }

        .btn-delete-cat:hover {
          color: var(--error);
          background: rgba(239, 68, 68, 0.1);
        }

        @media (max-width: 900px) {
          .manager-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </motion.div>
  );
};

export default CategoryManager;
