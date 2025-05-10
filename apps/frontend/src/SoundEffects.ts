// Sound effects manager for Rizz Power-Up
// This module handles loading and playing sound effects with optimized formats and lazy loading

import { 
  getOptimizedAudioUrl
} from './MediaOptimizer';

// Define the types of sound effects
export enum SoundEffectType {
  BUTTON_CLICK = 'buttonClick',
  DEAL_CARD = 'dealCard',
  DEAL_CARD_BAD = 'dealCardBad',
  BANK_SCORE = 'bankScore',
  RIZZ_LEVEL = 'rizzLevel',
  SPECIAL_EVENT = 'specialEvent',
  SPECIAL_EVENT_GOOD = 'specialEventGood',
  SPECIAL_EVENT_BAD = 'specialEventBad',
  TOAST_NOTIFICATION = 'toastNotification',
  GIVE_UP = 'giveUp',
}

// Define the paths to the sound effect files
// For card sounds, we'll use arrays to store multiple variations
type SoundPath = string | string[];

const SOUND_PATHS: Record<SoundEffectType, SoundPath> = {
  [SoundEffectType.BUTTON_CLICK]: '/sounds/button_click.wav',
  [SoundEffectType.DEAL_CARD]: [
    '/sounds/card_good_00.wav',
    '/sounds/card_good_01.wav',
    '/sounds/card_good_02.wav',
    '/sounds/card_good_03.wav',
    '/sounds/card_good_04.wav',
  ],
  [SoundEffectType.DEAL_CARD_BAD]: [
    '/sounds/card_bad_00.wav',
    '/sounds/card_bad_01.wav',
    '/sounds/card_bad_02.wav',
    '/sounds/card_bad_03.wav',
    '/sounds/card_bad_04.wav',
  ],
  [SoundEffectType.BANK_SCORE]: [
    '/sounds/bank_00.wav',
    '/sounds/bank_01.wav',
  ],
  [SoundEffectType.RIZZ_LEVEL]: '/sounds/rizz_level_up.mp3',
  [SoundEffectType.SPECIAL_EVENT]: '/sounds/card_good_00.wav',
  [SoundEffectType.SPECIAL_EVENT_GOOD]: [
    '/sounds/card_good_00.wav',
    '/sounds/card_good_01.wav',
    '/sounds/card_good_02.wav',
    '/sounds/card_good_03.wav',
    '/sounds/card_good_04.wav',
  ],
  [SoundEffectType.SPECIAL_EVENT_BAD]: [
    '/sounds/card_bad_00.wav',
    '/sounds/card_bad_01.wav',
    '/sounds/card_bad_02.wav',
    '/sounds/card_bad_03.wav',
    '/sounds/card_bad_04.wav',
  ],
  [SoundEffectType.TOAST_NOTIFICATION]: '/sounds/button_click.wav',
  [SoundEffectType.GIVE_UP]: [
    '/sounds/giveup_00.wav',
    '/sounds/giveup_01.wav',
  ],
};

// Cache for preloaded audio elements
// For sound types with multiple variations, we'll store arrays of audio elements
type AudioCache = Record<SoundEffectType, HTMLAudioElement | HTMLAudioElement[]>;
const audioCache: AudioCache = {} as AudioCache;

// Volume settings
let soundEffectsVolume = 0.7; // Default volume (0.0 to 1.0)
let isMuted = false;

// Track which sound types have been preloaded
const preloadedTypes = new Set<SoundEffectType>();

// Get the optimal audio format (not used directly but needed for getOptimizedAudioUrl)

/**
 * Preload critical sound effects to avoid delays when playing
 * This only preloads the most important sounds, others are loaded on demand
 */
export function preloadCriticalSoundEffects(): void {
  // Only preload critical sound effects
  const criticalSoundTypes = [
    SoundEffectType.BUTTON_CLICK,
    SoundEffectType.DEAL_CARD,
    SoundEffectType.DEAL_CARD_BAD
  ];
  
  criticalSoundTypes.forEach(type => {
    preloadSoundType(type);
  });
  
  console.log(`Preloaded ${criticalSoundTypes.length} critical sound effects`);
}

/**
 * Preload all sound effects in the background
 * This can be called after the app is interactive
 */
export function preloadAllSoundEffects(): void {
  Object.keys(SOUND_PATHS).forEach(type => {
    preloadSoundType(type as SoundEffectType);
  });
  
  console.log('All sound effects queued for preloading');
}

/**
 * Preload a specific sound effect type
 * @param type The type of sound effect to preload
 */
