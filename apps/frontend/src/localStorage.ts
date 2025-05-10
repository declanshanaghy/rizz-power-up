/**
 * localStorage.ts
 * Utility functions for saving and loading game state from localStorage
 */

// Key for storing game state in localStorage
const STORAGE_KEY = 'rizz-power-up-state';

// Interface for the game state that will be persisted
export interface GameState {
  rizzLevel: number;
  stats: {
    vibeLevel: number;
    swagger: number;
    cringeAvoidance: number;
  };
  highScore: number;
}

/**
 * Check if localStorage is available in the current browser
 * @returns boolean indicating if localStorage is available
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn('localStorage is not available:', e);
    return false;
  }
};

/**
 * Save the current game state to localStorage
 * @param state The game state to save
 * @returns boolean indicating if the save was successful
 */
export const saveGameState = (state: GameState): boolean => {
  try {
    if (!isLocalStorageAvailable()) {
      return false;
    }
    
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
    return true;
  } catch (e) {
    console.error('Failed to save game state:', e);
    return false;
  }
};

/**
 * Load the saved game state from localStorage
 * @returns The saved game state or null if no state is found or an error occurs
 */
export const loadGameState = (): GameState | null => {
  try {
    if (!isLocalStorageAvailable()) {
      return null;
    }
    
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) {
      return null;
    }
    
    return JSON.parse(serializedState) as GameState;
  } catch (e) {
    console.error('Failed to load game state:', e);
    return null;
  }
};

/**
 * Clear the saved game state from localStorage
 * @returns boolean indicating if the clear was successful
 */
export const clearGameState = (): boolean => {
  try {
    if (!isLocalStorageAvailable()) {
      return false;
    }
    
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Failed to clear game state:', e);
    return false;
  }
};