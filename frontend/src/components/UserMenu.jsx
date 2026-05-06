import React, { useState, useRef } from 'react';
import { User, Camera, LogOut, Settings, ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserMenu = ({ user, onUpload, onLogout, onSettingsClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const res = await onUpload(file);
      setIsUploading(false);
      if (res.success) {
        setIsOpen(false);
      } else {
        alert(res.error || 'Failed to upload photo');
      }
    }
  };

  return (
    <div className="user-menu-container">
      <button className="user-menu-trigger" onClick={() => setIsOpen(!isOpen)}>
        <div className="avatar-wrapper">
          {isUploading ? (
            <Loader2 size={16} className="spinner" />
          ) : user?.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" className="avatar-small" />
          ) : (
            <div className="avatar-placeholder-small">
              <User size={16} />
            </div>
          )}
        </div>
        <span className="user-name-label">{user?.name?.split(' ')[0] || 'User'}</span>
        <ChevronDown size={14} className={`chevron ${isOpen ? 'rotated' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="menu-backdrop" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 15, scale: 0.9, filter: 'blur(10px)' }}
              className="dropdown-menu premium-glass"
            >
              <div className="menu-header">
                <div className="menu-avatar-large">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" />
                  ) : (
                    <User size={32} />
                  )}
                  <button 
                    className="change-avatar-btn" 
                    onClick={() => fileInputRef.current.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? <Loader2 size={12} className="spinner" /> : <Camera size={12} />}
                  </button>
                </div>
                <div className="menu-user-info">
                  <div className="name-role-group">
                    <h4>{user?.name || 'Anonymous User'}</h4>
                    <span className={`role-badge ${user?.role || 'user'}`}>
                      {user?.role === 'admin' ? 'Admin' : 'Member'}
                    </span>
                  </div>
                  <p>{user?.email}</p>
                </div>
              </div>

              <div className="menu-divider" />

              <div className="menu-items">
                <button className="menu-item" onClick={() => fileInputRef.current.click()} disabled={isUploading}>
                  <div className="item-icon-bg">
                    {isUploading ? <Loader2 size={16} className="spinner" /> : <Camera size={16} />}
                  </div>
                  <span>{isUploading ? 'Uploading...' : 'Change Photo'}</span>
                </button>
                <button className="menu-item" onClick={() => { onSettingsClick(); setIsOpen(false); }}>
                  <div className="item-icon-bg"><Settings size={16} /></div>
                  <span>Settings</span>
                </button>
                <div className="menu-divider" />
                <button className="menu-item logout-item" onClick={onLogout}>
                  <div className="item-icon-bg logout-bg"><LogOut size={16} /></div>
                  <span>Sign Out</span>
                </button>
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .user-menu-container {
          position: relative;
        }

        .user-menu-trigger {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem 0.5rem 0.5rem;
          border-radius: 100px;
          color: white;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
        }

        .user-menu-trigger:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: var(--primary);
          transform: translateY(-1px);
        }

        .avatar-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(135deg, var(--primary), #818cf8);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .avatar-small {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder-small {
          color: white;
        }

        .chevron {
          color: rgba(255,255,255,0.5);
          transition: transform 0.3s ease;
        }

        .chevron.rotated {
          transform: rotate(180deg);
        }

        .menu-backdrop {
          position: fixed;
          inset: 0;
          z-index: 90;
        }

        .premium-glass {
          position: absolute;
          top: calc(100% + 1rem);
          right: 0;
          width: 300px;
          z-index: 100;
          padding: 1.5rem;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }

        .menu-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .menu-avatar-large {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
          overflow: visible;
        }

        .menu-avatar-large img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .change-avatar-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #0f172a;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }

        .change-avatar-btn:hover:not(:disabled) {
          transform: scale(1.1);
        }

        .change-avatar-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .menu-user-info h4 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: white;
        }

        .menu-user-info p {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.5);
        }

        .name-role-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.25rem;
        }

        .role-badge {
          font-size: 0.625rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 0.125rem 0.5rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .role-badge.admin {
          background: rgba(99, 102, 241, 0.15);
          color: var(--primary);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .role-badge.user {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .menu-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 1rem -1.5rem;
        }

        .menu-items {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-radius: 1rem;
          color: rgba(255,255,255,0.7);
          background: transparent;
          font-weight: 600;
          transition: all 0.2s;
          width: 100%;
          text-align: left;
        }

        .item-icon-bg {
          width: 36px;
          height: 36px;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
          transition: all 0.2s;
        }

        .menu-item:hover:not(:disabled) {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        .menu-item:hover:not(:disabled) .item-icon-bg {
          background: rgba(99, 102, 241, 0.15);
          color: var(--primary);
        }

        .logout-item:hover:not(:disabled) .item-icon-bg {
          background: rgba(239, 68, 68, 0.15);
          color: var(--error);
        }

        .logout-item:hover:not(:disabled) {
          color: var(--error);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UserMenu;
