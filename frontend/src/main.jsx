import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './hooks/useTheme.jsx'

// Force cleanup of legacy or injected local storage keys that the user requested to hide
localStorage.removeItem('user');
localStorage.removeItem('post');
localStorage.removeItem('posts');
localStorage.removeItem('loglevel');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
