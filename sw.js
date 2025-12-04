// Service Worker for Victorian Pallet Supply
// Provides offline capability and faster repeat visits

const CACHE_NAME = 'vps-v1.0.0';
const RUNTIME_CACHE = 'vps-runtime';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/home/',
  '/home/index.html',
  '/src/css/main.css',
  '/src/css/style.css',
  '/src/css/variables.css',
  '/src/css/header.css',
  '/src/css/footer.css',
  '/src/css/reset.css',
  '/src/javascript/include.js',
  '/src/javascript/form-handler.js',
  '/src/javascript/products-loader.js',
  '/src/javascript/snowflakes.js',
  '/src/assets/images/general-site/FORKMAN_FINAL_CHRISTMAS.png',
  '/src/assets/images/general-site/vps-logo.png',
  '/src/data/products.json'
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Precaching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => {
            console.log('[ServiceWorker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests and non-GET requests
  if (url.origin !== location.origin || request.method !== 'GET') {
    return;
  }

  // Skip API calls (web3forms)
  if (url.href.includes('web3forms.com')) {
    return;
  }

  // Skip Google Fonts
  if (url.href.includes('googleapis.com') || url.href.includes('gstatic.com')) {
    return event.respondWith(fetch(request));
  }

  // Strategy: Cache First, falling back to Network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached response and update cache in background
        event.waitUntil(
          fetch(request).then((response) => {
            if (response && response.status === 200) {
              return caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, response.clone());
              });
            }
          }).catch(() => {
            // Fetch failed, but we have cache - no action needed
          })
        );
        return cachedResponse;
      }

      // Not in cache - fetch from network
      return fetch(request).then((response) => {
        // Don't cache if not a success response
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Cache successful responses (images, CSS, JS, HTML)
        if (
          request.url.match(/\.(jpg|jpeg|png|gif|svg|css|js|html|json)$/i) ||
          request.url.includes('/home/') ||
          request.url.includes('/products/') ||
          request.url.includes('/services/') ||
          request.url.includes('/gallery/')
        ) {
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
        }

        return response;
      }).catch(() => {
        // Network failed and no cache - return offline page or error
        if (request.destination === 'document') {
          return new Response(
            '<html><body><h1>Offline</h1><p>You are currently offline. Please check your connection.</p></body></html>',
            {
              headers: { 'Content-Type': 'text/html' }
            }
          );
        }
      });
    })
  );
});

// Message event - for cache updates
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

