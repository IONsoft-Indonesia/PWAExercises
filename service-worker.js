var version = '::v1';
var cacheName = 'exercise-pwa' + version;

var fileCache = [
    'index.html'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                return cache.addAll(fileCache);
            })
    )
});

self.addEventListener('active', function (event) {
    event.waitUntil(caches.keys().then(function (keyList) {
        return Promise.all(keyList.map(
            function (key) {
                if (key !== cacheName) {
                    console.log('SW old removed', key);
                    return caches.delete(key);
                }
            }
        ))

    }))
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    )
});