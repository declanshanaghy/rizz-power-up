/**
 * Utility functions for handling media files in the application
 */

// Maximum index for media files (0-based)
// This can be adjusted as more files are added
export const MAX_MEDIA_INDEX = 1;

/**
 * Generate a random index for media files
 * @returns A random index between 0 and MAX_MEDIA_INDEX
 */
export function getRandomMediaIndex(): number {
  return Math.floor(Math.random() * (MAX_MEDIA_INDEX + 1));
}

/**
 * Generate a path for a video file with a random index
 * @param basePrefix The base prefix for the file (e.g., 'bank', 'giveup')
 * @returns A path to a random video file
 */
export function getRandomVideoPath(basePrefix: string): string {
  const index = getRandomMediaIndex();
  return `/video/${basePrefix}_${index.toString().padStart(2, '0')}.mp4`;
}

/**
 * Generate a path for an audio file with a random index
 * @param basePrefix The base prefix for the file (e.g., 'bank', 'giveup')
 * @returns A path to a random audio file
 */
export function getRandomAudioPath(basePrefix: string): string {
  const index = getRandomMediaIndex();
  return `/sounds/${basePrefix}_${index.toString().padStart(2, '0')}.wav`;
}