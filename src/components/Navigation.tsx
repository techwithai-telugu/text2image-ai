import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle, ShareButton } from './HeaderIcons';
import SupportDev from './SupportDev';
import CurrencySwitcher from './CurrencySwitcher';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Global Accent Sync
  useEffect(() => {
    const savedAccent = localStorage.getItem('accent-color') || '#7C3AED';
    const adjustColor = (color: string, amount: number) => {
      const clamp = (n: number) => Math.min(255, Math.max(0, n));
      const h = color.replace('#', '');
      const r = clamp(parseInt(h.substr(0, 2), 16) + amount);
      const g = clamp(parseInt(h.substr(2, 2), 16) + amount);
      const b = clamp(parseInt(h.substr(4, 2), 16) + amount);
      return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
    };
    
    document.documentElement.style.setProperty('--color-accent', savedAccent);
    document.documentElement.style.setProperty('--color-accent-gradient', 
      `linear-gradient(135deg, ${savedAccent} 0%, ${adjustColor(savedAccent, 20)} 100%)`);
  }, []);
  
  const navItems = [
    { path: '/home', label: 'Home', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    )},
    { path: '/create', label: 'Create', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    )},
    { path: '/gallery', label: 'Gallery', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    )},
    { path: '/settings', label: 'Settings', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1.08z" />
      </svg>
    )},
  ];

  const isItemActive = (path: string) => {
    if (path === '/home' && currentPath === '/') return true;
    return currentPath.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <div className="nav-container">
          <Link to="/home" className="nav-brand">
            <img src="/logo.jpg" alt="ImagineDraw" className="d-logo-img" />
            <span className="brand-text">ImagineDraw</span>
          </Link>
          
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isItemActive(item.path) ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <CurrencySwitcher />
            <div className="desktop-only-coffee">
               <SupportDev variant="minimal" />
            </div>
            <ThemeToggle />
            <ShareButton />
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        {navItems.map((item) => {
          const active = isItemActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${active ? 'active' : ''}`}
            >
              <div className="nav-icon-wrapper">
                {item.icon}
              </div>
              <span className="nav-label">{item.label}</span>
              {active && <div className="active-indicator"></div>}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navigation;