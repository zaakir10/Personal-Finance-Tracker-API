import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  TrendingUp, 
  LogOut,
  Plus,
  ShieldCheck,
  Tags,
  PlusCircle,
  X
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, onAddClick, userRole, isMobileMenuOpen, setIsMobileMenuOpen }) => {
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
    <aside className={`fixed inset-y-0 left-0 z-50 w-[280px] md:relative md:w-72 md:h-screen bg-bg-card/95 md:bg-bg-card/80 backdrop-blur-2xl border-r border-border flex flex-col transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-[20px_0_40px_rgba(0,0,0,0.1)]' : '-translate-x-full'}`}>
      {/* Brand Section */}
      <div className="flex items-center justify-between p-6 md:p-8 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 group hover:scale-110 transition-transform cursor-pointer">
            <img src="/logo.svg" alt="Logo" className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-text-main tracking-tight leading-none">FinTrack</h1>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mt-1 block">Premium Edition</span>
          </div>
        </div>
        <button 
          className="md:hidden p-2 rounded-xl text-text-muted hover:bg-bg-main transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 py-4 md:py-0 overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-2 justify-start">
          {/* ACTION: NEW TRANSACTION */}
          <button 
            onClick={() => { onAddClick(); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group bg-bg-main text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white mb-6 border border-indigo-500/10"
          >
            <div className="flex items-center justify-center">
              <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </div>
            <span className="font-black tracking-widest text-[10px] uppercase">New Transaction</span>
          </button>

          <div className="h-px bg-border mb-4" />

          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                className={`
                  relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-text-muted hover:bg-bg-main hover:text-indigo-500'}
                `}
              >
                <div className="flex items-center justify-center">
                  <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
                </div>
                <span className="font-bold tracking-tight text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 md:p-8 border-t border-border mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-500 font-bold hover:text-rose-400 transition-all group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
