/**
 * MediaOptimizer.ts
 * Utility functions for optimizing and converting media files
 */

// Define supported image formats
export enum ImageFormat {
  PNG = 'png',
  JPEG = 'jpeg',
  WEBP = 'webp',
  AVIF = 'avif'
}

// Define supported audio formats
export enum AudioFormat {
  WAV = 'wav',
  MP3 = 'mp3',
  OGG = 'ogg'
}

// Define supported video formats
export enum VideoFormat {
  MP4 = 'mp4',
  WEBM = 'webm'
}

// Define image size presets
export enum ImageSize {
  THUMBNAIL = 'thumbnail', // 150px width
  SMALL = 'small',         // 300px width
  MEDIUM = 'medium',       // 600px width
  LARGE = 'large',         // 1200px width
  ORIGINAL = 'original'    // Original size
}

/**
 * Get the optimal image format based on browser support
 * @returns The best supported image format
 */
export function getOptimalImageFormat(): ImageFormat {
  // Check for AVIF support
  if (self.createImageBitmap && 'avif' in self.createImageBitmap) {
    return ImageFormat.AVIF;
  }
  
  // Check for WebP support
  const canvas = document.createElement('canvas');
  if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
    return ImageFormat.WEBP;
  }
  
  // Fallback to JPEG
  return ImageFormat.JPEG;
}

/**
 * Get the optimal audio format based on browser support
 * @returns The best supported audio format
 */
export function getOptimalAudioFormat(): AudioFormat {
  // For now, always return WAV since that's what we have in the project
  return AudioFormat.WAV;
  
  // In a real implementation with multiple formats available:
  /*
  const audio = document.createElement('audio');
  
  // Check for OGG support
  if (audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, '')) {
    return AudioFormat.OGG;
  }
  
  // Fallback to MP3
  return AudioFormat.MP3;
  */
}

/**
 * Get the optimal video format based on browser support
 * @returns The best supported video format
 */
export function getOptimalVideoFormat(): VideoFormat {
  // For now, always return MP4 since that's what we have in the project
  return VideoFormat.MP4;
  
  // In a real implementation with multiple formats available:
  /*
  const video = document.createElement('video');
  
  // Check for WebM support
  if (video.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, '')) {
    return VideoFormat.WEBM;
  }
  
  // Fallback to MP4
  return VideoFormat.MP4;
  */
}

/**
 * Generate an optimized image URL with the appropriate format and size
 * @param originalUrl The original image URL
 * @param size The desired image size
 * @param format The desired image format (defaults to optimal format)
 * @returns The optimized image URL
 */
export function getOptimizedImageUrl(
  originalUrl: string,
  _size: ImageSize = ImageSize.ORIGINAL,
  _format?: ImageFormat
): string {
  // For now, just return the original URL to avoid issues
  return originalUrl;
  
  // In a real implementation with image processing service:
  /*
  // If format is not specified, use the optimal format
  const targetFormat = format || getOptimalImageFormat();
  
  // Remove any existing query parameters
  const baseUrl = originalUrl.split('?')[0];
  
  // Add optimization parameters
  return `${baseUrl}?format=${targetFormat}&size=${size}`;
  */
}

/**
 * Generate an optimized audio URL with the appropriate format
 * @param originalUrl The original audio URL
 * @param format The desired audio format (defaults to optimal format)
 * @returns The optimized audio URL
 */
export function getOptimizedAudioUrl(
  originalUrl: string,
  _format?: AudioFormat
): string {
  // Always return the original URL since we don't have converted formats
  return originalUrl;
}

/**
 * Generate an optimized video URL with the appropriate format
 * @param originalUrl The original video URL
 * @param format The desired video format (defaults to optimal format)
 * @returns The optimized video URL
 */
export function getOptimizedVideoUrl(
  originalUrl: string,
  _format?: VideoFormat
): string {
  // Always return the original URL since we don't have converted formats
  return originalUrl;
}

/**
 * Create a lazy-loading image element
 * @param src The image source URL
 * @param alt The image alt text
 * @param className Optional CSS class name
 * @param width Optional width
 * @param height Optional height
 * @returns A lazy-loading image element
 */
export function createLazyImage(
  src: string,
  alt: string,
  className?: string,
  width?: number,
  height?: number
): HTMLImageElement {
  const img = document.createElement('img');
  
  // Set basic attributes
  img.alt = alt;
  if (className) img.className = className;
  if (width) img.width = width;
  if (height) img.height = height;
  
  // Set loading attribute to lazy
  img.loading = 'lazy';
  
  // Use original image URL
  img.src = src;
  
  return img;
}

/**
 * Create a lazy-loading audio element
 * @param src The audio source URL
 * @param preload Whether to preload the audio (default: 'none')
 * @returns A lazy-loading audio element
 */
export function createLazyAudio(
  src: string,
  preload: 'none' | 'metadata' | 'auto' = 'none'
): HTMLAudioElement {
  const audio = document.createElement('audio');
  
  // Set preload attribute
  audio.preload = preload;
  
  // Use original audio URL
  audio.src = src;
  
  return audio;
}

/**
 * Create a lazy-loading video element
 * @param src The video source URL
 * @param preload Whether to preload the video (default: 'none')
 * @param poster Optional poster image URL
 * @returns A lazy-loading video element
 */
export function createLazyVideo(
  src: string,
  preload: 'none' | 'metadata' | 'auto' = 'none',
  poster?: string
): HTMLVideoElement {
  const video = document.createElement('video');
  
  // Set preload attribute
  video.preload = preload;
  
  // Set poster if provided
  if (poster) {
    video.poster = poster;
  }
  
  // Use original video URL
  video.src = src;
  
  return video;
}

/**
 * Preload an image with a specific priority
 * @param src The image source URL
 * @param priority The loading priority ('high', 'low', or 'auto')
 */
export function preloadImage(src: string, priority: 'high' | 'low' | 'auto' = 'auto'): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.fetchPriority = priority;
  document.head.appendChild(link);
}

/**
 * Preload an audio file with a specific priority
 * @param src The audio source URL
 * @param priority The loading priority ('high', 'low', or 'auto')
 */
export function preloadAudio(src: string, priority: 'high' | 'low' | 'auto' = 'auto'): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'audio';
  link.href = src;
  link.fetchPriority = priority;
  document.head.appendChild(link);
}

/**
 * Preload a video file with a specific priority
 * @param src The video source URL
 * @param priority The loading priority ('high', 'low', or 'auto')
 */
export function preloadVideo(src: string, priority: 'high' | 'low' | 'auto' = 'auto'): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'video';
  link.href = src;
  link.fetchPriority = priority;
  document.head.appendChild(link);
}

/**
 * Set up a service worker for caching media resources
 * This should be called once when the application starts
 */
export function setupMediaCaching(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/media-cache-worker.js')
        .then(registration => {
          console.log('Media cache service worker registered:', registration);
        })
        .catch(error => {
          console.error('Media cache service worker registration failed:', error);
        });
    });
  }
}