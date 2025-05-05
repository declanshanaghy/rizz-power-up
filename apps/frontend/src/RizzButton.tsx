import { useState, useEffect } from 'react';

interface RizzButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * RizzButton component that uses the rizz.png image for different states
 * The image is expected to have three states stacked vertically:
 * 1. Top third: Disabled state
 * 2. Middle third: Enabled state (no hover)
 * 3. Bottom third: Enabled state (hovering)
 */
const RizzButton: React.FC<RizzButtonProps> = ({ onClick, disabled = false }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Determine which part of the image to show based on the button state
  const getBackgroundPosition = () => {
    if (disabled) {
      return '0 0'; // Top third - disabled state
    } else if (isHovering) {
      return '0 100%'; // Bottom third - hover state
    } else {
      return '0 50%'; // Middle third - normal state
    }
  };

  // Handle image loading error
  const [imageLoaded, setImageLoaded] = useState(true);
  
  useEffect(() => {
    // Check if the button image exists
    const img = new Image();
    img.src = '/buttons/rizz.png';
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
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
        width: '300px', // Increased from 200px for better proportions
        height: '120px', // Increased from 80px for better proportions
        background: `url('/buttons/rizz.png') no-repeat`,
        backgroundPosition: getBackgroundPosition(),
        backgroundSize: '100% 300%', // 100% width, 300% height to accommodate 3 states
        border: 'none',
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform: isPressed && !disabled ? 'scale(0.95)' : 'scale(1)',
        // No text content - the image contains all visual elements
        fontSize: 0,
        color: 'transparent',
        // Removed the clipPath to show the full button design
        margin: '10px',
      }}
      aria-label="Rizz Up Button"
    >
      {/* Hidden text for screen readers */}
      {!imageLoaded && (
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