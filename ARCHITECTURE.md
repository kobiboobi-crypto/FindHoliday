# 🏗️ FindHoliday - Архитектура и Структура

## 📐 Общая Архитектура

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                      БРАУЗЕР ПОЛЬЗОВАТЕЛЯ               │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │  1. index.html                                 │   │
│  │     • Header с логотипом и переключателем      │   │
│  │     • Поисковая панель                         │   │
│  │     • Секция избранных праздников              │   │
│  │     • Контейнер для списка праздников          │   │
│  │     • Модальное окно (скрыто по умолчанию)     │   │
│  │                                                 │   │
│  ├─────────────────────────────────────────────────┤   │
│  │                                                 │   │
│  │  2. styles.css                                 │   │
│  │     • CSS переменные (цвета, размеры)          │   │
│  │     • Стили для всех компонентов               │   │
│  │     • Медиа-запросы для адаптивности           │   │
│  │     • Анимации и переходы                      │   │
│  │                                                 │   │
│  ├─────────────────────────────────────────────────┤   │
│  │                                                 │   │
│  │  3. translations.js                            │   │
│  │     • Объект translations {язык -> {ключ: текст}} │  │
│  │     • Массив holidaysData с праздниками        │   │
│  │     • Данные переводов для 5 языков            │   │
│  │                                                 │   │
│  ├─────────────────────────────────────────────────┤   │
│  │                                                 │   │
│  │  4. app.js                                     │   │
│  │     • Управление состоянием (язык, избранное)  │   │
│  │     • Обработчики событий                      │   │
│  │     • Функции рендеринга (DOM manipulations)   │   │
│  │     • Логика обратного отсчёта                │   │
│  │     • Работа с localStorage                    │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
            ┌─────────────────────────────┐
            │    localStorage браузера    │
            │  (язык, избранные ID)       │
            └─────────────────────────────┘
```

---

## 📊 Поток Данных

### 1. Инициализация Приложения

```javascript
DOMContentLoaded Event
    ↓
initializeApp()
    ├→ Загрузить язык из localStorage
    ├→ setupEventListeners() - Привязать обработчики
    ├→ translatePage() - Перевести контент
    ├→ renderHolidays() - Отрисовать список
    └→ updatePinnedDisplay() - Показать закреплённые
```

### 2. Переключение Языка

```javascript
Клик на кнопку языка (RU/EN/DE/FR/UK)
    ↓
setLanguage(lang)
    ├→ Обновить currentLanguage
    ├→ Сохранить в localStorage
    ├→ setActiveLanguage() - Выделить кнопку
    ├→ translatePage() - Перевести все элементы
    ├→ renderHolidays() - Пересчитать карточки
    └→ updatePinnedDisplay() - Обновить закреплённые
```

### 3. Поиск Праздников

```javascript
Ввод текста в поисковую строку
    ↓
handleSearch()
    ├→ Получить значение input.value
    ├→ Для каждой карточки (.holiday-card):
    │   └→ Если title содержит searchTerm → показать
    │   └→ Иначе → скрыть (класс 'hidden')
    └→ Мгновенное обновление (no debounce needed)
```

### 4. Просмотр Деталей Праздника

```javascript
Клик на карточку праздника
    ↓
showHolidayDetails(holidayId)
    ├→ Найти праздник в holidaysData
    ├→ Заполнить поля модального окна:
    │   ├→ modalTitle = title[currentLanguage]
    │   ├→ modalDate = formatDateForDisplay(date)
    │   ├→ modalDescription = description[currentLanguage]
    │   └→ favoriteBtn статус = isFavorite?
    ├→ Показать модальное окно
    ├→ startCountdown(date) - Начать обратный отсчёт
    └→ Блокировать scroll (класс 'no-scroll')
```

### 5. Обратный Отсчёт (Ключевой Функционал)

```javascript
startCountdown(targetDate)
    ├→ updateCountdownDisplay(targetDate) - первый раз
    └→ setInterval(updateCountdownDisplay, 1000) - каждую секунду
        ↓
updateCountdownDisplay(targetDate)
    ├→ Вычислить разницу: targetDate - NOW
    ├→ Расчитать:
    │   ├→ days = Math.floor(diff / (1000 * 60 * 60 * 24))
    │   ├→ hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    │   ├→ minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    │   └→ seconds = Math.floor((diff % (1000 * 60)) / 1000)
    └→ Обновить DOM элементы:
        ├→ #countdownDays.textContent = days
        ├→ #countdownHours.textContent = padStart(hours, '0', 2)
        ├→ #countdownMinutes.textContent = padStart(minutes, '0', 2)
        └→ #countdownSeconds.textContent = padStart(seconds, '0', 2)
