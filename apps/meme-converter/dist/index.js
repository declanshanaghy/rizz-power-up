#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const glob_1 = require("glob");
// Define paths
const FRONTEND_DIR = path.resolve(__dirname, '../../frontend');
const MEMES_DIR = path.join(FRONTEND_DIR, 'public/memes');
const GOOD_DIR = path.join(MEMES_DIR, 'good');
const BAD_DIR = path.join(MEMES_DIR, 'bad');
const OUTPUT_FILE = path.join(FRONTEND_DIR, 'src/memeImages.ts');
const PROMPTS_FILE = path.join(MEMES_DIR, 'rizz_image_prompts_no_text_overlay.md');
// Define regex for valid filenames
const VALID_FILENAME_REGEX = /^[0-9a-zA-Z-.]+\.png$/;
/**
 * Parse prompts from the markdown file
 */
async function parsePrompts() {
    const content = await fs.readFile(PROMPTS_FILE, 'utf-8');
    const lines = content.split('\n');
    const prompts = [];
    let currentType = 'good';
    let currentPrompt = null;
    let collectingDescription = false;
    let descriptionLines = [];
    for (const line of lines) {
        // Detect section type
        if (line.includes('## 🔥 Positive Rizz Meme Prompts')) {
            currentType = 'good';
            continue;
        }
        else if (line.includes('## 💀 Negative Rizz Meme Prompts')) {
            currentType = 'bad';
            continue;
        }
        else if (line.includes('## 🌸 Bonus')) {
            currentType = 'bonus';
            continue;
        }
        // Parse prompt header
        const promptMatch = line.match(/### (\d+)\. "([^"]+)"/);
        if (promptMatch) {
            // Save previous prompt if exists
            if (currentPrompt) {
                // Join all description lines and clean up
                if (descriptionLines.length > 0) {
                    currentPrompt.description = descriptionLines
                        .join(' ')
                        .replace(/\*\*[^*]+\*\*/g, '') // Remove bold text markers
                        .trim();
                }
                prompts.push(currentPrompt);
            }
            // Start new prompt
            currentPrompt = {
                id: parseInt(promptMatch[1]),
                title: promptMatch[2],
                description: '',
                type: currentType
            };
            // Reset description collection
            collectingDescription = true;
            descriptionLines = [];
            continue;
        }
        // Add description text
        if (currentPrompt && collectingDescription && line.trim() && !line.startsWith('#')) {
            // Skip lines that are just formatting instructions
            if (!line.trim().startsWith('**') || !line.trim().endsWith('**')) {
                descriptionLines.push(line.trim());
            }
        }
        // End of prompt is a blank line
        if (collectingDescription && line.trim() === '') {
            collectingDescription = false;
        }
    }
    // Add the last prompt
    if (currentPrompt) {
        if (descriptionLines.length > 0) {
            currentPrompt.description = descriptionLines
                .join(' ')
                .replace(/\*\*[^*]+\*\*/g, '') // Remove bold text markers
                .trim();
        }
        prompts.push(currentPrompt);
    }
    return prompts;
}
/**
 * Convert a filename to a URL-compatible format
 */
function convertToUrlCompatible(filename) {
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
async function renameFiles(directory) {
    const files = await (0, glob_1.glob)('*.png', { cwd: directory });
    const renamedMap = new Map();
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
        }
        else {
            renamedMap.set(file, file); // Already valid
        }
    }
    return renamedMap;
}
/**
 * Group images by their base name (without unique ID)
 */
function groupImagesByName(files) {
    const groups = new Map();
    for (const file of files) {
        // Extract base name without the unique ID
        const baseName = file.replace(/-01[a-z0-9]+\.png$/, '');
        if (!groups.has(baseName)) {
            groups.set(baseName, []);
        }
        groups.get(baseName).push(file);
    }
    return groups;
}
/**
 * Match images to prompts based on their names
 */
