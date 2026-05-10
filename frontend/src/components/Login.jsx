import React, { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { authAPI } from '../api/api';

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.login({ email: formData.email, password: formData.password });
      if (res.data.success) {
        localStorage.setItem('isAuthenticated', 'true');
        onLoginSuccess();
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 relative overflow-hidden p-4 sm:p-6 transition-colors duration-300">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-3xl border border-black/5 dark:border-white/5 rounded-[2rem] sm:rounded-[3rem] p-7 sm:p-10 md:p-14 shadow-2xl shadow-black/10 dark:shadow-black/50">
          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-600/30 mb-8 animate-pulse-soft">
              <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-3">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-500 font-bold tracking-tight text-center">Sign in to securely access your personal finance tracker.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 dark:text-rose-400 text-sm font-black text-center tracking-tight">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  className="w-full bg-slate-100/80 dark:bg-slate-950/50 border border-black/10 dark:border-white/5 rounded-[1.5rem] py-5 pl-14 pr-6 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Password</label>
                <button type="button" className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 hover:text-indigo-400 transition-colors">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  required 
                  className="w-full bg-slate-100/80 dark:bg-slate-950/50 border border-black/10 dark:border-white/5 rounded-[1.5rem] py-5 pl-14 pr-6 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-[1.5rem] mt-4 transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 sm:mt-12 pt-7 sm:pt-10 border-t border-black/5 dark:border-white/5 flex flex-col items-center gap-4">
            <span className="text-slate-500 font-bold text-sm tracking-tight">Don't have an account?</span>
            <button 
              className="text-slate-800 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 font-black tracking-[0.1em] text-xs uppercase transition-all" 
              onClick={onSwitchToRegister}
            >
              Sign Up
            </button>
          </div>
        </div>
        
        {/* Footer Credit */}
        <p className="mt-8 sm:mt-12 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-700 hidden sm:block">
          FinTrack Protocol v4.0 • Secured by End-to-End Encryption
        </p>
      </div>
    </div>
  );
};

export default Login;
