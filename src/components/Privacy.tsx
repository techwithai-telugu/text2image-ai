import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { BackButton } from './HeaderIcons';

const Privacy = () => {
  return (
    <div className="legal-page">
      <Navigation />
      <MobileHeader title="Privacy Policy" showLogo leftAction={<BackButton />} />
      <div className="legal-content animate-fade-in">
        <div className="legal-hero minimal-hero">
          <div className="hero-icon-box">
             <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last Updated: April 2026</p>
        </div>
        <section className="legal-section">
          <p className="legal-text">
            At ImagineDraw Studio, privacy is not a feature; it is the fundamental architecture 
            of our neural grid. We operate on a <strong>Zero-Persistence</strong> philosophy.
          </p>
        </section>
        <section className="legal-section">
          <h2 className="section-label">1. Local Neural Archiving</h2>
          <p className="legal-text">
            All manifested assets (generated images) and your creative gallery are stored 
            exclusively in your browser's <strong>Local Storage</strong>. We do not maintain 
            centralized servers to host or view your artwork.
          </p>
        </section>
        <section className="legal-section">
          <h2 className="section-label">2. Prompt Anonymity</h2>
          <p className="legal-text">
            When you initiate a synchronization (generate), your prompt is processed through 
            a secure API bridge. We do not associate prompts with personal identifies, as 
            ImagineDraw requires <strong>No Login</strong> or account creation.
          </p>
        </section>
        <section className="legal-section">
          <h2 className="section-label">3. Data Transparency</h2>
          <p className="legal-text">
            You have absolute control over your data. By selecting the "Clear All Data" 
            option in Settings, you perform a full wipe of all local neural assets from 
            your device.
          </p>
        </section>
        <footer className="legal-footer-signature">
           <img src="/logo.jpg" alt="Logo" className="footer-logo-minimal" />
           <p className="footer-brand">ImagineDraw Studio Pro</p>
           <p className="footer-copyright">Your Privacy is Encrypted by Choice · 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default Privacy;
