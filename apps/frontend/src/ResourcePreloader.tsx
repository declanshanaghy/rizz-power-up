import React, { useEffect, useState, useRef } from 'react';
import { MemeImage } from './memeImages';
import { MAX_MEDIA_INDEX } from './MediaUtils';

interface ResourcePreloaderProps {
  onComplete?: () => void;
}

interface ResourceStats {
  totalResources: number;
  loadedResources: number;
  totalSizeBytes: number;
  startTime: number;
  endTime: number | null;
}

/**
 * Component that preloads all images, videos, and sounds used in the app
 */
const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({ onComplete }) => {
  const [stats, setStats] = useState<ResourceStats>({
    totalResources: 0,
    loadedResources: 0,
    totalSizeBytes: 0,
    startTime: Date.now(),
    endTime: null
  });
  
  // Use a ref to track if preloading has already been done
  const hasPreloaded = useRef<boolean>(false);

  useEffect(() => {
    // Skip preloading if it's already been done
    if (hasPreloaded.current) {
      console.log('Resources already preloaded, skipping...');
      if (onComplete) {
        onComplete();
      }
      return;
    }
    
    // Mark as preloaded to prevent future preloading
    hasPreloaded.current = true;
    // Function to preload an image and return its size
    const preloadImage = async (src: string): Promise<number> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = async () => {
          try {
            // Fetch the image to get its size
            const response = await fetch(src, { method: 'HEAD' });
            const size = parseInt(response.headers.get('content-length') || '0', 10);
            console.log(`Loaded image: ${src} (${formatBytes(size)})`);
            resolve(size);
          } catch (error) {
            console.warn(`Could not get size for ${src}:`, error);
            resolve(0);
          }
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          reject(new Error(`Failed to load image: ${src}`));
        };
        img.src = src;
      });
    };

    // Function to preload audio and return its size
    const preloadAudio = async (src: string): Promise<number> => {
      return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.oncanplaythrough = async () => {
          try {
            // Fetch the audio to get its size
            const response = await fetch(src, { method: 'HEAD' });
            const size = parseInt(response.headers.get('content-length') || '0', 10);
            console.log(`Loaded audio: ${src} (${formatBytes(size)})`);
            resolve(size);
          } catch (error) {
            console.warn(`Could not get size for ${src}:`, error);
            resolve(0);
          }
        };
        audio.onerror = () => {
          console.error(`Failed to load audio: ${src}`);
          reject(new Error(`Failed to load audio: ${src}`));
        };
        audio.src = src;
        audio.load();
      });
    };

    // Function to preload video and return its size
    const preloadVideo = async (src: string): Promise<number> => {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.oncanplaythrough = async () => {
          try {
            // Fetch the video to get its size
            const response = await fetch(src, { method: 'HEAD' });
            const size = parseInt(response.headers.get('content-length') || '0', 10);
            console.log(`Loaded video: ${src} (${formatBytes(size)})`);
            resolve(size);
          } catch (error) {
            console.warn(`Could not get size for ${src}:`, error);
            resolve(0);
          }
        };
        video.onerror = () => {
          console.error(`Failed to load video: ${src}`);
          reject(new Error(`Failed to load video: ${src}`));
        };
        video.src = src;
        video.load();
      });
    };

    // Format bytes to human-readable format
    const formatBytes = (bytes: number, decimals = 2): string => {
      if (bytes === 0) return '0 Bytes';
      
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    // Calculate download speed
    const calculateSpeed = (bytes: number, timeMs: number): string => {
      if (timeMs === 0) return '0 KB/s';
      
      const bytesPerSecond = bytes / (timeMs / 1000);
      return formatBytes(bytesPerSecond) + '/s';
    };

    // Main preload function
    const preloadAllResources = async () => {
      console.log('Starting resource preloading...');
      const startTime = Date.now();
      
      // Collect all resources to preload
      const resources: { type: 'image' | 'audio' | 'video', src: string }[] = [];
      
      // Add meme images
      try {
        const { getImagesByType } = await import('./memeImages');
        const allImages: MemeImage[] = getImagesByType('all');
        
        allImages.forEach(image => {
          resources.push({ type: 'image', src: image.path });
        });
      } catch (error) {
        console.error('Failed to import meme images:', error);
      }
      
      // Add bank videos and sounds
      for (let i = 0; i <= MAX_MEDIA_INDEX; i++) {
        const index = i.toString().padStart(2, '0');
        resources.push({ type: 'video', src: `/video/bank_${index}.mp4` });
        resources.push({ type: 'audio', src: `/sounds/bank_${index}.wav` });
      }
      
      // Add give up videos and sounds
      for (let i = 0; i <= MAX_MEDIA_INDEX; i++) {
        const index = i.toString().padStart(2, '0');
        resources.push({ type: 'video', src: `/video/giveup_${index}.mp4` });
        resources.push({ type: 'audio', src: `/sounds/giveup_${index}.wav` });
      }
      
      // Add card sounds
      for (let i = 0; i <= 4; i++) {
        const index = i.toString().padStart(2, '0');
        resources.push({ type: 'audio', src: `/sounds/card_good_${index}.wav` });
        resources.push({ type: 'audio', src: `/sounds/card_bad_${index}.wav` });
      }
      
      // Add other sounds
      resources.push({ type: 'audio', src: '/sounds/button_click.wav' });
      resources.push({ type: 'audio', src: '/sounds/rizz_level_up.mp3' });
      
      // Add background image
      resources.push({ type: 'image', src: '/bg1.png' });
      
      // Update total resources count
      setStats(prev => ({
        ...prev,
        totalResources: resources.length
      }));
      
      console.log(`Preloading ${resources.length} resources...`);
      
      let loadedCount = 0;
      let totalSize = 0;
      
      // Preload all resources
      for (const resource of resources) {
        try {
          let size = 0;
          
          if (resource.type === 'image') {
            size = await preloadImage(resource.src);
          } else if (resource.type === 'audio') {
            size = await preloadAudio(resource.src);
          } else if (resource.type === 'video') {
            size = await preloadVideo(resource.src);
          }
          
          loadedCount++;
          totalSize += size;
          
          // Update stats
          setStats(prev => ({
            ...prev,
            loadedResources: loadedCount,
            totalSizeBytes: totalSize
          }));
        } catch (error) {
          console.error(`Failed to preload ${resource.src}:`, error);
        }
      }
      
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      
      // Update final stats
      setStats(prev => ({
        ...prev,
        endTime
      }));
      
      // Log final stats
      console.log('Resource preloading complete!');
      console.log(`Loaded ${loadedCount} of ${resources.length} resources`);
      console.log(`Total size: ${formatBytes(totalSize)}`);
      console.log(`Load time: ${loadTime / 1000} seconds`);
      console.log(`Average speed: ${calculateSpeed(totalSize, loadTime)}`);
      
      // Call onComplete callback
      if (onComplete) {
        onComplete();
      }
    };
    
    // Start preloading
    preloadAllResources();
  }, [onComplete]);

  return null; // This component doesn't render anything
};

export default ResourcePreloader;