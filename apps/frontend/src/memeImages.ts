/**
 * Rizz Power-Up Meme Images
 *
 * This file provides access to the meme images used in the Rizz Power-Up app.
 *
 * THIS FILE IS AUTO-GENERATED BY THE MEME-CONVERTER TOOL.
 * DO NOT EDIT DIRECTLY - CHANGES WILL BE OVERWRITTEN.
 *
 * Note: Random number generation is now handled by the seeded random generator
 * to ensure consistent randomness seeded with the current time.
 */

import { getRandom, getRandomInt } from './randomGenerator';

/**
 * Interface for meme image data
 */
export interface MemeImage {
  /** Unique identifier for the image */
  id: string;
  /** Descriptive name of the image */
  name: string;
  /** Path to the image file */
  path: string;
  /** Description of the image based on the prompt */
  description: string;
  /** Original prompt title from the rizz_image_prompts_no_text_overlay.md file */
  promptTitle?: string;
  /** Original prompt ID from the rizz_image_prompts_no_text_overlay.md file */
  promptId?: number;
  /** Bias value that influences attribute generation (-1.0 to +1.0) */
  bias: number;
  /** Whether this is a good (positive) or bad (negative) meme */
  isGood: boolean;
}

/**
 * All meme images
 */
export const memeImages: MemeImage[] = [
  {
    "id": "sci-fi-lab-chaos-1",
    "name": "Sci Fi Lab Chaos",
    "path": "/memes/good/sci-fi-lab-chaos-01jtw0wmpveckvy88b7wnmjbg2.png",
    "description": "Your unique energy is so powerful it breaks the digital systems trying to categorize you, causing beautiful chaos.",
    "promptTitle": "Your aura just disrupted the algorithm.",
    "promptId": 6,
    "bias": 9,
    "isGood": true
  },
  {
    "id": "sci-fi-lab-chaos-2",
    "name": "Sci Fi Lab Chaos",
    "path": "/memes/good/sci-fi-lab-chaos-01jtw0wmptex5thqj6z2eknb6w.png",
    "description": "Your unique energy is so powerful it breaks the digital systems trying to categorize you, causing beautiful chaos.",
    "promptTitle": "Your aura just disrupted the algorithm.",
    "promptId": 6,
    "bias": 6,
    "isGood": true
  },
  {
    "id": "renaissance-elegance-with-cherubs-1",
    "name": "Renaissance Elegance With Cherubs",
    "path": "/memes/good/renaissance-elegance-with-cherubs-01jtw0pz07fyasp35ykx4jm156.png",
    "description": "You radiate confidence as you walk through life, turning heads and commanding attention with your effortless presence.",
    "promptTitle": "Main character energy.",
    "promptId": 1,
    "bias": 8,
    "isGood": true
  },
  {
    "id": "renaissance-elegance-with-cherubs-2",
    "name": "Renaissance Elegance With Cherubs",
    "path": "/memes/good/renaissance-elegance-with-cherubs-01jtw0pz06ea5rz1gt42dsq80z.png",
    "description": "You radiate confidence as you walk through life, turning heads and commanding attention with your effortless presence.",
    "promptTitle": "Main character energy.",
    "promptId": 1,
    "bias": 9,
    "isGood": true
  },
  {
    "id": "primal-power-unleashed-1",
    "name": "Primal Power Unleashed",
    "path": "/memes/good/primal-power-unleashed-01jtfbzvwjf0frbzz2fgx0ehr5.png",
    "description": "Your raw charismatic energy has broken through all restraints, unleashing your most powerful and authentic self.",
    "promptTitle": "Unleashed primal rizz beast mode.",
    "promptId": 10,
    "bias": 9,
    "isGood": true
  },
  {
    "id": "primal-power-unleashed-2",
    "name": "Primal Power Unleashed",
    "path": "/memes/good/primal-power-unleashed-01jtfbzvwhfs6scng73tg4qkwg.png",
    "description": "Your raw charismatic energy has broken through all restraints, unleashing your most powerful and authentic self.",
    "promptTitle": "Unleashed primal rizz beast mode.",
    "promptId": 10,
    "bias": 10,
    "isGood": true
  },
  {
    "id": "maximal-clout-strut-1",
    "name": "Maximal Clout Strut",
    "path": "/memes/good/maximal-clout-strut-01jtfbjr3bfyx9as87wbyb3mgq.png",
    "description": "Your influence and style are off the charts, generating social media buzz with every step you take.",
    "promptTitle": "Exuding max clout per nanosecond.",
    "promptId": 2,
    "bias": 7,
    "isGood": true
  },
  {
    "id": "maximal-clout-strut-2",
    "name": "Maximal Clout Strut",
    "path": "/memes/good/maximal-clout-strut-01jtfbjr3af2ebg7s6esg7mz8q.png",
    "description": "Your influence and style are off the charts, generating social media buzz with every step you take.",
    "promptTitle": "Exuding max clout per nanosecond.",
    "promptId": 2,
    "bias": 5,
    "isGood": true
  },
  {
    "id": "hallway-heroics-1",
    "name": "Hallway Heroics",
    "path": "/memes/good/hallway-heroics-01jtfbjde3eavsyk1jxwtc7a08.png",
    "description": "You radiate confidence as you walk through life, turning heads and commanding attention with your effortless presence.",
    "promptTitle": "Main character energy.",
    "promptId": 1,
    "bias": 9,
    "isGood": true
  },
  {
    "id": "hallway-heroics-2",
    "name": "Hallway Heroics",
    "path": "/memes/good/hallway-heroics-01jtfbjde2egv9gq8462g4bq50.png",
    "description": "You radiate confidence as you walk through life, turning heads and commanding attention with your effortless presence.",
    "promptTitle": "Main character energy.",
    "promptId": 1,
    "bias": 4,
    "isGood": true
  },
  {
    "id": "glitching-digital-control-center-1",
    "name": "Glitching Digital Control Center",
    "path": "/memes/good/glitching-digital-control-center-01jtw0q5etfndvdcf9eq5y5pss.png",
    "description": "Your unique energy is so powerful it breaks the digital systems trying to categorize you, causing beautiful chaos.",
    "promptTitle": "Your aura just disrupted the algorithm.",
    "promptId": 6,
    "bias": 8,
    "isGood": true
  },
  {
    "id": "glitching-digital-control-center-2",
    "name": "Glitching Digital Control Center",
    "path": "/memes/good/glitching-digital-control-center-01jtw0q5esewa85yxkrb0xycez.png",
    "description": "Your unique energy is so powerful it breaks the digital systems trying to categorize you, causing beautiful chaos.",
    "promptTitle": "Your aura just disrupted the algorithm.",
    "promptId": 6,
    "bias": 9,
    "isGood": true
  },
  {
    "id": "boho-vibe-overload-1",
    "name": "Boho Vibe Overload",
    "path": "/memes/good/boho-vibe-overload-01jtfbvygffm8ajr1786n9yrcg.png",
    "description": "You've reached a state of perfect balance between confidence and humility, attracting others through peaceful energy.",
    "promptTitle": "Rizz Zen achieved.",
    "promptId": 9,
    "bias": 4,
    "isGood": true
  },
  {
    "id": "boho-vibe-overload-2",
    "name": "Boho Vibe Overload",
    "path": "/memes/good/boho-vibe-overload-01jtfbvygefqza65784jdaazk7.png",
    "description": "You've reached a state of perfect balance between confidence and humility, attracting others through peaceful energy.",
    "promptTitle": "Rizz Zen achieved.",
    "promptId": 9,
    "bias": 8,
    "isGood": true
  },
  {
    "id": "rizzatao-the-catto-energy-observed-1",
    "name": "Rizzatao The Catto Energy Observed",
    "path": "/memes/good/rizzatao-the-catto-energy-observed-01jtw2jrh4f579bj791ejy3q74.png",
    "description": "Your unique energy is so powerful it breaks the digital systems trying to categorize you, causing beautiful chaos.",
    "promptTitle": "Your aura just disrupted the algorithm.",
    "promptId": 6,
    "bias": 8,
    "isGood": true
  },
  {
    "id": "rizzatao-the-catto-energy-observed-2",
    "name": "Rizzatao The Catto Energy Observed",
    "path": "/memes/good/rizzatao-the-catto-energy-observed-01jtw2jrh3f2g8z565dg0g8dn1.png",
    "description": "Your unique energy is so powerful it breaks the digital systems trying to categorize you, causing beautiful chaos.",
    "promptTitle": "Your aura just disrupted the algorithm.",
    "promptId": 6,
    "bias": 10,
    "isGood": true
  },
  {
    "id": "rizz-zen-achieved-1",
    "name": "Rizz Zen Achieved",
    "path": "/memes/good/rizz-zen-achieved-01jtw2gsc0fe9r6xmamx8qdknq.png",
    "description": "You've reached a state of perfect balance between confidence and humility, attracting others through peaceful energy.",
    "promptTitle": "Rizz Zen achieved.",
    "promptId": 9,
    "bias": 6,
    "isGood": true
  },
  {
    "id": "rizz-zen-achieved-2",
    "name": "Rizz Zen Achieved",
    "path": "/memes/good/rizz-zen-achieved-01jtw2gsbzevqbwxkyt0ac2ttq.png",
    "description": "You've reached a state of perfect balance between confidence and humility, attracting others through peaceful energy.",
    "promptTitle": "Rizz Zen achieved.",
    "promptId": 9,
    "bias": 7,
    "isGood": true
  },
  {
    "id": "sigma-mode-initiated-1",
    "name": "Sigma Mode Initiated",
    "path": "/memes/good/sigma-mode-initiated-01jtw2gb9tf0g8704552tbyvsm.png",
    "description": "Your timeless appeal combines classical elegance with modern allure, creating an aura of sophisticated mystery.",
    "promptTitle": "You're giving rizztastic renaissance mystique.",
    "promptId": 5,
    "bias": 9,
    "isGood": true
  },
  {
    "id": "sigma-mode-initiated-2",
    "name": "Sigma Mode Initiated",
    "path": "/memes/good/sigma-mode-initiated-01jtw2gb9ses3t1sfn1yw6gnst.png",
    "description": "Your timeless appeal combines classical elegance with modern allure, creating an aura of sophisticated mystery.",
    "promptTitle": "You're giving rizztastic renaissance mystique.",
    "promptId": 5,
    "bias": 8,
    "isGood": true
  },
  {
    "id": "spaceship-emergency-alert-1",
    "name": "Spaceship Emergency Alert",
    "path": "/memes/bad/spaceship-emergency-alert-01jtw1nrhtff89svr98z1362rp.png",
    "description": "An awkward moment that diminishes your social appeal.",
    "promptTitle": "Negative rizz energy",
    "promptId": 998,
    "bias": -2,
    "isGood": false
  },
  {
    "id": "spaceship-emergency-alert-2",
    "name": "Spaceship Emergency Alert",
    "path": "/memes/bad/spaceship-emergency-alert-01jtw1nrhsekq9mgff0f44xzh6.png",
    "description": "An awkward moment that diminishes your social appeal.",
    "promptTitle": "Negative rizz energy",
    "promptId": 998,
    "bias": -4,
    "isGood": false
  },
  {
    "id": "rizz-core-crisis-1",
    "name": "Rizz Core Crisis",
    "path": "/memes/bad/rizz-core-crisis-01jtfdvbs2fsbs57jw7zh4czgx.png",
    "description": "Your social skills have catastrophically imploded, creating a chain reaction of awkwardness that tears apart the fabric of conversation.",
    "promptTitle": "Quantum rizzwave collapse.",
    "promptId": 14,
    "bias": -8,
    "isGood": false
  },
  {
    "id": "rizz-core-crisis-2",
    "name": "Rizz Core Crisis",
    "path": "/memes/bad/rizz-core-crisis-01jtfdvbs1ekbt8pxycq0ycqqm.png",
    "description": "Your social skills have catastrophically imploded, creating a chain reaction of awkwardness that tears apart the fabric of conversation.",
    "promptTitle": "Quantum rizzwave collapse.",
    "promptId": 14,
    "bias": -10,
    "isGood": false
  },
  {
    "id": "rained-romance-ruin-1",
    "name": "Rained Romance Ruin",
    "path": "/memes/bad/rained-romance-ruin-01jtfbnr7eft9rp06awtc5y39j.png",
    "description": "Your charm has completely collapsed under pressure, leaving you stranded in a storm of rejection and awkwardness.",
    "promptTitle": "Your rizz has been obliterated.",
    "promptId": 11,
    "bias": -10,
    "isGood": false
  },
  {
    "id": "rained-romance-ruin-2",
    "name": "Rained Romance Ruin",
    "path": "/memes/bad/rained-romance-ruin-01jtfbnr7dfdc8qs3shvk3ppsw.png",
    "description": "Your charm has completely collapsed under pressure, leaving you stranded in a storm of rejection and awkwardness.",
    "promptTitle": "Your rizz has been obliterated.",
    "promptId": 11,
    "bias": -4,
    "isGood": false
  },
  {
    "id": "lonely-raw-hot-dog-1",
    "name": "Lonely Raw Hot Dog",
    "path": "/memes/bad/lonely-raw-hot-dog-01jtfbv8cdeb7vd8ks2y50xhmf.png",
    "description": "You're completely lacking in appeal, sitting on the sidelines while everyone else enjoys the social warmth.",
    "promptTitle": "Rizzless, like an uncooked glizzy.",
    "promptId": 13,
    "bias": -7,
    "isGood": false
  },
  {
    "id": "lonely-raw-hot-dog-2",
    "name": "Lonely Raw Hot Dog",
    "path": "/memes/bad/lonely-raw-hot-dog-01jtfbv8ccekgb4jzds965rwwz.png",
    "description": "You're completely lacking in appeal, sitting on the sidelines while everyone else enjoys the social warmth.",
    "promptTitle": "Rizzless, like an uncooked glizzy.",
    "promptId": 13,
    "bias": -9,
    "isGood": false
  },
  {
    "id": "human-reboot-animation-1",
    "name": "Human Reboot Animation",
    "path": "/memes/bad/human-reboot-animation-01jtw1gaq4fq5bvmt3snhssq2p.png",
    "description": "An awkward moment that diminishes your social appeal.",
    "promptTitle": "Negative rizz energy",
    "promptId": 998,
    "bias": -10,
    "isGood": false
  },
  {
    "id": "human-reboot-animation-2",
    "name": "Human Reboot Animation",
    "path": "/memes/bad/human-reboot-animation-01jtw1gaq3ffbs369pzdepnks4.png",
    "description": "An awkward moment that diminishes your social appeal.",
    "promptTitle": "Negative rizz energy",
    "promptId": 998,
    "bias": -5,
    "isGood": false
  },
  {
    "id": "flirting-under-heat-lamps-1",
    "name": "Flirting Under Heat Lamps",
    "path": "/memes/bad/flirting-under-heat-lamps-01jtw1fqatfj6as74gctm2mnqw.png",
    "description": "Your charm has completely collapsed under pressure, leaving you stranded in a storm of rejection and awkwardness.",
    "promptTitle": "Your rizz has been obliterated.",
    "promptId": 11,
    "bias": -3,
    "isGood": false
  },
  {
    "id": "flirting-under-heat-lamps-2",
    "name": "Flirting Under Heat Lamps",
    "path": "/memes/bad/flirting-under-heat-lamps-01jtw1fqase79vhxkdckbnvhz5.png",
    "description": "Your charm has completely collapsed under pressure, leaving you stranded in a storm of rejection and awkwardness.",
    "promptTitle": "Your rizz has been obliterated.",
    "promptId": 11,
    "bias": -10,
    "isGood": false
  },
  {
    "id": "empty-rizz-neon-car-1",
    "name": "Empty Rizz Neon Car",
    "path": "/memes/bad/empty-rizz-neon-car-01jtfc8c4keptv111e89d2b6cs.png",
    "description": "You've completely run out of charm and energy, stranded in the middle of nowhere with no social fuel left.",
    "promptTitle": "Rizz tank empty.",
    "promptId": 18,
    "bias": -3,
    "isGood": false
  },
  {
    "id": "empty-rizz-neon-car-2",
    "name": "Empty Rizz Neon Car",
    "path": "/memes/bad/empty-rizz-neon-car-01jtfc8c4jemp82rxe8p3jf80x.png",
    "description": "You've completely run out of charm and energy, stranded in the middle of nowhere with no social fuel left.",
    "promptTitle": "Rizz tank empty.",
    "promptId": 18,
    "bias": -10,
    "isGood": false
  },
  {
    "id": "cringe-meets-style-1",
    "name": "Cringe Meets Style",
    "path": "/memes/bad/cringe-meets-style-01jtfbpyhkfgabty7rpqc9dhkd.png",
    "description": "Your attempt at being cool has backfired spectacularly, triggering everyone's secondhand embarrassment sensors.",
    "promptTitle": "Main cringe energy detected.",
    "promptId": 12,
    "bias": -3,
    "isGood": false
  },
  {
    "id": "cringe-meets-style-2",
    "name": "Cringe Meets Style",
    "path": "/memes/bad/cringe-meets-style-01jtfbpyhjfs6bm834s7q968mv.png",
    "description": "Your attempt at being cool has backfired spectacularly, triggering everyone's secondhand embarrassment sensors.",
    "promptTitle": "Main cringe energy detected.",
    "promptId": 12,
    "bias": -9,
    "isGood": false
  },
  {
    "id": "chaotic-lab-catastrophe-1",
    "name": "Chaotic Lab Catastrophe",
    "path": "/memes/bad/chaotic-lab-catastrophe-01jtw18mzee4rbcax2paw0g0n5.png",
    "description": "An awkward moment that diminishes your social appeal.",
    "promptTitle": "Negative rizz energy",
    "promptId": 998,
    "bias": -2,
    "isGood": false
  },
  {
    "id": "chaotic-lab-catastrophe-2",
    "name": "Chaotic Lab Catastrophe",
    "path": "/memes/bad/chaotic-lab-catastrophe-01jtw18mzdfc4txb0dswqv9cpk.png",
    "description": "An awkward moment that diminishes your social appeal.",
    "promptTitle": "Negative rizz energy",
    "promptId": 998,
    "bias": -4,
    "isGood": false
  },
  {
    "id": "chaotic-desktop-dilemma-1",
    "name": "Chaotic Desktop Dilemma",
    "path": "/memes/bad/chaotic-desktop-dilemma-01jtfc1jt6fy8ss491s42ct1j1.png",
    "description": "Your attempt to be smooth has caused a catastrophic error in your social operating system, crashing all your functions.",
    "promptTitle": "Overflow Rizzion – Exception Raised.",
    "promptId": 19,
    "bias": -8,
    "isGood": false
  },
  {
    "id": "chaotic-desktop-dilemma-2",
    "name": "Chaotic Desktop Dilemma",
    "path": "/memes/bad/chaotic-desktop-dilemma-01jtfc1jt4e6pah9hn7zzcjpj9.png",
    "description": "Your attempt to be smooth has caused a catastrophic error in your social operating system, crashing all your functions.",
    "promptTitle": "Overflow Rizzion – Exception Raised.",
    "promptId": 19,
    "bias": -8,
    "isGood": false
  }
];

