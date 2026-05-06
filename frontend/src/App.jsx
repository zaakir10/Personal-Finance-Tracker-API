import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import { CashFlowChart, CategoryChart } from './components/Charts';
import TransactionList from './components/TransactionList';
import TransactionModal from './components/TransactionModal';
import SettingsModal from './components/SettingsModal';
import AdminOverview from './components/AdminOverview';
import CategoryManager from './components/CategoryManager';
import SummaryBoard from './components/SummaryBoard';
import UserMenu from './components/UserMenu';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import { useFinance } from './hooks/useFinance';
import './App.css';

function App() {
  const [authView, setAuthView] = useState(localStorage.getItem('token') ? 'authenticated' : 'login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    user,
    transactions, 
    categories, 
    summary,
    adminData,
    adminUsers,
    chartData,
    stats, 
    loading, 
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    removeCategory,
    uploadProfilePic,
    updateUserDetails,
    updateUserPassword,
    adminToggleUserStatus,
    adminUpdateUser,
    adminDeleteUser,
    refresh
  } = useFinance();

  useEffect(() => {
    if (authView === 'authenticated') {
      refresh();
    }
  }, [authView]);

  const handleLoginSuccess = () => setAuthView('authenticated');
  const handleLogout = () => setAuthView('logout');
  const handleLogoutComplete = () => setAuthView('login');

  const handleAddOrUpdate = async (data, id) => {
    const result = id 
      ? await updateTransaction(id, data)
      : await addTransaction(data);
      
    if (result.success) {
      setShowModal(false);
      setEditingTransaction(null);
    } else {
      alert(result.error);
    }
  };

  const openAddModal = () => {
    setEditingTransaction(null);
    setShowModal(true);
  };

  const filteredTransactions = transactions.filter(t => 
    (t.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authView === 'login') return <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setAuthView('register')} />;
  if (authView === 'register') return <Register onRegisterSuccess={handleLoginSuccess} onSwitchToLogin={() => setAuthView('login')} />;
  if (authView === 'logout') return <Logout onComplete={handleLogoutComplete} />;

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        onAddClick={openAddModal}
        userRole={user?.role}
      />

      <main className="content">
        <header className="main-header">
          <div className="header-left">
            <div className="search-bar">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search history..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="header-right">
            <UserMenu 
              user={user} 
              onUpload={uploadProfilePic} 
              onLogout={handleLogout} 
              onSettingsClick={() => setShowSettings(true)}
            />
            <button className="btn btn-primary header-add-btn" onClick={openAddModal}>
              <Plus size={18} /> <span>Quick Add</span>
            </button>
          </div>
        </header>

        {loading ? (
          <div className="loading-state">Synchronizing Finance...</div>
        ) : (
          <div className="view-container">
            {activeTab === 'dashboard' && (
              <>
                <header className="dashboard-welcome">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h1>Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h1>
                    <p className="text-muted">Here's what's happening with your finances today.</p>
                  </motion.div>
                </header>

                <section className="stats-grid dashboard-stats">
                  <StatCard label="Total Balance" value={`$${stats.balance.toLocaleString()}`} icon={Wallet} gradient trend={12} />
                  <StatCard label="Income" value={`+$${stats.income.toLocaleString()}`} icon={ArrowUpRight} colorClass="text-success" delay={0.1} trend={8} />
                  <StatCard label="Expenses" value={`-$${stats.expenses.toLocaleString()}`} icon={ArrowDownLeft} colorClass="text-error" delay={0.2} trend={-5} />
                </section>

                <section className="charts-section dashboard-charts">
                  <CashFlowChart data={chartData} />
                  <CategoryChart data={
                    summary.expense.categories.length > 0 
                      ? summary.expense.categories.map(c => ({ name: c.category, value: c.total }))
                      : [{ name: 'Empty', value: 1 }]
                  } />
                </section>

                <TransactionList 
                  transactions={filteredTransactions.slice(0, 5)} 
                  onViewAll={() => setActiveTab('transactions')} 
                  onEdit={(t) => { setEditingTransaction(t); setShowModal(true); }}
                  onDelete={deleteTransaction}
                  showActions={true}
                />
              </>
            )}

            {activeTab === 'transactions' && (
              <div className="full-transactions-view">
                <TransactionList 
                  transactions={filteredTransactions} 
                  onEdit={(t) => { setEditingTransaction(t); setShowModal(true); }}
                  onDelete={deleteTransaction}
                  showActions={true}
                />
              </div>
            )}

            {activeTab === 'categories' && (
              <CategoryManager 
                categories={categories} 
                onAdd={addCategory} 
                onDelete={removeCategory} 
              />
            )}

            {activeTab === 'analysis' && (
              <SummaryBoard summary={summary} />
            )}

            {activeTab === 'admin' && user?.role === 'admin' && (
              <AdminOverview 
                data={adminData} 
                users={adminUsers}
                onToggleStatus={adminToggleUserStatus}
                onUpdateUser={adminUpdateUser}
                onDeleteUser={adminDeleteUser}
              />
            )}
          </div>
        )}
      </main>

      <TransactionModal 
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingTransaction(null); }}
        onSubmit={handleAddOrUpdate}
        categories={categories}
        initialData={editingTransaction}
      />

      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        user={user}
        onUpdateDetails={updateUserDetails}
        onUpdatePassword={updateUserPassword}
      />

      <style>{`
        .dashboard-welcome {
          margin-bottom: 2.5rem;
        }
        .dashboard-welcome h1 {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dashboard-welcome p {
          font-size: 1.125rem;
        }

        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 3rem;
          margin-bottom: 4rem;
        }
        .header-left { flex: 1; }
        .header-right { 
          display: flex; 
          align-items: center; 
          gap: 1.5rem;
        }
        .header-add-btn {
          padding: 0.875rem 1.75rem;
          border-radius: 1rem;
          gap: 0.75rem;
          font-weight: 700;
          box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.4);
        }
        .dashboard-stats {
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .dashboard-charts {
          gap: 2.5rem;
          margin-bottom: 4rem;
        }

        .view-container {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
