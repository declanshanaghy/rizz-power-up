#!/usr/bin/env node

import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// Define paths
const FRONTEND_DIR = path.resolve(__dirname, '../../frontend');
const MEMES_DIR = path.join(FRONTEND_DIR, 'public/memes');
const GOOD_DIR = path.join(MEMES_DIR, 'good');
const BAD_DIR = path.join(MEMES_DIR, 'bad');
const OUTPUT_FILE = path.join(FRONTEND_DIR, 'src/memeImages.ts');
const PROMPTS_FILE = path.join(MEMES_DIR, 'rizz_image_prompts_no_text_overlay.md');

// Define regex for valid filenames
const VALID_FILENAME_REGEX = /^[0-9a-zA-Z-.]+\.png$/;

// Interface for meme image data
interface MemeImage {
  id: string;
  name: string;
  path: string;
  description: string;
  promptTitle?: string;
  promptId?: number;
  // Bias value for the game mechanics (-10 to +10)
  bias: number;
  // Whether this is a good (positive) or bad (negative) meme
  isGood: boolean;
}

// Interface for prompt data
interface Prompt {
  id: number;
  title: string;
  prompt: string;
  description: string;
  type: 'good' | 'bad' | 'bonus';
}

/**
 * Parse prompts from the markdown file
 */
async function parsePrompts(): Promise<Prompt[]> {
  const content = await fs.readFile(PROMPTS_FILE, 'utf-8');
  const lines = content.split('\n');
  
  const prompts: Prompt[] = [];
  let currentType: 'good' | 'bad' | 'bonus' = 'good';
  let currentPrompt: Partial<Prompt> | null = null;
  let collectingPrompt = false;
  let collectingDescription = false;
  let promptLines: string[] = [];
  let descriptionLines: string[] = [];
  
  for (const line of lines) {
    // Detect section type
    if (line.includes('## 🔥 Positive Rizz Meme Prompts')) {
      currentType = 'good';
      continue;
    } else if (line.includes('## 💀 Negative Rizz Meme Prompts')) {
      currentType = 'bad';
      continue;
    } else if (line.includes('## 🌸 Bonus')) {
      currentType = 'bonus';
      continue;
    }
    
    // Parse prompt header
    const promptMatch = line.match(/### (\d+)\. "([^"]+)"/);
    if (promptMatch) {
      // Save previous prompt if exists
      if (currentPrompt) {
        // Join all prompt lines and clean up
        if (promptLines.length > 0) {
          currentPrompt.prompt = promptLines
            .join(' ')
            .replace(/\*\*[^*]+\*\*/g, '') // Remove bold text markers
            .trim();
        }
        
        // Join all description lines and clean up
        if (descriptionLines.length > 0) {
          currentPrompt.description = descriptionLines
            .join(' ')
            .replace(/\*\*Description:\*\* /, '') // Remove description marker
            .trim();
        }
        
        prompts.push(currentPrompt as Prompt);
      }
      
      // Start new prompt
      currentPrompt = {
        id: parseInt(promptMatch[1]),
        title: promptMatch[2],
        prompt: '',
        description: '',
        type: currentType
      };
      
      // Reset collection
      collectingPrompt = true;
      collectingDescription = false;
      promptLines = [];
      descriptionLines = [];
      continue;
    }
    
    // Check for description marker
    if (line.includes('**Description:**')) {
      collectingPrompt = false;
      collectingDescription = true;
      descriptionLines.push(line.trim());
      continue;
    }
    
    // Add prompt text
    if (currentPrompt && collectingPrompt && line.trim() && !line.startsWith('#')) {
      // Skip lines that are just formatting instructions
      if (!line.trim().startsWith('**') || !line.trim().endsWith('**')) {
        promptLines.push(line.trim());
      }
    }
    
    // Add description text
    if (currentPrompt && collectingDescription && line.trim() && !line.startsWith('#')) {
      descriptionLines.push(line.trim());
    }
    
    // End of prompt is a blank line
    if ((collectingPrompt || collectingDescription) && line.trim() === '') {
      collectingPrompt = false;
      collectingDescription = false;
    }
  }
  
  // Add the last prompt
  if (currentPrompt) {
    // Join all prompt lines and clean up
    if (promptLines.length > 0) {
      currentPrompt.prompt = promptLines
        .join(' ')
        .replace(/\*\*[^*]+\*\*/g, '') // Remove bold text markers
        .trim();
    }
    
    // Join all description lines and clean up
    if (descriptionLines.length > 0) {
      currentPrompt.description = descriptionLines
        .join(' ')
        .replace(/\*\*Description:\*\* /, '') // Remove description marker
        .trim();
    }
    
    prompts.push(currentPrompt as Prompt);
  }
  
  return prompts;
}

/**
 * Convert a filename to a URL-compatible format
 */
function convertToUrlCompatible(filename: string): string {
  // Extract the base name without extension
  const baseName = path.basename(filename, path.extname(filename));
  
  // Extract the unique ID from the end of the filename
  const idMatch = baseName.match(/(01[a-z0-9]+)$/);
  const id = idMatch ? idMatch[1] : '';
  
  // Extract the descriptive part (remove date and "simple_compose" parts)
  let descriptivePart = baseName
    .replace(/^\d+_\d+_/, '') // Remove date prefix
    .replace(/_simple_compose_01[a-z0-9]+$/, ''); // Remove "simple_compose" and ID suffix
  
  // Convert to kebab-case
  descriptivePart = descriptivePart
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  
  // Combine parts
  return `${descriptivePart}-${id}${path.extname(filename)}`;
}

/**
 * Rename files to be URL compatible
 */
async function renameFiles(directory: string): Promise<Map<string, string>> {
  const files = await glob('*.png', { cwd: directory });
  const renamedMap = new Map<string, string>();
  
  for (const file of files) {
    if (!VALID_FILENAME_REGEX.test(file)) {
      const newFilename = convertToUrlCompatible(file);
      const oldPath = path.join(directory, file);
      const newPath = path.join(directory, newFilename);
      
      // Only rename if the new filename is different
      if (file !== newFilename) {
        console.log(`Renaming: ${file} -> ${newFilename}`);
        await fs.rename(oldPath, newPath);
      }
      
      renamedMap.set(file, newFilename);
    } else {
      renamedMap.set(file, file); // Already valid
    }
  }
  
  return renamedMap;
}

/**
 * Group images by their base name (without unique ID)
 */
function groupImagesByName(files: string[]): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  
  for (const file of files) {
    // Extract base name without the unique ID
    const baseName = file.replace(/-01[a-z0-9]+\.png$/, '');
    
    if (!groups.has(baseName)) {
      groups.set(baseName, []);
    }
    
    groups.get(baseName)!.push(file);
  }
  
  return groups;
}

