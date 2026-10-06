/* ============================================================
   sw.js — minimal service worker (cache-first for shell)
   ============================================================ */
const VERSION = 'v1.0.0';
const SHELL = [
  './',
  './index.html',
  './404.html',
  './favicon.svg',
  './assets/manifest.webmanifest',
  './assets/css/enhancements.css',
  './assets/js/main.js',
  './assets/data/profile.json',
  './assets/data/skills.json',
  './assets/data/experience.json',
  './assets/data/projects.json',
  './assets/data/testimonials.json',
  './assets/data/dynamic.json',
  './assets/data/resume-roles.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL).catch(() => null))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Never cache cross-origin (countapi, github, web3forms, etc.)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((networkRes) => {
          // Cache valid same-origin responses
          if (networkRes && networkRes.status === 200 && networkRes.type === 'basic') {
            const copy = networkRes.clone();
            caches.open(VERSION).then((cache) => cache.put(req, copy));
          }
          return networkRes;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
