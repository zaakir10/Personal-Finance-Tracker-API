import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Check, Loader2 } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, user, onUpdateDetails, onUpdatePassword }) => {
  const [details, setDetails] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (user) {
      setDetails({ name: user.name || '', email: user.email || '' });
    }
  }, [user, isOpen]);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setLoadingDetails(true);
    const res = await onUpdateDetails(details);
    setLoadingDetails(false);
    if (res.success) {
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      alert(res.error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoadingPass(true);
    const res = await onUpdatePassword(passwords);
    setLoadingPass(false);
    if (res.success) {
      setPasswords({ currentPassword: '', newPassword: '' });
      setSuccessMsg('Password changed successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      alert(res.error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="modal-backdrop"
          onClick={onClose}
        >
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            className="modal-content card settings-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header-premium">
              <div className="header-title-group">
                <h3>Account Settings</h3>
                <p className="text-muted">Manage your profile and security</p>
              </div>
              <button className="close-btn" onClick={onClose}><X size={20} /></button>
            </div>

            <div className="settings-body">
              {successMsg && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="success-alert"
                >
                  <Check size={16} /> {successMsg}
                </motion.div>
              )}

              <section className="settings-section">
                <div className="section-title">
                  <User size={18} />
                  <h4>Profile Details</h4>
                </div>
                <form onSubmit={handleUpdateDetails}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={details.name}
                      onChange={e => setDetails({...details, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={details.email}
                      onChange={e => setDetails({...details, email: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={loadingDetails}>
                    {loadingDetails ? <Loader2 className="spinner" size={16} /> : 'Save Changes'}
                  </button>
                </form>
              </section>

              <div className="settings-divider" />

              <section className="settings-section">
                <div className="section-title">
                  <Lock size={18} />
                  <h4>Security</h4>
                </div>
                <form onSubmit={handleUpdatePassword}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={passwords.currentPassword}
                      onChange={e => setPasswords({...passwords, currentPassword: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={passwords.newPassword}
                      onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn btn-outline btn-sm" disabled={loadingPass}>
                    {loadingPass ? <Loader2 className="spinner" size={16} /> : 'Update Password'}
                  </button>
                </form>
              </section>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <style>{`
        .settings-modal {
          max-width: 440px;
          padding: 0;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .modal-header-premium {
          padding: 1.5rem 2rem;
          background: rgba(255,255,255,0.02);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
        }

        .header-title-group h3 {
          font-size: 1.25rem;
          margin-bottom: 0.125rem;
          color: white;
        }

        .close-btn {
          background: transparent;
          color: var(--text-muted);
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        .settings-body {
          padding: 1.5rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .success-alert {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .settings-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--primary);
        }
        .section-title h4 {
          color: var(--text-main);
          font-weight: 700;
        }
        .settings-divider {
          height: 1px;
          background: var(--border);
          opacity: 0.5;
        }
        .btn-sm {
          width: auto;
          align-self: flex-start;
          padding: 0.625rem 1.25rem;
          font-size: 0.875rem;
        }
      `}</style>
    </>
  );
};

export default SettingsModal;
