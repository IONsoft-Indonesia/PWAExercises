const version = '::v1';
const cacheName = 'latihan-pwa' + version;

const fileToCache = [
    'index.html'
];

//install
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('open caches');
                return cache.addAll(fileToCache);
            })
    )
});

//activated
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(
                function (key) {
                    if (key !== cacheName) {
                        console.log('SW old dihapus', key);
                        return caches.delete(key);
                    }
                }
            ))
        })
    )
});

//fetch
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
    )
});