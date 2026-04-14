import React from 'react';
import { Link } from 'react-router-dom';

interface MobileHeaderProps {
  title: string;
  showLogo?: boolean;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showLogo = true,
  leftAction,
  rightAction,
}) => {
  return (
    <header className="mobile-header">
      <div className="mobile-header-left">
        {leftAction}
        <div className="mh-brand-group">
          {showLogo && (
            <Link to="/home" className="mh-logo-link">
              <img src="/logo.jpg" alt="Logo" className="mh-logo" />
            </Link>
          )}
          <h1 className="mobile-header-title">{title}</h1>
        </div>
      </div>

      <div className="mobile-header-right">
        {rightAction}
      </div>
    </header>
  );
};

export default MobileHeader;