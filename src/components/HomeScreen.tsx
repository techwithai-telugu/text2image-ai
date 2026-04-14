import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { ThemeToggle, ShareButton } from './HeaderIcons';
import SupportDev from './SupportDev';

interface GalleryImage {
  id: string;
  prompt: string;
  style: string;
  url: string;
  timestamp: string;
}

const HomeScreen = () => {
  const navigate = useNavigate();
  const [recentImages, setRecentImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('generated-images');
    if (saved) {
      try { setRecentImages(JSON.parse(saved).slice(0, 6)); }
      catch (e) { console.error('Failed to load images:', e); }
    }
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    const imageData = encodeURIComponent(JSON.stringify(image));
    navigate(`/view?data=${imageData}&from=/home`);
  };

  // Lazy image with error state
  const RecentImage = ({ img }: { img: GalleryImage }) => {
    const [imgError, setImgError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    return (
      <div className="recent-item" onClick={() => !imgError && handleImageClick(img)}>
        {!loaded && !imgError && <div className="img-skeleton" />}
        {imgError ? (
          <div className="img-error-state">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
        ) : (
          <div className="recent-image-wrapper">
            <img
              src={img.url}
              alt={img.prompt}
              className="recent-image"
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => { setImgError(true); setLoaded(true); }}
              style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
            />
            <div className="recent-overlay">
              <p className="recent-prompt">{img.prompt}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="home-screen">
      <Navigation />
      <MobileHeader 
        title="ImagineDraw" 
        showLogo 
        rightAction={
          <div className="flex" style={{ gap: '8px' }}>
            <ThemeToggle />
            <ShareButton />
          </div>
        } 
      />

      <div className="home-content">
        {/* Modern Hero Section */}
        <section className="hero-section-modern">
          <div className="hero-aurora"></div>
          <div className="hero-content-inner">
            <div className="hero-pill animate-fade-in">
              <span className="pill-dot"></span>
              <span>AI Engine Operational</span>
            </div>
            
            <div className="hero-text-group animate-slide-up">
              <h1 className="hero-title-main">
                Turn your words into <span className="gradient-text">Masterpieces</span>
              </h1>
              <p className="hero-desc-main">
                Experience the next generation of AI image generation. 
                Fast, free, and unrestricted creativity at your fingertips.
              </p>
            </div>

            <div className="hero-actions-row">
              <Link to="/create" className="primary-hero-btn">
                <div className="btn-glow"></div>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Start Creating</span>
              </Link>
              <Link to="/about" className="secondary-hero-btn">
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Support Call-to-Action */}
        <div style={{ padding: '0 16px', marginTop: '24px' }}>
           <SupportDev />
        </div>

        {/* Highlights Row with Icons */}
        <section className="highlights-row">
          {[
            { 
              icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l5 2"/><path d="M2 2l2 5"/></svg>, 
              title: '6+ Pro Styles', 
              value: 'High quality' 
            },
            { 
              icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, 
              title: 'Turbo Speed', 
              value: 'Under 5s' 
            },
            { 
              icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M11 3l-4 6 5 12 5-12-4-6"/></svg>, 
              title: 'Premium UI', 
              value: 'Glass Style' 
            },
          ].map((h) => (
            <div key={h.title} className="highlight-item">
              <div className="h-icon-wrapper">{h.icon}</div>
              <div className="h-text">
                <span className="h-title">{h.title}</span>
                <span className="h-val">{h.value}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Recent Images */}
        {recentImages.length > 0 && (
          <section className="recent-section">
            <div className="section-header">
              <h2 className="section-title">Your Recent AI Art</h2>
              <Link to="/gallery" className="view-all">
                View All
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </Link>
            </div>
            <div className="recent-grid">
              {recentImages.map((img) => <RecentImage key={img.id} img={img} />)}
            </div>
          </section>
        )}

        {/* Modern Footer */}
        <footer className="home-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="f-logo">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>
              </div>
              <span className="f-name">ImagineDraw</span>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} ImagineDraw. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/developer">Developer</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomeScreen;