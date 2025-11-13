// ===== ПЕРЕМЕННЫЕ СОСТОЯНИЯ =====
let currentLanguage = 'ru';
let favorites = JSON.parse(localStorage.getItem('findholiday_favorites')) || [];
let currentHolidayId = null;
let selectedEmoji = '🎉';
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
const themeToggleBtn = document.getElementById('themeToggleBtn');
const header = document.querySelector('.header'); 
const addHolidayBtn = document.getElementById('addHolidayBtn');
const addHolidayModal = document.getElementById('addHolidayModal');
const addHolidayForm = document.getElementById('addHolidayForm');
const addHolidayOverlay = document.getElementById('addHolidayOverlay');
const addHolidayClose = document.getElementById('addHolidayClose');
const cancelHolidayBtn = document.getElementById('cancelHolidayBtn');
const emojiBtns = document.querySelectorAll('.emoji-btn');
const selectedEmojiInput = document.getElementById('selectedEmoji');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    // Сначала загружаем пользовательские праздники, чтобы они были доступны
    loadCustomHolidays();
    initializeApp();
});

function initializeApp() {
    // Загрузить язык из localStorage или установить русский по умолчанию
    const savedLanguage = localStorage.getItem('findholiday_language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    
    // Загрузить тему из localStorage
    const savedTheme = localStorage.getItem('findholiday_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.textContent = '🌙';
    }

    // Установить активный язык в UI
    setActiveLanguage(currentLanguage);
    
    // Инициализировать обработчики событий
    setupEventListeners();
    
    // Перевести страницу
    translatePage();
    
    // Обновить текст кнопки добавления
    updateButtonText();

    // Отобразить праздники
    renderHolidays();
    
    // Отобразить закреплённые праздники
    updatePinnedDisplay();

    // Запустить часы
    startTimeClock();

    // Проверить, есть ли сегодня праздники
    checkTodaysHolidays();
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
    
    // Модальное окно добавления праздника
    addHolidayBtn.addEventListener('click', openAddHolidayModal);
    addHolidayClose.addEventListener('click', closeAddHolidayModal);
    addHolidayOverlay.addEventListener('click', closeAddHolidayModal);
    cancelHolidayBtn.addEventListener('click', closeAddHolidayModal);
    addHolidayForm.addEventListener('submit', handleAddHoliday);

    // Выбор эмодзи
    emojiBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            emojiBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedEmoji = this.getAttribute('data-emoji');
            selectedEmojiInput.value = selectedEmoji;
        });
    });

    // Закрытие модального окна при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!modal.classList.contains('hidden')) closeModal();
            if (!addHolidayModal.classList.contains('hidden')) closeAddHolidayModal();
        }
    });

    // Переключение темы
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('findholiday_theme', 'dark');
            themeToggleBtn.textContent = '🌙';
        } else {
            localStorage.setItem('findholiday_theme', 'light');
            themeToggleBtn.textContent = '☀️';
        }
    });

    // Сжатие шапки при прокрутке
    window.addEventListener('scroll', function() {
        const isScrolled = window.pageYOffset > 50;
        header.classList.toggle('header-scrolled', isScrolled);
    });

    // Кнопка "Наверх"
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

}

// ===== ФУНКЦИЯ ПЕРЕВОДОВ =====
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('findholiday_language', lang);
    setActiveLanguage(lang);
    translatePage();
    updateButtonText();
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

function updateButtonText() {
    const addBtnText = translations[currentLanguage]['add-custom'];
    if (addBtnText) {
        addHolidayBtn.innerHTML = '➕ ' + addBtnText;
    }
}

