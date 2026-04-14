import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('welcome-popup-seen');
    if (!hasSeen) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('welcome-popup-seen', 'true');
    // Auto-portal to technical site on dismissal
    window.open('https://techwithai.site/', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="welcome-popup-overlay animate-fade-in">
      <div className="welcome-popup-card animate-scale-in">
        <div className="wp-header">
           <div className="wp-icon-box">
              <img src="https://cdn.buymeacoffee.com/assets/logos/icon-black.png" alt="BMC" />
           </div>
           <button className="wp-close-btn" onClick={handleClose}>
             <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
           </button>
        </div>

        <div className="wp-content">
           <h2 className="wp-title">Support the Vision</h2>
           <p className="wp-text">
             ImagineDraw is built by an independent creator. Help keep the Studio unlimited and high-speed by supporting the development.
           </p>
           
           <div className="wp-actions">
              <Link to="/support" className="wp-primary-btn" onClick={handleClose}>
                Explore Community Goal
              </Link>
              <a 
                href="https://buymeacoffee.com/pranaythedeveloper" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="wp-secondary-btn"
                onClick={handleClose}
              >
                Buy me a coffee
              </a>
           </div>
        </div>
        
        <p className="wp-footer">This manifestation will only appear once.</p>
      </div>
    </div>
  );
};

export default WelcomePopup;
