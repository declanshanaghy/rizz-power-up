import React from 'react';

interface RizzButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * RizzButton component with blue neon styling
 */
const RizzButton: React.FC<RizzButtonProps> = ({ onClick, disabled = false }) => {
  // CSS custom properties from index.css
  const buttonStyles = {
    width: '100%',
    padding: 'clamp(0.5rem, 2vmin, 1rem) clamp(1rem, 4vmin, 2rem)',
    background: 'linear-gradient(90deg, var(--color-accent-2, #00BBF9), var(--color-accent-3, #00F5D4))',
    color: 'var(--color-text-primary, white)',
    border: 'none',
    borderRadius: 'var(--border-radius-md, 0.75rem)',
    fontWeight: 'bold',
    fontSize: 'clamp(1rem, 3vmin, 1.3rem)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: `0 0 clamp(10px, 2vmin, 20px) ${disabled ? 'rgba(0, 187, 249, 0.4)' : 'rgba(0, 187, 249, 0.7)'}`,
    transition: 'all 0.2s ease',
    transform: 'scale(1)' as const,
    textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
    opacity: disabled ? 0.7 : 1,
    position: 'relative' as const,
    overflow: 'hidden' as const
  };

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
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={buttonStyles}
      onMouseOver={(e) => handleHover(e, true)}
      onMouseOut={(e) => handleHover(e, false)}
      aria-label="Rizz Up Button"
      className="rizz-button-component"
    >
      <span style={{
        position: 'relative',
        zIndex: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(0.3rem, 1vmin, 0.5rem)'
      }}>
        ✨ RIZZ UP ✨
      </span>
    </button>
  );
};

export default RizzButton;