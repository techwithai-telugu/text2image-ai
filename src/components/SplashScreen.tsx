import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Faster, smoother progress
    const duration = 1500;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setFade(true);
        setTimeout(() => {
          navigate('/home');
        }, 500); // Wait for fade out
      }, 300);
    }
  }, [progress, navigate]);

  return (
    <div className={`splash-screen ${fade ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="logo-wrapper animate-scale-in">
          <img src="/logo.jpg" alt="ImagineDraw Logo" className="splash-logo" />
          <div className="logo-glow"></div>
        </div>
        
        <div className="splash-text-group animate-slide-up">
          <h1 className="splash-title">ImagineDraw</h1>
          <p className="splash-subtitle">Your Imagination, AI Realized</p>
        </div>
        
        <div className="progress-container animate-fade-in">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-bottom">
            <span className="progress-status">{progress < 100 ? 'Initializing...' : 'Ready'}</span>
            <span className="progress-percentage">{progress}%</span>
          </div>
        </div>
      </div>

      <div className="splash-footer animate-fade-in">
        <p>Digital Art Studio</p>
      </div>
    </div>
  );
};

export default SplashScreen;
