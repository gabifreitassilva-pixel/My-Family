const CACHE_NAME = 'mfp-cache-v5'; // Mudamos para v5 para forçar o telemóvel a atualizar
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e limpa versões antigas automaticamente
self.addEventListener('install', event => {
  self.skipWaiting(); // Força o novo service worker a tornar-se ativo imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Limpa caches antigas para libertar espaço e evitar conflitos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
