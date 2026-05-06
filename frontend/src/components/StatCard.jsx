import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, colorClass, gradient, trend, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ 
        delay,
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`card premium-stat-card ${gradient ? 'gradient-mode' : ''}`}
    >
      <div className="stat-content">
        <div className="stat-header">
          <div className={`icon-container ${colorClass || ''}`}>
            <Icon size={20} />
          </div>
          {trend && (
            <div className={`trend-badge ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
              {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        
        <div className="stat-body">
          <span className="stat-label">{label}</span>
          <h2 className={`stat-value ${colorClass || ''}`}>{value}</h2>
        </div>
      </div>

      <style>{`
        .premium-stat-card {
          position: relative;
          overflow: hidden;
          padding: 1.5rem;
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          min-height: 160px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .gradient-mode {
          background: linear-gradient(135deg, var(--primary), #4f46e5);
          border: none;
        }

        .gradient-mode .stat-label { color: rgba(255, 255, 255, 0.8) !important; }
        .gradient-mode .stat-value { color: white !important; }
        .gradient-mode .icon-container { background: rgba(255, 255, 255, 0.2); color: white; }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .icon-container {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .trend-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.375rem 0.625rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .trend-up { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .trend-down { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .stat-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0;
        }
      `}</style>
    </motion.div>
  );
};

export default StatCard;
