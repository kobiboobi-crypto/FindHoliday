/**
 * Service Worker для фоновой работы и push-уведомлений.
 */
const CACHE_NAME = 'findholiday-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/translations_extended.js',
    '/holidays.json',
    '/icons/icon-192x192.png' // Добавьте иконки, если они есть
];

// Установка Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Активация Service Worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Фоновая синхронизация для проверки праздников
self.addEventListener('sync', function(event) {
    if (event.tag === 'check-holidays') {
        event.waitUntil(checkHolidays());
    }
});

// Функция проверки праздников
function checkHolidays() {
    // Получаем данные праздников из кэша или другого источника
    // Поскольку данные статические, мы можем хранить их в кэше или использовать fetch
    return fetch('/holidays.json') // Используем правильный путь к файлу
        .then(response => response.json())
        .then(holidaysData => {
            const today = new Date();
            const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            const todaysHolidays = holidaysData.filter(h => h.date === todayStr);

            console.log('Сегодняшние праздники:', todaysHolidays); // Для отладки

            if (todaysHolidays.length > 0) {
                todaysHolidays.forEach(holiday => {
                    const title = `${holiday.emoji} ${holiday.title.ru}`; // Используем русский по умолчанию для уведомлений
                    const options = {
                        body: 'Сегодня праздник!',
                        icon: '/icons/icon-192x192.png',
                        data: { holidayId: holiday.id }
                    };
                    self.registration.showNotification(title, options);
                });
            }
        })
        .catch(error => {
            console.log('Ошибка при проверке праздников:', error);
        });
}

// Слушатель клика по уведомлению
self.addEventListener('notificationclick', function(event) {
    const holidayId = event.notification.data.holidayId;
    const urlToOpen = new URL('/', self.location.origin).href;

    event.notification.close();

    // Эта функция ищет открытую вкладку с сайтом и фокусируется на ней.
    // Если вкладки нет, она открывает новую.
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    // Если нашли вкладку, фокусируемся и отправляем ей сообщение
                    client.postMessage({ holidayId: holidayId });
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                // Если вкладок нет, открываем новую
                return clients.openWindow(urlToOpen);
            }
        })
    );
});