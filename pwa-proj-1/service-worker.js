const staticCacheName = 'static-app-v3';
const dynamicCacheName = 'dynamic-app-v1';

// Список всех статических файлов, которые мы будем кешировать
const assetUrls = [
  'index.html',
  '/js/app.js',
  '/css/styles.css',
  'offline.html',
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

  // ПОДХОД с помощью async-await
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetUrls);
})

// Событие SW "activate"
self.addEventListener('activate', async event => {
  // Когда меняется версия кеша — старые версии кеша должны очищатся (кроме последнего статического и динамического)
  const allCacheNames = await caches.keys();
  await Promise.all(
    allCacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))

  );
})

// Событие SW "fetch" (событие происходит каждый раз, когда приложение делает какой-либо запрос ( в т.ч. на статические файлы))
self.addEventListener('fetch', (event) => {
  // console.log('event Request', event.request.url);

  // Логика выбора стратегии кеширования
  // Если URL запроса совпадает с нашим текущим URL (URL сайта) — значит мы хотим получить статические файлы (html, css, картинки...и.т.д) — используем стратегию "cacheFirst"
  // Если URL запроса не совпадает с текущим URL — значит это запрос на сторонний ресурс,— используем стратегию "networkFirst"
  // console.log('Fetch event: ', event);

  const {request} = event;
  const url = new URL(request.url)

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }

})

// Стратегия "cacheFirst" ( при запросе на данные — проверка кеша в первую очередь. Если в кеше будут находится нужные данные — они и будут использоваться)
async function cacheFirst(request) {
  // Мы сравниваем готовой функцией наш текущий запрос с тем, что есть в кеше
  const cached = await caches.match(request);

  if (!cached) {
    console.log('request url:', request.url);
    console.log('cacheFirst cached : ', cached);
    console.log('fetch(response) ', await fetch(request));
  }


  // Если в кеше есть данный запрос — мы его возвращаем. Если нет, делаем новый запрос (fetch) и возвращаем полученные данные (от "fetch")
  return cached ?? await fetch(request);

}

// Стратегия "networkFirst" ( при запросе на данные — программа проверяет — может ли она получить данніе по сети:Если может — берем данніе по сети, Если не можем — берем данніе из кеша.
async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    // Если не удалось получить доступ к удаленному ресурсу (блок "catch") — берем данные из кеша
    const cached = await cache.match(request);
    // Если нет и в кеше — показываем статическую страницу
    return cached ?? await caches.match('/offline.html')
  }
}
