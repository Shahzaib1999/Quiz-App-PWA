let version = "v1";

//Cache Files
let cacheFiles = [
  "/static/js/bundle.js",
  "/static/js/1.chunk.js",
  "/static/js/main.chunk.js",
  "/logo192.png",
  "/",
  "/index.html",
  "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"
];

// Install Service Woker
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(version).then((cache) => {
      // console.log("cacheFiles", cacheFiles);
      return cache.addAll(cacheFiles);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", function (e) {
  console.log("[ServiceWorker] Activate");
});

const options = {
  ignoreSearch: true,
  ignoreMethod: true,
  ignoreVary: true,
};
// Fetch Service Worker
self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches
        .match(event.request, options)
        .then((response) => {
          if (response) {
            // console.log(response);
            return response || fetch.response;
          }
        })
        .catch((err) => {
          console.log("err", err);
        })
    );
  }
});