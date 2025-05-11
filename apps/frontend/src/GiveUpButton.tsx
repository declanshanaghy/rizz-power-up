import React from 'react';
import {
  buttonContainerStyle,
  buttonElementStyle,
  contentContainerStyle,
  textSpanStyle,
  getHoverStyle
} from './ButtonStyles';

interface GiveUpButtonProps {
  onClick: () => void;
  visible: boolean;
  disabled?: boolean;
}

/**
 * GiveUpButton component with red/orange gradient styling
 * Only visible when the player's score is less than the high score
 */
const GiveUpButton: React.FC<GiveUpButtonProps> = ({
  onClick,
  visible,
  disabled = false
}) => {
  // Don't render anything if not visible
  if (!visible) {
    return null;
  }
  
  // Determine if button should be disabled based on props or internal logic
  const isDisabled = disabled;

  // Function to handle hover effect
  const handleHover = (e: React.MouseEvent<HTMLButtonElement>, isHovering: boolean) => {
    if (!isDisabled) {
      const hoverStyle = getHoverStyle(isHovering, 'rgba(255, 87, 51, 0.9)');
      e.currentTarget.style.transform = hoverStyle.transform;
      e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
    }
  };

  return (
    <div className="flex justify-center w-full h-full" style={buttonContainerStyle}>
      <button
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        style={{
          ...buttonElementStyle,
          background: `linear-gradient(90deg, #FF5733, #FFC300)`, // Red to orange gradient
          color: '#FFFFFF', // Pure white for better contrast
          boxShadow: `0 0 clamp(10px, 2vmin, 20px) ${isDisabled ? 'rgba(255, 87, 51, 0.1)' : 'rgba(255, 87, 51, 0.7)'}`,
          opacity: isDisabled ? 0.15 : 1,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          textShadow: '0 0 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.9)', // Darker text shadow for better contrast
          fontWeight: '800', // Extra bold text
          letterSpacing: '1px', // Slightly increased letter spacing
        }}
        onMouseOver={(e) => handleHover(e, true)}
        onMouseOut={(e) => handleHover(e, false)}
        aria-label="Give Up Button"
      >
        <div style={contentContainerStyle}>
          <span style={{
            ...textSpanStyle,
            flexDirection: 'column', // Stack elements vertically
            gap: 'clamp(0.2rem, 0.8vmin, 0.3rem)' // Thinner gap for vertical layout
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(0.8rem, 2vmin, 1.2rem)'
            }}>
              <span style={{ fontSize: '1.5em' }}>💀</span>
              <span style={{ fontSize: '1.5em' }}>😱</span>
            </div>
            <div style={{
              background: 'linear-gradient(to right, #FF0000, #FF8800, #FF0000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'textPulse 1.5s ease-in-out infinite alternate',
              fontWeight: '900',
              fontSize: '1.2em',
              letterSpacing: '2px',
              textShadow: '0 0 5px rgba(255,0,0,0.8), 0 0 10px rgba(255,0,0,0.5)',
              filter: 'drop-shadow(0 0 8px rgba(255,136,0,0.8))',
              padding: '0 10px',
              borderRadius: '4px',
              transform: 'perspective(500px) rotateX(-10deg)',
              textTransform: 'uppercase',
            }}>GIVE UP</div>
          </span>
        </div>
      </button>
    </div>
  );
};

export default GiveUpButton;