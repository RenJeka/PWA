const staticCacheName = 'static-app-v1';

// Список всех статических файлов, которые мы будем кешировать
const assetUrls = [
  'index.html',
  '/js/app.js', 
  '/css/styles.css',
]

// Событие SW "install"
self.addEventListener('install', event => {
  // console.log('SW HB installed');
  event.waitUntil(
    // открываем кеш
    caches.open(staticCacheName)
      .then((cache) => {
        // Кешируем все статические файлы
        // В метод "addAll" нужно передать массив строк, которые мы хотим закешировать
        return cache.addAll(assetUrls);
      })
  )
})

// Событие SW "activate"
self.addEventListener('activate', event => {
  // console.log('SW HB activated');
})

