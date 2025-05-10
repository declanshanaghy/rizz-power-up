/**
 * Media Cache Service Worker
 * This service worker handles caching of media resources for the Rizz Power-Up app
 */

// Cache name with version for easy updates
const CACHE_NAME = 'rizz-media-cache-v1';

// Resources to cache immediately on install
const PRECACHE_RESOURCES = [
  '/',
  '/index.html',
  '/bg1.png',
  '/buttons/rizz_button_active_new.png',
  '/buttons/rizz_button_hover_new.png',
  '/buttons/rizz_button_disabled_new.png'
];

// File extensions that should be cached
const CACHEABLE_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.webp', '.avif', // Images
  '.mp3', '.wav', '.ogg',                    // Audio
  '.mp4', '.webm'                            // Video
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Precaching media resources');
        return cache.addAll(PRECACHE_RESOURCES);
      })
      .then(() => self.skipWaiting()) // Activate immediately
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('rizz-media-cache-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim()) // Take control of clients immediately
  );
});

// Helper function to determine if a request should be cached
function shouldCache(url) {
  // Don't cache API requests
  if (url.includes('/api/')) {
    return false;
  }
  
  // Check file extensions
  return CACHEABLE_EXTENSIONS.some(ext => url.endsWith(ext));
}

// Helper function to add versioning to cache keys
function getCacheKey(request) {
  const url = new URL(request.url);
  
  // Add a version parameter to the URL if it doesn't have one
  if (!url.searchParams.has('v')) {
    url.searchParams.set('v', '1');
  }
  
  return new Request(url.toString(), {
    method: request.method,
    headers: request.headers,
    mode: request.mode,
    credentials: request.credentials,
    redirect: request.redirect
  });
}

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Check if this is a request that should be cached
  if (!shouldCache(event.request.url)) {
    return;
  }
  
  // Cache-first strategy for media files
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      const cacheKey = getCacheKey(event.request);
      
      return cache.match(cacheKey).then(cachedResponse => {
        if (cachedResponse) {
          // Return cached response
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(event.request).then(networkResponse => {
          // Check if we received a valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          
          // Clone the response - one to return, one to cache
          const responseToCache = networkResponse.clone();
          
          // Cache the response for future use
          cache.put(cacheKey, responseToCache);
          
          return networkResponse;
        });
      });
    })
  );
});

// Listen for messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CACHE_RESOURCE') {
    // Cache a specific resource
    const { url } = event.data;
    
    if (url && shouldCache(url)) {
      caches.open(CACHE_NAME).then(cache => {
        fetch(url).then(response => {
          if (response.ok) {
            const cacheKey = getCacheKey(new Request(url));
            cache.put(cacheKey, response);
            console.log('Cached resource:', url);
          }
        }).catch(error => {
          console.error('Failed to cache resource:', url, error);
        });
      });
    }
  } else if (event.data && event.data.type === 'CLEAR_CACHE') {
    // Clear the entire cache
    caches.delete(CACHE_NAME).then(() => {
      console.log('Media cache cleared');
    });
  }
});