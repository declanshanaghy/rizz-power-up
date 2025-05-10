import React from 'react';

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
      animation: 'pulse 0.5s infinite alternate',
      maxWidth: '90%',
      width: 'min(400px, 90%)'
    }}>
      <div style={{
        fontSize: 'clamp(2rem, 8vmin, 3rem)',
        marginBottom: 'clamp(0.5rem, 2vmin, 0.75rem)'
      }}>
        {emoji}
      </div>
      <h2 style={{
        color: textColor,
        fontSize: 'clamp(1.2rem, 5vmin, 1.5rem)',
        fontWeight: 'bold',
        margin: 0,
        marginBottom: 'clamp(0.5rem, 2vmin, 0.75rem)',
        textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
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
          textShadow: '0 0 5px rgba(0, 0, 0, 0.7)'
        }}>
          {' '}{eventType === 'good' ? '+' : ''}{statChange}
        </span>
      </p>
    </div>
  );
};

export default SpecialEvent;