```

### 6. Управление Избранным

```javascript
Клик на кнопку сердечка в модальном окне
    ↓
toggleFavorite()
    ├→ Получить currentHolidayId
    ├→ Проверить: isFavorite = favorites.includes(id)?
    ├→ Если YES → favorites.splice(index)
    ├→ Если NO → favorites.push(id)
    ├→ localStorage.setItem('findholiday_favorites', JSON.stringify(favorites))
    ├→ updateFavoriteButton(newStatus)
    │   └→ Изменить иконку (♡ ↔ ♥)
    │   └→ Изменить текст кнопки
    │   └→ Изменить класс 'active'
    └→ updatePinnedDisplay()
        └→ Пересчитать и перерисовать список закреплённых
```

---

## 🗂️ Структура Данных

### localStorage

```javascript
// 1. Язык
{
    key: 'findholiday_language',
    value: 'ru' | 'en' | 'de' | 'fr' | 'uk'
}

// 2. Избранные
{
    key: 'findholiday_favorites',
    value: JSON.stringify([1, 3, 5])  // массив ID
}
```

### translations объект

```javascript
{
    'ru': {
        'favorites': 'Избранные',
        'countdown': 'Обратный отсчёт',
        'days': 'дней',
        'hours': 'часов',
        'minutes': 'минут',
        'seconds': 'секунд',
        'add-favorite': 'Добавить в избранное',
        'remove-favorite': 'Удалить из избранного',
        // ... остальные ключи
    },
    'en': { /* ... */ },
    'de': { /* ... */ },
    'fr': { /* ... */ },
    'uk': { /* ... */ }
}
```

### holidaysData массив

```javascript
[
    {
        id: 1,
        title: { ru: '...', en: '...', de: '...', fr: '...', uk: '...' },
        date: 'YYYY-MM-DD',
        emoji: '🎉',
        description: { ru: '...', en: '...', de: '...', fr: '...', uk: '...' }
    },
    // ... 10 праздников
]
```

---

## 🎯 Переменные Состояния (State)

```javascript
// Основное состояние приложения
let currentLanguage = 'ru'                  // Текущий язык
let favorites = JSON.parse(...)             // Массив ID избранных
let currentHolidayId = null                 // Открытый праздник в модальном окне
let countdownInterval = null                // Интервал обратного отсчёта

// Когда изменяются эти переменные:
// 1. Сохраняется в localStorage (если нужно)
// 2. Пересчитывается UI (renderHolidays, updatePinnedDisplay и т.д.)
// 3. Обновляются видимые элементы на странице
```

---

## 🔄 Жизненный Цикл Компонентов

### Карточка Праздника

```
Создание:
createHolidayCard(holiday)
├→ Создать <div class="holiday-card">
├→ Установить атрибуты data-*
├→ Заполнить содержимое (title, date, description, countdown)
├→ Привязать обработчик клика
└→ Вернуть элемент

Отображение:
renderHolidays()
├→ Отсортировать праzdniki по дате
├→ Для каждого:
│   └→ createHolidayCard() → добавить в DOM
└→ Применить фильтр поиска

Удаление:
closeModal() или новый поиск → новый renderHolidays()
├→ Очистить #holidaysList.innerHTML = ''
└→ Перерисовать (если нужно)
```

### Закреплённая Карточка

```
Создание:
createPinnedCard(holiday)
├→ Создать <div class="pinned-card">
├→ Добавить кнопку удаления (×)
├→ Привязать обработчик клика (открыть детали)
├→ Привязать обработчик кнопки удаления
└→ Вернуть элемент

Обновление:
updatePinnedDisplay()
├→ Очистить #pinnedContainer
├→ Для каждого ID в favorites:
│   ├→ Найти праздник в holidaysData
│   └→ createPinnedCard() → добавить в DOM
└→ Если favorites пуста → показать placeholder
```

### Модальное Окно

```
Открытие:
showHolidayDetails(id)
├→ Заполнить содержимое
├→ modal.classList.remove('hidden')
├→ document.body.classList.add('no-scroll')
└→ startCountdown()

