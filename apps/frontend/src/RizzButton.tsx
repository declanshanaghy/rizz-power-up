import React from 'react';

interface RizzButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * RizzButton component with blue neon styling
 */
const RizzButton: React.FC<RizzButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '0.75rem 0',
        background: 'linear-gradient(90deg, #00BBF9, #00F5D4)', // Blue neon gradient
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '1.2rem', // Slightly larger than Bank Score button
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: '0 0 15px rgba(0, 187, 249, 0.7)', // Blue glow
        transition: 'all 0.2s ease',
        transform: 'scale(1)',
        textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
        opacity: disabled ? 0.7 : 1
      }}
      onMouseOver={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 187, 249, 0.9)';
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 187, 249, 0.7)';
        }
      }}
      aria-label="Rizz Up Button"
    >
      ✨ RIZZ UP ✨
    </button>
  );
};

export default RizzButton;