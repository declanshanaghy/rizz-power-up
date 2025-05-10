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
}

/**
 * BankScoreButton component with pink/purple gradient styling
 * Only visible after the user has clicked the Rizz Up button
 */
const BankScoreButton: React.FC<BankScoreButtonProps> = ({ onClick, visible }) => {
  // Don't render anything if not visible
  if (!visible) {
    return null;
  }

  // Function to handle hover effect
  const handleHover = (e: React.MouseEvent<HTMLButtonElement>, isHovering: boolean) => {
    const hoverStyle = getHoverStyle(isHovering, 'rgba(241, 91, 181, 0.9)');
    e.currentTarget.style.transform = hoverStyle.transform;
    e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
  };

  return (
    <div className="flex justify-center w-full h-full" style={buttonContainerStyle}>
      <button
        onClick={onClick}
        style={{
          ...buttonElementStyle,
          background: `linear-gradient(90deg, var(--color-accent-1, #F15BB5), var(--color-accent-4, #9B5DE5))`,
          color: 'white',
          boxShadow: '0 0 clamp(10px, 2vmin, 20px) rgba(241, 91, 181, 0.7)',
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