import React, { useEffect, useState } from 'react';
import { MemeImage } from './memeImages';
import { reducedAnimations } from './Animations';

interface GiveUpAnimationProps {
  onAnimationComplete: () => void;
}

const GiveUpAnimation: React.FC<GiveUpAnimationProps> = ({ onAnimationComplete }) => {
  const [animationStage, setAnimationStage] = useState(0);
  const [randomBadCard, setRandomBadCard] = useState<MemeImage | null>(null);
  
  // Add keyframe animations for the failure animation
  useEffect(() => {
    // Import the memeImages dynamically to get a random bad card
    import('./memeImages').then(({ getRandomBadImage }) => {
      setRandomBadCard(getRandomBadImage());
    });
    
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      @keyframes sadShake {
        0%, 100% { transform: translateX(0); }
        25%, 75% { transform: translateX(-3px); }
        50% { transform: translateX(3px); }
      }
      
      @keyframes slowDrop {
        0% { transform: translateY(-20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes sadPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); }
      }
      
      @keyframes desaturate {
        0% { filter: saturate(100%); }
        100% { filter: saturate(30%) brightness(0.8); }
      }
      
      @keyframes gloomyGlow {
        0% { box-shadow: 0 0 5px rgba(100, 100, 100, 0.4); }
        50% { box-shadow: 0 0 10px rgba(100, 100, 100, 0.6); }
        100% { box-shadow: 0 0 5px rgba(100, 100, 100, 0.4); }
      }
      
      @keyframes sadRain {
        0% { transform: translateY(-10px); opacity: 0; }
        70% { opacity: 0.5; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
    `;
    document.head.appendChild(styleEl);
    
    // Start the animation sequence - faster in reduced animations mode
    const baseDelay = reducedAnimations ? 0.6 : 1;
    const timer1 = setTimeout(() => setAnimationStage(1), 500 * baseDelay);
    const timer2 = setTimeout(() => setAnimationStage(2), 1500 * baseDelay);
    const timer3 = setTimeout(() => setAnimationStage(3), 2500 * baseDelay);
    const timer4 = setTimeout(() => {
      setAnimationStage(4);
      // Call the onAnimationComplete callback after the animation finishes
      setTimeout(onAnimationComplete, 1500 * baseDelay);
    }, 4000 * baseDelay);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      document.head.removeChild(styleEl);
    };
  }, [onAnimationComplete]);
  
  // Generate raindrops - reduced count in low performance mode
  const raindropCount = reducedAnimations ? 15 : 30;
  const raindrops = Array.from({ length: raindropCount }, (_, i) => {
    const size = Math.random() * 2 + 1;
    const left = `${Math.random() * 100}%`;
    const animationDuration = Math.random() * 2 + 3;
    const animationDelay = Math.random() * 2;
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: '-20px',
          left,
          width: `${size}px`,
          height: `${size * 4}px`,
          backgroundColor: 'rgba(150, 150, 200, 0.4)',
          borderRadius: '50%',
          opacity: 0,
          animation: `sadRain ${animationDuration}s linear ${animationDelay}s infinite`,
          willChange: 'transform, opacity',
        }}
      />
    );
  });
  
  // Generate sad emojis - reduced count in low performance mode
  const emojiCount = reducedAnimations ? 5 : 8;
  const sadEmojis = Array.from({ length: emojiCount }, (_, i) => {
    const emojis = ['😢', '😭', '💔', '😞', '😔', '🥀', '☔', '🌧️'];
    const emoji = emojis[i % emojis.length];
    const size = Math.random() * 15 + 15;
    const left = `${Math.random() * 80 + 10}%`;
    const top = `${Math.random() * 80 + 10}%`;
    const animationDuration = Math.random() * 2 + 2;
    const animationDelay = Math.random() * 1.5;
    const opacity = Math.random() * 0.4 + 0.2;
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          top,
          left,
          fontSize: `${size}px`,
          opacity: animationStage >= 2 ? opacity : 0,
          animation: animationStage >= 2 ? `slowDrop ${animationDuration}s ease-in ${animationDelay}s forwards` : 'none',
          zIndex: 5,
          filter: 'grayscale(50%)',
          willChange: 'transform, opacity',
        }}
      >
        {emoji}
      </div>
    );
  });
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(30, 30, 40, 0.95)',
        zIndex: 9999,
        overflow: 'hidden',
        animation: 'fadeIn 0.5s ease-out forwards',
      }}
    >
      {/* Raindrops - only show in stage 1+ and not in reduced animations mode */}
      {animationStage >= 1 && !reducedAnimations && raindrops}
      
      {/* Sad Emojis */}
      {animationStage >= 2 && sadEmojis}
      
      {/* Card Display */}
      {randomBadCard && (
        <div
          style={{
            width: 'min(90%, 550px)',
            padding: 'clamp(0.5rem, 2vmin, 0.75rem)',
            borderRadius: 'var(--border-radius-lg, 1rem)',
            background: 'rgba(40, 40, 50, 0.95)',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 2vmin, 0.75rem)',
            zIndex: 10,
            animation: animationStage >= 1 ? (reducedAnimations ? 'none' : 'sadShake 0.5s ease-in-out, gloomyGlow 4s infinite') : 'none',
            border: '2px solid #444',
            opacity: animationStage >= 1 ? 1 : 0,
            willChange: 'opacity, transform, box-shadow',
          }}
        >
          <h3
            style={{
              color: '#888',
              fontSize: 'clamp(1.2rem, 4vmin, 1.5rem)',
              textAlign: 'center',
              margin: 0,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              animation: animationStage >= 2 && !reducedAnimations ? 'sadPulse 4s infinite' : 'none',
            }}
          >
            {randomBadCard.name}
          </h3>
          
          <div
            style={{
              width: '512px',
              height: '768px',
              maxWidth: '100%',
              maxHeight: '50vh',
              backgroundImage: `url(${randomBadCard.path})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: 'var(--border-radius-md, 0.75rem)',
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.4)',
              margin: '0 auto',
              animation: animationStage >= 2 ? 'desaturate 1.5s forwards' : 'none',
              willChange: 'filter',
            }}
          />
          
          <p
            style={{
              color: '#aaa',
              fontSize: 'clamp(1rem, 3.5vmin, 1.3rem)',
              textAlign: 'center',
              margin: 'clamp(0.5rem, 2vmin, 0.75rem) 0',
              fontWeight: 'bold',
              fontStyle: 'italic',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              animation: animationStage >= 3 && !reducedAnimations ? 'sadPulse 3s infinite' : 'none',
              letterSpacing: '1px',
            }}
          >
            {randomBadCard.description}
          </p>
          
          <div
            style={{
              fontSize: 'clamp(1.2rem, 4vmin, 1.5rem)',
              fontWeight: 'bold',
              color: '#666',
              textAlign: 'center',
              marginTop: '1rem',
              opacity: animationStage >= 3 ? 1 : 0,
              animation: animationStage >= 3 ? 'slowDrop 1s ease-out' : 'none',
              willChange: 'opacity, transform',
            }}
          >
            GAME OVER
          </div>
        </div>
      )}
      
      {/* Gloomy background */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30%',
          background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default GiveUpAnimation;