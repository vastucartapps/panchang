const CACHE_NAME = "panchang-v2";
const STATIC_ASSETS = [
  "/manifest.json",
  "/images/icon-192.png",
  "/images/icon-512.png",
  "/images/vastucart-logo.png",
  "/images/vastucart-favicon.png",
];

// Install — cache static assets only
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — only serve static assets from cache; let HTML/API go to network
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Only cache static assets (images, manifest, fonts)
  const isStaticAsset =
    url.pathname.startsWith("/images/") ||
    url.pathname === "/manifest.json" ||
    url.pathname.startsWith("/_next/static/");

  if (!isStaticAsset) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