function matchImagesToPrompts(imageGroups, prompts) {
    const matches = new Map();
    // Define precise mapping of image base names to prompt IDs
    const imageToPromptIdMapping = {
        'hallway-heroics': 1, // "Main character energy."
        'maximal-clout-strut': 2, // "Exuding max clout per nanosecond."
        'boho-vibe-overload': 21, // "Spotted: Valley Girl rizz overload in a Benicia sunbeam."
        'meditative-cat-serenity': 20, // "Rizztao the catto energy observed."
        'primal-power-unleashed': 10, // "Unleashed primal rizz beast mode."
        'rained-romance-ruin': 11, // "Your rizz has been obliterated."
        'cringe-meets-style': 12, // "Main cringe energy detected."
        'lonely-raw-hot-dog': 13, // "Rizzless, like an uncooked glizzy."
        'chaotic-desktop-dilemma': 19, // "Overflow Rizzion – Exception Raised."
        'empty-rizz-neon-car': 18 // "Rizz tank empty."
    };
    // Force specific mappings for problematic cases
    const forceSpecificPrompts = (baseName, files, prompts) => {
        // Handle specific cases that need manual mapping
        if (baseName === 'meditative-cat-serenity' && files[0].includes('/good/')) {
            // This is in the good directory but should match prompt ID 20 (which is in the bad section)
            return prompts.find(p => p.id === 20); // "Rizztao the catto energy observed"
        }
        if (baseName === 'boho-vibe-overload') {
            // This should match the Valley Girl prompt
            return prompts.find(p => p.id === 21); // "Spotted: Valley Girl rizz overload"
        }
        return undefined;
    };
    // Match image groups to prompts
    for (const [baseName, files] of imageGroups.entries()) {
        // Try to find a matching prompt
        let matchedPrompt;
        // First try direct ID mapping (most precise)
        const promptId = imageToPromptIdMapping[baseName];
        if (promptId) {
            matchedPrompt = prompts.find(p => p.id === promptId);
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
                const matchesWord = baseNameWords.some(word => word.length > 3 && prompt.description.toLowerCase().includes(word.toLowerCase()));
                if (matchesWord) {
                    matchedPrompt = prompt;
                    break;
                }
            }
        }
        // If still no match, use a default prompt based on the directory
        if (!matchedPrompt) {
            const isGood = files[0].includes('/good/');
            const defaultPrompt = {
                id: 0,
                title: baseName.replace(/-/g, ' '),
                description: `A ${isGood ? 'positive' : 'negative'} rizz image showing ${baseName.replace(/-/g, ' ')}.`,
                type: isGood ? 'good' : 'bad'
            };
            matchedPrompt = defaultPrompt;
        }
        matches.set(baseName, { files, prompt: matchedPrompt });
    }
    return matches;
}
/**
 * Generate random stats for a meme image
 * @param isGood Whether the meme is a good (positive) or bad (negative) meme
 * @returns Object with random stats
 */
function generateRandomStats(isGood) {
    // For good memes: random values between 0 and +10
    // For bad memes: random values between -10 and 0
    const min = isGood ? 1 : -10;
    const max = isGood ? 10 : -1;
    return {
        rizzLevel: Math.floor(Math.random() * (max - min + 1)) + min,
        vibeLevel: Math.floor(Math.random() * (max - min + 1)) + min,
        swagger: Math.floor(Math.random() * (max - min + 1)) + min,
        cringeAvoidance: Math.floor(Math.random() * (max - min + 1)) + min
    };
}
/**
 * Generate the TypeScript file with image mappings
 */
async function generateTypeScriptFile(goodMatches, badMatches) {
    // Create arrays of MemeImage objects
    const goodImages = [];
    const badImages = [];
    // Process good images
    for (const [baseName, { files, prompt }] of goodMatches.entries()) {
        files.forEach((file, index) => {
            // Generate positive stats for good memes
            const stats = generateRandomStats(true);
            goodImages.push({
                id: `${baseName}-${index + 1}`,
                name: baseName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                path: `/memes/good/${file}`,
                description: prompt.description,
                promptTitle: prompt.title,
                promptId: prompt.id,
                // Add stats
                rizzLevel: stats.rizzLevel,
                vibeLevel: stats.vibeLevel,
                swagger: stats.swagger,
                cringeAvoidance: stats.cringeAvoidance
            });
        });
    }
    // Process bad images
    for (const [baseName, { files, prompt }] of badMatches.entries()) {
        files.forEach((file, index) => {
            // Generate negative stats for bad memes
            const stats = generateRandomStats(false);
            badImages.push({
                id: `${baseName}-${index + 1}`,
                name: baseName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                path: `/memes/bad/${file}`,
                description: prompt.description,
                promptTitle: prompt.title,
                promptId: prompt.id,
                // Add stats
                rizzLevel: stats.rizzLevel,
                vibeLevel: stats.vibeLevel,
                swagger: stats.swagger,
                cringeAvoidance: stats.cringeAvoidance
            });
        });
    }
    // Generate the TypeScript file content
    const content = `/**
 * Rizz Power-Up Meme Images
 * 
 * This file provides access to the meme images used in the Rizz Power-Up app.
 * Images are categorized as "good" (positive rizz) or "bad" (negative rizz).
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
  /** Rizz Level stat (-10 to +10) */
  rizzLevel: number;
  /** Vibe Level stat (-10 to +10) */
  vibeLevel: number;
  /** Swagger stat (-10 to +10) */
  swagger: number;
  /** Cringe Avoidance stat (-10 to +10) */
  cringeAvoidance: number;
}

/**
 * Good (positive rizz) meme images
 */
export const goodImages: MemeImage[] = ${JSON.stringify(goodImages, null, 2)};

/**
 * Bad (negative rizz) meme images
 */
export const badImages: MemeImage[] = ${JSON.stringify(badImages, null, 2)};

/**
 * All meme images (both good and bad)
 */
export const allImages: MemeImage[] = [...goodImages, ...badImages];

/**
 * Get a random good (positive rizz) image
 * @returns A random good meme image
 */
export function getRandomGoodImage(): MemeImage {
  return goodImages[Math.floor(Math.random() * goodImages.length)];
}

/**
 * Get a random bad (negative rizz) image
 * @returns A random bad meme image
 */
export function getRandomBadImage(): MemeImage {
  return badImages[Math.floor(Math.random() * badImages.length)];
}

/**
 * Get a random image from all available memes
 * @returns A random meme image
 */
export function getRandomImage(): MemeImage {
  return allImages[Math.floor(Math.random() * allImages.length)];
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
      return goodImages;
    case 'bad':
      return badImages;
    case 'all':
    default:
      return allImages;
  }
}
`;
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
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
// Run the main function
main();
