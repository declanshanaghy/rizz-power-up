// Sound effects manager for Rizz Power-Up
// This module handles loading and playing sound effects for various game events

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
  [SoundEffectType.BUTTON_CLICK]: '/sounds/button_click.wav', // Use .wav extension instead of .mp3
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
  [SoundEffectType.SPECIAL_EVENT]: '/sounds/card_good_00.wav', // Use an existing sound file
  [SoundEffectType.SPECIAL_EVENT_GOOD]: [
    '/sounds/card_good_00.wav',
    '/sounds/card_good_01.wav',
    '/sounds/card_good_02.wav',
    '/sounds/card_good_03.wav',
    '/sounds/card_good_04.wav',
  ], // Reuse the good card sounds for good events
  [SoundEffectType.SPECIAL_EVENT_BAD]: [
    '/sounds/card_bad_00.wav',
    '/sounds/card_bad_01.wav',
    '/sounds/card_bad_02.wav',
    '/sounds/card_bad_03.wav',
    '/sounds/card_bad_04.wav',
  ], // Reuse the bad card sounds for bad events
  [SoundEffectType.TOAST_NOTIFICATION]: '/sounds/button_click.wav', // Use .wav extension instead of .mp3
  [SoundEffectType.GIVE_UP]: [
    '/sounds/giveup_00.wav',
    '/sounds/giveup_01.wav',
  ], // Sounds for give up modal
};

// Cache for preloaded audio elements
// For sound types with multiple variations, we'll store arrays of audio elements
type AudioCache = Record<SoundEffectType, HTMLAudioElement | HTMLAudioElement[]>;
const audioCache: AudioCache = {} as AudioCache;

// Volume settings
let soundEffectsVolume = 0.7; // Default volume (0.0 to 1.0)
let isMuted = false;

/**
 * Preload all sound effects to avoid delays when playing
 */
export function preloadSoundEffects(): void {
  Object.entries(SOUND_PATHS).forEach(([type, path]) => {
    if (Array.isArray(path)) {
      // Handle array of sound paths
      const audioArray: HTMLAudioElement[] = [];
      path.forEach(soundPath => {
        const audio = new Audio(soundPath);
        audio.preload = 'auto';
        audioArray.push(audio);
        
        // Load the audio file
        audio.load();
      });
      audioCache[type as SoundEffectType] = audioArray;
    } else {
      // Handle single sound path
      const audio = new Audio(path);
      audio.preload = 'auto';
      audioCache[type as SoundEffectType] = audio;
      
      // Load the audio file
      audio.load();
    }
  });
  
  // Removed console log to declutter
}

/**
 * Play a sound effect
 * @param type The type of sound effect to play
 */
/**
 * Get a random sound from an array of sounds
 * @param sounds Array of sound paths or audio elements
 * @returns A randomly selected item from the array
 */
function getRandomSound<T>(sounds: T[]): T {
  const randomIndex = Math.floor(Math.random() * sounds.length);
  // Removed console log to declutter
  return sounds[randomIndex];
}

/**
 * Play a sound effect
 * @param type The type of sound effect to play
 */
export function playSoundEffect(type: SoundEffectType): void {
  if (isMuted) return;
  
  const soundPath = SOUND_PATHS[type];
  const cachedAudio = audioCache[type];
  
  // Handle array of sound paths
  if (Array.isArray(soundPath)) {
    let audio: HTMLAudioElement;
    
    // Get a random audio element from cache or create a new one
    if (Array.isArray(cachedAudio)) {
      audio = getRandomSound(cachedAudio);
      // Removed console log to declutter
    } else {
      // If not cached yet, create a new audio element with a random sound path
      const randomPath = getRandomSound(soundPath);
      // Removed console log to declutter
      audio = new Audio(randomPath);
      
      // We don't update the cache here since we're expecting an array
      // This should not happen if preloadSoundEffects was called
    }
    
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
    let audio = cachedAudio as HTMLAudioElement;
    if (!audio) {
      // Removed console log to declutter
      audio = new Audio(soundPath);
      audioCache[type] = audio;
    } else {
      // Removed console log to declutter
    }
    
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