import { getRandomInt, getRandomIntInclusive } from './randomGenerator';

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