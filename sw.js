// ============================================================
// THE FORGE — Service Worker
// Controls what gets cached and when the cache gets refreshed.
// IMPORTANT: Bump CACHE_NAME version string on every deploy.
// That version mismatch is what triggers the old cache to clear.
// ============================================================

const CACHE_NAME = 'forge-v1.1';

// These are the files we pre-cache when the SW first installs.
// The app can load fully from cache even with no network.
const ASSETS = [
  '/the_forge/',
  '/the_forge/index.html'
];

// ---- INSTALL ----
// Fires once when the SW is first registered.
// We open the cache and store our core files immediately.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  // Don't wait for old SW to finish — take control immediately.
  self.skipWaiting();
});

// ---- ACTIVATE ----
// Fires after install. This is where we clean up OLD caches.
// If CACHE_NAME changed (e.g. forge-v1 → forge-v2), the old
// cache gets deleted here so stale files don't linger.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  // Take control of all open tabs immediately, not just new ones.
  self.clients.claim();
});

// ---- FETCH ----
// Every network request your app makes passes through here.
// Strategy: Cache First, then Network fallback.
// Try the cache → if miss, hit the network → cache the response.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Only cache valid responses (not errors, not opaque cross-origin)
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        // Clone the response — it's a stream, can only be consumed once.
        // One copy goes to the cache, one goes to the browser.
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      });
    })
  );
});
