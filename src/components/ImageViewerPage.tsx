import { useState, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ImageData {
  url: string;
  prompt: string;
  style: string;
  timestamp: string;
  id: string;
}

const ImageViewerPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Transform State
  const [state, setState] = useState({ scale: 1, x: 0, y: 0 });
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const lastCenter = useRef({ x: 0, y: 0 });
  const lastDist = useRef(0);
  const lastTap = useRef(0);
  const touchType = useRef<'none' | 'pan' | 'pinch'>('none');

  // Decode image data
  const image: ImageData | null = (() => {
    try {
      const data = searchParams.get('data');
      if (data) return JSON.parse(decodeURIComponent(data));
    } catch { return null; }
    return null;
  })();

  const handleBack = useCallback(() => navigate(-1), [navigate]);

  const confirmDelete = () => {
    if (!image) return;
    const saved = localStorage.getItem('generated-images');
    if (saved) {
      const images = JSON.parse(saved);
      localStorage.setItem('generated-images', JSON.stringify(images.filter((img: any) => img.id !== image.id)));
    }
    navigate(-1);
  };

  const copyToJSON = () => {
    if (!image) return;
    const miniData = {
      prompt: image.prompt,
      style: image.style,
      time: image.timestamp
    };
    const jsonStr = JSON.stringify(miniData, null, 2);
    navigator.clipboard.writeText(jsonStr);
  };

  const handleShare = () => {
    if (!image) return;
    if (navigator.share) {
      navigator.share({
        title: 'ImagineDraw Creation',
        text: `Check out this AI art: ${image.prompt}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const updateTransform = (deltaScale: number, centerX: number, centerY: number, dx = 0, dy = 0) => {
    if (showDeleteModal) return; // Freeze when modal open
    setState(prev => {
      const nextScale = Math.min(Math.max(prev.scale * deltaScale, 0.5), 10);
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || nextScale === prev.scale) return { ...prev, x: prev.x + dx, y: prev.y + dy };
      const vx = centerX - rect.left - rect.width / 2;
      const vy = centerY - rect.top - rect.height / 2;
      const ratio = (nextScale - prev.scale) / prev.scale;
      return { scale: nextScale, x: prev.x - (vx - prev.x) * ratio + dx, y: prev.y - (vy - prev.y) * ratio + dy };
    });
  };

  const onWheel = (e: React.WheelEvent) => updateTransform(e.deltaY > 0 ? 0.9 : 1.1, e.clientX, e.clientY);

  const onTouchStart = (e: React.TouchEvent) => {
    if (showDeleteModal) return;
    if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTap.current < 250) {
        if (state.scale > 1.1) setState({ scale: 1, x: 0, y: 0 });
        else updateTransform(2.5, e.touches[0].clientX, e.touches[0].clientY);
        lastTap.current = 0;
        return;
      }
      lastTap.current = now;
      touchType.current = 'pan';
      lastCenter.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      touchType.current = 'pinch';
      lastDist.current = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      lastCenter.current = { x: (e.touches[0].clientX + e.touches[1].clientX) / 2, y: (e.touches[0].clientY + e.touches[1].clientY) / 2 };
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (showDeleteModal) return;
    if (touchType.current === 'pan' && e.touches.length === 1) {
      const dx = e.touches[0].clientX - lastCenter.current.x;
      const dy = e.touches[0].clientY - lastCenter.current.y;
      updateTransform(1, 0, 0, dx, dy);
      lastCenter.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (touchType.current === 'pinch' && e.touches.length === 2) {
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const center = { x: (e.touches[0].clientX + e.touches[1].clientX) / 2, y: (e.touches[0].clientY + e.touches[1].clientY) / 2 };
      const delta = dist / lastDist.current;
      updateTransform(delta, center.x, center.y, center.x - lastCenter.current.x, center.y - lastCenter.current.y);
      lastDist.current = dist;
      lastCenter.current = center;
    }
  };

  const handleDownload = async () => {
    if (!image || isDownloading) return;
    setIsDownloading(true);
    try {
      const res = await fetch(image.url);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `art-${image.id}.png`;
      a.click();
    } catch { window.open(image.url, '_blank'); }
    finally { setIsDownloading(false); }
  };

  if (!image) return null;

  return (
    <div className="image-viewer-page" ref={containerRef} onWheel={onWheel} style={{ touchAction: 'none' }}>
      <div className="image-viewer-bg" onClick={handleBack}></div>

      <div className="viewer-top-bar" onClick={e => e.stopPropagation()}>
        <button className="viewer-top-btn" onClick={handleBack} title="Close">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        <div className="viewer-top-info">
          <span className="viewer-tag">{image.style}</span>
          <p className="viewer-top-prompt">{image.prompt}</p>
        </div>
        <div className="viewer-top-actions">
          <button className="viewer-top-btn" onClick={copyToJSON} title="Copy JSON Info">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
          </button>
          <button className="viewer-top-btn" onClick={handleShare} title="Share Link">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
          <button className={`viewer-top-btn ${isDownloading ? 'loading' : ''}`} onClick={handleDownload} title="Download">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          </button>
          <button className="viewer-top-btn danger" onClick={() => setShowDeleteModal(true)} title="Delete">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
          </button>
        </div>
      </div>

      <div className="viewer-image-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={() => { touchType.current = 'none'; }}>
        <img src={image.url} alt={image.prompt} className="viewer-image" draggable={false}
          style={{ transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`, transition: touchType.current !== 'none' ? 'none' : 'transform 0.2s ease-out' }} />
      </div>

      {/* Custom Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="custom-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon danger">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
            </div>
            <h3>Delete Artwork?</h3>
            <p>This will permanently remove this image from your local gallery.</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowDeleteModal(false)}>No, Keep it</button>
              <button className="modal-btn confirm" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="zoom-controls-premium" onClick={e => e.stopPropagation()}>
        <button className="z-btn" onClick={() => updateTransform(0.7, window.innerWidth/2, window.innerHeight/2)}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
        <div className="z-info"><span className="z-label">{Math.round(state.scale * 100)}%</span></div>
        <button className="z-btn" onClick={() => updateTransform(1.4, window.innerWidth/2, window.innerHeight/2)}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
        <div className="z-sep"></div>
        <button className="z-btn reset" onClick={() => setState({ scale: 1, x: 0, y: 0 })}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg></button>
      </div>
    </div>
  );
};

export default ImageViewerPage;