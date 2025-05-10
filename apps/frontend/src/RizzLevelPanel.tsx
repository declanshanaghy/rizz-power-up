import React from 'react'

interface RizzLevelPanelProps {
  rizzLevel: number;
  getEmojiForScore: (attribute: string, score: number) => string;
}

const RizzLevelPanel: React.FC<RizzLevelPanelProps> = ({ rizzLevel, getEmojiForScore }) => {
  return (
    <div className="flex flex-col items-center w-[98%]" style={{
      padding: 'clamp(0.5rem, 2.5vmin, 1rem)',
      borderRadius: 'var(--border-radius-lg, 1rem)',
      background: 'rgba(46, 8, 84, 0.8)',
      boxShadow: `0 0 clamp(15px, 4vmin, 20px) rgba(241, 91, 181, 0.6),
                 inset 0 0 clamp(20px, 5vmin, 25px) rgba(241, 91, 181, 0.4)`,
      marginTop: 'clamp(1rem, 4vmin, 1.5rem)', // Increased margin to create a gap between panels
      flex: '0 0 auto' // Prevent flex growth/shrink
    }}>
      {/* Title removed as requested */}
      
      <div className="flex justify-center items-center" style={{
        gap: 'clamp(0.5rem, 3vmin, 1rem)'
      }}>
        <span style={{
          color: rizzLevel >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
          fontSize: 'clamp(2rem, 8vmin, 2.5rem)',
          fontWeight: 'bold',
          textShadow: rizzLevel >= 0 ?
            '0 0 clamp(8px, 3vmin, 15px) var(--color-accent-3, #00F5D4)' :
            '0 0 clamp(8px, 3vmin, 15px) var(--color-accent-1, #F15BB5)'
        }}>{rizzLevel}</span>
        <span
          className="emoji-hover"
          style={{
            fontSize: 'clamp(2rem, 8vmin, 2.5rem)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, filter 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.2)';
            e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'none';
          }}
        >{getEmojiForScore("Rizz Level", rizzLevel)}</span>
      </div>
    </div>
  )
}

export default RizzLevelPanel