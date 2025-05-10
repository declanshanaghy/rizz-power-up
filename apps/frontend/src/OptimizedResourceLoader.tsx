import { useState, useEffect, useRef } from 'react';
import { MemeImage } from './memeImages';
import { MAX_MEDIA_INDEX } from './MediaUtils';

// Define resource types and priorities
export enum ResourceType {
  CRITICAL = 'critical',   // Must be loaded before app is interactive
  IMPORTANT = 'important', // Should be loaded soon after app is interactive
  OPTIONAL = 'optional'    // Can be loaded in the background
}

// Define a resource interface
export interface Resource {
  type: 'image' | 'audio' | 'video';
  src: string;
  priority: ResourceType;
  loaded?: boolean;
  size?: number;
}

// Define loader props
interface OptimizedResourceLoaderProps {
  onCriticalComplete?: () => void;  // Called when critical resources are loaded
  onAllComplete?: () => void;       // Called when all resources are loaded
  children?: React.ReactNode;       // Content to render while loading
}

// Define loading stats
interface LoadingStats {
  totalResources: number;
  loadedResources: number;
  criticalResourcesLoaded: number;
  totalCriticalResources: number;
  totalSizeBytes: number;
  startTime: number;
  endTime: number | null;
}

/**
 * Component that optimizes resource loading with prioritization
 */
