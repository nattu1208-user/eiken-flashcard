// Service Worker - オフライン対応キャッシュ
// 作成者: Sekimoto Naoto
// 作成日: 2026-03-28

const CACHE_NAME = 'eiken-flashcard-v1';
const ASSETS = [
  '/eiken-flashcard/',
  '/eiken-flashcard/index.html',
  '/eiken-flashcard/manifest.json',
  '/eiken-flashcard/icons/icon-192.png',
  '/eiken-flashcard/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