/**
 * Match images to prompts based on their names
 */
function matchImagesToPrompts(
  imageGroups: Map<string, string[]>,
  prompts: Prompt[]
): Map<string, { files: string[], prompt: Prompt }> {
  const matches = new Map<string, { files: string[], prompt: Prompt }>();
  
  // Define precise mapping of image base names to prompt IDs
  const imageToPromptIdMapping: Record<string, number> = {
    'hallway-heroics': 1,         // "Main character energy."
    'maximal-clout-strut': 2,     // "Exuding max clout per nanosecond."
    'boho-vibe-overload': 9,      // "Rizz Zen achieved."
    'meditative-cat-serenity': 20, // "Rizztao the catto energy observed."
    'primal-power-unleashed': 10, // "Unleashed primal rizz beast mode."
    'rained-romance-ruin': 11,    // "Your rizz has been obliterated."
    'cringe-meets-style': 12,     // "Main cringe energy detected."
    'lonely-raw-hot-dog': 13,     // "Rizzless, like an uncooked glizzy."
    'chaotic-desktop-dilemma': 19, // "Overflow Rizzion – Exception Raised."
    'empty-rizz-neon-car': 18,    // "Rizz tank empty."
    'rizz-core-crisis': 14        // "Quantum rizzwave collapse."
  };
  
  // Force specific mappings for problematic cases
  const forceSpecificPrompts = (baseName: string, files: string[], prompts: Prompt[]): Prompt | undefined => {
    // Handle specific cases that need manual mapping
    if (baseName === 'meditative-cat-serenity' && files[0].includes('/good/')) {
      // Create a custom prompt for meditative-cat-serenity in the good directory
      return {
        id: 100, // Use a high ID to avoid conflicts
        title: "Rizztao the catto energy observed",
        prompt: "A meditative cat sits cross-legged on a mountain edge, surrounded by glowing paw prints, incense smoke, and floating fish emojis.",
        description: "You've achieved a zen-like state of feline indifference that paradoxically makes everyone want your attention and approval.",
        type: "good"
      };
    }
    
    if (baseName === 'boho-vibe-overload') {
      // This should match the Rizz Zen prompt
      return prompts.find(p => p.id === 9); // "Rizz Zen achieved"
    }
    
    return undefined;
  };
  
  // Match image groups to prompts
  for (const [baseName, files] of imageGroups.entries()) {
    // Try to find a matching prompt
    let matchedPrompt: Prompt | undefined;
    
    // First try forced specific prompts for special cases
    matchedPrompt = forceSpecificPrompts(baseName, files, prompts);
    
    // If no forced prompt, try direct ID mapping
    if (!matchedPrompt) {
      const promptId = imageToPromptIdMapping[baseName];
      if (promptId) {
        matchedPrompt = prompts.find(p => p.id === promptId);
      }
    }
    
    // If no direct ID mapping, try matching by title keywords
    if (!matchedPrompt) {
      // Create a normalized version of the base name for comparison
      const normalizedBaseName = baseName.replace(/-/g, ' ');
      
      // Try to find a prompt with a similar title
      for (const prompt of prompts) {
        const normalizedTitle = prompt.title.toLowerCase();
        
        // Check if the base name contains keywords from the title or vice versa
        if (normalizedBaseName.includes(normalizedTitle) ||
            normalizedTitle.includes(normalizedBaseName) ||
            prompt.description.toLowerCase().includes(normalizedBaseName)) {
          matchedPrompt = prompt;
          break;
        }
      }
    }
    
    // If still no match, try matching by description keywords
    if (!matchedPrompt) {
      const baseNameWords = baseName.split('-');
      
      for (const prompt of prompts) {
        // Check if any word from the base name appears in the description
        const matchesWord = baseNameWords.some(word =>
          word.length > 3 && prompt.description.toLowerCase().includes(word.toLowerCase())
        );
        
        if (matchesWord) {
          matchedPrompt = prompt;
          break;
        }
      }
    }
    
    // If still no match, use a default prompt based on the directory
    if (!matchedPrompt) {
      const isGood = files[0].includes('/good/');
      const defaultPrompt: Prompt = {
        id: 0,
        title: baseName.replace(/-/g, ' '),
        prompt: `A ${isGood ? 'positive' : 'negative'} rizz image showing ${baseName.replace(/-/g, ' ')}.`,
        description: `A ${isGood ? 'charming' : 'awkward'} moment that ${isGood ? 'enhances' : 'diminishes'} your social appeal.`,
        type: isGood ? 'good' : 'bad'
      };
      matchedPrompt = defaultPrompt;
    }
    
    matches.set(baseName, { files, prompt: matchedPrompt });
  }
  
  return matches;
}

