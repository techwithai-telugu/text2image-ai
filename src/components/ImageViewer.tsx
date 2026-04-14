import { useState, useRef, useEffect } from 'react';
import '../styles/ImageViewer.css';

interface ImageViewerProps {
  image: {
    url: string;
    prompt: string;
    style: string;
    timestamp: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

const ImageViewer = ({ image, isOpen, onClose, onDelete }: ImageViewerProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchDistance = useRef<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setShowDeleteConfirm(false);
      setIsDownloading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isOpen) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.min(Math.max(prev + delta, 0.5), 5));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistance.current = Math.sqrt(dx * dx + dy * dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const scaleChange = distance / lastTouchDistance.current;
      setScale(prev => Math.min(Math.max(prev * scaleChange, 0.5), 5));
      lastTouchDistance.current = distance;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = async () => {
    if (!image || isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      // Method 1: Try fetch with CORS
      const response = await fetch(image.url);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `imaginedraw-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.warn('Fetch download failed, trying fallback:', err);
      
      // Method 2: Fallback - open in new tab
      try {
        const a = document.createElement('a');
        a.href = image.url;
        a.download = `imaginedraw-${Date.now()}.png`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (fallbackErr) {
        console.error('Download failed:', fallbackErr);
        // Method 3: Last resort - just open the URL
        window.open(image.url, '_blank');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !image) return null;

  return (
    <div className="image-viewer-overlay" onClick={handleOverlayClick} onTouchEnd={handleOverlayClick}>
      <div 
        className="image-viewer-container" 
        ref={containerRef}
      >
        {/* Header */}
        <div className="viewer-header">
          <div className="viewer-info">
            <p className="viewer-prompt">{image.prompt}</p>
            <p className="viewer-meta">{image.style} • {new Date(image.timestamp).toLocaleDateString()}</p>
          </div>
          <div className="viewer-actions">
            <button 
              className="viewer-btn" 
              onClick={handleDownload} 
              onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); handleDownload(); }}
              title="Download"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <div className="downloading-spinner"></div>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              )}
            </button>
            {onDelete && (
              <button 
                className="viewer-btn delete" 
                onClick={() => setShowDeleteConfirm(true)} 
                onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); setShowDeleteConfirm(true); }}
                title="Delete"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3,6 5,6 21,6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            )}
            <button 
              className="viewer-btn close" 
              onClick={onClose} 
              onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }}
              title="Close"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image */}
        <div 
          className="viewer-image-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img 
            src={image.url} 
            alt={image.prompt}
            className="viewer-image"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
          />
        </div>

        {/* Zoom Controls */}
        <div className="zoom-controls">
          <button 
            className="zoom-btn" 
            onClick={() => setScale(prev => Math.max(prev - 0.25, 0.5))}
            onTouchEnd={(e) => { e.preventDefault(); setScale(prev => Math.max(prev - 0.25, 0.5)); }}
            disabled={scale <= 0.5}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <span className="zoom-level">{Math.round(scale * 100)}%</span>
          <button 
            className="zoom-btn" 
            onClick={() => setScale(prev => Math.min(prev + 0.25, 5))}
            onTouchEnd={(e) => { e.preventDefault(); setScale(prev => Math.min(prev + 0.25, 5)); }}
            disabled={scale >= 5}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          <button 
            className="zoom-btn reset" 
            onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }}
            onTouchEnd={(e) => { e.preventDefault(); setScale(1); setPosition({ x: 0, y: 0 }); }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>

        {/* Delete Confirmation Popup */}
        {showDeleteConfirm && (
          <div className="delete-confirm-popup" onClick={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
            <div className="delete-confirm-content">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" className="delete-icon">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <h3 className="delete-title">Delete Image?</h3>
              <p className="delete-desc">This action cannot be undone</p>
              <div className="delete-actions">
                <button 
                  className="delete-btn cancel" 
                  onClick={() => setShowDeleteConfirm(false)}
                  onTouchEnd={(e) => { e.preventDefault(); setShowDeleteConfirm(false); }}
                >
                  No, Cancel
                </button>
                <button 
                  className="delete-btn confirm" 
                  onClick={() => {
                    if (onDelete) onDelete();
                    setShowDeleteConfirm(false);
                    onClose();
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    if (onDelete) onDelete();
                    setShowDeleteConfirm(false);
                    onClose();
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
