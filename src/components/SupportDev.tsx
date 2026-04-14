import React from 'react';
import { Link } from 'react-router-dom';

const SupportDev = ({ variant = 'default' }: { variant?: 'default'|'minimal'|'sidebar' }) => {
  if (variant === 'minimal') {
    return (
      <Link to="/support" className="coffee-btn-minimal">
        <img src="https://cdn.buymeacoffee.com/assets/logos/icon-black.png" alt="BMC" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
        <span>Support Studio</span>
      </Link>
    );
  }

  return (
    <div className={`coffee-card-minimal-mobile ${variant}`}>
       <Link to="/support" className="coffee-mobile-trigger">
          <div className="coffee-icon-mini-box">
             <img src="https://cdn.buymeacoffee.com/assets/logos/icon-black.png" alt="BMC" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
          </div>
          <div className="coffee-mini-info">
             <span className="coffee-mini-label">Support Developer</span>
             <span className="coffee-mini-subtext">Keep ImagineDraw Unlimited</span>
          </div>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="mini-chevron"><path d="M9 18l6-6-6-6"/></svg>
       </Link>
    </div>
  );
};

export default SupportDev;