/**
 * Generate random attribute values based on the card's bias
 * @param bias The card's bias value (-1.0 to +1.0)
 * @returns Object with randomly generated attribute values
 */
export function generateAttributes(bias: number): {
  vibeLevel: number;
  swagger: number;
  cringeAvoidance: number;
} {
  // Base range for attribute generation (between -15 and +15)
  const minValue = -15;
  const maxValue = 15;
  
  // Scale the bias from -1.0...1.0 to -15...15 range
  const scaledBias = bias * 15;
  
  // Generate random values with bias influence
  // Each attribute gets a random value between -15 and +15, shifted by the scaled bias
  return {
    vibeLevel: Math.floor(getRandom() * (maxValue - minValue + 1)) + minValue + Math.floor(scaledBias),
    swagger: Math.floor(getRandom() * (maxValue - minValue + 1)) + minValue + Math.floor(scaledBias),
    cringeAvoidance: Math.floor(getRandom() * (maxValue - minValue + 1)) + minValue + Math.floor(scaledBias)
  };
}

/**
 * Calculate Rizz Level as the sum of all attributes
 * @param attributes The attribute values
 * @returns The calculated Rizz Level
 */
export function calculateRizzLevel(attributes: { vibeLevel: number; swagger: number; cringeAvoidance: number }): number {
  return attributes.vibeLevel + attributes.swagger + attributes.cringeAvoidance;
}

