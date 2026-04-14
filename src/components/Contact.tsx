import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { BackButton } from './HeaderIcons';

const Contact = () => {
  return (
    <div className="legal-page">
      <Navigation />
      <MobileHeader title="Contact Support" showLogo leftAction={<BackButton />} />

      <div className="legal-content animate-fade-in">
        <div className="legal-hero minimal-hero">
          <div className="hero-icon-box">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63a20 20 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
          </div>
          <h1 className="legal-title">Get in Touch</h1>
          <p className="legal-updated">Official Support Channels</p>
        </div>

        <section className="legal-section">
          <p className="legal-text">
            For professional inquiries, technical support, or partnership opportunities, 
            please utilize the primary communication channels listed below. Our studio 
            facilitates direct engagement through decentralized community hubs.
          </p>

          <div className="contact-grid-minimal">
            <a href="mailto:support@imaginedraw.ai" className="contact-card-minimal">
              <div className="contact-icon-row">
                 <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                 <span className="contact-type">Email Support</span>
              </div>
              <p className="contact-value">support@imaginedraw.ai</p>
            </a>

            <a href="https://t.me/techwithai" target="_blank" rel="noopener noreferrer" className="contact-card-minimal">
              <div className="contact-icon-row">
                 <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                 <span className="contact-type">Telegram Dev Hub</span>
              </div>
              <p className="contact-value">@techwithai</p>
            </a>
          </div>
        </section>

        <section className="legal-section">
          <h2 className="section-label">Response Protocol</h2>
          <p className="legal-text">
            Our team typically updates within 24-48 hours during Standard manifest cycles. 
            For immediate technical triage, please consult the Help Center.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;
