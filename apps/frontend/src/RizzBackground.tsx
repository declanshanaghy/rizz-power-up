import React, { useEffect, useRef, useState } from 'react';
import './RizzBackground.css';
import { getOptimizedImageUrl, ImageSize } from './MediaOptimizer';
import { initializePerformanceMode } from './Animations';

const RizzBackground: React.FC = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);

  useEffect(() => {
    // Initialize performance mode
    const lowPerformance = initializePerformanceMode();
    setIsLowPerformanceMode(lowPerformance);
    
    // Create stars - reduced count on low-performance devices
    if (starsRef.current) {
      const starCount = lowPerformance ? 30 : 60;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('rizz-star');
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsRef.current.appendChild(star);
      }
    }

    // Create sparkles - reduced count on low-performance devices
    if (sparklesRef.current) {
      const sparkleCount = lowPerformance ? 15 : 30;
      for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('rizz-sparkle');
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 5}s`;
        sparklesRef.current.appendChild(sparkle);
      }
    }

    // Set optimized background image
    if (backgroundRef.current) {
      const optimizedBgUrl = getOptimizedImageUrl('/bg1.png', ImageSize.LARGE);
      backgroundRef.current.style.backgroundImage = `url(${optimizedBgUrl}), linear-gradient(135deg, #120458 0%, #5B0E91 50%, #FF1B6B 100%)`;
      
      // Add performance class if needed
      if (lowPerformance) {
        backgroundRef.current.classList.add('low-performance');
      }
    }
    
    // Cleanup function
    return () => {
      if (starsRef.current) {
        starsRef.current.innerHTML = '';
      }
      if (sparklesRef.current) {
        sparklesRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={backgroundRef} className="rizz-background">
      <div className="rizz-grid"></div>
      <div className="rizz-horizon"></div>
      <div className="rizz-sun"></div>
      
      {/* Only show lightning effects in high-performance mode */}
      {!isLowPerformanceMode && (
        <>
          <div className="rizz-lightning rizz-lightning1"></div>
          <div className="rizz-lightning rizz-lightning2"></div>
          <div className="rizz-lightning rizz-lightning3"></div>
          <div className="rizz-lightning rizz-lightning4"></div>
        </>
      )}
      
      <div ref={starsRef} className="rizz-stars"></div>
      <div ref={sparklesRef} className="rizz-sparkles"></div>
    </div>
  );
};

export default RizzBackground;