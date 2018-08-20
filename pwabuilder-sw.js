//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache';
var cacheName = 'ghilbi-cache';
var dataCacheName = 'ghilbi-data-v1';

var urlsToCache = [
      /* array of files to precache for the app */
      './',
      './index.html',
      './scripts.js',
      './style.css',
      './logo.png'
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Installing sw');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(urlsToCache);
    })
  );
});


//allow sw to control of current page
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var dataUrl = 'https://ghibliapi.herokuapp.com/films';
  if (e.request.url.indexOf(dataUrl) > -1) {
    console.log('[Service Worker] Fetch', e.request.url);
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
