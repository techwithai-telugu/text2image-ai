import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { ShareButton, BackButton } from './HeaderIcons';
import SupportDev from './SupportDev';

const UNLOCK_KEY = 'techwithai';

const accentColors = [
  { name: 'Violet',  value: '#7C3AED' },
  { name: 'Blue',    value: '#2563EB' },
  { name: 'Cyan',    value: '#0891B2' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose',    value: '#E11D48' },
  { name: 'Orange',  value: '#EA580C' },
];

const Settings = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme-mode') || 'dark');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('accent-color') || '#7C3AED');
  const [autoSave, setAutoSave] = useState(() => localStorage.getItem('auto-save') !== 'false');
  const [safeMode, setSafeMode] = useState(() => localStorage.getItem('safe-mode') !== 'false');
  const [isPrivate, setIsPrivate] = useState(() => localStorage.getItem('is-private') === 'true');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Sync Logic
  useEffect(() => {
    if (safeMode) {
      setIsPrivate(false);
    } else {
      setIsPrivate(true);
    }
  }, [safeMode]);

  useEffect(() => { localStorage.setItem('auto-save', autoSave.toString()); }, [autoSave]);
  useEffect(() => { localStorage.setItem('safe-mode', safeMode.toString()); }, [safeMode]);
  useEffect(() => { localStorage.setItem('is-private', isPrivate.toString()); }, [isPrivate]);

  const [showUnlock, setShowUnlock] = useState(false);
  const [unlockKey, setUnlockKey] = useState('');
  const [unlockError, setUnlockError] = useState('');

  const adjustColor = (color: string, amount: number) => {
    const clamp = (n: number) => Math.min(255, Math.max(0, n));
    const h = color.replace('#', '');
    const r = clamp(parseInt(h.substr(0, 2), 16) + amount);
    const g = clamp(parseInt(h.substr(2, 2), 16) + amount);
    const b = clamp(parseInt(h.substr(4, 2), 16) + amount);
    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  };

  const applyTheme = (mode: string) => {
    if (mode === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', mode);
    }
  };

  useEffect(() => { localStorage.setItem('theme-mode', theme); applyTheme(theme); }, [theme]);

  useEffect(() => {
    localStorage.setItem('accent-color', accentColor);
    document.documentElement.style.setProperty('--color-accent', accentColor);
    document.documentElement.style.setProperty('--color-accent-gradient',
      `linear-gradient(135deg, ${accentColor} 0%, ${adjustColor(accentColor, 20)} 100%)`);
  }, [accentColor]);

  const handleSafeModeOff = () => {
    if (safeMode === false) { setSafeMode(true); return; }
    setShowUnlock(true);
    setUnlockKey('');
    setUnlockError('');
  };

  const handleUnlockSubmit = () => {
    if (unlockKey.toLowerCase() === UNLOCK_KEY) {
      setSafeMode(false);
      setShowUnlock(false);
      setUnlockError('');
    } else {
      setUnlockError('Incorrect key. Try again.');
    }
  };

  const handleClearAllData = () => {
    localStorage.removeItem('generated-images');
    setShowClearConfirm(false);
    window.location.reload();
  };

  const themeOptions = [
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'auto', label: 'Auto' },
  ];

  const SwitchField = ({ id, label, description, checked, onChange, disabled, dir = 'ltr' }: any) => (
    <div className="field-horizontal" dir={dir}>
      <div className="field-content" dir={dir}>
        <label htmlFor={id} className="field-label" dir={dir}>{label}</label>
        {description && <p className="field-description" dir={dir}>{description}</p>}
      </div>
      <label className="toggle-premium">
        <input 
          id={id} 
          type="checkbox" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
          disabled={disabled} 
        />
        <span className="toggle-slider-premium" />
      </label>
    </div>
  );

  const NavRow = ({ to, icon, label, desc, danger, external }: { to: string; icon: React.ReactNode; label: string; desc?: string; danger?: boolean; external?: boolean }) => {
    const content = (
      <>
        <div className={`setting-icon ${danger ? 'danger-icon' : ''}`}>{icon}</div>
        <div className="setting-info">
          <h3 className="setting-name" style={danger ? { color: 'var(--color-error)' } : {}}>{label}</h3>
          {desc && <p className="setting-desc">{desc}</p>}
        </div>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="setting-chevron">
          {external ? <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /> : <path d="M9 18l6-6-6-6"/>}
        </svg>
      </>
    );

    if (external) {
      return (
        <a href={to} target="_blank" rel="noopener noreferrer" className={`setting-row setting-nav-row ${danger ? 'danger-row' : ''}`}>
          {content}
        </a>
      );
    }
    return (
      <Link to={to} className={`setting-row setting-nav-row ${danger ? 'danger-row' : ''}`}>
        {content}
      </Link>
    );
  };

  return (
    <div className="settings-page">
      <Navigation />
      <MobileHeader title="Settings" showLogo leftAction={<BackButton />} rightAction={<ShareButton />} />

      <div className="settings-content">
        <SupportDev />
        <div className="settings-sections">

          {/* 🔍 Studio Identity ─────────────────────────────────────── */}
          <section className="settings-group">
            <h2 className="group-title">Studio Identity</h2>
            <div className="settings-card">
              <div className="setting-row">
                <div className="setting-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2"/></svg></div>
                <div className="setting-info"><h3 className="setting-name">Visual Theme</h3></div>
                <div className="theme-pill-group">
                  {themeOptions.map((opt) => (
                    <button key={opt.value} className={`theme-pill ${theme === opt.value ? 'active' : ''}`} onClick={() => setTheme(opt.value)}>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="divider" />
              <div className="setting-row">
                <div className="setting-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="5.5" cy="14.5" r="2.5"/><path d="M12 22a10 10 0 000-20"/></svg></div>
                <div className="setting-info"><h3 className="setting-name">Accent Tone</h3></div>
                <div className="accent-dot-row">
                  {accentColors.map((c) => (
                    <button key={c.value} className={`accent-dot ${accentColor === c.value ? 'active' : ''}`} style={{ background: c.value }} onClick={() => setAccentColor(c.value)} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ⚙️ Engine Configuration ─────────────────────────── */}
          <section className="settings-group">
            <h2 className="group-title">Engine Configuration</h2>
            <div className="settings-card">
               <SwitchField 
                  id="auto-manifest"
                  label="Auto Manifest"
                  description="Focus is shared across devices, and turns off when you leave the app."
                  checked={autoSave}
                  onChange={setAutoSave}
               />
               <div className="divider" />
               <SwitchField 
                  id="neural-safety"
                  label="Neural Safety"
                  description={safeMode ? 'Active Protection enabled' : '⚠️ Bypassed — Technical Mode'}
                  checked={safeMode}
                  onChange={handleSafeModeOff}
               />
               <div className="divider" />
               <SwitchField 
                  id="private-tunnel"
                  label="Private Tunnel"
                  description="Anonymous and untraceable neural asset synchronization."
                  checked={isPrivate}
                  onChange={setIsPrivate}
                  disabled={safeMode}
               />
            </div>
          </section>

          {/* 🛡️ Support & Help ─────────────────────────────────── */}
          <section className="settings-group">
            <h2 className="group-title">Support & Help</h2>
            <div className="settings-card">
              <NavRow to="/help" icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>} label="Help Center" desc="FAQ & knowledge base" />
              <div className="divider" />
              <NavRow to="/contact" icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63a20 20 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>} label="Contact Support" desc="Direct official assistance" />
              <div className="divider" />
              <NavRow to="/report" icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>} label="Report Incident" desc="Notify us about errors" />
            </div>
          </section>

          {/* 👑 Development Lab ────────────────────────────────────── */}
          <section className="settings-group">
            <h2 className="group-title">Development Lab</h2>
            <div className="settings-card">
              <NavRow to="/developer" icon={<img src="/logo.jpg" alt="Dev" style={{ width: 18, height: 18, borderRadius: '4px' }} />} label="Developer Profile" desc="Meet the creator Pranay" />
              <div className="divider" />
              <NavRow to="https://t.me/techwithai" icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>} label="Telegram Hub" external />
            </div>
          </section>

          {/* ⚖️ Legal Architecture ─────────────────────────────── */}
          <section className="settings-group">
            <h2 className="group-title">Legal & Info</h2>
            <div className="settings-card">
              <NavRow to="/about" icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>} label="About Studio" />
              <div className="divider" /><NavRow to="/terms" icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>} label="Terms & Conditions" />
              <div className="divider" /><NavRow to="/privacy" icon={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} label="Privacy Policy" />
            </div>
          </section>

          <footer className="settings-footer" style={{ marginTop: '24px', border: 'none', background: 'transparent', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginBottom: '16px', fontWeight: 600 }}>ImagineDraw Studio Pro · Official Version</p>
            <button className="clear-data-btn" onClick={() => setShowClearConfirm(true)} style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', height: '44px' }}>
              Clear All Data
            </button>
          </footer>
        </div>
      </div>

      {showUnlock && (
        <div className="clear-confirm-overlay" onClick={() => setShowUnlock(false)}>
          <div className="clear-confirm-popup" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔓</div><h3 className="clear-title">Architecture Override</h3>
            <p className="clear-desc">Bypassing safety protocols requires authorization.</p>
            <input className="unlock-input" type="password" placeholder="••••••••" value={unlockKey} onChange={(e) => { setUnlockKey(e.target.value); setUnlockError(''); }} onKeyDown={(e) => e.key === 'Enter' && handleUnlockSubmit()} autoFocus />
            {unlockError && <p className="unlock-error" style={{ marginBottom: 16 }}>Unauthorized Key</p>}
            <div className="clear-actions"><button className="clear-btn cancel" onClick={() => setShowUnlock(false)}>Cancel</button><button className="clear-btn confirm" onClick={handleUnlockSubmit}>Authorize</button></div>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="clear-confirm-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="clear-confirm-popup" onClick={(e) => e.stopPropagation()}>
             <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
            <h3 className="clear-title">Clear All Data?</h3><p className="clear-desc">All manifested neural assets will be permanently unlinked.</p>
            <div className="clear-actions"><button className="clear-btn cancel" onClick={() => setShowClearConfirm(false)}>Cancel</button><button className="clear-btn confirm" onClick={handleClearAllData}>Delete All</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;