const staticCacheName = 'static-app-v1';

// Список всех статических файлов, которые мы будем кешировать
const assetUrls = [
  'index.html',
  '/js/app.js',
  '/css/styles.css',
]

// Событие SW "install"
self.addEventListener('install', async event => {
  // console.log('SW HB installed');

  // ПОДХОД с помощью Promice
  // event.waitUntil(
  //   // открываем кеш
  //   caches.open(staticCacheName)
  //     .then((cache) => {
  //       // Кешируем все статические файлы
  //       // В метод "addAll" нужно передать массив строк, которые мы хотим закешировать
  //       return cache.addAll(assetUrls);
  //     })
  // )

  // ПОДХОД с помощью Promice
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetUrls);
})

// Событие SW "activate"
self.addEventListener('activate', event => {
  // console.log('SW HB activated');
})

// Событие SW "fetch" (событие происходит каждый раз, когда приложение делает какой-либо запрос ( в т.ч. на статические файлы))
self.addEventListener('fetch', (event) => {
  console.log('event Request', event.request.url);

  event.respondWith(cacheFirst(event.request));
})

// Стратегия "cacheFirst" ( при запросе на данные — проверка кеша в первую очередь. Если в кеше будут находится нужные данные — они и будут использоваться)
async function cacheFirst(request) {
  // Мы сравниваем готовой функцией наш текущий запрос с тем, что есть в кеше
  const cached = await caches.match(request);

  // Если в кеше есть данный запрос — мы его возвращаем. Если нет, делаем новый запрос (fetch) и возвращаем полученные данные (от "fetch")
  return cached ?? await fetch(request);

}

