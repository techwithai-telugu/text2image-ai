import { useState, useEffect, useRef } from 'react';

const currencies = [
  { code: 'USD', symbol: '$', label: 'Dollar' },
  { code: 'INR', symbol: '₹', label: 'Rupee' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'Pound' },
  { code: 'JPY', symbol: '¥', label: 'Yen' },
];

const CurrencySwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem('user-currency');
    if (saved) return saved;
    return 'INR';
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  const handleSelect = (code: string) => {
    setCurrent(code);
    localStorage.setItem('user-currency', code);
    setIsOpen(false);
    window.location.reload(); // Reload to sync throughout the studio
  };

  const selected = currencies.find(c => c.code === current) || currencies[0];

  return (
    <div className="currency-switcher" ref={containerRef}>
      <button className="currency-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="c-symbol">{selected.symbol}</span>
        <span className="c-code">{selected.code}</span>
      </button>

      {isOpen && (
        <div className="currency-dropdown animate-scale-in">
          {currencies.map((c) => (
            <button key={c.code} className={`currency-option ${current === c.code ? 'active' : ''}`} onClick={() => handleSelect(c.code)}>
              <span className="opt-symbol">{c.symbol}</span>
              <div className="opt-info">
                 <span className="opt-code">{c.code}</span>
                 <span className="opt-label">{c.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySwitcher;
