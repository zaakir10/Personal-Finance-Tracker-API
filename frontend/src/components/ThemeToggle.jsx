import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="p-3 rounded-2xl bg-bg-card border border-border text-text-muted hover:text-text-main transition-all relative overflow-hidden group"
      title={isDark ? "Switch to Light Protocol" : "Switch to Dark Protocol"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon size={18} className="text-indigo-400" />
          ) : (
            <Sun size={18} className="text-amber-500" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
