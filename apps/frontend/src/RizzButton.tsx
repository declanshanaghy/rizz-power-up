import { useState, useEffect } from 'react';

interface RizzButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * RizzButton component that uses three separate images for different states:
 * 1. rizz_inactive.png: Disabled state
 * 2. rizz_active.png: Enabled state (no hover)
 * 3. rizz_hover.png: Enabled state (hovering)
 */
const RizzButton: React.FC<RizzButtonProps> = ({ onClick, disabled = false }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Determine which image to show based on the button state
  const getButtonImage = () => {
    if (disabled) {
      return '/buttons/rizz_button_disabled_new.png'; // Disabled state
    } else if (isHovering) {
      return '/buttons/rizz_button_hover_new.png'; // Hover state
    } else {
      return '/buttons/rizz_button_active_new.png'; // Normal state
    }
  };

  // Handle image loading error
  const [imagesLoaded, setImagesLoaded] = useState(true);
  
  useEffect(() => {
    // Check if all button images exist
    const checkImages = async () => {
      try {
        const imagePromises = [
          '/buttons/rizz_button_active_new.png',
          '/buttons/rizz_button_disabled_new.png',
          '/buttons/rizz_button_hover_new.png'
        ].map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });
        
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to load button images:', error);
        setImagesLoaded(false);
      }
    };
    
    checkImages();
  }, []);
  
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`rizz-button ${disabled ? 'disabled' : ''}`}
      style={{
        position: 'relative',
        width: '700px', // Fixed width - no responsive scaling
        height: '240px', // Fixed height - no responsive scaling
        display: 'block',
        border: 'none',
        padding: 0,
        margin: '0 auto', // Center the button horizontally within its parent
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform: isPressed && !disabled ? 'scale(0.95)' : 'none',
        transformOrigin: 'center center', // Ensure scaling happens from the center
        transition: 'transform 0.1s ease', // Smooth transform for press effect only
        // No text content - the image contains all visual elements
        fontSize: 0,
        color: 'transparent',
      }}
      aria-label="Rizz Up Button"
    >
      {/* Background image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `url('${getButtonImage()}') no-repeat center center`,
        backgroundSize: '700px 240px', // Exact size - no scaling
        backgroundPosition: 'center', // Center the image
      }} />
      
      {/* Hidden text for screen readers */}
      {!imagesLoaded && (
        <span style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0 0 5px #FFF'
        }}>
          RIZZ UP
        </span>
      )}
      <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
        RIZZ UP
      </span>
    </button>
  );
};

export default RizzButton;