function updateFormPlaceholders() {
    const nameInput = document.getElementById('holidayName');
    const descriptionTextarea = document.getElementById('holidayDescription');
    
    if (nameInput) {
        const namePlaceholder = nameInput.getAttribute(`data-placeholder-${currentLanguage}`);
        if (namePlaceholder) nameInput.placeholder = namePlaceholder;
    }
    
    if (descriptionTextarea) {
        const descPlaceholder = descriptionTextarea.getAttribute(`data-placeholder-${currentLanguage}`);
        if (descPlaceholder) descriptionTextarea.placeholder = descPlaceholder;
    }
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
    
    sortedHolidays.forEach((holiday, index) => {
        const holidayCard = createHolidayCard(holiday);
        // Добавляем задержку для каскадной анимации
        holidayCard.style.animationDelay = `${index * 0.05}s`;
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

// ===== ФУНКЦИИ ДОБАВЛЕНИЯ СВОИХ ПРАЗДНИКОВ =====
function openAddHolidayModal() {
    addHolidayForm.reset();
    selectedEmoji = '🎉';
    selectedEmojiInput.value = '🎉';
    
    updateFormPlaceholders();
    
    emojiBtns.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.getAttribute('data-emoji') === '🎉') {
            btn.classList.add('selected');
        }
    });
    
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    document.getElementById('holidayDate').min = `${yyyy}-${mm}-${dd}`;
    
    addHolidayModal.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function closeAddHolidayModal() {
    addHolidayModal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function handleAddHoliday(e) {
    e.preventDefault();
    
    const name = document.getElementById('holidayName').value.trim();
    const date = document.getElementById('holidayDate').value;
    const description = document.getElementById('holidayDescription').value.trim();
    
    if (!name || !date) {
        alert('Пожалуйста, заполните название и дату');
        return;
    }
    
    addCustomHoliday(name, date, description, selectedEmoji);
    
    closeAddHolidayModal();
    renderHolidays();
    
    alert('✅ Праздник успешно добавлен!');
}

function addCustomHoliday(name, date, description = '', emoji = '🎉') {
    const maxId = Math.max(...holidaysData.map(h => h.id || 0), 0);

    const titleObj = { ru: name, en: name, de: name, fr: name, uk: name };
    const descriptionObj = {
        ru: description || 'Мой собственный праздник',
        en: description || 'My custom holiday',
        de: description || 'Mein benutzerdefinierter Feiertag',
        fr: description || 'Ma fête personnalisée',
        uk: description || 'Мій власний святок'
    };

    const customHoliday = {
        id: maxId + 1,
        title: titleObj,
        date: date,
        emoji: emoji,
        description: descriptionObj,
        isCustom: true
    };

    holidaysData.push(customHoliday);

    const customHolidays = holidaysData.filter(h => h.isCustom);
    localStorage.setItem('findholiday_custom_holidays', JSON.stringify(customHolidays));

    return customHoliday;
}

function loadCustomHolidays() {
    const customHolidaysStr = localStorage.getItem('findholiday_custom_holidays');
    if (customHolidaysStr) {
        try {
            const customHolidays = JSON.parse(customHolidaysStr);
            if (Array.isArray(customHolidays)) {
                customHolidays.forEach(holiday => {
                    const exists = holidaysData.some(h => h.id === holiday.id);
                    if (!exists) {
                        holidaysData.push(holiday);
                    }
                });
            }
        } catch (e) {
            console.error('Ошибка при загрузке пользовательских праздников:', e);
            localStorage.removeItem('findholiday_custom_holidays');
        }
    }
}

// ===== ФУНКЦИИ УВЕДОМЛЕНИЙ (TOAST) =====
function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Удалить элемент после завершения анимации
    setTimeout(() => {
        toast.remove();
    }, 5000); // 5 секунд, как в CSS анимации
}

function checkTodaysHolidays() {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const todaysHolidays = holidaysData.filter(h => h.date === todayStr);

    if (todaysHolidays.length > 0) {
        // Небольшая задержка для красоты
        setTimeout(() => {
            todaysHolidays.forEach((holiday, index) => {
                // Показываем каждое уведомление с небольшой задержкой
                setTimeout(() => {
                    const message = `${translations[currentLanguage]['holiday-today']} — ${holiday.title[currentLanguage]}!`;
                    showToast(message);
                }, index * 400); // 400ms между уведомлениями
            });
        }, 1000); // Начать показывать через 1 секунду после загрузки страницы
    }
}

// ===== ФУНКЦИЯ ОТОБРАЖЕНИЯ ВРЕМЕНИ =====
function startTimeClock() {
    const timeElement = document.getElementById('userTime');
    if (!timeElement) return;

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateTime(); // Вызвать сразу, чтобы не было задержки
    setInterval(updateTime, 1000); // Обновлять каждую секунду
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
