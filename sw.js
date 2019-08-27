self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('pages').then(cache => {
      return cache.addAll(['/offline.html', '/offline.jpeg']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.open('pages').then(async cache => {
      if (navigator.connection.effectiveType === '3g') {
        if (e.request.destination !== 'document') {
          return await fetch(e.request);
        }

        return await fetch('/3g.html');
      }

      if (navigator.connection.effectiveType === '2g') {
        if (e.request.destination === 'document') {
          return await fetch('/2g.html');
        }

        if(e.request.destination === 'image') {
          return await fetch('/2g.jpeg');
        }

        return await fetch(e.request);
      }

      const [res, error] = await fetch(e.request)
        .then(res => [res, false])
        .catch(err => [undefined, true]);

      if (!error) {
        return res;
      }

      if (e.request.destination === 'image') {
        return cache.match('/offline.jpeg');
      }

      return await cache.match('/offline.html');
    })
  );
});