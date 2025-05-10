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
          color: 'var(--color-text-primary, white)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: `0 0 clamp(10px, 2vmin, 20px) ${disabled ? 'rgba(0, 187, 249, 0.4)' : 'rgba(0, 187, 249, 0.7)'}`,
          opacity: disabled ? 0.7 : 1,
        }}
        onMouseOver={(e) => handleHover(e, true)}
        onMouseOut={(e) => handleHover(e, false)}
        aria-label="Rizz Up Button"
        className="rizz-button-component"
      >
        <div style={contentContainerStyle}>
          <span style={textSpanStyle}>
            <span style={{ fontSize: '0.9em' }}>✨</span> RIZZ UP <span style={{ fontSize: '0.9em' }}>✨</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default RizzButton;