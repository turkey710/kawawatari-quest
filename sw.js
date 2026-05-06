const CACHE_NAME = "kawawatari-quest-v7-ending-layout-fix";

const CACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./images/ogp.png",
  "./images/icon-512.png",
  "./images/apple-touch-icon.png",
  "./images/favicon.png",
  "./images/ending.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CACHE_URLS))
      .catch((error) => {
        console.warn("Service worker cache install failed:", error);
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .catch((error) => {
        console.warn("Service worker cache cleanup failed:", error);
      })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => cachedResponse || fetch(event.request))
      .catch(() => fetch(event.request))
  );
});
