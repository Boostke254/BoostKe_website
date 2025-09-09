import React, { useState } from 'react';
import { 
  Share as ShareIcon, 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  LinkedIn as LinkedInIcon,
  Link as LinkIcon,
  WhatsApp as WhatsAppIcon 
} from '@mui/icons-material';

const ShareButton = ({ title, url, excerpt }) => {
  const [showOptions, setShowOptions] = useState(false);

  const shareData = {
    title: title,
    text: excerpt,
    url: url || window.location.href,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
        setShowOptions(true);
      }
    } else {
      setShowOptions(true);
    }
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareData.title + ' ' + shareData.url)}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareData.url);
    alert('Link copied to clipboard!');
    setShowOptions(false);
  };

  return (
    <div className="share-component">
      <button 
        className="action-btn share-btn"
        onClick={handleNativeShare}
      >
        <ShareIcon />
        Share
      </button>
      
      {showOptions && (
        <div className="share-options">
          <div className="share-overlay" onClick={() => setShowOptions(false)}></div>
          <div className="share-panel">
            <h4>Share this article</h4>
            <div className="share-buttons">
              <a 
                href={shareUrls.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="share-option facebook"
              >
                <FacebookIcon />
                Facebook
              </a>
              <a 
                href={shareUrls.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="share-option twitter"
              >
                <TwitterIcon />
                Twitter
              </a>
              <a 
                href={shareUrls.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="share-option linkedin"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <a 
                href={shareUrls.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="share-option whatsapp"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
              <button 
                onClick={copyToClipboard}
                className="share-option copy"
              >
                <LinkIcon />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
