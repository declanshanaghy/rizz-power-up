import React from 'react';

interface HighScorePanelProps {
  highScore: number;
  showCard: boolean;
}

/**
 * HighScorePanel component displays the user's high score
 * Only visible when a card is not being shown
 */
const HighScorePanel: React.FC<HighScorePanelProps> = ({ highScore, showCard }) => {
  // Don't render if a card is being shown
  if (showCard) {
    return null;
  }

  return (
    <div className="flex justify-center items-center w-[98%]" style={{
      padding: 'clamp(0.3rem, 1.5vmin, 0.5rem)',
      borderRadius: 'var(--border-radius-md, 0.75rem)',
      background: 'rgba(46, 8, 84, 0.5)',
      textAlign: 'center',
      marginTop: 'clamp(0.25rem, 1.5vmin, 0.5rem)',
      display: 'flex',
      gap: 'clamp(0.3rem, 1.5vmin, 0.5rem)',
      flex: '0 0 auto' // Prevent flex growth/shrink
    }}>
      <span style={{
        color: 'var(--color-accent-3, #00F5D4)',
        fontSize: 'clamp(0.8rem, 2.5vmin, 0.9rem)'
      }}>High Score:</span>
      <span style={{
        color: 'var(--color-accent-5, #FEE440)',
        fontSize: 'clamp(0.9rem, 3vmin, 1.1rem)',
        fontWeight: 'bold',
        textShadow: '0 0 5px var(--color-accent-5, #FEE440)'
      }}>{highScore}</span>
    </div>
  );
};

export default HighScorePanel;