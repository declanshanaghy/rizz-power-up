// BackgroundMusic.ts
// This module handles loading and playing background music for the Rizz Power-Up application

// Path to the background music file
const BACKGROUND_MUSIC_PATH = '/sounds/background_music.mp3';

// Audio element for background music
let backgroundMusicAudio: HTMLAudioElement | null = null;

// Volume settings
let backgroundMusicVolume = 0.3; // Default volume (0.0 to 1.0) - lower than sound effects
let musicMuted = false;
let isMusicPlaying = false;

/**
 * Preload the background music to avoid delays when playing
 */
export function preloadBackgroundMusic(): void {
  if (!backgroundMusicAudio) {
    backgroundMusicAudio = new Audio(BACKGROUND_MUSIC_PATH);
    backgroundMusicAudio.preload = 'auto';
    backgroundMusicAudio.loop = true; // Enable looping
    backgroundMusicAudio.volume = backgroundMusicVolume;
    
    // Load the audio file
    backgroundMusicAudio.load();
    
    console.log('Background music preloaded');
  }
}

/**
 * Play the background music
 */
export function playBackgroundMusic(): void {
  if (musicMuted || !backgroundMusicAudio) return;
  
  // Only play if not already playing
  if (!isMusicPlaying) {
    backgroundMusicAudio.play().catch(error => {
      console.error(`Error playing background music: ${error.message}`);
    });
    isMusicPlaying = true;
  }
}

/**
 * Pause the background music
 */
export function pauseBackgroundMusic(): void {
  if (backgroundMusicAudio && isMusicPlaying) {
    backgroundMusicAudio.pause();
    isMusicPlaying = false;
  }
}

/**
 * Toggle play/pause of background music
 * @returns New playing state (true if playing, false if paused)
 */
export function toggleBackgroundMusic(): boolean {
  if (isMusicPlaying) {
    pauseBackgroundMusic();
  } else {
    playBackgroundMusic();
  }
  return isMusicPlaying;
}

/**
 * Set the volume for background music
 * @param volume Volume level from 0.0 (silent) to 1.0 (full volume)
 */
export function setBackgroundMusicVolume(volume: number): void {
  backgroundMusicVolume = Math.max(0, Math.min(1, volume));
  
  if (backgroundMusicAudio) {
    backgroundMusicAudio.volume = backgroundMusicVolume;
  }
}

/**
 * Get the current volume for background music
 * @returns Current volume level from 0.0 to 1.0
 */
export function getBackgroundMusicVolume(): number {
  return backgroundMusicVolume;
}

/**
 * Mute or unmute background music
 * @param mute True to mute, false to unmute
 */
export function setMusicMuted(mute: boolean): void {
  musicMuted = mute;
  
  if (backgroundMusicAudio) {
    if (mute) {
      // If muting, pause the music
      pauseBackgroundMusic();
    } else if (isMusicPlaying) {
      // If unmuting and was playing before, resume playing
      playBackgroundMusic();
    }
  }
}

/**
 * Check if background music is muted
 * @returns True if muted, false otherwise
 */
export function isMusicMuted(): boolean {
  return musicMuted;
}

/**
 * Check if background music is currently playing
 * @returns True if playing, false otherwise
 */
export function isBackgroundMusicPlaying(): boolean {
  return isMusicPlaying;
}