// Animations.ts - Contains all animations for the Rizz Power-Up app

// Helper function to calculate animation intensity based on score
// Performance flag to reduce animations - set to true by default for better performance
export let reducedAnimations = true;

// Helper function to detect if device is likely low-performance
export const detectLowPerformanceDevice = (): boolean => {
  // Check for mobile devices which typically have lower performance
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for older browsers that might indicate older hardware
  const isOlderBrowser = !window.requestAnimationFrame || !window.performance;
  
  return isMobile || isOlderBrowser;
};

// Set reduced animations mode
export const setReducedAnimations = (reduced: boolean): void => {
  reducedAnimations = reduced;
};

// Helper function to calculate animation intensity based on score and device capability
export const calculateIntensity = (score: number): number => {
  // Normalize the score to a value between 0.5 and 2
  // Even negative scores will have some animation, but positive scores will be more intense
  const absScore = Math.abs(score);
  const baseIntensity = 0.5 + Math.min(1.5, absScore / 1000);
  
  // Reduce intensity by 40% if reduced animations mode is active
  return reducedAnimations ? baseIntensity * 0.6 : baseIntensity;
};

// CSS for stats animations
export const statsAnimations = `
  @keyframes statLabelBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  
  @keyframes statScoreBounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(2px) scale(1.05); }
  }
  
  @keyframes emojiPulse {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.2)); }
    50% { transform: scale(1.15); filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5)); }
  }
  
  @keyframes emojiWiggle {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-5deg) scale(1.05); }
    75% { transform: rotate(5deg) scale(1.05); }
  }
  
  @keyframes emojiJump {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  
  @keyframes rizzLevelGlow {
    0%, 100% { text-shadow: 0 0 5px var(--color-accent-3, #00F5D4); }
    50% { text-shadow: 0 0 15px var(--color-accent-3, #00F5D4); }
  }
  
  @keyframes rizzLevelPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes rizzLevelShake {
    0%, 100% { transform: translateX(0); }
    25%, 75% { transform: translateX(-3px); }
    50% { transform: translateX(3px); }
  }
  
  @keyframes floatLeftRight {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-3px); }
  }
  
  @keyframes floatUpDown {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
`;

// CSS for card animations
export const cardAnimations = `
  @keyframes cardEntrance {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5) rotate(-5deg);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.05) rotate(2deg);
    }
    100% {
      transform: translate(-50%, -50%) scale(1) rotate(0);
    }
  }
  
  @keyframes cardGlow {
    0% {
      box-shadow: 0 0 10px #F15BB5, 0 0 20px #00BBF9;
    }
    50% {
      box-shadow: 0 0 15px #00F5D4, 0 0 25px #9B5DE5;
    }
    100% {
      box-shadow: 0 0 10px #F15BB5, 0 0 20px #00BBF9;
    }
  }
  
  @keyframes cardHover {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.02);
    }
  }
  
  @keyframes cardExit {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5) translateY(50px);
    }
  }
`;

// CSS for modal animations
export const modalAnimations = `
  @keyframes modalEntrance {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes modalExit {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.8);
    }
  }
  
  @keyframes modalGlow {
    0%, 100% {
      box-shadow: 0 0 10px rgba(241, 91, 181, 0.6),
                 0 0 20px rgba(0, 187, 249, 0.6),
                 inset 0 0 10px rgba(255, 255, 255, 0.4);
    }
    50% {
      box-shadow: 0 0 15px rgba(241, 91, 181, 0.7),
                 0 0 30px rgba(0, 187, 249, 0.7),
                 inset 0 0 15px rgba(255, 255, 255, 0.5);
    }
  }
  
  @keyframes buttonPulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 5px rgba(241, 91, 181, 0.5);
    }
    50% {
      transform: scale(1.03);
      box-shadow: 0 0 10px rgba(241, 91, 181, 0.7);
    }
  }
`;

// CSS for special event animations
export const specialEventAnimations = `
  @keyframes specialEventEntrance {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.7);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes specialEventPulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 0 10px rgba(0, 245, 212, 0.6), 0 0 20px rgba(0, 0, 0, 0.4);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
      box-shadow: 0 0 15px rgba(0, 245, 212, 0.8), 0 0 30px rgba(0, 0, 0, 0.5);
    }
  }
  
  @keyframes specialEventGlitch {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    33% {
      transform: translate(-51%, -49%) scale(1.01);
    }
    66% {
      transform: translate(-49%, -51%) scale(0.99);
    }
  }
  
  @keyframes emojiExplosion {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.9;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// CSS for text animations
export const textAnimations = `
  @keyframes textShimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  
  @keyframes textPulse {
    0% {
      text-shadow: 0 0 3px rgba(255,0,0,0.6);
      transform: scale(1);
    }
    50% {
      text-shadow: 0 0 6px rgba(255,0,0,0.8);
      transform: scale(1.05);
    }
    100% {
      text-shadow: 0 0 3px rgba(255,0,0,0.6);
      transform: scale(1);
    }
  }
  
  @keyframes textGlitter {
    0% { background-position: 0% 50%; filter: brightness(1); }
    50% { background-position: 100% 50%; filter: brightness(1.2); }
    100% { background-position: 200% 50%; filter: brightness(1); }
  }
  
  @keyframes textRainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  
  @keyframes textWave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
`;

// All animations combined
// Function to get animations based on performance mode
export const getAnimations = () => {
  // If in reduced animations mode, return a subset of animations
  if (reducedAnimations) {
    return `
      ${statsAnimations}
      ${cardAnimations}
      ${modalAnimations}
    `;
  }
  
  // Otherwise return all animations
  return `
    ${statsAnimations}
    ${cardAnimations}
    ${modalAnimations}
    ${specialEventAnimations}
    ${textAnimations}
  `;
};

// All animations combined - for backward compatibility
export const allAnimations = getAnimations();

// Initialize reduced animations mode - always use reduced animations by default
export const initializePerformanceMode = () => {
  // Always use reduced animations by default for better performance
  setReducedAnimations(true);
  return true;
};