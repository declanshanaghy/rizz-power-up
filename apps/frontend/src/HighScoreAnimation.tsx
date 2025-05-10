import React, { useEffect, useState } from 'react';

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
        50% {
          transform: scale(1.2);
          opacity: 1;
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
        50% {
          transform: rotate(180deg) scale(1.5);
        }
        100% {
          transform: rotate(360deg) scale(1);
        }
      }
      
      @keyframes jazzHands {
        0% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-20px) rotate(-15deg);
        }
        50% {
          transform: translateY(0) rotate(0deg);
        }
        75% {
          transform: translateY(-20px) rotate(15deg);
        }
        100% {
          transform: translateY(0) rotate(0deg);
        }
      }
      
      @keyframes shimmer {
        0% {
          text-shadow: 0 0 10px #F15BB5, 0 0 20px #F15BB5;
          color: #F15BB5;
        }
        25% {
          text-shadow: 0 0 10px #00BBF9, 0 0 20px #00BBF9;
          color: #00BBF9;
        }
        50% {
          text-shadow: 0 0 10px #00F5D4, 0 0 20px #00F5D4;
          color: #00F5D4;
        }
        75% {
          text-shadow: 0 0 10px #FEE440, 0 0 20px #FEE440;
          color: #FEE440;
        }
        100% {
          text-shadow: 0 0 10px #F15BB5, 0 0 20px #F15BB5;
          color: #F15BB5;
        }
      }
      
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0);
        }
        25% {
          transform: translateY(-15px) translateX(10px);
        }
        50% {
          transform: translateY(0) translateX(0);
        }
        75% {
          transform: translateY(15px) translateX(-10px);
        }
        100% {
          transform: translateY(0) translateX(0);
        }
      }
      
      @keyframes glitch {
        0% {
          transform: translate(0);
        }
        20% {
          transform: translate(-5px, 5px);
        }
        40% {
          transform: translate(-5px, -5px);
        }
        60% {
          transform: translate(5px, 5px);
        }
        80% {
          transform: translate(5px, -5px);
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
    
    // Start the animation sequence
    const timer1 = setTimeout(() => setAnimationStage(1), 500);
    const timer2 = setTimeout(() => setAnimationStage(2), 1500);
    const timer3 = setTimeout(() => setAnimationStage(3), 2500);
    const timer4 = setTimeout(() => {
      setAnimationStage(4);
      // Call the onAnimationComplete callback after the animation finishes
      setTimeout(onAnimationComplete, 2000);
    }, 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      document.head.removeChild(styleEl);
    };
  }, [onAnimationComplete]);
  
  // Generate confetti pieces
  const confettiPieces = Array.from({ length: 100 }, (_, i) => {
    const colors = ['#F15BB5', '#00BBF9', '#00F5D4', '#FEE440', '#9B5DE5'];
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = `${Math.random() * 100}%`;
    const confettiX = Math.random() * 200 - 100; // Random X direction
    const confettiRotate = Math.random() * 720 - 360; // Random rotation
    const animationDuration = Math.random() * 3 + 2;
    const animationDelay = Math.random() * 3;
    
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
        } as React.CSSProperties}
      />
    );
  });
  
  // Generate sparkles
  const sparkles = Array.from({ length: 30 }, (_, i) => {
    const colors = ['#F15BB5', '#00BBF9', '#00F5D4', '#FEE440', '#9B5DE5'];
    const size = Math.random() * 8 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const top = `${Math.random() * 100}%`;
    const left = `${Math.random() * 100}%`;
    const animationDuration = Math.random() * 2 + 1;
    const animationDelay = Math.random() * 4;
    
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
          boxShadow: `0 0 ${size * 2}px ${color}`,
          opacity: 0,
          animation: `explode ${animationDuration}s ease-out ${animationDelay}s infinite`,
        }}
      />
    );
  });
  
  // Generate jazz hands (emoji hands that wave)
  const jazzHands = Array.from({ length: 12 }, (_, i) => {
    const emojis = ['👋', '👐', '🙌', '✨', '💫', '🎉', '🎊', '💯', '🔥', '⭐', '🌟', '💥'];
    const emoji = emojis[i % emojis.length];
    const size = Math.random() * 30 + 20;
    const top = `${Math.random() * 80 + 10}%`;
    const left = `${Math.random() * 80 + 10}%`;
    const animationDuration = Math.random() * 1 + 0.5;
    const animationDelay = Math.random() * 2;
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          top,
          left,
          fontSize: `${size}px`,
          opacity: animationStage >= 2 ? 1 : 0,
          animation: animationStage >= 2 ? `jazzHands ${animationDuration}s ease-in-out ${animationDelay}s infinite, float 3s ease-in-out infinite` : 'none',
          zIndex: 10,
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
      {/* Confetti */}
      {animationStage >= 1 && confettiPieces}
      
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
          animation: animationStage >= 1 ? 'explode 0.5s ease-out, shimmer 2s linear infinite' : 'none',
          zIndex: 20,
          textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
          marginBottom: '1rem',
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
          animation: animationStage >= 2 ? 'spin 1.5s ease-out, shimmer 1s linear infinite' : 'none',
          zIndex: 20,
          background: 'linear-gradient(to right, #F15BB5, #00BBF9, #00F5D4, #FEE440, #9B5DE5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
          marginBottom: '2rem',
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
          animation: animationStage >= 3 ? 'glitch 0.3s linear infinite, shimmer 3s linear infinite' : 'none',
          zIndex: 20,
          textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
        }}
      >
        MAXIMUM RIZZ ACHIEVED!
      </div>
      
      {/* Vaporwave grid background */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: 'linear-gradient(transparent, rgba(155, 93, 229, 0.2)), repeating-linear-gradient(90deg, rgba(155, 93, 229, 0.2) 0px, rgba(155, 93, 229, 0.2) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(0deg, rgba(155, 93, 229, 0.2) 0px, rgba(155, 93, 229, 0.2) 1px, transparent 1px, transparent 20px)',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default HighScoreAnimation;