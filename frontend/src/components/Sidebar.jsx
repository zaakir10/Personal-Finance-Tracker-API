import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  LogOut,
  PlusCircle,
  ShieldCheck,
  Tags
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, onAddClick, userRole }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'transactions', icon: CreditCard, label: 'Transactions' },
    { id: 'categories', icon: Tags, label: 'Categories' },
    { id: 'analysis', icon: TrendingUp, label: 'Analysis' },
  ];

  if (userRole === 'admin') {
    menuItems.push({ id: 'admin', icon: ShieldCheck, label: 'Admin Panel' });
  }

  return (
    <aside className="sidebar premium-sidebar">
      <div className="logo-section">
        <div className="logo-icon-bg">
          <img src="/logo.svg" alt="FinTrack Logo" width="24" height="24" />
        </div>
        <span className="logo-text">FinTrack</span>
      </div>

      <div className="sidebar-action">
        <button className="btn-add-primary" onClick={onAddClick}>
          <PlusCircle size={20} />
          <span>Add Transaction</span>
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="nav-icon-wrapper">
              <item.icon size={20} />
            </div>
            <span>{item.label}</span>
            {activeTab === item.id && <div className="active-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout-sidebar" onClick={onLogout}>
          <div className="logout-icon-wrapper">
            <LogOut size={18} />
          </div>
          <span>Logout</span>
        </button>
      </div>

      <style>{`
        .premium-sidebar {
          background: #0f172a;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          min-width: 280px;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          padding-left: 0.5rem;
        }

        .logo-icon-bg {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary), #818cf8);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px -4px rgba(99, 102, 241, 0.5);
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: white;
        }

        .sidebar-action {
          margin-bottom: 2.5rem;
        }

        .btn-add-primary {
          width: 100%;
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 1.25rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4);
          cursor: pointer;
        }

        .btn-add-primary:hover {
          transform: translateY(-2px);
          background: #4f46e5;
          box-shadow: 0 20px 25px -5px rgba(99, 102, 241, 0.5);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 0.875rem 1rem;
          border-radius: 1rem;
          color: rgba(255, 255, 255, 0.5);
          background: transparent;
          font-weight: 600;
          transition: all 0.2s;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.9);
        }

        .nav-link.active {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
        }

        .nav-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .active-indicator {
          position: absolute;
          left: -1.5rem;
          width: 4px;
          height: 24px;
          background: var(--primary);
          border-radius: 0 4px 4px 0;
          box-shadow: 4px 0 12px rgba(99, 102, 241, 0.5);
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .btn-logout-sidebar {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 1rem;
          color: rgba(255, 255, 255, 0.5);
          background: transparent;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .btn-logout-sidebar:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--error);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
