// ============================================================
// THE FORGE — Service Worker
// Controls what gets cached and when the cache gets refreshed.
// IMPORTANT: Bump CACHE_NAME version string on every deploy.
// That version mismatch is what triggers the old cache to clear.
// ============================================================

const CACHE_NAME = 'forge-v9.3';

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
  const url = new URL(event.request.url);

  // ── Network First for HTML ──────────────────────────────
  // Always try to fetch the latest index.html from the network.
  // Only fall back to cache if the network is unavailable (offline).
  // This means code changes show up immediately on every reload.
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Got a fresh response — update the cache copy too
          const toCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
          return response;
        })
        .catch(() => {
          // Network failed (offline) — serve cached version as fallback
          return caches.match(event.request);
        })
    );
    return;
  }

  // ── Cache First for everything else ────────────────────
  // Fonts, icons, and other static assets rarely change.
  // Serve from cache instantly, update cache in background.
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      });
    })
  );
});
