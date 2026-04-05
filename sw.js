const CACHE_NAME = 'mfp-cache-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e guarda os ficheiros em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceta os pedidos à rede e usa a cache se estiver offline (sem internet)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrar na cache, retorna; se não, vai à internet
        return response || fetch(event.request);
      })
  );
});
