import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  LayoutGrid,
  Filter,
  Menu
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
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import { useFinance } from './hooks/useFinance';

function App() {
  const [authView, setAuthView] = useState(localStorage.getItem('token') ? 'authenticated' : 'login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    <div className="flex flex-col md:flex-row min-h-screen bg-bg-main text-text-main selection:bg-indigo-500/30 selection:text-white transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        onAddClick={openAddModal}
        userRole={user?.role}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Superior Header */}
        <header className="px-4 md:px-12 py-4 md:py-6 flex items-center justify-between border-b border-border bg-bg-main/50 backdrop-blur-xl z-20">
          <div className="flex-1 flex items-center gap-4 md:gap-6 max-w-2xl">
            <button 
              className="md:hidden p-3 rounded-2xl bg-bg-card border border-border text-text-muted hover:text-text-main transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="relative group flex-1 hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Find anything..." 
                className="w-full bg-bg-card/50 border border-border rounded-2xl py-3 pl-12 pr-4 text-text-main placeholder:text-text-muted focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="hidden md:flex p-3 rounded-2xl bg-bg-card border border-border text-text-muted hover:text-text-main hover:border-indigo-500/30 transition-all">
              <Filter size={18} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 ml-6">
            <ThemeToggle />
            <button className="hidden md:flex p-3 rounded-2xl bg-bg-card border border-border text-text-muted hover:text-text-main transition-all relative">
              <Bell size={18} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-bg-main" />
            </button>
            <div className="h-8 w-px bg-border hidden md:block" />
            <UserMenu 
              user={user} 
              onUpload={uploadProfilePic} 
              onLogout={handleLogout} 
              onSettingsOpen={() => setShowSettings(true)}
            />
          </div>
        </header>

        {/* Content Area with custom scrollbar class */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-12 pb-12 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_50%)] from-indigo-500/5 dark:from-indigo-500/10">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
              <span className="text-text-muted font-black uppercase tracking-[0.2em] text-xs">Decrypting Ledger</span>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12 max-w-7xl mx-auto"
            >
              {activeTab === 'dashboard' && (
                <>
                  {/* Hero Welcome */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-widest mb-2">
                        <LayoutGrid size={12} /> Live Overview
                      </div>
                      <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-text-main leading-tight">
                        Morning, <span className="bg-gradient-to-r from-indigo-500 to-indigo-700 bg-clip-text text-transparent">{user?.name?.split(' ')[0] || 'User'}</span>.
                      </h1>
                      <p className="text-text-muted text-lg font-medium">Your portfolio grew by <span className="text-emerald-500 font-bold">12.5%</span> this month. Keep it up!</p>
                    </div>
                    
                    <button 
                      className="w-full sm:w-auto bg-indigo-600 dark:bg-white text-white dark:text-slate-950 font-black px-6 sm:px-8 py-4 sm:py-5 rounded-[2rem] flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/20 dark:shadow-white/5 transition-all hover:scale-105 active:scale-95 group" 
                      onClick={openAddModal}
                    >
                      <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
                      <span>Record Entry</span>
                    </button>
                  </div>

                  {/* Stats Grid - High Contrast */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <StatCard label="Total Balance" value={`$${stats.balance.toLocaleString()}`} icon={Wallet} gradient trend={12} />
                    <StatCard label="Monthly Income" value={`+$${stats.income.toLocaleString()}`} icon={ArrowUpRight} colorClass="text-emerald-400" delay={0.1} trend={8} />
                    <StatCard label="Monthly Expenses" value={`-$${stats.expenses.toLocaleString()}`} icon={ArrowDownLeft} colorClass="text-rose-400" delay={0.2} trend={-5} />
                  </div>

                  {/* Visual Intelligence Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2 bg-bg-card/60 backdrop-blur-xl border border-border rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-8">
                      <CashFlowChart data={chartData} />
                    </div>
                    <div className="lg:col-span-1 bg-bg-card/60 backdrop-blur-xl border border-border rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-8">
                      <CategoryChart data={
                        summary.expense.categories.length > 0 
                          ? summary.expense.categories.map(c => ({ name: c.category, value: c.total }))
                          : [{ name: 'Empty', value: 1 }]
                      } />
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                      <h3 className="text-2xl font-black text-text-main tracking-tight">Recent Ledger</h3>
                      <button 
                        onClick={() => setActiveTab('transactions')}
                        className="text-indigo-500 font-bold text-sm hover:text-indigo-600 transition-colors"
                      >
                        Browse all history →
                      </button>
                    </div>
                    <TransactionList 
                      transactions={filteredTransactions.slice(0, 5)} 
                      onEdit={(t) => { setEditingTransaction(t); setShowModal(true); }}
                      onDelete={deleteTransaction}
                      showActions={true}
                    />
                  </div>
                </>
              )}

              {activeTab === 'transactions' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            </motion.div>
          )}
        </div>
      </main>

      {/* Persistent Modals */}
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
    </div>
  );
}

export default App;