const OptimizedResourceLoader: React.FC<OptimizedResourceLoaderProps> = ({ 
  onCriticalComplete, 
  onAllComplete,
  children 
}) => {
  // Track loading progress
  const [stats, setStats] = useState<LoadingStats>({
    totalResources: 0,
    loadedResources: 0,
    criticalResourcesLoaded: 0,
    totalCriticalResources: 0,
    totalSizeBytes: 0,
    startTime: Date.now(),
    endTime: null
  });
  
  // Track loading state
  const [criticalLoaded, setCriticalLoaded] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  
  // Use a ref to track if loading has already been done
  const hasLoaded = useRef<boolean>(false);
  
  // Resources to load
  const [resources, setResources] = useState<Resource[]>([]);

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

  // Function to preload an image and return its size
  const preloadImage = async (resource: Resource): Promise<number> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = async () => {
        try {
          // Fetch the image to get its size
          const response = await fetch(resource.src, { method: 'HEAD' });
          const size = parseInt(response.headers.get('content-length') || '0', 10);
          console.log(`Loaded image: ${resource.src} (${formatBytes(size)})`);
          resolve(size);
        } catch (error) {
          console.warn(`Could not get size for ${resource.src}:`, error);
          resolve(0);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${resource.src}`);
        reject(new Error(`Failed to load image: ${resource.src}`));
      };
      img.src = resource.src;
    });
  };

  // Function to preload audio and return its size
  const preloadAudio = async (resource: Resource): Promise<number> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.oncanplaythrough = async () => {
        try {
          // Fetch the audio to get its size
          const response = await fetch(resource.src, { method: 'HEAD' });
          const size = parseInt(response.headers.get('content-length') || '0', 10);
          console.log(`Loaded audio: ${resource.src} (${formatBytes(size)})`);
          resolve(size);
        } catch (error) {
          console.warn(`Could not get size for ${resource.src}:`, error);
          resolve(0);
        }
      };
      audio.onerror = () => {
        console.error(`Failed to load audio: ${resource.src}`);
        reject(new Error(`Failed to load audio: ${resource.src}`));
      };
      audio.src = resource.src;
      audio.load();
    });
  };

  // Function to preload video and return its size
  const preloadVideo = async (resource: Resource): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.oncanplaythrough = async () => {
        try {
          // Fetch the video to get its size
          const response = await fetch(resource.src, { method: 'HEAD' });
          const size = parseInt(response.headers.get('content-length') || '0', 10);
          console.log(`Loaded video: ${resource.src} (${formatBytes(size)})`);
          resolve(size);
        } catch (error) {
          console.warn(`Could not get size for ${resource.src}:`, error);
          resolve(0);
        }
      };
      video.onerror = () => {
        console.error(`Failed to load video: ${resource.src}`);
        reject(new Error(`Failed to load video: ${resource.src}`));
      };
      video.src = resource.src;
      video.load();
    });
  };

  // Collect all resources to be loaded
  useEffect(() => {
    const collectResources = async () => {
      const resourceList: Resource[] = [];
      
      // Add critical resources first (background, UI elements, etc.)
      resourceList.push({ 
        type: 'image', 
        src: '/bg1.png', 
        priority: ResourceType.CRITICAL 
      });
      
      // Add button images as critical
      resourceList.push({ 
        type: 'image', 
        src: '/buttons/rizz_button_active_new.png', 
        priority: ResourceType.CRITICAL 
      });
      resourceList.push({ 
        type: 'image', 
        src: '/buttons/rizz_button_hover_new.png', 
        priority: ResourceType.CRITICAL 
      });
      resourceList.push({ 
        type: 'image', 
        src: '/buttons/rizz_button_disabled_new.png', 
        priority: ResourceType.CRITICAL 
      });
      
      // Add basic sound effects as important
      resourceList.push({ 
        type: 'audio', 
        src: '/sounds/button_click.wav', 
        priority: ResourceType.IMPORTANT 
      });
      
      // Add meme images as optional (loaded in background)
      try {
        const { getImagesByType } = await import('./memeImages');
        const allImages: MemeImage[] = getImagesByType('all');
        
        allImages.forEach(image => {
          resourceList.push({ 
            type: 'image', 
            src: image.path, 
            priority: ResourceType.OPTIONAL 
          });
        });
      } catch (error) {
        console.error('Failed to import meme images:', error);
      }
      
      // Add bank videos and sounds as optional
      for (let i = 0; i <= MAX_MEDIA_INDEX; i++) {
        const index = i.toString().padStart(2, '0');
        resourceList.push({ 
          type: 'video', 
          src: `/video/bank_${index}.mp4`, 
          priority: ResourceType.OPTIONAL 
        });
        resourceList.push({ 
          type: 'audio', 
          src: `/sounds/bank_${index}.wav`, 
          priority: ResourceType.OPTIONAL 
        });
      }
      
      // Add give up videos and sounds as optional
      for (let i = 0; i <= MAX_MEDIA_INDEX; i++) {
        const index = i.toString().padStart(2, '0');
        resourceList.push({ 
          type: 'video', 
          src: `/video/giveup_${index}.mp4`, 
          priority: ResourceType.OPTIONAL 
        });
        resourceList.push({ 
          type: 'audio', 
          src: `/sounds/giveup_${index}.wav`, 
          priority: ResourceType.OPTIONAL 
        });
      }
      
      // Add card sounds as important
      for (let i = 0; i <= 4; i++) {
        const index = i.toString().padStart(2, '0');
        resourceList.push({ 
          type: 'audio', 
          src: `/sounds/card_good_${index}.wav`, 
          priority: ResourceType.IMPORTANT 
        });
        resourceList.push({ 
          type: 'audio', 
          src: `/sounds/card_bad_${index}.wav`, 
          priority: ResourceType.IMPORTANT 
        });
      }
      
      // Add other sounds as important
      resourceList.push({ 
        type: 'audio', 
        src: '/sounds/rizz_level_up.mp3', 
        priority: ResourceType.IMPORTANT 
      });
      
      // Set resources and update stats
      setResources(resourceList);
      
      const criticalCount = resourceList.filter(r => r.priority === ResourceType.CRITICAL).length;
      
      setStats(prev => ({
        ...prev,
        totalResources: resourceList.length,
        totalCriticalResources: criticalCount
      }));
      
      console.log(`Collected ${resourceList.length} resources (${criticalCount} critical)`);
    };
    
    collectResources();
  }, []);

  // Load resources based on priority
  useEffect(() => {
    // Skip if already loaded or no resources to load
    if (hasLoaded.current || resources.length === 0) {
      return;
    }
    
    // Mark as loaded to prevent future loading
    hasLoaded.current = true;
    
    const loadResources = async () => {
      console.log('Starting optimized resource loading...');
      const startTime = Date.now();
      
      let loadedCount = 0;
      let criticalLoadedCount = 0;
      let totalSize = 0;
      
      // First load critical resources
      const criticalResources = resources.filter(r => r.priority === ResourceType.CRITICAL);
      console.log(`Loading ${criticalResources.length} critical resources first...`);
      
      for (const resource of criticalResources) {
        try {
          let size = 0;
          
          if (resource.type === 'image') {
            size = await preloadImage(resource);
          } else if (resource.type === 'audio') {
            size = await preloadAudio(resource);
          } else if (resource.type === 'video') {
            size = await preloadVideo(resource);
          }
          
          loadedCount++;
          criticalLoadedCount++;
          totalSize += size;
          
          // Update stats
          setStats(prev => ({
            ...prev,
            loadedResources: loadedCount,
            criticalResourcesLoaded: criticalLoadedCount,
            totalSizeBytes: totalSize
          }));
        } catch (error) {
          console.error(`Failed to preload ${resource.src}:`, error);
        }
      }
      
      // Mark critical resources as loaded
      setCriticalLoaded(true);
      
      // Call critical complete callback
      if (onCriticalComplete) {
        onCriticalComplete();
      }
      
      console.log('Critical resources loaded, app can now be interactive');
      
      // Then load important resources
      const importantResources = resources.filter(r => r.priority === ResourceType.IMPORTANT);
      console.log(`Loading ${importantResources.length} important resources next...`);
      
      for (const resource of importantResources) {
        try {
          let size = 0;
          
          if (resource.type === 'image') {
            size = await preloadImage(resource);
          } else if (resource.type === 'audio') {
            size = await preloadAudio(resource);
          } else if (resource.type === 'video') {
            size = await preloadVideo(resource);
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
      
      // Finally load optional resources
      const optionalResources = resources.filter(r => r.priority === ResourceType.OPTIONAL);
      console.log(`Loading ${optionalResources.length} optional resources in background...`);
      
      // Load optional resources in batches to avoid overwhelming the browser
      const BATCH_SIZE = 5;
      for (let i = 0; i < optionalResources.length; i += BATCH_SIZE) {
        const batch = optionalResources.slice(i, i + BATCH_SIZE);
        
        // Load batch in parallel
        await Promise.all(batch.map(async (resource) => {
          try {
            let size = 0;
            
            if (resource.type === 'image') {
              size = await preloadImage(resource);
            } else if (resource.type === 'audio') {
              size = await preloadAudio(resource);
            } else if (resource.type === 'video') {
              size = await preloadVideo(resource);
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
        }));
      }
      
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      
      // Update final stats
      setStats(prev => ({
        ...prev,
        endTime
      }));
      
      // Mark all resources as loaded
      setAllLoaded(true);
      
      // Call all complete callback
      if (onAllComplete) {
        onAllComplete();
      }
      
      // Log final stats
      console.log('All resource loading complete!');
      console.log(`Loaded ${loadedCount} of ${resources.length} resources`);
      console.log(`Total size: ${formatBytes(totalSize)}`);
      console.log(`Load time: ${loadTime / 1000} seconds`);
      console.log(`Average speed: ${calculateSpeed(totalSize, loadTime)}`);
    };
    
    loadResources();
  }, [resources, onCriticalComplete, onAllComplete]);

  // Calculate loading progress percentage for critical resources
  const criticalProgress = stats.totalCriticalResources > 0 
    ? Math.round((stats.criticalResourcesLoaded / stats.totalCriticalResources) * 100) 
    : 0;
  
  // Calculate loading progress percentage for all resources
  const totalProgress = stats.totalResources > 0 
    ? Math.round((stats.loadedResources / stats.totalResources) * 100) 
    : 0;

  return (
    <>
      {/* Render children when critical resources are loaded */}
      {criticalLoaded && children}
      
      {/* Loading indicator for critical resources */}
      {!criticalLoaded && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            color: 'var(--color-accent-3, #00F5D4)',
            fontSize: 'clamp(1.5rem, 5vmin, 2rem)',
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 4vmin, 1.5rem)',
            textShadow: '0 0 10px var(--color-accent-3, #00F5D4)',
          }}>
            Loading Rizz Power-Up...
          </div>
          <div style={{
            width: 'min(80%, 300px)',
            height: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '5px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${criticalProgress}%`,
              height: '100%',
              backgroundColor: 'var(--color-accent-1, #F15BB5)',
              backgroundImage: 'linear-gradient(90deg, var(--color-accent-1, #F15BB5), var(--color-accent-2, #00BBF9), var(--color-accent-3, #00F5D4), var(--color-accent-4, #9B5DE5), var(--color-accent-5, #FEE440))',
              backgroundSize: '200% 100%',
              animation: 'gradient 2s linear infinite',
            }} />
          </div>
          <div style={{
            color: 'white',
            fontSize: 'clamp(0.8rem, 2.5vmin, 1rem)',
            marginTop: 'clamp(0.5rem, 2vmin, 0.75rem)',
          }}>
            {criticalProgress}% - Loading essential resources...
          </div>
          <style>
            {`
              @keyframes gradient {
                0% { background-position: 0% 50%; }
                100% { background-position: 200% 50%; }
              }
            `}
          </style>
        </div>
      )}
      
      {/* Background loading indicator for remaining resources */}
      {criticalLoaded && !allLoaded && (
        <div style={{
          position: 'fixed',
          bottom: 'clamp(5px, 1.5vmin, 10px)',
          right: 'clamp(5px, 1.5vmin, 10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: 'clamp(5px, 1.5vmin, 10px)',
          borderRadius: '5px',
          color: 'white',
          fontSize: 'clamp(0.7rem, 2vmin, 0.8rem)',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          maxWidth: '200px',
        }}>
          <div>Loading additional resources...</div>
          <div style={{
            width: '100%',
            height: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${totalProgress}%`,
              height: '100%',
              backgroundColor: 'var(--color-accent-3, #00F5D4)',
            }} />
          </div>
          <div style={{ fontSize: 'clamp(0.6rem, 1.8vmin, 0.7rem)' }}>
            {stats.loadedResources} of {stats.totalResources} ({totalProgress}%)
          </div>
        </div>
      )}
    </>
  );
};

export default OptimizedResourceLoader;