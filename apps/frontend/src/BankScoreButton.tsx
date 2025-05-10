import React from 'react';
import {
  buttonContainerStyle,
  buttonElementStyle,
  contentContainerStyle,
  textSpanStyle,
  getHoverStyle
} from './ButtonStyles';

interface BankScoreButtonProps {
  onClick: () => void;
  visible: boolean;
  disabled?: boolean;
}

/**
 * BankScoreButton component with pink/purple gradient styling
 */
const BankScoreButton: React.FC<BankScoreButtonProps> = ({
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
      const hoverStyle = getHoverStyle(isHovering, 'rgba(241, 91, 181, 0.9)');
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
          background: `linear-gradient(90deg, var(--color-accent-1, #F15BB5), var(--color-accent-4, #9B5DE5))`,
          color: 'white',
          boxShadow: `0 0 clamp(10px, 2vmin, 20px) ${isDisabled ? 'rgba(241, 91, 181, 0.2)' : 'rgba(241, 91, 181, 0.7)'}`,
          opacity: isDisabled ? 0.3 : 1,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
        onMouseOver={(e) => handleHover(e, true)}
        onMouseOut={(e) => handleHover(e, false)}
        aria-label="Bank Score Button"
      >
        <div style={contentContainerStyle}>
          <span style={textSpanStyle}>
            <span style={{ fontSize: '0.9em' }}>💰</span> BANK <span style={{ fontSize: '0.9em' }}>💰</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default BankScoreButton;