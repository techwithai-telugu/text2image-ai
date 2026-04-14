import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { BackButton } from './HeaderIcons';

const About = () => {
  return (
    <div className="legal-page">
      <Navigation />
      <MobileHeader title="About Studio" showLogo leftAction={<BackButton />} />

      <div className="legal-content animate-fade-in">
        <div className="legal-hero minimal-hero">
          <div className="hero-icon-box">
            <img src="/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }} />
          </div>
          <h1 className="legal-title">ImagineDraw Pro</h1>
          <p className="legal-updated">Neural Synthesis v2.5 Stable</p>
        </div>

        <section className="legal-section">
          <h2 className="section-label">The Vision</h2>
          <p className="legal-text">
            ImagineDraw is a professional-grade neural manifestation studio designed to remove 
            the friction between thought and imagery. Unlike legacy tools, ImagineDraw 
            operates on a philosophy of "Frictionless Creation" — no logins, no paywalls, 
            and zero tracking.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-label">Privacy Commitment</h2>
          <p className="legal-text">
            Your creative grid is your own. We utilize local browser storage for your gallery 
            and settings. Your prompts and generated assets never touch a central server 
            for storage, ensuring your manifestation history remains 100% private.
          </p>
        </section>

        <footer className="legal-footer-signature">
           <img src="/logo.jpg" alt="Logo" className="footer-logo-minimal" />
           <p className="footer-brand">ImagineDraw Studio Pro</p>
           <p className="footer-copyright">Synchronized for Infinite Creativity · 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
