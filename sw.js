const CACHE_NAME = 'uc-cache-v3';
const ASSETS = [
    './',
    './index.html',
    './icon-512.png',
    './images/hero.jpg',
    './images/favicon.jpg',
    './images/profiteroles.png',
    './images/signature.png',
    './images/waffles.png',
    './images/chocolate.png',
    './manifest.json'
];

// Install: Cache core assets
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching assets');
            return cache.addAll(ASSETS);
        })
    );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            // Return cached version or fetch from network
            if (cached) {
                return cached;
            }
            
            return fetch(event.request).then((response) => {
                // Don't cache non-GET requests or error responses
                if (!response || response.status !== 200 || event.request.method !== 'GET') {
                    return response;
                }
                
                // Clone response for caching
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                
                return response;
            }).catch((error) => {
                // Failed to fetch - could be offline
                console.error('[SW] Fetch failed:', error);
                
                // Return offline fallback for navigation requests
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
                
                throw error;
            });
        })
    );
});

// Error tracking for 404s and other issues
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'ERROR_REPORT') {
        console.error('[SW] Error reported:', event.data.error);
        // Could send to analytics endpoint here
    }
});
