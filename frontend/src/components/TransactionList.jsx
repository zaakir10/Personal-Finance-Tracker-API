import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Trash2, Edit2 } from 'lucide-react';

const TransactionList = ({ transactions, onViewAll, onDelete, onEdit, showActions = false }) => {
  return (
    <section className="transactions-list">
      <div className="card">
        <div className="list-header">
          <h3 className="card-title">Transactions</h3>
          {onViewAll && <button className="btn-text" onClick={onViewAll}>View All</button>}
        </div>
        <div className="list-content">
          {transactions.length === 0 ? (
            <div className="text-muted text-center py-8">No transactions found</div>
          ) : (
            transactions.map((t) => (
              <div key={t.id || t._id} className="transaction-item">
                <div className={`icon-box ${t.type === 'income' ? 'income' : 'expense'}`}>
                  {t.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                </div>
                <div className="item-info">
                  <span className="item-title">{t.title}</span>
                  <span className="item-category">{t.category}</span>
                </div>
                <div className="item-meta">
                  <span className="item-date">{new Date(t.date).toLocaleDateString()}</span>
                  <div className="item-amount-group">
                    <span className={`item-amount ${t.type === 'income' ? 'income' : 'expense'}`}>
                      {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                    </span>
                    {showActions && (
                      <div className="action-buttons">
                        <button 
                          className="btn-icon" 
                          onClick={() => onEdit(t)}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          className="btn-icon text-error" 
                          onClick={() => onDelete(t.id || t._id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .item-amount-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }
        .btn-icon {
          background: transparent;
          color: var(--text-muted);
          transition: all 0.2s;
          padding: 6px;
          border-radius: 6px;
        }
        .btn-icon:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-main);
        }
        .btn-icon.text-error:hover {
          color: var(--error);
          background: rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </section>
  );
};

export default TransactionList;