Обновление:
updateCountdownDisplay() - каждую секунду внутри

Закрытие:
closeModal()
├→ modal.classList.add('hidden')
├→ document.body.classList.remove('no-scroll')
├→ clearInterval(countdownInterval)
└→ currentHolidayId = null
```

---

## 🎨 CSS Организация

### Иерархия селекторов

```css
/* 1. Глобальные переменные */
:root { --color-primary, --max-width, ... }

/* 2. Базовые стили */
*, body, html { ... }

/* 3. Компоненты */
.header { ... }
.search-input { ... }
.holiday-card { ... }
.modal { ... }
.countdown-display { ... }

/* 4. Состояния */
.active { ... }
.hidden { ... }
.no-scroll { ... }

/* 5. Адаптивность */
@media (max-width: 768px) { ... }
@media (max-width: 480px) { ... }
```

---

## ⚡ Производительность и Оптимизация

### 1. DOM Манипуляции

```javascript
// ✅ ХОРОШО: Батчинг обновлений
function updatePinnedDisplay() {
    pinnedContainer.innerHTML = '';  // 1 операция
    favorites.forEach(id => {
        // Создать элементы в памяти
        const card = createPinnedCard(holiday);
        pinnedContainer.appendChild(card);
    });
}

// ❌ ПЛОХО: Множество перерисовок
favorites.forEach(id => {
    pinnedContainer.innerHTML += createPinnedCard(holiday);  // ПЛОХО!
});
```

### 2. Event Listeners

```javascript
// ✅ ХОРОШО: Делегация при возможности
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ✅ ХОРОШО: removeEventListener когда не нужен
if (countdownInterval) clearInterval(countdownInterval);
```

### 3. localStorage

```javascript
// ✅ ХОРОШО: Только необходимые данные
localStorage.setItem('findholiday_language', currentLanguage);
localStorage.setItem('findholiday_favorites', JSON.stringify(favorites));

// ❌ ПЛОХО: Весь объект каждый раз
localStorage.setItem('appState', JSON.stringify(entireAppState));
```

---

## 🧪 Тестирование Функций

### Пример теста обратного отсчёта

```javascript
// Пусть цель: 2025-12-25 00:00:00
// Текущее время: 2025-12-24 23:00:00

updateCountdownDisplay('2025-12-25')

// Ожидаемый результат:
// days: 0
// hours: 1
// minutes: 0
// seconds: 0
```

### Пример теста языка

```javascript
setLanguage('de')

// Проверка:
// 1. currentLanguage === 'de'
// 2. localStorage.getItem('findholiday_language') === 'de'
// 3. Все элементы с data-translate обновлены
// 4. Плейсхолдеры переводов обновлены
// 5. Карточки пересчитаны на немецком
```

---

## 🚀 Масштабирование

### Как добавить новый праздник

1. Открыть `translations.js`
2. Добавить объект в массив `holidaysData`:

```javascript
{
    id: 11,
    title: {
        ru: '...',
        en: '...',
        de: '...',
        fr: '...',
        uk: '...'
    },
    date: 'YYYY-MM-DD',
    emoji: '🎉',
    description: {
        ru: '...',
        en: '...',
        de: '...',
        fr: '...',
        uk: '...'
    }
}
```

3. Приложение автоматически покажет новый праздник

### Как добавить новый язык

1. В `translations.js` добавить язык в `translations` объект
2. Добавить опцию в HTML кнопки языка
3. В `app.js` обновить `setActiveLanguage()` функцию

---

## 📋 Чеклист Функциональности

- [x] Мультиязычность (5 языков)
- [x] Поиск в реальном времени
- [x] Управление избранным
- [x] Обратный отсчёт (до секунд)
- [x] Модальное окно
- [x] Центрирование контента
- [x] Адаптивный дизайн
- [x] localStorage сохранение
- [x] Визуальные элементы (сердечко)
- [x] Анимации

---

## 📞 Заключение

Архитектура FindHoliday построена на принципах:

1. **Простоты** - Vanilla JS без фреймворков
2. **Модульности** - Отдельные функции для каждой задачи
3. **Масштабируемости** - Легко добавить праздники и языки
4. **Производительности** - Оптимизированные DOM операции
5. **Доступности** - Семантичный HTML, четкая структура

Все компоненты независимы и могут работать отдельно, но взаимодействуют через центральное состояние и localStorage.
