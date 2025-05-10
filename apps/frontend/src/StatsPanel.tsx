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
      <h2 style={{
        fontSize: 'clamp(1rem, 3vmin, 1.1rem)',
        color: 'var(--color-accent-3, #00F5D4)',
        textAlign: 'center',
        marginBottom: 'clamp(0.15rem, 0.75vmin, 0.25rem)',
        textShadow: '0 0 5px var(--color-accent-3, #00F5D4)'
      }}>STATS PANEL</h2>
      
      {/* 1-row layout with all three stats */}
      <div className="flex justify-between items-center">
        {/* Vibe Level */}
        <div className="flex flex-col items-center" style={{ flex: 1 }}>
          <span style={{
            color: 'var(--color-accent-3, #00F5D4)',
            fontSize: 'clamp(0.85rem, 2.5vmin, 0.95rem)',
            textAlign: 'center'
          }}>Vibe Level</span>
          <span style={{
            color: stats.vibeLevel >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
            fontSize: 'clamp(0.95rem, 3vmin, 1.1rem)',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>{stats.vibeLevel}</span>
          <span style={{
            fontSize: 'clamp(1rem, 3.5vmin, 1.2rem)',
            textAlign: 'center'
          }}>{getEmojiForScore("Vibe Level", stats.vibeLevel)}</span>
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
            fontSize: 'clamp(0.95rem, 3vmin, 1.1rem)',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>{stats.swagger}</span>
          <span style={{
            fontSize: 'clamp(1rem, 3.5vmin, 1.2rem)',
            textAlign: 'center'
          }}>{getEmojiForScore("Swagger", stats.swagger)}</span>
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
            fontSize: 'clamp(0.95rem, 3vmin, 1.1rem)',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>{stats.cringeAvoidance}</span>
          <span style={{
            fontSize: 'clamp(1rem, 3.5vmin, 1.2rem)',
            textAlign: 'center'
          }}>{getEmojiForScore("Cringe Avoidance", stats.cringeAvoidance)}</span>
        </div>
      </div>
    </div>
  )
}

export default StatsPanel