self.addEventListener('install', (e) => {
  console.log('Installing Service Worker!');
  e.waitUntil(
    caches.open('pages').then(cache => {
      console.log('Caching resources');
      return cache.addAll(['/offline.html', '/offline.jpeg']);
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log('Activating Service Worker!');
});

self.addEventListener('fetch', (e) => {
  console.log('Fetching resource!');
  e.respondWith(
    caches.open('pages').then(async cache => {
      if (navigator.connection.effectiveType === '3g') {
        if (e.request.destination !== 'document') {
          return fetch(e.request);
        }

        return fetch('/3g.html');
      }

      if (navigator.connection.effectiveType === '2g') {
        if (e.request.destination === 'document') {
          return fetch('/2g.html');
        }

        if(e.request.destination === 'image') {
          return fetch('/2g.jpeg');
        }

        return fetch(e.request);
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

      return cache.match('/offline.html');
    })
  );
});