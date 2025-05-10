import React from 'react';
import { getRandomInt, getRandomIntInclusive } from './randomGenerator';

// Interface for the special event props
interface SpecialEventProps {
  isVisible: boolean;
  eventType: 'good' | 'bad';
  statChange: number;
  statType: 'vibeLevel' | 'swagger' | 'cringeAvoidance' | 'all';
}

// Interface for the special event data
export interface SpecialEventData {
  eventType: 'good' | 'bad';
  statChange: number;
  statType: 'vibeLevel' | 'swagger' | 'cringeAvoidance' | 'all';
  message: string;
}

/**
 * Generate a random special event
 * @returns A special event data object
 */
export function generateSpecialEvent(): SpecialEventData {
  // Determine if this is a good or bad event (50/50 chance)
  const eventType: 'good' | 'bad' = Math.random() > 0.5 ? 'good' : 'bad';
  
  // Generate a large random stat change (10-30 for good events, -30 to -10 for bad events)
  const statChange = eventType === 'good' 
    ? getRandomIntInclusive(10, 30) 
    : getRandomIntInclusive(-30, -10);
  
  // Determine which stat will be affected
  const statOptions: ('vibeLevel' | 'swagger' | 'cringeAvoidance' | 'all')[] = [
    'vibeLevel', 'swagger', 'cringeAvoidance', 'all'
  ];
  const statType = statOptions[getRandomInt(0, statOptions.length)];
  
  // Generate an appropriate message based on the event type and stat
  let message = '';
  
  if (eventType === 'good') {
    if (statType === 'vibeLevel') {
      message = '✨ VIBE BOOST! Your aura is radiating positive energy! ✨';
    } else if (statType === 'swagger') {
      message = '🔥 SWAGGER SURGE! Your confidence is through the roof! 🔥';
    } else if (statType === 'cringeAvoidance') {
      message = '😎 CRINGE SHIELD! You\'re immune to embarrassment! 😎';
    } else {
      message = '⚡ RIZZ OVERLOAD! All your stats are supercharged! ⚡';
    }
  } else {
    if (statType === 'vibeLevel') {
      message = '💀 VIBE CHECK FAILED! Your energy is plummeting! 💀';
    } else if (statType === 'swagger') {
      message = '😱 SWAGGER CRASH! Your confidence just took a hit! 😱';
    } else if (statType === 'cringeAvoidance') {
      message = '🫣 CRINGE ATTACK! That was so embarrassing! 🫣';
    } else {
      message = '💔 RIZZ COLLAPSE! All your stats are tanking! 💔';
    }
  }
  
  return {
    eventType,
    statChange,
    statType,
    message
  };
}

/**
 * Check if a special event should trigger based on tap count
 * @param clickCount The current click count
 * @returns Boolean indicating if a special event should trigger
 */
export function shouldTriggerSpecialEvent(clickCount: number): boolean {
  // Target is approximately every 18 taps
  // Add some randomness to make it less predictable (15-21 taps)
  const targetTapCount = 18;
  const randomVariance = 3; // +/- 3 taps
  
  // Check if we're at a multiple of the target tap count (with some randomness)
  // We use modulo with a random range to create variability
  const randomTarget = targetTapCount + getRandomIntInclusive(-randomVariance, randomVariance);
  
  return clickCount > 0 && clickCount % randomTarget === 0;
}

/**
 * Apply the special event effect to the player's stats
 * @param stats The current player stats
 * @param event The special event data
 * @returns Updated stats after applying the special event
 */
export function applySpecialEventToStats(
  stats: { vibeLevel: number; swagger: number; cringeAvoidance: number },
  event: SpecialEventData
): { vibeLevel: number; swagger: number; cringeAvoidance: number } {
  const newStats = { ...stats };
  
  if (event.statType === 'all') {
    // Apply to all stats
    newStats.vibeLevel += event.statChange;
    newStats.swagger += event.statChange;
    newStats.cringeAvoidance += event.statChange;
  } else {
    // Apply to the specific stat
    newStats[event.statType] += event.statChange;
  }
  
  return newStats;
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