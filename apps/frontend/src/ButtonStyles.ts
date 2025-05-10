// ButtonStyles.ts - Shared button styling for consistent sizing across all game buttons

// Container style for all buttons
export const buttonContainerStyle = {
  margin: 0,
  aspectRatio: '1.61803398875/1', // Golden ratio
  minWidth: 'min(580px, 100%)', // Responsive minimum width
  minHeight: 'min(358px, 20vh)', // Height based on golden ratio (580/1.618)
  maxWidth: '100%', // Ensure it doesn't overflow its container
  boxSizing: 'border-box' as const, // Include padding in width/height calculations
  padding: 'clamp(0.5rem, 2vmin, 1rem)' // Padding for visual appeal
};

// Button element style for all buttons
export const buttonElementStyle = {
  width: '100%', // Full width of parent
  height: '100%', // Full height of parent
  padding: 'clamp(0.5rem, 2vmin, 1rem) clamp(1rem, 4vmin, 2rem)',
  border: 'none',
  borderRadius: 'var(--border-radius-md, 0.75rem)',
  fontWeight: 'bold' as const,
  fontSize: 'clamp(1.5rem, 5vmin, 2.5rem)', // Adjusted font size
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  transform: 'scale(1)',
  textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
  position: 'relative' as const,
  overflow: 'hidden'
};

// Content container style for button text
export const contentContainerStyle = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  padding: '10px' // Add padding to ensure content doesn't touch edges
};

// Text span style for button text
export const textSpanStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'clamp(0.3rem, 1vmin, 0.5rem)',
  textAlign: 'center' as const,
  maxWidth: '100%', // Ensure text doesn't overflow
  overflow: 'hidden' as const, // Hide any overflow
  whiteSpace: 'nowrap' as const // Keep text on one line
};

// Get hover style for a button based on its color
export const getHoverStyle = (isHovering: boolean, color: string) => ({
  transform: isHovering ? 'scale(1.05)' : 'scale(1)',
  boxShadow: isHovering
    ? `0 0 clamp(15px, 3vmin, 25px) ${color}`
    : `0 0 clamp(10px, 2vmin, 20px) ${color}`
});