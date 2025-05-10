import React, { useEffect, useRef } from 'react';
import './RizzBackground.css';
import { getOptimizedImageUrl, ImageSize } from './MediaOptimizer';

const RizzBackground: React.FC = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create stars
    if (starsRef.current) {
      for (let i = 0; i < 100; i++) {
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

    // Create sparkles
    if (sparklesRef.current) {
      for (let i = 0; i < 50; i++) {
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
    }
  }, []);

  return (
    <div ref={backgroundRef} className="rizz-background">
      <div className="rizz-grid"></div>
      <div className="rizz-horizon"></div>
      <div className="rizz-sun"></div>
      
      <div className="rizz-lightning rizz-lightning1"></div>
      <div className="rizz-lightning rizz-lightning2"></div>
      <div className="rizz-lightning rizz-lightning3"></div>
      <div className="rizz-lightning rizz-lightning4"></div>
      
      <div ref={starsRef} className="rizz-stars"></div>
      <div ref={sparklesRef} className="rizz-sparkles"></div>
    </div>
  );
};

export default RizzBackground;