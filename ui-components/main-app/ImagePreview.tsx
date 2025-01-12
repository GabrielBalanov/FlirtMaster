import React from 'react';
import './styles/ImagePreview.css';

interface ImagePreviewProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="image-preview-container">
      <img src={imageUrl} alt="Chat Screenshot" className="preview-image" />
      <button className="close-preview-button" onClick={onClose} aria-label="Remove image">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}