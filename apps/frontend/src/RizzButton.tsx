import React from 'react';

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
      e.currentTarget.style.transform = isHovering ? 'scale(1.05)' : 'scale(1)';
      e.currentTarget.style.boxShadow = isHovering
        ? '0 0 clamp(15px, 3vmin, 25px) rgba(0, 187, 249, 0.9)'
        : '0 0 clamp(10px, 2vmin, 20px) rgba(0, 187, 249, 0.7)';
    }
  };

  return (
    <div className="flex justify-center w-full h-full" style={{
      margin: 0,
      aspectRatio: '1.61803398875/1', // Golden ratio
      minWidth: 'min(580px, 100%)', // Responsive minimum width
      minHeight: 'min(358px, 20vh)', // Height based on golden ratio (580/1.618)
      maxWidth: '100%', // Ensure it doesn't overflow its container
      boxSizing: 'border-box', // Include padding in width/height calculations
      padding: 'clamp(0.5rem, 2vmin, 1rem)' // Padding for visual appeal
    }}>
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        style={{
          width: '100%', // Full width of parent
          height: '100%', // Full height of parent
          padding: 'clamp(0.5rem, 2vmin, 1rem) clamp(1rem, 4vmin, 2rem)',
          background: 'linear-gradient(90deg, var(--color-accent-2, #00BBF9), var(--color-accent-3, #00F5D4))',
          color: 'var(--color-text-primary, white)',
          border: 'none',
          borderRadius: 'var(--border-radius-md, 0.75rem)',
          fontWeight: 'bold',
          fontSize: 'clamp(1.5rem, 5vmin, 2.5rem)', // Adjusted font size
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: `0 0 clamp(10px, 2vmin, 20px) ${disabled ? 'rgba(0, 187, 249, 0.4)' : 'rgba(0, 187, 249, 0.7)'}`,
          transition: 'all 0.2s ease',
          transform: 'scale(1)',
          textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
          opacity: disabled ? 0.7 : 1,
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => handleHover(e, true)}
        onMouseOut={(e) => handleHover(e, false)}
        aria-label="Rizz Up Button"
        className="rizz-button-component"
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          padding: '10px' // Add padding to ensure content doesn't touch edges
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.3rem, 1vmin, 0.5rem)',
            textAlign: 'center',
            maxWidth: '100%', // Ensure text doesn't overflow
            overflow: 'hidden', // Hide any overflow
            whiteSpace: 'nowrap' // Keep text on one line
          }}>
            <span style={{ fontSize: '0.9em' }}>✨</span> RIZZ UP <span style={{ fontSize: '0.9em' }}>✨</span>
          </span>
        </div>
      </button>
    </div>
  );
};

export default RizzButton;