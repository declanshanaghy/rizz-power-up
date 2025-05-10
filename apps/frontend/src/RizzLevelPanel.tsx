import React, { useEffect } from 'react'
import { calculateIntensity } from './Animations'

interface RizzLevelPanelProps {
  rizzLevel: number;
  getEmojiForScore: (attribute: string, score: number) => string;
}

const RizzLevelPanel: React.FC<RizzLevelPanelProps> = ({ rizzLevel, getEmojiForScore }) => {
  // Calculate animation intensity based on Rizz level
  const rizzIntensity = calculateIntensity(rizzLevel);
  
  // Add keyframe animations for Rizz level
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes rizzPanelPulse {
        0%, 100% {
          transform: scale(1);
          box-shadow: 0 0 clamp(15px, 4vmin, 20px) rgba(241, 91, 181, 0.6),
                     inset 0 0 clamp(20px, 5vmin, 25px) rgba(241, 91, 181, 0.4);
        }
        50% {
          transform: scale(1.03);
          box-shadow: 0 0 clamp(20px, 5vmin, 25px) rgba(241, 91, 181, 0.8),
                     0 0 clamp(30px, 8vmin, 40px) rgba(0, 245, 212, 0.4),
                     inset 0 0 clamp(25px, 6vmin, 30px) rgba(241, 91, 181, 0.6);
        }
      }
      
      @keyframes rizzNumberPulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
      }
      
      @keyframes rizzEmojiSpin {
        0% {
          transform: rotate(0deg) scale(1);
        }
        50% {
          transform: rotate(180deg) scale(1.5);
        }
        100% {
          transform: rotate(360deg) scale(1);
        }
      }
      
      @keyframes rizzEmojiJump {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-30px);
        }
        60% {
          transform: translateY(-15px);
        }
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-[98%]" style={{
      padding: 'clamp(0.5rem, 2.5vmin, 1rem)',
      borderRadius: 'var(--border-radius-lg, 1rem)',
      background: 'rgba(46, 8, 84, 0.8)',
      boxShadow: `0 0 clamp(15px, 4vmin, 20px) rgba(241, 91, 181, 0.6),
                 inset 0 0 clamp(20px, 5vmin, 25px) rgba(241, 91, 181, 0.4)`,
      marginTop: 'clamp(1rem, 4vmin, 1.5rem)', // Increased margin to create a gap between panels
      flex: '0 0 auto', // Prevent flex growth/shrink
      animation: `rizzPanelPulse ${4 / rizzIntensity}s ease-in-out infinite`
    }}>
      {/* Title removed as requested */}
      
      <div className="flex justify-center items-center" style={{
        gap: 'clamp(0.5rem, 3vmin, 1rem)'
      }}>
        <span style={{
          color: rizzLevel >= 0 ? 'var(--color-accent-3, #00F5D4)' : 'var(--color-accent-1, #F15BB5)',
          fontSize: `clamp(${2 + rizzIntensity * 0.5}rem, ${8 + rizzIntensity * 2}vmin, ${2.5 + rizzIntensity * 0.7}rem)`,
          fontWeight: 'bold',
          textShadow: rizzLevel >= 0 ?
            `0 0 clamp(${8 + rizzIntensity * 5}px, ${3 + rizzIntensity}vmin, ${15 + rizzIntensity * 10}px) var(--color-accent-3, #00F5D4)` :
            `0 0 clamp(${8 + rizzIntensity * 5}px, ${3 + rizzIntensity}vmin, ${15 + rizzIntensity * 10}px) var(--color-accent-1, #F15BB5)`,
          animation: `rizzNumberPulse ${3 / rizzIntensity}s ease-in-out infinite`
        }}>{rizzLevel}</span>
        <span
          className="emoji-hover"
          style={{
            fontSize: `clamp(${2 + rizzIntensity * 0.7}rem, ${8 + rizzIntensity * 3}vmin, ${2.5 + rizzIntensity * 1}rem)`,
            cursor: 'pointer',
            transition: 'transform 0.2s ease, filter 0.2s ease',
            animation: `rizzEmojiJump ${4 / rizzIntensity}s ease-in-out infinite`
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.animation = 'rizzEmojiSpin 1s ease-in-out infinite';
            e.currentTarget.style.filter = 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.animation = `rizzEmojiJump ${4 / rizzIntensity}s ease-in-out infinite`;
            e.currentTarget.style.filter = 'none';
          }}
        >{getEmojiForScore("Rizz Level", rizzLevel)}</span>
      </div>
    </div>
  )
}

export default RizzLevelPanel