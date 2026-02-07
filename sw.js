const CACHE_VERSION = "uc-cache-v4";
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-512.png",
  "./images/hero.jpg",
  "./images/favicon.jpg",
  "./images/profiteroles.png",
  "./images/signature.png",
  "./images/waffles.png",
  "./images/chocolate.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => !key.startsWith(CACHE_VERSION))
            .map((key) => caches.delete(key)),
        );
      })
      .then(() => self.clients.claim()),
  );
});

function staleWhileRevalidate(request) {
  return caches.open(RUNTIME_CACHE).then((cache) => {
    return cache.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    });
  });
}

function networkFirstNavigation(request) {
  return fetch(request)
    .then((response) => {
      return caches.open(RUNTIME_CACHE).then((cache) => {
        if (response && response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      });
    })
    .catch(() => {
      return caches.match(request).then((cached) => {
        return cached || caches.match("./index.html");
      });
    });
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(event.request));
    return;
  }

  if (isSameOrigin) {
    const isStaticAsset =
      /\.(?:css|js|png|jpg|jpeg|svg|webp|avif|ico|json)$/i.test(url.pathname);
    if (isStaticAsset) {
      event.respondWith(staleWhileRevalidate(event.request));
      return;
    }
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  );
});
