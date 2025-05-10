import React, { useEffect } from 'react'
import { statsAnimations, calculateIntensity } from './Animations'

interface StatsPanelProps {
  stats: {
    vibeLevel: number;
    swagger: number;
    cringeAvoidance: number;
  };
  getEmojiForScore: (attribute: string, score: number) => string;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, getEmojiForScore }) => {
  // Calculate animation intensities based on scores
  const vibeIntensity = calculateIntensity(stats.vibeLevel);
  const swaggerIntensity = calculateIntensity(stats.swagger);
  const cringeIntensity = calculateIntensity(stats.cringeAvoidance);

  // Add animations to the document
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = statsAnimations;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="flex flex-col w-[98%]" style={{
      padding: 'clamp(0.75rem, 3vmin, 1.25rem)',
      borderRadius: 'var(--border-radius-lg, 1rem)',
      background: 'rgba(46, 8, 84, 0.7)',
      boxShadow: `0 0 clamp(10px, 3vmin, 15px) rgba(0, 187, 249, 0.5),
                 inset 0 0 clamp(15px, 4vmin, 20px) rgba(0, 187, 249, 0.3)`,
      gap: 'clamp(0.3rem, 1.2vmin, 0.4rem)',
      flex: '0 0 auto', // Prevent flex growth/shrink
      animation: 'floatUpDown 3s ease-in-out infinite'
    }}>
      {/* Title removed as requested */}
      
      {/* 1-row layout with all three stats */}
      <div className="flex justify-between items-center">
        {/* Vibe Level */}
        <div className="flex flex-col items-center" style={{
          flex: 1,
          animation: `floatLeftRight ${4 / vibeIntensity}s ease-in-out infinite`
        }}>
          <span style={{
            color: 'var(--color-accent-3, #00F5D4)',
            fontSize: 'clamp(0.85rem, 2.5vmin, 0.95rem)',
            textAlign: 'center',
            animation: `statLabelBounce ${3 / vibeIntensity}s ease-in-out infinite`
          }}>Vibe</span>
          <span style={{
            color: stats.vibeLevel >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
            fontSize: 'clamp(1.2rem, 4vmin, 1.5rem)',
            fontWeight: 'bold',
            textAlign: 'center',
            animation: `statScoreBounce ${2 / vibeIntensity}s ease-in-out infinite`,
            textShadow: stats.vibeLevel >= 0 ?
              `0 0 ${Math.min(15, 5 + vibeIntensity * 5)}px var(--color-accent-3, #00F5D4)` :
              `0 0 ${Math.min(15, 5 + vibeIntensity * 5)}px var(--color-accent-1, #F15BB5)`
          }}>{stats.vibeLevel}</span>
          <span
            className="emoji-hover"
            style={{
              fontSize: `clamp(${1.5 + vibeIntensity * 0.5}rem, ${5 + vibeIntensity * 2}vmin, ${1.8 + vibeIntensity * 0.7}rem)`,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, filter 0.2s ease',
              animation: `emojiPulse ${3 / vibeIntensity}s ease-in-out infinite`
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.animation = 'emojiWiggle 0.5s ease-in-out infinite';
              e.currentTarget.style.filter = 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.animation = `emojiPulse ${3 / vibeIntensity}s ease-in-out infinite`;
              e.currentTarget.style.filter = 'none';
            }}
          >{getEmojiForScore("Vibe Level", stats.vibeLevel)}</span>
        </div>
        
        {/* Swagger */}
        <div className="flex flex-col items-center" style={{
          flex: 1,
          animation: `floatLeftRight ${4 / swaggerIntensity}s ease-in-out infinite 0.5s`
        }}>
          <span style={{
            color: 'var(--color-accent-3, #00F5D4)',
            fontSize: 'clamp(0.85rem, 2.5vmin, 0.95rem)',
            textAlign: 'center',
            animation: `statLabelBounce ${3 / swaggerIntensity}s ease-in-out infinite 0.2s`
          }}>Swagger</span>
          <span style={{
            color: stats.swagger >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
            fontSize: 'clamp(1.2rem, 4vmin, 1.5rem)',
            fontWeight: 'bold',
            textAlign: 'center',
            animation: `statScoreBounce ${2 / swaggerIntensity}s ease-in-out infinite 0.1s`,
            textShadow: stats.swagger >= 0 ?
              `0 0 ${Math.min(15, 5 + swaggerIntensity * 5)}px var(--color-accent-3, #00F5D4)` :
              `0 0 ${Math.min(15, 5 + swaggerIntensity * 5)}px var(--color-accent-1, #F15BB5)`
          }}>{stats.swagger}</span>
          <span
            className="emoji-hover"
            style={{
              fontSize: `clamp(${1.5 + swaggerIntensity * 0.5}rem, ${5 + swaggerIntensity * 2}vmin, ${1.8 + swaggerIntensity * 0.7}rem)`,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, filter 0.2s ease',
              animation: `emojiPulse ${3 / swaggerIntensity}s ease-in-out infinite 0.3s`
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.animation = 'emojiWiggle 0.5s ease-in-out infinite';
              e.currentTarget.style.filter = 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.animation = `emojiPulse ${3 / swaggerIntensity}s ease-in-out infinite 0.3s`;
              e.currentTarget.style.filter = 'none';
            }}
          >{getEmojiForScore("Swagger", stats.swagger)}</span>
        </div>
        
        {/* Cringe Avoidance */}
        <div className="flex flex-col items-center" style={{
          flex: 1,
          animation: `floatLeftRight ${4 / cringeIntensity}s ease-in-out infinite 1s`
        }}>
          <span style={{
            color: 'var(--color-accent-3, #00F5D4)',
            fontSize: 'clamp(0.85rem, 2.5vmin, 0.95rem)',
            textAlign: 'center',
            animation: `statLabelBounce ${3 / cringeIntensity}s ease-in-out infinite 0.4s`
          }}>Cringe Avoidance</span>
          <span style={{
            color: stats.cringeAvoidance >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
            fontSize: 'clamp(1.2rem, 4vmin, 1.5rem)',
            fontWeight: 'bold',
            textAlign: 'center',
            animation: `statScoreBounce ${2 / cringeIntensity}s ease-in-out infinite 0.2s`,
            textShadow: stats.cringeAvoidance >= 0 ?
              `0 0 ${Math.min(15, 5 + cringeIntensity * 5)}px var(--color-accent-3, #00F5D4)` :
              `0 0 ${Math.min(15, 5 + cringeIntensity * 5)}px var(--color-accent-1, #F15BB5)`
          }}>{stats.cringeAvoidance}</span>
          <span
            className="emoji-hover"
            style={{
              fontSize: `clamp(${1.5 + cringeIntensity * 0.5}rem, ${5 + cringeIntensity * 2}vmin, ${1.8 + cringeIntensity * 0.7}rem)`,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, filter 0.2s ease',
              animation: `emojiPulse ${3 / cringeIntensity}s ease-in-out infinite 0.6s`
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.animation = 'emojiWiggle 0.5s ease-in-out infinite';
              e.currentTarget.style.filter = 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.animation = `emojiPulse ${3 / cringeIntensity}s ease-in-out infinite 0.6s`;
              e.currentTarget.style.filter = 'none';
            }}
          >{getEmojiForScore("Cringe Avoidance", stats.cringeAvoidance)}</span>
        </div>
      </div>
    </div>
  )
}

export default StatsPanel