function preloadSoundType(type: SoundEffectType): void {
  // Skip if already preloaded
  if (preloadedTypes.has(type)) {
    return;
  }
  
  const soundPath = SOUND_PATHS[type];
  
  if (Array.isArray(soundPath)) {
    // Handle array of sound paths
    const audioArray: HTMLAudioElement[] = [];
    
    soundPath.forEach(path => {
      // Use optimized audio URL based on browser support
      const optimizedPath = getOptimizedAudioUrl(path);
      
      // Create audio element with lazy loading
      const audio = new Audio(optimizedPath);
      audio.preload = 'metadata';
      
      // Set volume
      audio.volume = soundEffectsVolume;
      
      audioArray.push(audio);
      
      // Notify service worker to cache this resource
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_RESOURCE',
          url: optimizedPath
        });
      }
    });
    
    audioCache[type] = audioArray;
  } else {
    // Handle single sound path
    const optimizedPath = getOptimizedAudioUrl(soundPath);
    const audio = new Audio(optimizedPath);
    audio.preload = 'metadata';
    
    // Set volume
    audio.volume = soundEffectsVolume;
    
    audioCache[type] = audio;
    
    // Notify service worker to cache this resource
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_RESOURCE',
        url: optimizedPath
      });
    }
  }
  
  // Mark as preloaded
  preloadedTypes.add(type);
}

/**
 * Get a random sound from an array of sounds
 * @param sounds Array of sound paths or audio elements
 * @returns A randomly selected item from the array
 */
function getRandomSound<T>(sounds: T[]): T {
  const randomIndex = Math.floor(Math.random() * sounds.length);
  return sounds[randomIndex];
}

/**
 * Play a sound effect
 * @param type The type of sound effect to play
 */
export function playSoundEffect(type: SoundEffectType): void {
  if (isMuted) return;
  
  // Ensure the sound type is preloaded
  if (!preloadedTypes.has(type)) {
    preloadSoundType(type);
  }
  
  const cachedAudio = audioCache[type];
  
  // Handle array of sound paths
  if (Array.isArray(cachedAudio)) {
    // Get a random audio element from cache
    const audio = getRandomSound(cachedAudio);
    
    // Reset the audio to the beginning if it's already playing
    audio.currentTime = 0;
    
    // Set the volume
    audio.volume = soundEffectsVolume;
    
    // Play the sound
    audio.play().catch(error => {
      console.error(`Error playing sound effect: ${error.message}`);
    });
  } else {
    // Handle single sound path
    const audio = cachedAudio;
    
    // Reset the audio to the beginning if it's already playing
    audio.currentTime = 0;
    
    // Set the volume
    audio.volume = soundEffectsVolume;
    
    // Play the sound
    audio.play().catch(error => {
      console.error(`Error playing sound effect: ${error.message}`);
    });
  }
}

/**
 * Set the volume for sound effects
 * @param volume Volume level from 0.0 (silent) to 1.0 (full volume)
 */
export function setSoundEffectsVolume(volume: number): void {
  soundEffectsVolume = Math.max(0, Math.min(1, volume));
  
  // Update volume for all cached audio elements
  Object.values(audioCache).forEach(cached => {
    if (Array.isArray(cached)) {
      cached.forEach(audio => {
        audio.volume = soundEffectsVolume;
      });
    } else {
      cached.volume = soundEffectsVolume;
    }
  });
}

/**
 * Get the current volume for sound effects
 * @returns Current volume level from 0.0 to 1.0
 */
export function getSoundEffectsVolume(): number {
  return soundEffectsVolume;
}

/**
 * Mute or unmute sound effects
 * @param mute True to mute, false to unmute
 */
export function setMuted(mute: boolean): void {
  isMuted = mute;
}

/**
 * Check if sound effects are muted
 * @returns True if muted, false otherwise
 */
export function isSoundMuted(): boolean {
  return isMuted;
}

// Convenience functions for playing specific sound effects

/**
 * Play the button click sound
 */
export function playButtonClickSound(): void {
  playSoundEffect(SoundEffectType.BUTTON_CLICK);
}

/**
 * Play the deal card sound
 * @param isBadCard True if the card has negative effects, false otherwise
 */
export function playDealCardSound(isBadCard: boolean = false): void {
  if (isBadCard) {
    playSoundEffect(SoundEffectType.DEAL_CARD_BAD);
  } else {
    playSoundEffect(SoundEffectType.DEAL_CARD);
  }
}

/**
 * Play the bank score sound
 */
export function playBankScoreSound(): void {
  playSoundEffect(SoundEffectType.BANK_SCORE);
}

/**
 * Play the rizz level sound
 */
export function playRizzLevelSound(): void {
  playSoundEffect(SoundEffectType.RIZZ_LEVEL);
}

/**
 * Play the special event sound
 * @param isGood True for good events, false for bad events
 */
export function playSpecialEventSound(isGood?: boolean): void {
  if (isGood === true) {
    playSoundEffect(SoundEffectType.SPECIAL_EVENT_GOOD);
  } else if (isGood === false) {
    playSoundEffect(SoundEffectType.SPECIAL_EVENT_BAD);
  } else {
    playSoundEffect(SoundEffectType.SPECIAL_EVENT);
  }
}

/**
 * Play the toast notification sound
 */
export function playToastSound(): void {
  playSoundEffect(SoundEffectType.TOAST_NOTIFICATION);
}

/**
 * Play the give up sound
 */
export function playGiveUpSound(): void {
  playSoundEffect(SoundEffectType.GIVE_UP);
}

// For backward compatibility
export const preloadSoundEffects = preloadAllSoundEffects;