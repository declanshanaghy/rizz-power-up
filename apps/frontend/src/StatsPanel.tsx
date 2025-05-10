import React from 'react'

interface StatsPanelProps {
  stats: {
    vibeLevel: number;
    swagger: number;
    cringeAvoidance: number;
  };
  getEmojiForScore: (attribute: string, score: number) => string;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, getEmojiForScore }) => {
  return (
    <div className="flex flex-col w-[98%]" style={{
      padding: 'clamp(0.75rem, 3vmin, 1.25rem)',
      borderRadius: 'var(--border-radius-lg, 1rem)',
      background: 'rgba(46, 8, 84, 0.7)',
      boxShadow: `0 0 clamp(10px, 3vmin, 15px) rgba(0, 187, 249, 0.5),
                 inset 0 0 clamp(15px, 4vmin, 20px) rgba(0, 187, 249, 0.3)`,
      gap: 'clamp(0.3rem, 1.2vmin, 0.4rem)',
      flex: '0 0 auto' // Prevent flex growth/shrink
    }}>
      {/* Title removed as requested */}
      
      {/* 1-row layout with all three stats */}
      <div className="flex justify-between items-center">
        {/* Vibe Level */}
        <div className="flex flex-col items-center" style={{ flex: 1 }}>
          <span style={{
            color: 'var(--color-accent-3, #00F5D4)',
            fontSize: 'clamp(0.85rem, 2.5vmin, 0.95rem)',
            textAlign: 'center'
          }}>Vibe</span>
          <span style={{
            color: stats.vibeLevel >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
            fontSize: 'clamp(1.2rem, 4vmin, 1.5rem)',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>{stats.vibeLevel}</span>
          <span
            className="emoji-hover"
            style={{
              fontSize: 'clamp(1.5rem, 5vmin, 1.8rem)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, filter 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'none';
            }}
          >{getEmojiForScore("Vibe Level", stats.vibeLevel)}</span>
        </div>
        
        {/* Swagger */}
        <div className="flex flex-col items-center" style={{ flex: 1 }}>
          <span style={{
            color: 'var(--color-accent-3, #00F5D4)',
            fontSize: 'clamp(0.85rem, 2.5vmin, 0.95rem)',
            textAlign: 'center'
          }}>Swagger</span>
          <span style={{
            color: stats.swagger >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
            fontSize: 'clamp(1.2rem, 4vmin, 1.5rem)',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>{stats.swagger}</span>
          <span
            className="emoji-hover"
            style={{
              fontSize: 'clamp(1.5rem, 5vmin, 1.8rem)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, filter 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'none';
            }}
          >{getEmojiForScore("Swagger", stats.swagger)}</span>
        </div>
        
        {/* Cringe Avoidance */}
        <div className="flex flex-col items-center" style={{ flex: 1 }}>
          <span style={{
            color: 'var(--color-accent-3, #00F5D4)',
            fontSize: 'clamp(0.85rem, 2.5vmin, 0.95rem)',
            textAlign: 'center'
          }}>Cringe Avoidance</span>
          <span style={{
            color: stats.cringeAvoidance >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
            fontSize: 'clamp(1.2rem, 4vmin, 1.5rem)',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>{stats.cringeAvoidance}</span>
          <span
            className="emoji-hover"
            style={{
              fontSize: 'clamp(1.5rem, 5vmin, 1.8rem)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, filter 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
              e.currentTarget.style.filter = 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'none';
            }}
          >{getEmojiForScore("Cringe Avoidance", stats.cringeAvoidance)}</span>
        </div>
      </div>
    </div>
  )
}

export default StatsPanel