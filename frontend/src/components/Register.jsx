import React, { useState } from 'react';
import { Wallet, Lock, Mail, User } from 'lucide-react';
import { authAPI } from '../api/api';

const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.register(formData);
      const token = res.data.token || res.data.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        onRegisterSuccess();
      } else {
        setError('Registration successful, please sign in.');
        setTimeout(onSwitchToLogin, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try a different email.');
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
        
        <h2>Create Account</h2>
        <p className="text-muted">Join us to start tracking your finances</p>

        {error && <div className="error-badge">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User size={18} />
              <input 
                type="text" 
                placeholder="Zaakir dev" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="login-footer">
          <span>Already have an account?</span>
          <button className="btn-text" onClick={onSwitchToLogin}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