/**
 * Get a random image from all available memes
 * @param cardBias Optional bias parameter (-1.0 to 1.0) that influences good vs bad card selection
 * @returns A random meme image
 */
export function getRandomImage(cardBias?: number): MemeImage {
  // If no bias is provided, use completely random selection
  if (cardBias === undefined) {
    return memeImages[getRandomInt(0, memeImages.length)];
  }
  
  // Constrain bias to -1.0 to 1.0 range
  const bias = Math.max(-1.0, Math.min(1.0, cardBias));
  
  // Calculate probability of getting a good card based on bias
  // bias = -1.0 → 0% chance of good card
  // bias = 0.0 → 50% chance of good card
  // bias = 1.0 → 100% chance of good card
  const goodCardProbability = (bias + 1) / 2;
  
  // Determine if we should select a good or bad card
  const selectGoodCard = getRandom() < goodCardProbability;
  
  // Get all good or bad cards
  const filteredImages = memeImages.filter(img => img.isGood === selectGoodCard);
  
  // If we're selecting a good card and bias is high, favor cards with higher bias values
  // If we're selecting a bad card and bias is low, favor cards with lower bias values
  if (filteredImages.length > 0) {
    // Sort the cards by bias (ascending for bad cards, descending for good cards)
    const sortedImages = [...filteredImages].sort((a, b) => {
      if (selectGoodCard) {
        // For good cards with positive bias, sort by descending bias
        return b.bias - a.bias;
      } else {
        // For bad cards with negative bias, sort by ascending bias (more negative first)
        return a.bias - b.bias;
      }
    });
    
    // Calculate weighted index based on bias strength
    // Stronger bias means more likely to pick from the beginning of the sorted array
    const biasStrength = Math.abs(bias);
    const weightedIndex = Math.floor(getRandom() * getRandom() * sortedImages.length * (1 - biasStrength * 0.8));
    
    // Return the card at the weighted index
    return sortedImages[weightedIndex];
  }
  
  // Fallback to completely random selection if no cards match the filter
  return memeImages[getRandomInt(0, memeImages.length)];
}

