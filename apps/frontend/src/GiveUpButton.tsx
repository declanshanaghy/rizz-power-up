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
          color: 'white',
          boxShadow: `0 0 clamp(10px, 2vmin, 20px) ${isDisabled ? 'rgba(255, 87, 51, 0.1)' : 'rgba(255, 87, 51, 0.7)'}`,
          opacity: isDisabled ? 0.15 : 1,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
        onMouseOver={(e) => handleHover(e, true)}
        onMouseOut={(e) => handleHover(e, false)}
        aria-label="Give Up Button"
      >
        <div style={contentContainerStyle}>
          <span style={textSpanStyle}>
            <span style={{ fontSize: '0.9em' }}>🏳️</span> GIVE UP <span style={{ fontSize: '0.9em' }}>🏳️</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default GiveUpButton;