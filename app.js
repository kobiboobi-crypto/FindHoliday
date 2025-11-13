// ===== ПЕРЕМЕННЫЕ СОСТОЯНИЯ =====
let currentLanguage = 'ru';
let favorites = JSON.parse(localStorage.getItem('findholiday_favorites')) || [];
let currentHolidayId = null;
let countdownInterval = null;

// ===== DOM ЭЛЕМЕНТЫ =====
const searchInput = document.getElementById('searchInput');
const holidaysList = document.getElementById('holidaysList');
const pinnedContainer = document.getElementById('pinnedContainer');
const modal = document.getElementById('holidayModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const favoriteBtn = document.getElementById('favoriteBtn');
const langBtns = document.querySelectorAll('.lang-btn');

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Загрузить язык из localStorage или установить русский по умолчанию
    const savedLanguage = localStorage.getItem('findholiday_language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    
    // Установить активный язык в UI
    setActiveLanguage(currentLanguage);
    
    // Инициализировать обработчики событий
    setupEventListeners();
    
    // Перевести страницу
    translatePage();
    
    // Отобразить праздники
    renderHolidays();
    
    // Отобразить закреплённые праздники
    updatePinnedDisplay();
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
function setupEventListeners() {
    // Переключение языка
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // Поиск
    searchInput.addEventListener('input', handleSearch);
    
    // Модальное окно
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    favoriteBtn.addEventListener('click', toggleFavorite);
    
    // Закрытие модального окна при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// ===== ФУНКЦИЯ ПЕРЕВОДОВ =====
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('findholiday_language', lang);
    setActiveLanguage(lang);
    translatePage();
    renderHolidays();
    updatePinnedDisplay();
}

function setActiveLanguage(lang) {
    langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

function translatePage() {
    // Обновить плейсхолдер поиска
    const placeholder = searchInput.getAttribute(`data-placeholder-${currentLanguage}`);
    if (placeholder) {
        searchInput.placeholder = placeholder;
    }
    
    // Обновить текст элементов с атрибутом data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translatedText = translations[currentLanguage][key];
        if (translatedText) {
            element.textContent = translatedText;
        }
    });
}

// ===== ФУНКЦИЯ ПОИСКА =====
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.holiday-card');
    
    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== ФУНКЦИЯ ОТОБРАЖЕНИЯ ПРАЗДНИКОВ =====
function renderHolidays() {
    holidaysList.innerHTML = '';
    
    const sortedHolidays = [...holidaysData].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    });
    
    sortedHolidays.forEach(holiday => {
        const holidayCard = createHolidayCard(holiday);
        holidaysList.appendChild(holidayCard);
    });
}

function createHolidayCard(holiday) {
    const card = document.createElement('div');
    card.className = 'holiday-card';
    card.setAttribute('data-id', holiday.id);
    card.setAttribute('data-title', holiday.title[currentLanguage]);
    card.setAttribute('data-date', holiday.date);
    
    const title = holiday.title[currentLanguage];
    const daysLeft = calculateDaysLeft(holiday.date);
    const countdownText = formatCountdownShort(holiday.date);
    
    card.innerHTML = `
        <div class="holiday-card-emoji">${holiday.emoji}</div>
        <h3 class="holiday-card-title">${title}</h3>
        <p class="holiday-card-date">${formatDateForDisplay(holiday.date)}</p>
        <p class="holiday-card-description">${holiday.description[currentLanguage].substring(0, 150)}...</p>
        <p class="holiday-card-countdown">${countdownText}</p>
    `;
    
    card.addEventListener('click', () => showHolidayDetails(holiday.id));
    
    return card;
}

