import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import MobileHeader from './MobileHeader';
import { ThemeToggle } from './HeaderIcons';

interface GalleryImage {
  id: string;
  prompt: string;
  style: string;
  url: string;
  timestamp: string;
}

const Gallery = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('generated-images');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load images:', e);
      }
    }
  }, []);

  const handleImageClick = (image: GalleryImage) => {
    const imageData = encodeURIComponent(JSON.stringify(image));
    navigate(`/view?data=${imageData}&from=/gallery`);
  };

  const handleDeleteImage = (id: string) => {
    const updated = images.filter(img => img.id !== id);
    setImages(updated);
    localStorage.setItem('generated-images', JSON.stringify(updated));
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedImages(new Set());
  };

  const toggleSelectImage = (id: string | undefined) => {
    if (!id) return;
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedImages(newSelected);
  };

  const selectAll = () => {
    if (selectedImages.size === images.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(images.map(img => img.id)));
    }
  };

  const deleteSelected = () => {
    const updated = images.filter(img => !selectedImages.has(img.id));
    setImages(updated);
    localStorage.setItem('generated-images', JSON.stringify(updated));
    setSelectionMode(false);
    setSelectedImages(new Set());
  };

  const handleDownload = async (url: string, id: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `imaginedraw-${id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const GalleryItem = ({ img }: { img: GalleryImage }) => {
    const [imgError, setImgError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const isSelected = selectedImages.has(img.id);

    return (
      <div 
        className={`gallery-item ${selectionMode ? 'selection-mode' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => selectionMode ? toggleSelectImage(img.id) : handleImageClick(img)}
      >
        {!loaded && !imgError && <div className="img-skeleton" />}
        
        {imgError ? (
          <div className="img-error-state">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
              <line x1="4" y1="4" x2="20" y2="20" stroke="var(--color-error)" strokeWidth="1.5"/>
            </svg>
            <span>Load Error</span>
          </div>
        ) : (
          <div className="gallery-image-wrapper">
            <img 
              src={img.url} 
              alt={img.prompt} 
              className="gallery-image" 
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => { setImgError(true); setLoaded(true); }}
              style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
            />
          </div>
        )}

        {selectionMode && (
          <div className={`selection-checkbox ${isSelected ? 'checked' : ''}`}>
            {isSelected && (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            )}
          </div>
        )}

        <div className="gallery-overlay">
          <div className="overlay-content">
            <p className="overlay-prompt">{img.prompt}</p>
            <div className="overlay-actions">
              <button 
                className="action-btn download" 
                onClick={(e) => { e.stopPropagation(); handleDownload(img.url, img.id); }}
                title="Download"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
              <button 
                className="action-btn delete" 
                onClick={(e) => { e.stopPropagation(); handleDeleteImage(img.id); }}
                title="Delete"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3,6 5,6 21,6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="gallery-page">
      <Navigation />
      {selectionMode ? (
        <MobileHeader 
          title="Select" 
          showLogo={false}
          leftAction={
            <button className="mobile-header-btn" onClick={toggleSelectionMode}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          }
          rightAction={
            <div className="flex" style={{ gap: '8px' }}>
              <button className="mobile-header-btn" onClick={selectAll} title={selectedImages.size === images.length ? "Deselect All" : "Select All"}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9,11 12,14 22,4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
              </button>
              <button className="mobile-header-btn danger" onClick={deleteSelected} disabled={selectedImages.size === 0} title="Delete Selected">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="3,6 5,6 21,6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            </div>
          } 
        />
      ) : (
        <MobileHeader title="Gallery" showLogo rightAction={
          <div className="flex" style={{ gap: '8px' }}>
            <button className="mobile-header-btn" onClick={toggleSelectionMode} title="Manage">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <ThemeToggle />
          </div>
        } />
      )}

      <div className="gallery-content">
        {images.length === 0 ? (
          <div className="empty-gallery">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <p className="empty-text">No images yet</p>
            <p className="empty-subtext">Create your first AI-generated image</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img) => <GalleryItem key={img.id} img={img} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;