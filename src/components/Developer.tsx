import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { BackButton } from './HeaderIcons';
import '../styles/Developer.css';


const Developer = () => {
  const socials = [
    { 
      name: 'Website', 
      url: 'https://techwithai.site/', 
      icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
      color: '#00D1FF'
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/@techwith_ai_telugu?si=7kJoheNxAPPqDHsr', 
      icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
      color: '#FF0000'
    },
    { 
      name: 'Telegram', 
      url: 'https://t.me/TechWithAiTelugu', 
      icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>,
      color: '#0088CC'
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/techwithai._?igsh=YnY4cndnbGg1dWJ0', 
      icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
      color: '#E4405F'
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/techwithai-telugu/text2image-ai', 
      icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
      color: '#FFFFFF'
    },
    { 
      name: 'Gmail', 
      url: 'mailto:pranaygamerxyt@gmail.com', 
      icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      color: '#EA4335'
    },
  ];

  return (
    <div className="developer-page">
      <Navigation />
      <MobileHeader 
        title="Developer" 
        showLogo 
        leftAction={<BackButton />}
      />

      <div className="developer-content">
        {/* Modern Dev Hero */}
        <div className="dev-hero-modern">
          <div className="dev-avatar-wrapper">
            <img src="/logo.jpg" alt="Developer" className="dev-avatar" />
            <div className="online-indicator"></div>
          </div>
          <h1 className="dev-name-modern">ImagineDraw AI</h1>
          <p className="dev-tagline-modern">Independent AI Developer & Creator</p>
          
          <div className="dev-stats-row">
            <div className="dev-stat-card">
              <span className="stat-value">2.1k</span>
              <span className="stat-label">Users</span>
            </div>
            <div className="dev-stat-card">
              <span className="stat-value">15k+</span>
              <span className="stat-label">Images</span>
            </div>
            <div className="dev-stat-card">
              <span className="stat-value">99%</span>
              <span className="stat-label">Uptime</span>
            </div>
          </div>
        </div>

        {/* About Card */}
        <section className="dev-card-section">
          <div className="dev-card glass-card">
            <h2 className="dev-card-title">About the Vision</h2>
            <p className="dev-card-body">
              ImagineDraw is committed to democratizing AI art. My mission is to build tools that 
              spark creativity without technical barriers. Every pixel generated is a testament 
              to the power of open-source AI and browser-based technologies.
            </p>
          </div>
        </section>

        {/* Social Connect - Modern Grid */}
        <section className="dev-connect-section">
          <h2 className="dev-section-title">Connect with Me</h2>
          <div className="dev-social-grid-modern">
            {socials.map((s) => (
              <a 
                key={s.name} 
                href={s.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-btn-modern"
                style={{ '--social-color': s.color } as any}
              >
                <div className="social-icon-box">
                  {s.icon}
                </div>
                <span className="social-name">{s.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <section className="dev-support-section">
          <div className="support-card">
            <div className="support-info">
              <h3>Enjoying the App?</h3>
              <p>Consider supporting development to keep ImagineDraw free and fast for everyone.</p>
            </div>
            <button className="support-btn-modern">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.2 7c-.4-1.1-1.2-2.1-2.2-2.7-.1-.1-.3-.2-.5-.3-.1 0-.2-.1-.4-.1-.1 0-.3-.1-.4-.1-.1 0-.2-.1-.4-.1-.1 0-.3 0-.4 0H5C3.3 3.7 2 5.1 2 6.8v10.3c0 1.7 1.3 3.1 3 3.1h12c1.7 0 3.1-1.3 3.1-3.1V7.1c.1-.1.1-.1.1-.1zm-2.1 0v10.1c0 .6-.5 1.1-1.1 1.1H5.1c-.6 0-1.1-.5-1.1-1.1V6.9c0-.6.5-1.1 1.1-1.1h11.9c.6 0 1.1.5 1.1 1.1V7c0 .1 0 .2-.1.3-.1.1-.2.2-.4.4-.1.1-.3.1-.5.1s-.4-.1-.5-.2c-.2-.2-.2-.5-.2-.7V6.1c0-.1 0-.2-.1-.2-.1-.1-.2-.1-.3-.1H5.5c-.1 0-.2 0-.3.1s-.1.2-.1.3v9.4c0 .1 0 .2.1.3s.2.1.3.1h11.3c.1 0 .2 0 .3-.1s.1-.2.1-.3V8.8l1.4-1.4c.1-.1.2-.2.4-.4z"/></svg>
              Support Dev
            </button>
          </div>
        </section>

        <footer className="dev-footer-simple">
          <p>© 2026 ImagineDraw AI · All rights reserved</p>
          <div className="footer-links-row">
            <span>v2.1.0</span>
            <span className="dot">•</span>
            <span>Stable Release</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Developer;
