/**
 * Seeded Random Number Generator
 * 
 * This file provides a seeded random number generator for consistent randomness.
 * The generator is seeded with the current time when the game loads.
 */

// A simple seeded random number generator based on a linear congruential generator (LCG)
class SeededRandom {
  private seed: number;
  private a: number = 1664525;
  private c: number = 1013904223;
  private m: number = Math.pow(2, 32);

  constructor(seed: number) {
    this.seed = seed;
  }

  // Set a new seed
  public setSeed(seed: number): void {
    this.seed = seed;
  }

  // Get the current seed
  public getSeed(): number {
    return this.seed;
  }

  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  public random(): number {
    // Update the seed using the LCG formula
    this.seed = (this.a * this.seed + this.c) % this.m;
    // Convert to a number between 0 and 1
    return this.seed / this.m;
  }

  // Generate a random integer between min (inclusive) and max (exclusive)
  public randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min)) + min;
  }

  // Generate a random integer between min (inclusive) and max (inclusive)
  public randomIntInclusive(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  // Generate a random float between min (inclusive) and max (exclusive)
  public randomFloat(min: number, max: number): number {
    return this.random() * (max - min) + min;
  }
}

// Create a singleton instance
const seededRandom = new SeededRandom(Date.now());

// Function to seed the random number generator with the current time
export function seedRandomWithCurrentTime(): void {
  seededRandom.setSeed(Date.now());
}

// Function to get a random number between 0 and 1
export function getRandom(): number {
  return seededRandom.random();
}

// Function to get a random integer between min (inclusive) and max (exclusive)
export function getRandomInt(min: number, max: number): number {
  return seededRandom.randomInt(min, max);
}

// Function to get a random integer between min (inclusive) and max (inclusive)
export function getRandomIntInclusive(min: number, max: number): number {
  return seededRandom.randomIntInclusive(min, max);
}

// Function to get a random float between min (inclusive) and max (exclusive)
export function getRandomFloat(min: number, max: number): number {
  return seededRandom.randomFloat(min, max);
}

// Export the seeded random instance for direct use
export default seededRandom;