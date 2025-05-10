// localStorage.ts - Simple localStorage utilities for the Rizz Power-Up Simulator

// Define the game state interface
export interface GameState {
  rizzLevel?: number;
  stats?: {
    vibeLevel: number;
    swagger: number;
    cringeAvoidance: number;
  };
  highScore: number;
}

// Local storage key
const STORAGE_KEY = 'rizz-power-up-state';

/**
 * Save game state to localStorage
 * @param state The game state to save
 */
export const saveGameState = (state: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving game state to localStorage:', error);
  }
};

/**
 * Load game state from localStorage
 * @returns The saved game state or null if not found
 */
export const loadGameState = (): GameState | null => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState) as GameState;
    }
  } catch (error) {
    console.error('Error loading game state from localStorage:', error);
  }
  return null;
};

/**
 * Clear game state from localStorage
 */
export const clearGameState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing game state from localStorage:', error);
  }
};