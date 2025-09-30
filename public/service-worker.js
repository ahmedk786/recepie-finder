const CACHE_NAME = 'recipe-finder-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/index.css'
];

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (ev) => {
  const url = new URL(ev.request.url);
  // For API requests, try network first then fallback to cache
  if (url.hostname.includes('themealdb.com')) {
    ev.respondWith(
      fetch(ev.request)
        .then((r) => {
          // optionally cache responses
          return r;
        })
        .catch(() => caches.match(ev.request))
    );
    return;
  }
  // For other requests, use cache-first
  ev.respondWith(
    caches.match(ev.request).then((cached) => cached || fetch(ev.request))
  );
});
