Const CACHE_NAME = 'pwa_el_manantial-v3';

// Rutas ajustadas para coincidir con cómo el servidor sirve los archivos estáticos
const urlsToCache = [
  '/',
  '/login.html',
  '/index.html',
  '/ordeno.html',
  '/inventario.html',
  '/salud.html',
  '/reportes.html',
  '/historial.html',
  '/unidad.html',
  '/usuarios.html',
  '/css/custom.css',
  '/css/input.css',
  '/local-db-fallback.js',
  '/js/sync.js',
  '/js/app.js',
  '/manifest.json'
];

// Instalación del Service Worker y almacenamiento en caché robusto
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cacheando archivos estáticos...');
        // Usamos addAll de forma segura o individual si alguna ruta puede opcionalmente fallar
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).catch(err => {
              console.warn(`No se pudo cachear el archivo: ${url}`, err);
            });
          })
        );
      })
  );
  self.skipWaiting();
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Eliminando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptación de peticiones (Modo Offline con estrategia Cache First)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then(networkResponse => {
            return networkResponse;
          })
          .catch(() => {
            const acceptHeader = event.request.headers.get('accept');
            if (acceptHeader && acceptHeader.includes('text/html')) {
              return caches.match('/login.html');
            }
          });
      })
  );
});
