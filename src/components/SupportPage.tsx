import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { BackButton } from './HeaderIcons';
import CurrencySwitcher from './CurrencySwitcher';

const SupportPage = () => {
  const coffeeUrl = "https://buymeacoffee.com/pranaythedeveloper";
  
  // Dynamic Currency Logic: Baseline Target = 10,000 INR
  const currencyCode = localStorage.getItem('user-currency') || 'INR';
  const currencyConfig: Record<string, { symbol: string, factor: number, target: number }> = {
    'INR': { symbol: '₹', factor: 1, target: 10000 },
    'USD': { symbol: '$', factor: 0.012, target: 120 },
    'EUR': { symbol: '€', factor: 0.011, target: 110 },
    'GBP': { symbol: '£', factor: 0.009, target: 95 },
    'JPY': { symbol: '¥', factor: 1.8, target: 18000 },
  };

  const config = currencyConfig[currencyCode] || currencyConfig['INR'];
  const currentGoal = 340 * config.factor; // Current Manifested Support
  const targetGoal = config.target;
  const percentage = (currentGoal / targetGoal) * 100;

  return (
    <div className="legal-page">
      <Navigation />
      <MobileHeader 
        title="Buy Me a Coffee" 
        showLogo 
        leftAction={<BackButton />} 
        rightAction={<CurrencySwitcher />}
      />

      <div className="legal-content animate-fade-in">
        <div className="legal-hero minimal-hero">
          <div className="hero-icon-box" style={{ background: '#FFDD00', border: 'none', padding: '12px' }}>
            <img src="https://cdn.buymeacoffee.com/assets/logos/icon-black.png" alt="BMC" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1 className="legal-title">Buy me a coffee</h1>
          <p className="legal-updated">Support Pranay's Creative Lab</p>
        </div>

        <section className="legal-section">
           <div className="goal-container-minimal">
              <div className="goal-header">
                 <span className="goal-label">Community Goal</span>
                 <span className="goal-value">{config.symbol}{currentGoal.toLocaleString()} / <strong>{config.symbol}{targetGoal.toLocaleString()}</strong></span>
              </div>
              <div className="goal-track">
                 <div className="goal-fill" style={{ width: `${percentage}%` }}>
                    <div className="goal-shine" />
                 </div>
              </div>
              <p className="goal-desc">Help reach our target to upgrade the manifestation grid and keep the Studio unlimited.</p>
           </div>
        </section>

        <section className="legal-section" style={{ textAlign: 'center' }}>
          <div className="support-actions-minimal">
            <a 
              href={coffeeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="generate-btn-premium" 
              style={{ 
                background: '#FFDD00', 
                color: '#000', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px',
                textDecoration: 'none',
                height: '56px',
                fontSize: '16px'
              }}
            >
              <img src="https://cdn.buymeacoffee.com/assets/logos/icon-black.png" alt="BMC" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
              <span>Buy me a coffee</span>
            </a>
            <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
              Securely processed via Buy Me a Coffee
            </p>
          </div>
        </section>

        <footer className="legal-footer-signature">
           <img src="/logo.jpg" alt="Logo" className="footer-logo-minimal" />
           <p className="footer-brand">ImagineDraw x Pranay</p>
           <p className="footer-copyright">Synchronized Creativity · 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default SupportPage;
