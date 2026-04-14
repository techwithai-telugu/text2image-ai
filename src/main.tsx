import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply theme and accent color immediately on load
const savedTheme = localStorage.getItem('theme-mode') || 'dark';
const savedAccent = localStorage.getItem('accent-color') || '#5936EB';

if (savedTheme === 'auto') {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
} else {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

document.documentElement.style.setProperty('--accent-color', savedAccent);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
