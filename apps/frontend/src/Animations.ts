// Animations.ts - Contains all animations for the Rizz Power-Up app

// Helper function to calculate animation intensity based on score
export const calculateIntensity = (score: number): number => {
  // Normalize the score to a value between 0.5 and 2
  // Even negative scores will have some animation, but positive scores will be more intense
  const absScore = Math.abs(score);
  return 0.5 + Math.min(1.5, absScore / 1000);
};

// CSS for stats animations
export const statsAnimations = `
  @keyframes statLabelBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  @keyframes statScoreBounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(3px) scale(1.1); }
  }
  
  @keyframes emojiPulse {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); }
    50% { transform: scale(1.3); filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)); }
  }
  
  @keyframes emojiWiggle {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-10deg) scale(1.1); }
    75% { transform: rotate(10deg) scale(1.1); }
  }
  
  @keyframes emojiJump {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-20px); }
    60% { transform: translateY(-10px); }
  }
  
  @keyframes rizzLevelGlow {
    0%, 100% { text-shadow: 0 0 10px var(--color-accent-3, #00F5D4); }
    50% { text-shadow: 0 0 25px var(--color-accent-3, #00F5D4), 0 0 40px var(--color-accent-3, #00F5D4); }
  }
  
  @keyframes rizzLevelPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  @keyframes rizzLevelShake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  @keyframes floatLeftRight {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes floatUpDown {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
`;

// CSS for card animations
export const cardAnimations = `
  @keyframes cardEntrance {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.3) rotate(-15deg);
    }
    40% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
    }
    60% {
      transform: translate(-50%, -50%) scale(0.95) rotate(-2deg);
    }
    80% {
      transform: translate(-50%, -50%) scale(1.05) rotate(1deg);
    }
    100% {
      transform: translate(-50%, -50%) scale(1) rotate(0);
    }
  }
  
  @keyframes cardGlow {
    0% {
      box-shadow: 0 0 20px #F15BB5, 0 0 40px #00BBF9;
    }
    50% {
      box-shadow: 0 0 30px #00F5D4, 0 0 50px #9B5DE5, 0 0 70px rgba(255, 255, 255, 0.7);
    }
    100% {
      box-shadow: 0 0 20px #F15BB5, 0 0 40px #00BBF9;
    }
  }
  
  @keyframes cardHover {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1) rotate(0);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.03) rotate(1deg);
    }
  }
  
  @keyframes cardExit {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) rotate(0);
    }
    30% {
      transform: translate(-50%, -50%) scale(1.1) rotate(-2deg);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5) rotate(10deg) translateY(100px);
    }
  }
`;

// CSS for modal animations
export const modalAnimations = `
  @keyframes modalEntrance {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    70% {
      opacity: 1;
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes modalExit {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    30% {
      opacity: 1;
      transform: scale(1.05);
    }
    100% {
      opacity: 0;
      transform: scale(0.7);
    }
  }
  
  @keyframes modalGlow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(241, 91, 181, 0.8),
                 0 0 40px rgba(0, 187, 249, 0.8),
                 inset 0 0 15px rgba(255, 255, 255, 0.6);
    }
    50% {
      box-shadow: 0 0 30px rgba(241, 91, 181, 0.9),
                 0 0 60px rgba(0, 187, 249, 0.9),
                 0 0 90px rgba(0, 245, 212, 0.5),
                 inset 0 0 25px rgba(255, 255, 255, 0.8);
    }
  }
  
  @keyframes buttonPulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 10px rgba(241, 91, 181, 0.7);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(241, 91, 181, 0.9), 0 0 30px rgba(0, 187, 249, 0.5);
    }
  }
`;

// CSS for special event animations
export const specialEventAnimations = `
  @keyframes specialEventEntrance {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5) rotate(-5deg);
    }
    60% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2) rotate(3deg);
    }
    80% {
      transform: translate(-50%, -50%) scale(0.95) rotate(-1deg);
    }
    100% {
      transform: translate(-50%, -50%) scale(1) rotate(0);
    }
  }
  
  @keyframes specialEventPulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 20px rgba(0, 245, 212, 0.8), 0 0 40px rgba(0, 0, 0, 0.5);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 0 30px rgba(0, 245, 212, 1), 0 0 60px rgba(0, 0, 0, 0.7), 0 0 90px rgba(255, 255, 255, 0.3);
    }
  }
  
  @keyframes specialEventGlitch {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      clip-path: inset(0 0 0 0);
    }
    20% {
      transform: translate(-52%, -48%) scale(1.01);
      clip-path: inset(10% 0 0 5%);
    }
    40% {
      transform: translate(-48%, -52%) scale(0.99);
      clip-path: inset(0 10% 5% 0);
    }
    60% {
      transform: translate(-51%, -49%) scale(1.02);
      clip-path: inset(5% 5% 0 0);
    }
    80% {
      transform: translate(-49%, -51%) scale(0.98);
      clip-path: inset(0 0 10% 10%);
    }
  }
  
  @keyframes emojiExplosion {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(3);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// All animations combined
export const allAnimations = `
  ${statsAnimations}
  ${cardAnimations}
  ${modalAnimations}
  ${specialEventAnimations}
`;