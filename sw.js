self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('pages').then(cache => {
      return cache.addAll(['/offline.html']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.open('pages').then(async cache => {
      if (navigator.connection.effectiveType === '3g') {
        return await fetch('/3g.html');
      }

      if (navigator.connection.effectiveType === '2g') {
        return await fetch('/2g.html');
      }

      const [res, error] = await fetch(e.request)
        .then(res => [res, false])
        .catch(err => [undefined, true]);

      if (!error) {
        return res;
      }

      return await cache.match('/offline.html');
    })
  );
});