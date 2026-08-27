const CACHE='my-workout-v4';
const ASSETS=["./", "./index.html", "./sw.js", "./images/schulterdruecken.jpg", "./images/seitheben.jpg", "./images/reverse-fly.jpg", "./images/face-pulls.jpg", "./images/klimmzug-breit.jpg", "./images/klimmzug-normal.jpg", "./images/klimmzug-eng.jpg", "./images/chin-ups.jpg", "./images/dips.jpg", "./muscle-overview.png"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  e.respondWith(fetch(e.request).then(r=>{
    const copy=r.clone();
    caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
    return r;
  }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
