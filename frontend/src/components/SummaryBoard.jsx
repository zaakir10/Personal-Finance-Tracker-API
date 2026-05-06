import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Layers } from 'lucide-react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

const SummaryBoard = ({ summary }) => {
  const expenseData = summary.expense.categories.map(c => ({ name: c.category, value: c.total }));
  const incomeData = summary.income.categories.map(c => ({ name: c.category, value: c.total }));

  return (
    <div className="summary-board">
      <div className="view-header">
        <h2>Financial Summary</h2>
        <p className="text-muted">Breakdown of your monthly activity</p>
      </div>

      <div className="summary-grid">
        {/* Income Breakdown */}
        <div className="card summary-card">
          <div className="card-header">
            <TrendingUp className="text-success" />
            <h3>Income Breakdown</h3>
          </div>
          <div className="summary-content">
            <div className="chart-small">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={incomeData.length > 0 ? incomeData : [{ name: 'None', value: 1 }]}
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {incomeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="category-list">
              {incomeData.map((c, i) => (
                <div key={i} className="category-row">
                  <span className="dot" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                  <span className="cat-name">{c.name}</span>
                  <span className="cat-value">${c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="card summary-card">
          <div className="card-header">
            <TrendingDown className="text-error" />
            <h3>Expense Breakdown</h3>
          </div>
          <div className="summary-content">
            <div className="chart-small">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={expenseData.length > 0 ? expenseData : [{ name: 'None', value: 1 }]}
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {expenseData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="category-list">
              {expenseData.map((c, i) => (
                <div key={i} className="category-row">
                  <span className="dot" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                  <span className="cat-name">{c.name}</span>
                  <span className="cat-value">${c.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .summary-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .category-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .category-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .cat-name { flex: 1; }
        .cat-value { font-weight: 600; }
      `}</style>
    </div>
  );
};

export default SummaryBoard;
