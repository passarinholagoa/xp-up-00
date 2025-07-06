
const CACHE_NAME = 'taskquest-v1';

// Basic service worker for PWA
self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker ativado');
  self.clients.claim();
});

// Simple fetch handler
self.addEventListener('fetch', event => {
  // Skip non-GET requests and external requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      // Fallback for offline scenarios
      if (event.request.destination === 'document') {
        return caches.match('/') || fetch('/');
      }
    })
  );
});
