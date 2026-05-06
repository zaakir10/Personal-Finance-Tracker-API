import React, { useState } from 'react';
import { Wallet, Lock, Mail } from 'lucide-react';
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
      const token = res.data.token || res.data.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        onLoginSuccess();
      } else {
        setError('Login failed. No token received.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="logo center">
          <img src="/logo.svg" alt="FinTrack Logo" width="48" height="48" />
          <h1>FinTrack</h1>
        </div>
        
        <h2>Welcome Back</h2>
        <p className="text-muted">Please enter your details to sign in</p>

        {error && <div className="error-badge">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input 
                type="email" 
                placeholder="you@example.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <span>Don't have an account?</span>
          <button className="btn-text" onClick={onSwitchToRegister}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
