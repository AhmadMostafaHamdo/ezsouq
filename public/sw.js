const CACHE_VERSION = 'v4'; // Increment this with each update
const CACHE_NAME = `ezsouq-${CACHE_VERSION}`;

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.jsx',
  '/src/index.css',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/user\/fliteredProducts/,
  /\/user\/product/,
  /\/user\/cities/,
  /\/get_categories/,
  /\/get_governorates/
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log(`Service Worker: Installing version ${CACHE_VERSION}...`);
  self.skipWaiting(); // Activate immediately
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(STATIC_FILES);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('ezsouq-') && cacheName !== CACHE_NAME)
          .map(cacheName => {
            console.log('Service Worker: Removing old cache', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      console.log('Service Worker: Activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle API requests
  if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    return event.respondWith(handleApiRequest(request));
  }
  
  // Handle static files with cache-first strategy
  event.respondWith(
    caches.match(request).then((response) => {
      // Return cached response if found
      const fetchPromise = fetch(request).then((networkResponse) => {
        // Update cache in background
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => response); // Fallback to cache if fetch fails

      return response || fetchPromise;
    })
  );
});

// Handle API requests with cache-first strategy for specific endpoints
async function handleApiRequest(request) {
  const url = new URL(request.url);
  const shouldCache = API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));

  if (shouldCache) {
    try {
      // Try cache first for cacheable API endpoints
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        // Fetch fresh data in background
        fetch(request).then(response => {
          if (response.ok) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, response.clone());
            });
          }
        });
        return cachedResponse;
      }

      // If not in cache, fetch from network
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      console.error('Service Worker: API request failed', error);
      // Return cached version if available
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  }

  // For non-cacheable API requests, just fetch
  return fetch(request);
}

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any queued offline actions here
  console.log('Service Worker: Performing background sync');
}

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');
  
  const data = event.data?.json() || {};
  const title = data.title || 'إشعار جديد';
  const options = {
    body: data.body || 'لديك إشعار جديد',
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: {
      url: data.url || '/'
    },
    dir: 'rtl', // Right-to-left for Arabic
    lang: 'ar'  // Arabic language
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
