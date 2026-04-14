import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { ThemeToggle, GalleryIcon, ShareButton } from './HeaderIcons';

interface GeneratedImage {
  id: string;
  prompt: string;
  style: string;
  url: string;
  timestamp: string;
}

const aspectRatios = [
  { value: '1:1', label: '1:1 Square', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="5" width="14" height="14" rx="2"/></svg> },
  { value: '4:5', label: '4:5 Portrait', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="12" height="16" rx="2"/></svg> },
  { value: '16:9', label: '16:9 Cinema', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="7" width="18" height="10" rx="2"/></svg> },
  { value: '9:16', label: '9:16 Story', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="3" width="10" height="18" rx="2"/></svg> },
  { value: '2:3', label: '2:3 Poster', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="3" width="14" height="18" rx="2"/></svg> },
  { value: '21:9', label: '21:9 Ultra', icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="8" width="20" height="8" rx="2"/></svg> },
];

const styleOptions = [
  { value: 'none',      label: 'Default',   icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> },
  { value: 'realistic', label: 'Realistic', icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> },
  { value: 'anime',     label: 'Anime',     icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/></svg> },
  { value: 'cyberpunk', label: 'Cyber',     icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M12 5v14M2 10h20"/></svg> },
  { value: '3d-render', label: '3D Mod',    icon: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l10 5v10l-10 5-10-5V7l10-5z"/><path d="M12 22V12m0 0l10-5m-10 5L2 7"/></svg> },
];

const countOptions = [
  { value: '1', label: '01 Sync', icon: <span className="count-dot">1</span> },
  { value: '2', label: '02 Sync', icon: <span className="count-dot">2</span> },
  { value: '4', label: '04 Sync', icon: <span className="count-dot">4</span> },
  { value: '8', label: '08 Sync', icon: <span className="count-dot">8</span> },
];

const ModernSelect = ({ label, options, value, onChange, disabled, hideLabelInTrigger }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o: any) => o.value === value) || options[0];

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  return (
    <div className={`modern-select-container ${disabled ? 'disabled' : ''}`} ref={containerRef}>
      {label && <label className="form-label">{label}</label>}
      <div className={`modern-select-trigger ${isOpen ? 'active' : ''}`} onClick={() => !disabled && setIsOpen(!isOpen)}>
        <div className="trigger-content">
          <span className="trigger-icon">{selected.icon}</span>
          {!hideLabelInTrigger && <span className="trigger-label">{selected.label}</span>}
        </div>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className={`chevron ${isOpen ? 'up' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
      </div>
      {isOpen && (
        <div className="modern-select-dropdown">
          {options.map((opt: any) => (
            <div key={opt.value} className={`modern-select-option ${opt.value === value ? 'selected' : ''}`} onClick={() => { onChange(opt.value); setIsOpen(false); }}>
              <span className="option-icon">{opt.icon}</span>
              <span className="option-label">{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CreateImage = () => {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState(() => localStorage.getItem('last-style') || 'none');
  const [numImages, setNumImages] = useState(() => localStorage.getItem('last-count') || '1');
  const [aspectRatio, setAspectRatio] = useState(() => localStorage.getItem('last-ratio') || '1:1');
  const [seed, setSeed] = useState(() => localStorage.getItem('last-seed') || '0');
  
  // 🛡️ Safe & Private (Hidden Global Architecture)
  const safeMode = localStorage.getItem('safe-mode') !== 'false';
  const privateMode = localStorage.getItem('is-private') === 'true';

  const [isGenerating, setIsGenerating] = useState(false);
  const [isClosingLoader, setIsClosingLoader] = useState(false);
  const [genStatus, setGenStatus] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  useEffect(() => {
    localStorage.setItem('last-style', style);
    localStorage.setItem('last-count', numImages);
    localStorage.setItem('last-ratio', aspectRatio);
    localStorage.setItem('last-seed', seed);
  }, [style, numImages, aspectRatio, seed]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setGenStatus('Aligning Neural Vectors...');

    try {
      const fullPrompt = style === 'none' ? prompt : `${prompt}, ${style} style, ultra detailed`;
      const numToGenerate = Number(numImages);
      
      const body = {
          prompt: fullPrompt,
          image: numToGenerate,
          num_images: numToGenerate,
          dimensions: aspectRatio,
          safety: safeMode,
          safe: safeMode,
          steps: 2,
          qualityBoost: true,
          model: "playgroundv2.5",
          seed: Number(seed) === 0 ? Math.floor(Math.random() * 1000000) : Number(seed),
          private: privateMode,
          enhance: true
      };

      const NEURAL_BRIDGE = 'https://death-image.ashlynn.workers.dev/generate';
      const apiResponse = await fetch(NEURAL_BRIDGE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
      });

      if (!apiResponse.ok) {
          let errMsg = 'Neural Link Blocked';
          try { 
            const errData = await apiResponse.json(); 
            errMsg = errData.error || errData.message || errMsg; 
          } catch(e) {}
          throw new Error(errMsg);
      }

      const apiData = await apiResponse.json();
      const extractedImages = apiData.images || (Array.isArray(apiData) ? apiData : null);

      if (!extractedImages || !Array.isArray(extractedImages) || extractedImages.length === 0) {
          throw new Error('Synapse Timeout.');
      }

      const newBatch: GeneratedImage[] = extractedImages.map((url: string, idx: number) => ({
        id: `${Date.now()}-${idx}`,
        prompt: fullPrompt,
        style,
        url,
        timestamp: new Date().toString(),
      }));

      const savedGallery = JSON.parse(localStorage.getItem('generated-images') || '[]');
      localStorage.setItem('generated-images', JSON.stringify([...newBatch, ...savedGallery]));
      setGeneratedImages(newBatch);
      setGenStatus('Neural Sync Complete.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Neural Sync Failed.');
    } finally {
      setIsClosingLoader(true);
      setTimeout(() => {
        setIsGenerating(false);
        setIsClosingLoader(false);
      }, 500); 
    }
  };

  const handleImageClick = (img: GeneratedImage) => {
    const imageData = encodeURIComponent(JSON.stringify(img));
    navigate(`/view?data=${imageData}&from=/create`);
  };

  return (
    <div className="create-page">
      <Navigation />
      <MobileHeader 
        title="Studio" 
        showLogo 
        rightAction={
          <div className="header-actions-group">
            <ShareButton />
            <ThemeToggle />
          </div>
        } 
      />

      <div className="create-container-desktop">
        <aside className="create-sidebar">
          <div className="sidebar-inner">
            <div className="sidebar-header-minimal">
              <div className="engine-status-ring active">
                 <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              </div>
              <h2 className="sidebar-title-minimal">Engine Online</h2>
            </div>
            
            <div className="form-group">
              <label className="form-label">Conceptual Prompt</label>
              <textarea
                className="form-textarea-minimal"
                placeholder="Synchronize imagination..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => { if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); handleGenerate(); } }}
                rows={3}
                disabled={isGenerating}
              />
            </div>

            <div className="form-row">
              <ModernSelect label="Atmosphere" options={styleOptions} value={style} onChange={setStyle} disabled={isGenerating} />
              <ModernSelect label="Batch Sync" options={countOptions} value={numImages} onChange={setNumImages} disabled={isGenerating} hideLabelInTrigger />
            </div>

            <div className="form-group">
              <label className="form-label">Neural Architecture</label>
              <div className="ratio-grid-minimal scrollable">
                {aspectRatios.map((r) => (
                  <button key={r.value} className={`ratio-btn-minimal ${aspectRatio === r.value ? 'active' : ''}`} onClick={() => setAspectRatio(r.value)} disabled={isGenerating}>
                    <div className="ratio-content-inner"><span className="r-label">{r.label.split(' ')[0]}</span></div>
                  </button>
                ))}
              </div>
            </div>

            <div className="advanced-settings-minimal" style={{ border: 'none', background: 'transparent', padding: 0 }}>
               <div className="form-group">
                  <label className="form-label">Neural Seed (0 for Random)</label>
                  <div className="seed-input-wrapper">
                    <input type="number" className="form-input-minimal" value={seed} onChange={(e) => setSeed(e.target.value)} disabled={isGenerating} />
                    <button className="seed-btn" onClick={() => setSeed('0')}>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                    </button>
                  </div>
               </div>
            </div>

            <div className="sidebar-footer-minimal">
               <div className="status-badge">
                  <div className={`status-led ${isGenerating ? 'pulsing' : 'active'}`} />
                  <span>{isGenerating ? 'WORKING' : 'READY'}</span>
               </div>
               <div className="status-badge">
                  <div className={`status-led active ${privateMode ? 'secure' : ''}`} />
                  <span>{privateMode ? 'PRIVATE' : 'OPEN'}</span>
               </div>
            </div>

            <button className={`generate-btn-premium main-execute ${isGenerating ? 'loading-premium' : ''}`} onClick={handleGenerate} disabled={!prompt.trim() || isGenerating}>
              {isGenerating ? (
                <div className="loader-premium-content">
                  <div className="shimmer-sweep"></div>
                  <span>Manifesting...</span>
                </div>
              ) : 'Generate'}
            </button>
            {error && <div className="error-box-minimal"><span>{error}</span></div>}
          </div>
        </aside>

        <main className="create-main">
          {(isGenerating || isClosingLoader) ? (
            <div className={`generation-loading-state ${isClosingLoader ? 'fade-out' : ''}`}>
              <div className="neural-loader">
                <div className="neural-circle" /><div className="neural-circle" /><div className="neural-circle" />
              </div>
              <p className="loading-subtext">{genStatus || 'Reconstructing Pixels...'}</p>
            </div>
          ) : generatedImages.length > 0 ? (
            <div className="preview-results-area">
              <div className={`results-layout-grid ${aspectRatio === '9:16' ? 'is-9-16' : ''}`}>
                {generatedImages.map((img) => (
                  <div key={img.id} className="result-img-wrapper" onClick={() => handleImageClick(img)}>
                    <img src={img.url} alt={img.prompt} className="result-img" />
                    <div className="result-img-overlay">
                      <div className="overlay-actions-minimal">
                        <div className="overlay-icon-btn">
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 3h6v6M10 14L21 3M9 21H3v-6M14 10l-11 11"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-create-state">
               <div className="orb-decoration">
                  <div className="orb orb-1"></div>
                  <div className="orb orb-2"></div>
               </div>
              <h2>Ready. Set. Manifest.</h2>
              <p>Your conceptual grid is currently at standby.</p>
              <div className="hint-pill">Tip: Use Ctrl + Enter for rapid sync</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CreateImage;