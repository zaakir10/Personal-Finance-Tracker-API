import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Tag, Calendar, Check, Loader2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

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
    if (result?.success || result === undefined) { // result === undefined if parent didn't return anything
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-backdrop"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          className="modal-content card premium-modal"
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header-premium">
            <div className="header-title-group">
              <h3>{initialData ? 'Edit Transaction' : 'New Transaction'}</h3>
              <p className="text-muted">Track your financial movement</p>
            </div>
            <button className="close-btn" onClick={onClose}><X size={20} /></button>
          </div>

          <form className="transaction-form-premium" onSubmit={handleSubmit}>
            {/* Type Selector Tabs */}
            <div className="type-tabs">
              <button
                type="button"
                className={`type-tab ${formData.type === 'expense' ? 'active expense' : ''}`}
                onClick={() => setFormData({ ...formData, type: 'expense' })}
              >
                <ArrowDownCircle size={18} />
                Expense
              </button>
              <button
                type="button"
                className={`type-tab ${formData.type === 'income' ? 'active income' : ''}`}
                onClick={() => setFormData({ ...formData, type: 'income' })}
              >
                <ArrowUpCircle size={18} />
                Income
              </button>
            </div>

            {/* Main Amount Input */}
            <div className="amount-input-group">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                required
                step="0.01"
                placeholder="0.00"
                className="huge-amount-input"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                autoFocus
              />
            </div>

            <div className="form-sections">
              <div className="form-field">
                <label><Tag size={14} /> Description</label>
                <input
                  type="text"
                  required
                  placeholder="What was this for?"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label><DollarSign size={14} /> Category</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id || cat._id} value={cat.name || cat}>
                        {cat.name || cat}
                      </option>
                    ))}
                    {!categories.length && (
                      <>
                        <option value="Food">Food</option>
                        <option value="Salary">Salary</option>
                        <option value="Housing">Housing</option>
                        <option value="Transport">Transport</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="form-field">
                  <label><Calendar size={14} /> Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`btn-submit-premium ${isSuccess ? 'success' : ''}`}
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                <Loader2 className="spinner" size={20} />
              ) : isSuccess ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={20} /></motion.div>
              ) : (
                <>{initialData ? 'Update Records' : 'Add to Ledger'}</>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>

    <style>{`
        .premium-modal {
          max-width: 480px;
          padding: 0;
          overflow: hidden;
          background: #1e293b;
          border-color: rgba(255,255,255,0.05);
        }

        .modal-header-premium {
          padding: 1.5rem 2rem;
          background: rgba(255,255,255,0.02);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
        }

        .header-title-group h3 {
          font-size: 1.25rem;
          margin-bottom: 0.125rem;
        }

        .close-btn {
          background: transparent;
          color: var(--text-muted);
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-main);
        }

        .transaction-form-premium {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .type-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          background: var(--bg-main);
          padding: 0.375rem;
          border-radius: 1rem;
        }

        .type-tab {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          background: transparent;
          transition: all 0.2s;
        }

        .type-tab.active.expense {
          background: rgba(239, 68, 68, 0.1);
          color: var(--error);
        }

        .type-tab.active.income {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
        }

        .amount-input-group {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 1rem 0;
        }

        .currency-symbol {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-right: 0.5rem;
        }

        .huge-amount-input {
          background: transparent;
          border: none;
          font-size: 3.5rem;
          font-weight: 800;
          text-align: center;
          width: auto;
          max-width: 250px;
          padding: 0;
          color: var(--text-main);
        }

        .huge-amount-input:focus {
          box-shadow: none;
        }

        .huge-amount-input::placeholder {
          color: rgba(255,255,255,0.1);
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-field label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-top: 1.25rem;
        }

        .btn-submit-premium {
          margin-top: 1rem;
          width: 100%;
          padding: 1rem;
          border-radius: 1rem;
          background: var(--primary);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s;
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
        }

        .btn-submit-premium:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.4);
        }

        .btn-submit-premium.success {
          background: var(--success);
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default TransactionModal;
