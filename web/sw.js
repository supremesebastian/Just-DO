// sw.js – Just Do Service Worker
// Cache-first strategy for app shell, network-first for external resources

const CACHE = "justdo-v15";
const APP_SHELL = [
  "./index.html",
  "./just-do-app.jsx",
  "./ios-frame.jsx",
  "./tweaks-panel.jsx",
  "./auth-screen.jsx",
  "./materials-screen.jsx",
  "./flashcards-screen.jsx",
  "./onboarding-screen.jsx",
  "./exams-notifications.jsx",
  "./config.js",
  "./firebase-service.js",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.json",
];

// Install: cache app shell
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for app shell, network-first for external (fonts, CDN)
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  const isExternal = url.origin !== self.location.origin;

  if (isExternal) {
    // Network-first for CDN (React, Babel, Fonts)
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Cache-first for local files
    e.respondWith(
      caches.match(e.request).then((cached) => {
        if (cached) return cached;
        return fetch(e.request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          return res;
        });
      })
    );
  }
});
