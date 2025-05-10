import React from 'react';

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
    e.currentTarget.style.transform = isHovering ? 'scale(1.05)' : 'scale(1)';
    e.currentTarget.style.boxShadow = isHovering
      ? '0 0 clamp(15px, 3vmin, 25px) rgba(241, 91, 181, 0.9)'
      : '0 0 clamp(10px, 2vmin, 20px) rgba(241, 91, 181, 0.7)';
  };

  return (
    <div className="flex justify-center w-full h-full" style={{
      margin: 0
    }}>
      <button
        onClick={onClick}
        style={{
          width: '100%', // Full width of parent
          padding: 'clamp(0.5rem, 2vmin, 1rem) clamp(1rem, 4vmin, 2rem)', // Match RizzButton padding
          background: `linear-gradient(90deg, var(--color-accent-1, #F15BB5), var(--color-accent-4, #9B5DE5))`,
          color: 'white',
          border: 'none',
          borderRadius: 'var(--border-radius-md, 0.75rem)',
          fontWeight: 'bold',
          fontSize: 'clamp(1rem, 3vmin, 1.3rem)',
          cursor: 'pointer',
          boxShadow: '0 0 clamp(10px, 2vmin, 20px) rgba(241, 91, 181, 0.7)',
          transition: 'all 0.2s ease',
          transform: 'scale(1)',
          textShadow: '0 0 5px rgba(255, 255, 255, 0.7)'
        }}
        onMouseOver={(e) => handleHover(e, true)}
        onMouseOut={(e) => handleHover(e, false)}
        aria-label="Bank Score Button"
      >
        <span style={{
          position: 'relative',
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.3rem, 1vmin, 0.5rem)'
        }}>
          💰 BANK
        </span>
      </button>
    </div>
  );
};

export default BankScoreButton;