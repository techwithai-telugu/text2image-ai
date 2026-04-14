import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { BackButton } from './HeaderIcons';

const Report = () => {
  return (
    <div className="legal-page">
      <Navigation />
      <MobileHeader title="Report Incident" showLogo leftAction={<BackButton />} />

      <div className="legal-content animate-fade-in">
        <div className="legal-hero minimal-hero">
          <div className="hero-icon-box">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h1 className="legal-title">Registry Faults</h1>
          <p className="legal-updated">Neural Correction Center</p>
        </div>

        <section className="legal-section">
          <p className="legal-text">
            If you have encountered a registry fault, rendering error, or safety protocol breach, 
            please document the incident. Precision reporting helps stabilize the ImagineDraw neural grid.
          </p>
        </section>

        <section className="legal-section">
          <h2 className="section-label">Incident Categories</h2>
          <div className="report-types-minimal">
            <div className="report-pill-minimal">
              <span className="pill-dot error"></span>
              <span>Neural Link Failure (API)</span>
            </div>
            <div className="report-pill-minimal">
              <span className="pill-dot warning"></span>
              <span>Visual Artifacts / Rendering</span>
            </div>
            <div className="report-pill-minimal">
              <span className="pill-dot safety"></span>
              <span>Safety Filter Leakage</span>
            </div>
            <div className="report-pill-minimal">
              <span className="pill-dot ui"></span>
              <span>Workspace (UI/UX) Glitch</span>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2 className="section-label">How to Report</h2>
          <p className="legal-text">
            Please forward a screenshot and a brief description of the synchronization fault to 
            <strong> report@imaginedraw.ai</strong> or notify the maintenance team via the 
            Telegram Dev Hub.
          </p>
        </section>

        <section className="support-cta-section">
           <div className="support-pill warning">
              <h3>In case of critical fail</h3>
              <p>If the application becomes unresponsive, perform a "Master Reset" from Settings to clear local cache.</p>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Report;
