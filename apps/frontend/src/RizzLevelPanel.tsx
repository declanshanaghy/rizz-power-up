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
      marginTop: 'clamp(0.25rem, 1.5vmin, 0.5rem)',
      flex: '0 0 auto' // Prevent flex growth/shrink
    }}>
      <h2 style={{
        fontSize: 'clamp(1.1rem, 3.5vmin, 1.2rem)',
        color: 'var(--color-accent-1, #F15BB5)',
        textAlign: 'center',
        marginBottom: 'clamp(0.15rem, 0.75vmin, 0.25rem)',
        textShadow: '0 0 8px var(--color-accent-1, #F15BB5)'
      }}>RIZZ LEVEL</h2>
      
      <div className="flex justify-center items-center" style={{
        gap: 'clamp(0.5rem, 3vmin, 1rem)'
      }}>
        <span style={{
          color: rizzLevel >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
          fontSize: 'clamp(1.5rem, 6vmin, 2rem)',
          fontWeight: 'bold',
          textShadow: rizzLevel >= 0 ?
            '0 0 clamp(5px, 2vmin, 10px) var(--color-accent-3, #00F5D4)' :
            '0 0 clamp(5px, 2vmin, 10px) var(--color-accent-1, #F15BB5)'
        }}>{rizzLevel}</span>
        <span style={{
          fontSize: 'clamp(1.5rem, 6vmin, 2rem)'
        }}>{getEmojiForScore("Rizz Level", rizzLevel)}</span>
      </div>
    </div>
  )
}

export default RizzLevelPanel