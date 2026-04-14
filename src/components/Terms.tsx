import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { BackButton } from './HeaderIcons';

const Terms = () => {
  return (
    <div className="legal-page">
      <Navigation />
      <MobileHeader title="Terms of Use" showLogo leftAction={<BackButton />} />
      <div className="legal-content animate-fade-in">
        <div className="legal-hero minimal-hero">
          <div className="hero-icon-box">
             <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <h1 className="legal-title">Terms & Conditions</h1>
          <p className="legal-updated">Last Updated: April 2026</p>
        </div>
        <section className="legal-section">
          <p className="legal-text">
            By accessing the ImagineDraw neural studio, you agree to abide by these 
            Internal Protocols. Our tool is provided for creative manifestation and 
            artistic exploration.
          </p>
        </section>
        <section className="legal-section">
          <h2 className="section-label">1. Ethical Syncing</h2>
          <p className="legal-text">
            Users are responsible for the conceptual prompts they synchronize. You agree 
            not to use the studio for generating harmful, illegal, or malicious neural 
            assets. Safe Architecture is enabled by default to assist in protocol compliance.
          </p>
        </section>
        <section className="legal-section">
          <h2 className="section-label">2. Asset Ownership</h2>
          <p className="legal-text">
            All images manifested through ImagineDraw are yours to use. We claim zero 
            ownership over the outputs of your creativity. You have the right to export, 
            share, and manifest these assets commercially or personally.
          </p>
        </section>
        <section className="legal-section">
          <h2 className="section-label">3. Technical Limitation</h2>
          <p className="legal-text">
            As a decentralized creative bridge, ImagineDraw is provided "as is." We are 
            not liable for neural sync failures or temporary unavailability of the 
            generation workers.
          </p>
        </section>
        <footer className="legal-footer-signature">
           <img src="/logo.jpg" alt="Logo" className="footer-logo-minimal" />
           <p className="footer-brand">ImagineDraw Studio Pro</p>
           <p className="footer-copyright">Freedom of Creation · 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default Terms;
