import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { BackButton } from './HeaderIcons';

const Help = () => {
  const faqs = [
    { q: 'How do I initiate a neural manifestation?', a: 'Navigate to the Studio tab, input your conceptual prompt, select a visual atmosphere and batch sync count, then trigger "Generate".' },
    { q: 'System reports a Neural Link Failure. How to proceed?', a: 'Ensure a stable network synchronization. High-density generations (08 Sync) may require more bandwidth. If the failure persists, the neural worker may be under heavy load.' },
    { q: 'Where are my manifested assets archived?', a: 'All generated assets are stored in the local Neural Gallery. You can export them directly to your device via the expanded view.' },
    { q: 'What is the purpose of Safe Architecture?', a: 'Safe Architecture filters neural outputs for high-fidelity compliance. Bypassing this protocol (Technical Mode) requires an authorized security key.' },
    { q: 'How does Private Tunnel generation work?', a: 'Enabling the Private Tunnel ensures your prompts and outputs are anonymous and untraceable. This bypasses global manifestation logs.' },
    { q: 'How can I synchronize my visual workspace?', a: 'Settings → Visual Theme allows you to toggle between dark, light, and automated environment modes to best suit your creative space.' },
    { q: 'Can I override the neural seed?', a: 'Yes. In the Studio sidebar, under Advanced Settings, you can manually input a seed for reproducible manifestations or reset to 0 for random results.' },
  ];

  return (
    <div className="legal-page">
      <Navigation />
      <MobileHeader title="Help Center" showLogo leftAction={<BackButton />} />

      <div className="legal-content animate-fade-in">
        <div className="legal-hero minimal-hero">
           <div className="hero-icon-box">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
           </div>
          <h1 className="legal-title">Help & Support</h1>
          <p className="legal-updated">Neural Architecture Documentation</p>
        </div>

        <section className="legal-section">
           <h2 className="section-label">General Concepts</h2>
           <div className="faq-list-minimal">
             {faqs.map((faq) => (
               <details key={faq.q} className="faq-item-minimal">
                 <summary className="faq-question-minimal">
                    <span>{faq.q}</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron-mini"><path d="M6 9l6 6 6-6"/></svg>
                 </summary>
                 <div className="faq-answer-minimal">{faq.a}</div>
               </details>
             ))}
           </div>
        </section>

        <section className="support-cta-section">
           <div className="support-pill">
              <h3>Still need assistance?</h3>
              <p>Direct communication is available via our official Contact portal or Telegram community.</p>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Help;
