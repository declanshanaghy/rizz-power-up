import React from 'react';
import {
  buttonContainerStyle,
  buttonElementStyle,
  contentContainerStyle,
  textSpanStyle,
  getHoverStyle
} from './ButtonStyles';

interface RizzButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * RizzButton component with blue neon styling
 */
const RizzButton: React.FC<RizzButtonProps> = ({ onClick, disabled = false }) => {
  // Function to handle hover effect
  const handleHover = (e: React.MouseEvent<HTMLButtonElement>, isHovering: boolean) => {
    if (!disabled) {
      const hoverStyle = getHoverStyle(isHovering, 'rgba(0, 187, 249, 0.9)');
      e.currentTarget.style.transform = hoverStyle.transform;
      e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
    }
  };

  return (
    <div className="flex justify-center w-full h-full" style={buttonContainerStyle}>
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        style={{
          ...buttonElementStyle,
          background: 'linear-gradient(90deg, var(--color-accent-2, #00BBF9), var(--color-accent-3, #00F5D4))',
          color: '#FFFFFF', // Pure white for better contrast
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: `0 0 clamp(10px, 2vmin, 20px) ${disabled ? 'rgba(0, 187, 249, 0.1)' : 'rgba(0, 187, 249, 0.7)'}`,
          opacity: disabled ? 0.15 : 1,
          textShadow: '0 0 8px rgba(0, 0, 0, 0.7), 0 0 3px rgba(0, 0, 0, 0.9)', // Darker text shadow for better contrast
          fontWeight: '800', // Extra bold text
          letterSpacing: '1px', // Slightly increased letter spacing
        }}
        onMouseOver={(e) => handleHover(e, true)}
        onMouseOut={(e) => handleHover(e, false)}
        aria-label="Rizz Up Button"
        className="rizz-button-component"
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
              <span style={{ fontSize: '1.5em' }}>🌟</span>
              <span style={{ fontSize: '1.5em' }}>🌈</span>
            </div>
            <div style={{
              background: 'linear-gradient(to right, #FF00FF, #00FFFF, #FFFF00, #00FFFF, #FF00FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'textShimmer 2s linear infinite',
              fontWeight: '900',
              fontSize: '1.2em',
              letterSpacing: '2px',
              textShadow: '0 0 5px rgba(255,255,255,0.8), 0 0 10px rgba(255,255,255,0.5)',
              filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.8))',
              padding: '0 10px',
              borderRadius: '4px',
              transform: 'perspective(500px) rotateX(10deg)',
            }}>RIZZ UP</div>
          </span>
        </div>
      </button>
    </div>
  );
};

export default RizzButton;