/**
 * Generate bias value for a meme image
 * @param isGood Whether the meme is a good (positive) or bad (negative) meme
 * @returns Bias value between -10 and +10
 */
function generateBias(isGood: boolean): number {
  if (isGood) {
    // For good memes: bias between +3 and +10 (favoring positive outcomes)
    return Math.floor(Math.random() * 8) + 3;
  } else {
    // For bad memes: bias between -10 and -2 (less severe negative outcomes)
    return Math.floor(Math.random() * 9) - 10;
  }
}

/**
 * Generate the TypeScript file with image mappings
 */
async function generateTypeScriptFile(
  goodMatches: Map<string, { files: string[], prompt: Prompt }>,
  badMatches: Map<string, { files: string[], prompt: Prompt }>
): Promise<void> {
  // Create arrays of MemeImage objects
  const memeImages: MemeImage[] = [];
  
  // Process good images
  for (const [baseName, { files, prompt }] of goodMatches.entries()) {
    files.forEach((file, index) => {
      // Generate positive bias for good memes
      const bias = generateBias(true);
      
      memeImages.push({
        id: `${baseName}-${index + 1}`,
        name: baseName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        path: `/memes/good/${file}`,
        description: prompt.description, // Use the description field instead of the prompt
        promptTitle: prompt.title,
        promptId: prompt.id,
        bias: bias,
        isGood: true
      });
    });
  }
  
  // Process bad images
  for (const [baseName, { files, prompt }] of badMatches.entries()) {
    files.forEach((file, index) => {
      // Generate negative bias for bad memes
      const bias = generateBias(false);
      
      memeImages.push({
        id: `${baseName}-${index + 1}`,
        name: baseName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        path: `/memes/bad/${file}`,
        description: prompt.description, // Use the description field instead of the prompt
        promptTitle: prompt.title,
        promptId: prompt.id,
        bias: bias,
        isGood: false
      });
    });
  }
  
  // Generate the TypeScript file content
  const content = `/**
 * Rizz Power-Up Meme Images
 * 
 * This file provides access to the meme images used in the Rizz Power-Up app.
 * 
 * THIS FILE IS AUTO-GENERATED BY THE MEME-CONVERTER TOOL.
 * DO NOT EDIT DIRECTLY - CHANGES WILL BE OVERWRITTEN.
 */

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
  /** Bias value that influences attribute generation (-10 to +10) */
  bias: number;
  /** Whether this is a good (positive) or bad (negative) meme */
  isGood: boolean;
}

/**
 * All meme images
 */
export const memeImages: MemeImage[] = ${JSON.stringify(memeImages, null, 2)};

/**
 * Generate random attribute values based on the card's bias
 * @param bias The card's bias value (-10 to +10)
 * @returns Object with randomly generated attribute values
 */
export function generateAttributes(bias: number): {
  vibeLevel: number;
  swagger: number;
  cringeAvoidance: number;
} {
  // Base range for attribute generation
  const range = 5;
  
  // Generate random values with bias influence
  // Higher bias means more likely to get positive values
  return {
    vibeLevel: Math.floor(Math.random() * range * 2) - range + Math.floor(bias / 2),
    swagger: Math.floor(Math.random() * range * 2) - range + Math.floor(bias / 2),
    cringeAvoidance: Math.floor(Math.random() * range * 2) - range + Math.floor(bias / 2)
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
 * @returns A random meme image
 */
export function getRandomImage(): MemeImage {
  return memeImages[Math.floor(Math.random() * memeImages.length)];
}

/**
 * Get a random good (positive rizz) image
 * @returns A random good meme image
 */
export function getRandomGoodImage(): MemeImage {
  const goodImages = memeImages.filter(img => img.isGood);
  return goodImages[Math.floor(Math.random() * goodImages.length)];
}

/**
 * Get a random bad (negative rizz) image
 * @returns A random bad meme image
 */
export function getRandomBadImage(): MemeImage {
  const badImages = memeImages.filter(img => !img.isGood);
  return badImages[Math.floor(Math.random() * badImages.length)];
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
}`;

  await fs.writeFile(OUTPUT_FILE, content);
  console.log(`Generated TypeScript file: ${OUTPUT_FILE}`);
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Starting meme-converter...');
    
    // Parse prompts
    console.log('Parsing prompts...');
    const prompts = await parsePrompts();
    console.log(`Found ${prompts.length} prompts`);
    
    // Rename files in the good directory
    console.log('Processing good meme images...');
    const goodRenamedMap = await renameFiles(GOOD_DIR);
    const goodFiles = Array.from(goodRenamedMap.values());
    
    // Rename files in the bad directory
    console.log('Processing bad meme images...');
    const badRenamedMap = await renameFiles(BAD_DIR);
    const badFiles = Array.from(badRenamedMap.values());
    
    // Group images by name
    const goodGroups = groupImagesByName(goodFiles);
    const badGroups = groupImagesByName(badFiles);
    
    // Match images to prompts
    const goodMatches = matchImagesToPrompts(goodGroups, prompts.filter(p => p.type === 'good'));
    const badMatches = matchImagesToPrompts(badGroups, prompts.filter(p => p.type === 'bad' || p.type === 'bonus'));
    
    // Generate TypeScript file
    console.log('Generating TypeScript file...');
    await generateTypeScriptFile(goodMatches, badMatches);
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the main function
main();