// ===== ФУНКЦИИ ОБРАБОТКИ ДАТ =====
function calculateDaysLeft(targetDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    
    const diff = target - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDateForDisplay(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(getLangLocale(), options);
}

function getLangLocale() {
    const locales = {
        ru: 'ru-RU',
        en: 'en-US',
        de: 'de-DE',
        fr: 'fr-FR',
        uk: 'uk-UA'
    };
    return locales[currentLanguage] || 'ru-RU';
}

function formatCountdownShort(targetDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    
    const daysLeft = calculateDaysLeft(targetDate);
    
    if (daysLeft < 0) {
        return translations[currentLanguage]['holiday-passed'];
    } else if (daysLeft === 0) {
        return translations[currentLanguage]['holiday-today'];
    } else {
        return `${daysLeft} ${translations[currentLanguage]['days-left']}`;
    }
}

// ===== ФУНКЦИЯ ОТОБРАЖЕНИЯ ДЕТАЛЕЙ ПРАЗДНИКА =====
function showHolidayDetails(holidayId) {
    const holiday = holidaysData.find(h => h.id === holidayId);
    if (!holiday) return;
    
    currentHolidayId = holidayId;
    
    // Заполнить модальное окно
    document.getElementById('modalTitle').textContent = holiday.title[currentLanguage];
    document.getElementById('modalDate').textContent = formatDateForDisplay(holiday.date);
    document.getElementById('modalDescription').textContent = holiday.description[currentLanguage];
    
    // Обновить кнопку избранного
    const isFavorite = favorites.includes(holidayId);
    updateFavoriteButton(isFavorite);
    
    // Открыть модальное окно
    modal.classList.remove('hidden');
    document.body.classList.add('no-scroll');
    
    // Запустить обратный отсчёт
    startCountdown(holiday.date);
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    
    // Остановить обратный отсчёт
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    currentHolidayId = null;
}

// ===== ФУНКЦИЯ ОБРАТНОГО ОТСЧЁТА =====
function startCountdown(targetDate) {
    // Очистить предыдущий интервал
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Обновить счётчик сразу
    updateCountdownDisplay(targetDate);
    
    // Обновлять каждую секунду
    countdownInterval = setInterval(() => {
        updateCountdownDisplay(targetDate);
    }, 1000);
}

function updateCountdownDisplay(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    
    let diff = target - now;
    
    if (diff <= 0) {
        // Праздник уже наступил или наступает
        document.getElementById('countdownDays').textContent = '0';
        document.getElementById('countdownHours').textContent = '0';
        document.getElementById('countdownMinutes').textContent = '0';
        document.getElementById('countdownSeconds').textContent = '0';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= 1000 * 60 * 60 * 24;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;
    
    const minutes = Math.floor(diff / (1000 * 60));
    diff %= 1000 * 60;
    
    const seconds = Math.floor(diff / 1000);
    
    document.getElementById('countdownDays').textContent = days;
    document.getElementById('countdownHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdownMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countdownSeconds').textContent = String(seconds).padStart(2, '0');
}

// ===== ФУНКЦИИ УПРАВЛЕНИЯ ИЗБРАННЫМ =====
function toggleFavorite() {
    if (!currentHolidayId) return;
    
    const isFavorite = favorites.includes(currentHolidayId);
    
    if (isFavorite) {
        // Удалить из избранного
        favorites = favorites.filter(id => id !== currentHolidayId);
    } else {
        // Добавить в избранное
        favorites.push(currentHolidayId);
    }
    
    // Сохранить в localStorage
    localStorage.setItem('findholiday_favorites', JSON.stringify(favorites));
    
    // Обновить UI
    updateFavoriteButton(!isFavorite);
    updatePinnedDisplay();
}

function updateFavoriteButton(isFavorite) {
    const icon = document.querySelector('.heart-icon');
    const text = document.getElementById('favoriteText');
    
    if (isFavorite) {
        favoriteBtn.classList.add('active');
        icon.textContent = '♥';
        text.textContent = translations[currentLanguage]['remove-favorite'];
    } else {
        favoriteBtn.classList.remove('active');
        icon.textContent = '♡';
        text.textContent = translations[currentLanguage]['add-favorite'];
    }
}

function updatePinnedDisplay() {
    pinnedContainer.innerHTML = '';
    
    if (favorites.length === 0) {
        pinnedContainer.innerHTML = '<p style="color: #999; grid-column: 1/-1;">Нет закреплённых праздников</p>';
        return;
    }
    
    favorites.forEach(holidayId => {
        const holiday = holidaysData.find(h => h.id === holidayId);
        if (!holiday) return;
        
        const pinnedCard = createPinnedCard(holiday);
        pinnedContainer.appendChild(pinnedCard);
    });
}

function createPinnedCard(holiday) {
    const card = document.createElement('div');
    card.className = 'pinned-card';
    
    const title = holiday.title[currentLanguage];
    const date = formatDateForDisplay(holiday.date);
    
    card.innerHTML = `
        <button class="pinned-remove-btn">×</button>
        <div class="pinned-card-title">${holiday.emoji} ${title}</div>
        <div class="pinned-card-date">${date}</div>
    `;
    
    // Клик на карточку открывает детали
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('pinned-remove-btn')) {
            showHolidayDetails(holiday.id);
        }
    });
    
    // Кнопка удаления
    card.querySelector('.pinned-remove-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        favorites = favorites.filter(id => id !== holiday.id);
        localStorage.setItem('findholiday_favorites', JSON.stringify(favorites));
        updatePinnedDisplay();
        
        // Если открыта деталь этого праздника, обновить кнопку
        if (currentHolidayId === holiday.id) {
            updateFavoriteButton(false);
        }
    });
    
    return card;
}
