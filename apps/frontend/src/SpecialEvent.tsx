import React, { useEffect } from 'react';
import { specialEventAnimations, calculateIntensity } from './Animations';

// Interface for the special event props
interface SpecialEventProps {
  isVisible: boolean;
  eventType: 'good' | 'bad';
  statChange: number;
  statType: 'vibeLevel' | 'swagger' | 'cringeAvoidance' | 'all';
}

// The SpecialEvent component
const SpecialEvent: React.FC<SpecialEventProps> = ({ isVisible, eventType, statChange, statType }) => {
  if (!isVisible) return null;
  
  // Calculate animation intensity based on stat change
  const intensity = calculateIntensity(Math.abs(statChange));
  
  // Add animations to the document
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = specialEventAnimations;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  // Determine the message based on the event type and stat
  let message = '';
  let emoji = '';
  
  if (eventType === 'good') {
    if (statType === 'vibeLevel') {
      message = 'VIBE BOOST!';
      emoji = '✨';
    } else if (statType === 'swagger') {
      message = 'SWAGGER SURGE!';
      emoji = '🔥';
    } else if (statType === 'cringeAvoidance') {
      message = 'CRINGE SHIELD!';
      emoji = '😎';
    } else {
      message = 'RIZZ OVERLOAD!';
      emoji = '⚡';
    }
  } else {
    if (statType === 'vibeLevel') {
      message = 'VIBE CHECK FAILED!';
      emoji = '💀';
    } else if (statType === 'swagger') {
      message = 'SWAGGER CRASH!';
      emoji = '😱';
    } else if (statType === 'cringeAvoidance') {
      message = 'CRINGE ATTACK!';
      emoji = '🫣';
    } else {
      message = 'RIZZ COLLAPSE!';
      emoji = '💔';
    }
  }
  
  // Style based on event type
  const backgroundColor = eventType === 'good'
    ? 'rgba(0, 245, 212, 0.8)' // Cyan for good events
    : 'rgba(241, 91, 181, 0.8)'; // Pink for bad events
  
  const textColor = eventType === 'good'
    ? '#1A1A1A' // Dark text for good events
    : '#FFFFFF'; // Light text for bad events
  
  const borderColor = eventType === 'good'
    ? 'var(--color-accent-5, #FEE440)' // Yellow border for good events
    : 'var(--color-accent-4, #9B5DE5)'; // Purple border for bad events
  
  // Choose animation based on event type
  const animation = eventType === 'good'
    ? `specialEventEntrance 0.7s forwards, specialEventPulse ${3 / intensity}s infinite`
    : `specialEventEntrance 0.7s forwards, specialEventGlitch ${2 / intensity}s infinite`;
  
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10000,
      backgroundColor,
      padding: 'clamp(1rem, 4vmin, 1.5rem)',
      borderRadius: 'var(--border-radius-lg, 1rem)',
      boxShadow: `0 0 clamp(20px, 5vmin, 30px) ${backgroundColor},
                 0 0 clamp(40px, 10vmin, 60px) rgba(0, 0, 0, 0.5)`,
      border: `4px solid ${borderColor}`,
      textAlign: 'center',
      animation,
      maxWidth: '90%',
      width: 'min(400px, 90%)'
    }}>
      <div style={{
        fontSize: `clamp(${2 + intensity * 0.5}rem, ${8 + intensity * 3}vmin, ${3 + intensity * 1}rem)`,
        marginBottom: 'clamp(0.5rem, 2vmin, 0.75rem)',
        animation: `emojiExplosion ${2 / intensity}s infinite`
      }}>
        {emoji}
      </div>
      <h2 style={{
        color: textColor,
        fontSize: 'clamp(1.2rem, 5vmin, 1.5rem)',
        fontWeight: 'bold',
        margin: 0,
        marginBottom: 'clamp(0.5rem, 2vmin, 0.75rem)',
        textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        animation: eventType === 'good' ? 'none' : `rizzLevelShake ${1 / intensity}s infinite`
      }}>
        {message}
      </h2>
      <p style={{
        color: textColor,
        fontSize: 'clamp(1rem, 4vmin, 1.2rem)',
        margin: 0,
        fontWeight: 'bold'
      }}>
        {statType === 'all' ? 'All Stats' : statType}:
        <span style={{
          color: eventType === 'good' ? '#FEE440' : '#FF0055',
          textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
          animation: `rizzLevelPulse ${1.5 / intensity}s infinite`
        }}>
          {' '}{eventType === 'good' ? '+' : ''}{statChange}
        </span>
      </p>
    </div>
  );
};

export default SpecialEvent;