/**
 * Get a random good (positive rizz) image
 * @returns A random good meme image
 */
export function getRandomGoodImage(): MemeImage {
  const goodImages = memeImages.filter(img => img.isGood);
  return goodImages[getRandomInt(0, goodImages.length)];
}

/**
 * Get a random bad (negative rizz) image
 * @returns A random bad meme image
 */
export function getRandomBadImage(): MemeImage {
  const badImages = memeImages.filter(img => !img.isGood);
  return badImages[getRandomInt(0, badImages.length)];
}

/**
 * Get a random image based on the specified type
 * @param type 'good', 'bad', or 'any'
 * @returns A random meme image of the specified type
 */
export function getRandomImageByType(type: 'good' | 'bad' | 'any'): MemeImage {
  switch (type) {
    case 'good':
      return getRandomGoodImage();
    case 'bad':
      return getRandomBadImage();
    case 'any':
    default:
      return getRandomImage();
  }
}

/**
 * Get all images of a specific type
 * @param type 'good', 'bad', or 'all'
 * @returns Array of meme images of the specified type
 */
export function getImagesByType(type: 'good' | 'bad' | 'all'): MemeImage[] {
  switch (type) {
    case 'good':
      return memeImages.filter(img => img.isGood);
    case 'bad':
      return memeImages.filter(img => !img.isGood);
    case 'all':
    default:
      return memeImages;
  }
}