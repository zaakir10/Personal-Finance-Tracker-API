import React, { useEffect } from 'react';
import { Wallet, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Logout = ({ onComplete }) => {
  useEffect(() => {
    localStorage.removeItem('token');
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="login-container">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card login-card"
      >
        <div className="logo center">
          <Wallet size={48} color="#6366f1" />
          <h1>FinTrack</h1>
        </div>
        
        <div className="logout-success">
          <CheckCircle size={64} className="text-success" />
          <h2>Successfully Signed Out</h2>
          <p className="text-muted">Redirecting you to the login screen...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Logout;
