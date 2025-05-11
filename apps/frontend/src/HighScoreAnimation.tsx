import React, { useEffect, useState } from 'react';
import { reducedAnimations } from './Animations';

interface HighScoreAnimationProps {
  score: number;
  onAnimationComplete: () => void;
}

const HighScoreAnimation: React.FC<HighScoreAnimationProps> = ({ score, onAnimationComplete }) => {
  const [animationStage, setAnimationStage] = useState(0);
  
  // Add keyframe animations for the high score celebration
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes explode {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      
      @keyframes spin {
        0% {
          transform: rotate(0deg) scale(1);
        }
        100% {
          transform: rotate(360deg) scale(1.2);
        }
      }
      
      @keyframes jazzHands {
        0% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-10px) rotate(10deg);
        }
        100% {
          transform: translateY(0) rotate(0deg);
        }
      }
      
      @keyframes shimmer {
        0% {
          text-shadow: 0 0 5px #F15BB5, 0 0 10px #F15BB5;
          color: #F15BB5;
        }
        33% {
          text-shadow: 0 0 5px #00BBF9, 0 0 10px #00BBF9;
          color: #00BBF9;
        }
        66% {
          text-shadow: 0 0 5px #00F5D4, 0 0 10px #00F5D4;
          color: #00F5D4;
        }
        100% {
          text-shadow: 0 0 5px #F15BB5, 0 0 10px #F15BB5;
          color: #F15BB5;
        }
      }
      
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0);
        }
        50% {
          transform: translateY(-8px) translateX(5px);
        }
        100% {
          transform: translateY(0) translateX(0);
        }
      }
      
      @keyframes glitch {
        0% {
          transform: translate(0);
        }
        33% {
          transform: translate(-3px, 3px);
        }
        66% {
          transform: translate(3px, -3px);
        }
        100% {
          transform: translate(0);
        }
      }
      
      @keyframes confetti {
        0% {
          transform: translateY(-10vh) translateX(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) translateX(var(--confetti-x)) rotate(var(--confetti-rotate));
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleEl);
    
    // Start the animation sequence - faster in reduced animations mode
    const baseDelay = reducedAnimations ? 0.7 : 1;
    const timer1 = setTimeout(() => setAnimationStage(1), 500 * baseDelay);
    const timer2 = setTimeout(() => setAnimationStage(2), 1500 * baseDelay);
    const timer3 = setTimeout(() => setAnimationStage(3), 2500 * baseDelay);
    const timer4 = setTimeout(() => {
      setAnimationStage(4);
      // Call the onAnimationComplete callback after the animation finishes
      setTimeout(onAnimationComplete, 1500 * baseDelay);
    }, 3500 * baseDelay);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      document.head.removeChild(styleEl);
    };
  }, [onAnimationComplete]);
  
  // Generate confetti pieces - reduced count in low performance mode
  const confettiCount = reducedAnimations ? 30 : 60;
  const confettiPieces = Array.from({ length: confettiCount }, (_, i) => {
    const colors = ['#F15BB5', '#00BBF9', '#00F5D4', '#FEE440', '#9B5DE5'];
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = `${Math.random() * 100}%`;
    const confettiX = Math.random() * 100 - 50; // Random X direction (reduced range)
    const confettiRotate = Math.random() * 360 - 180; // Random rotation (reduced range)
    const animationDuration = Math.random() * 2 + 2;
    const animationDelay = Math.random() * 2;
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: '-20px',
          left,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: Math.random() > 0.5 ? '50%' : '0',
          opacity: 0,
          '--confetti-x': `${confettiX}px`,
          '--confetti-rotate': `${confettiRotate}deg`,
          animation: `confetti ${animationDuration}s ease-out ${animationDelay}s forwards`,
          willChange: 'transform, opacity',
        } as React.CSSProperties}
      />
    );
  });
  
  // Generate sparkles - reduced count in low performance mode
  const sparkleCount = reducedAnimations ? 10 : 20;
  const sparkles = Array.from({ length: sparkleCount }, (_, i) => {
    const colors = ['#F15BB5', '#00BBF9', '#00F5D4', '#FEE440', '#9B5DE5'];
    const size = Math.random() * 6 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const top = `${Math.random() * 100}%`;
    const left = `${Math.random() * 100}%`;
    const animationDuration = Math.random() * 2 + 2;
    const animationDelay = Math.random() * 3;
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          top,
          left,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: '50%',
          boxShadow: `0 0 ${size}px ${color}`,
          opacity: 0,
          animation: `explode ${animationDuration}s ease-out ${animationDelay}s infinite`,
          willChange: 'transform, opacity',
        }}
      />
    );
  });
  
  // Generate jazz hands (emoji hands that wave) - reduced count in low performance mode
  const emojiCount = reducedAnimations ? 5 : 8;
  const jazzHands = Array.from({ length: emojiCount }, (_, i) => {
    const emojis = ['👋', '🙌', '✨', '🎉', '🎊', '💯', '🔥', '⭐'];
    const emoji = emojis[i % emojis.length];
    const size = Math.random() * 25 + 20;
    const top = `${Math.random() * 80 + 10}%`;
    const left = `${Math.random() * 80 + 10}%`;
    const animationDuration = Math.random() * 1.5 + 1;
    const animationDelay = Math.random() * 1.5;
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          top,
          left,
          fontSize: `${size}px`,
          opacity: animationStage >= 2 ? 1 : 0,
          animation: animationStage >= 2 ? `jazzHands ${animationDuration}s ease-in-out ${animationDelay}s infinite` : 'none',
          zIndex: 10,
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Confetti - only show if not in reduced animations mode */}
      {animationStage >= 1 && (!reducedAnimations || confettiCount < 40) && confettiPieces}
      
      {/* Sparkles */}
      {animationStage >= 1 && sparkles}
      
      {/* Jazz Hands */}
      {animationStage >= 2 && jazzHands}
      
      {/* Main text */}
      <div
        style={{
          fontSize: 'clamp(2rem, 10vmin, 5rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          opacity: animationStage >= 1 ? 1 : 0,
          animation: animationStage >= 1 ? `explode 0.5s ease-out, shimmer ${reducedAnimations ? 3 : 2}s linear infinite` : 'none',
          zIndex: 20,
          textShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
          marginBottom: '1rem',
          willChange: 'transform, opacity, text-shadow, color',
        }}
      >
        NEW HIGH SCORE!
      </div>
      
      {/* Score display */}
      <div
        style={{
          fontSize: 'clamp(3rem, 15vmin, 8rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          opacity: animationStage >= 2 ? 1 : 0,
          animation: animationStage >= 2 ? (reducedAnimations ? 'explode 0.5s ease-out' : 'spin 1.5s ease-out, shimmer 2s linear infinite') : 'none',
          zIndex: 20,
          background: 'linear-gradient(to right, #F15BB5, #00BBF9, #00F5D4, #FEE440, #9B5DE5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.6))',
          marginBottom: '2rem',
          willChange: 'transform, opacity',
        }}
      >
        {score}
      </div>
      
      {/* Subtitle */}
      <div
        style={{
          fontSize: 'clamp(1rem, 5vmin, 2.5rem)',
          fontWeight: 'bold',
          textAlign: 'center',
          opacity: animationStage >= 3 ? 1 : 0,
          animation: animationStage >= 3 ? (reducedAnimations ? 'shimmer 3s linear infinite' : 'glitch 0.5s linear infinite, shimmer 3s linear infinite') : 'none',
          zIndex: 20,
          textShadow: '0 0 5px rgba(255, 255, 255, 0.6)',
          willChange: 'transform, opacity, text-shadow, color',
        }}
      >
        MAXIMUM RIZZ ACHIEVED!
      </div>
      
      {/* Vaporwave grid background - simplified in reduced animations mode */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: reducedAnimations
            ? 'linear-gradient(transparent, rgba(155, 93, 229, 0.1)), repeating-linear-gradient(90deg, rgba(155, 93, 229, 0.1) 0px, rgba(155, 93, 229, 0.1) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, rgba(155, 93, 229, 0.1) 0px, rgba(155, 93, 229, 0.1) 1px, transparent 1px, transparent 40px)'
            : 'linear-gradient(transparent, rgba(155, 93, 229, 0.2)), repeating-linear-gradient(90deg, rgba(155, 93, 229, 0.2) 0px, rgba(155, 93, 229, 0.2) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(0deg, rgba(155, 93, 229, 0.2) 0px, rgba(155, 93, 229, 0.2) 1px, transparent 1px, transparent 20px)',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
          zIndex: 1,
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default HighScoreAnimation;