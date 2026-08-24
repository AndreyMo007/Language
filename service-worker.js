const CACHE_NAME = 'notes-app-v4';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './system-notes.js',
    './manifest.json'
];

// Установка Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Кэширование ресурсов для оффлайн-работы');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                // Принудительная активация без ожидания
                return self.skipWaiting();
            })
    );
});

// Активация Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Удаление старого кэша:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Захватываем контроль над всеми клиентами
            return self.clients.claim();
        })
    );
});

// Стратегия: Cache First, затем Network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Если ресурс найден в кэше - возвращаем его
                if (response) {
                    return response;
                }
                
                // Если ресурса нет в кэше - пытаемся получить из сети
                return fetch(event.request)
                    .then(networkResponse => {
                        // Проверяем, что ответ валидный
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        
                        // Кэшируем полученный ресурс для будущего оффлайн-использования
                        const responseToCache = networkResponse.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return networkResponse;
                    })
                    .catch(() => {
                        // Если сеть недоступна и это навигация - возвращаем index.html
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                        
                        // Для других запросов возвращаем заглушку
                        return new Response('Оффлайн режим', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain; charset=utf-8'
                            })
                        });
                    });
            })
    );
});

// Обработка сообщений от клиента
self.addEventListener('message', event => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});

// Периодическая синхронизация (если поддерживается)
self.addEventListener('sync', event => {
    if (event.tag === 'sync-notes') {
        event.waitUntil(
            // Здесь можно добавить синхронизацию данных
            Promise.resolve()
        );
    }
});
