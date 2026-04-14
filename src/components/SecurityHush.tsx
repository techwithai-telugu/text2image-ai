import { useEffect } from 'react';

const SecurityHush = () => {
  useEffect(() => {
    const hush = () => {
      // 🕵️ Silent DevTools Detection
      const threshold = 160;
      const t0 = Date.now();
      debugger; // This pauses only if console/devtools is open
      const t1 = Date.now();
      
      const isDevToolsOpen = 
        (t1 - t0 > 100) || 
        (window.outerWidth - window.innerWidth > threshold) || 
        (window.outerHeight - window.innerHeight > threshold);

      if (isDevToolsOpen) {
        // Redirect to Telegram or Website as requested
        window.location.href = "https://t.me/techwithai_site";
      }
    };

    const interval = setInterval(hush, 2000);

    // Disable Shortcuts
    const blockKeys = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key)) || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', blockKeys);
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', blockKeys);
    };
  }, []);

  return null;
};

export default SecurityHush;
