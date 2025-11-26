// ===== ПЕРЕМЕННЫЕ СОСТОЯНИЯ =====
let currentLanguage = 'ru';
let favorites = JSON.parse(localStorage.getItem('findholiday_favorites')) || [];
let currentHolidayId = null;
let selectedEmoji = '🎉';
let currentCategory = 'all';
let countdownInterval = null;
let isEditMode = false; // true, если открыто модальное окно редактирования
let editingHolidayId = null; // ID праздника, который редактируется

// ===== ГЕОЛОКАЦИЯ И АВТОМАТИЧЕСКИЙ ВЫБОР ЯЗЫКА =====
// Маппинг стран на языки
const countryToLanguage = {
    // Русскоязычные страны
    'RU': 'ru', 'BY': 'ru', 'KZ': 'ru', 'KG': 'ru', 'TJ': 'ru', 'UZ': 'ru', 'AM': 'ru', 'AZ': 'ru', 'MD': 'ru',
    // Украинские страны
    'UA': 'uk',
    // Немецкоговорящие страны
    'DE': 'de', 'AT': 'de', 'CH': 'de', 'LI': 'de', 'LU': 'de',
    // Французскоговорящие страны
    'FR': 'fr', 'BE': 'fr', 'CA': 'fr', 'MC': 'fr',
    // Англоязычные страны (по умолчанию английский)
    'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en'
};

// ===== DOM ЭЛЕМЕНТЫ =====
const searchInput = document.getElementById('searchInput');
const holidaysList = document.getElementById('holidaysList');
const pinnedContainer = document.getElementById('pinnedContainer');
const modal = document.getElementById('holidayModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const favoriteBtn = document.getElementById('favoriteBtn');
const editHolidayBtn = document.getElementById('editHolidayBtn');
const deleteHolidayBtn = document.getElementById('deleteHolidayBtn');
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
const categoryFiltersContainer = document.getElementById('categoryFilters');


// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    // Сначала загружаем пользовательские праздники, чтобы они были доступны
    loadCustomHolidays();
    initializeApp();

    // Регистрация Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker зарегистрирован успешно:', registration);

                    // Регистрация фоновой синхронизации для проверки праздников
                    if ('sync' in registration) {
                        registration.sync.register('check-holidays')
                            .then(() => {
                                console.log('Фоновая синхронизация зарегистрирована');
                            })
                            .catch(error => {
                                console.log('Ошибка регистрации фоновой синхронизации:', error);
                            });
                    }
                })
                .catch(error => {
                    console.log('Ошибка регистрации Service Worker:', error);
                });
        });

        // Обработка сообщений от Service Worker
        navigator.serviceWorker.addEventListener('message', function(event) {
            if (event.data && event.data.holidayId) {
                showHolidayDetails(event.data.holidayId);
            }
        });
    }
});

function getDefaultLanguage() {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ru')) return 'ru';
    if (browserLang.startsWith('uk')) return 'uk';
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('en')) return 'en';
    return 'en'; // default to English
}

function initializeApp() {
    // Загрузить язык из localStorage или определить по браузеру
    const savedLanguage = localStorage.getItem('findholiday_language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    } else {
        currentLanguage = getDefaultLanguage();
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

    // Создать кнопки категорий
    renderCategoryFilters();

    // Проверить, есть ли сегодня праздники
    requestAndCheckHolidays(); // Запрашиваем разрешение и проверяем праздники

    // Для тестирования: добавить кнопку для ручного вызова синхронизации
    addTestButton();
}
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
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
    editHolidayBtn.addEventListener('click', handleEditHoliday);
    deleteHolidayBtn.addEventListener('click', handleDeleteHoliday);
    
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
    renderCategoryFilters(); // Перерисовать кнопки категорий с новым языком
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
    // Обновить плейсхолдеры для всех элементов с data-placeholder-{lang}
    document.querySelectorAll('input[data-placeholder-' + currentLanguage + '], textarea[data-placeholder-' + currentLanguage + ']').forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${currentLanguage}`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });

    // Обновить текст элементов с атрибутом data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translatedText = translations[currentLanguage][key];
        if (translatedText) {
            element.textContent = translatedText;
        }
    });

    // Обновить опции в select
    document.querySelectorAll('#holidayCategory option').forEach(option => {
        const key = option.getAttribute('data-translate');
        const translatedText = translations[currentLanguage][key];
        if (translatedText) option.textContent = translatedText;
    });

    // Обновить заголовки в модальных окнах
    document.querySelectorAll('.modal-title[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[currentLanguage][key]) el.textContent = translations[currentLanguage][key];
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
    renderHolidays(); // Перерисовываем, чтобы учесть и категорию, и поиск
}

// ===== ФИЛЬТРАЦИЯ ПО КАТЕГОРИЯМ =====
function handleCategoryFilter(category) {
    currentCategory = category;
    searchInput.value = ''; // Сбрасываем поиск при смене категории
    renderHolidays();
}

function renderCategoryFilters() {
    const categories = ['all', 'official', 'cultural', 'religious', 'fun', 'custom'];
    categoryFiltersContainer.innerHTML = '';

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.setAttribute('data-category', category);
        btn.textContent = translations[currentLanguage][`category-${category}`] || category;
        if (category === currentCategory) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            currentCategory = category;
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderHolidays();
        });
        categoryFiltersContainer.appendChild(btn);
    });
}

// ===== ФУНКЦИЯ ОТОБРАЖЕНИЯ ПРАЗДНИКОВ =====
function renderHolidays() {
    holidaysList.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();

    let filteredHolidays = holidaysData;

    // 1. Фильтрация по категории
    if (currentCategory !== 'all') {
        filteredHolidays = filteredHolidays.filter(h => (h.category || (h.isCustom ? 'custom' : '')) === currentCategory);
    }

    // 2. Фильтрация по поиску
    if (searchTerm) {
        filteredHolidays = filteredHolidays.filter(h => h.title[currentLanguage].toLowerCase().includes(searchTerm));
    }
    const sortedHolidays = filteredHolidays.sort((a, b) => {
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
function openAddHolidayModal(isEdit = false, holidayId = null) {
    addHolidayForm.reset();

    const modalTitleEl = addHolidayModal.querySelector('.modal-title');
    const saveBtn = addHolidayModal.querySelector('.btn-save');
    const categorySelect = document.getElementById('holidayCategory');
    const defaultEmoji = '🎉';

    updateFormPlaceholders();

    emojiBtns.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.getAttribute('data-emoji') === defaultEmoji) {
            btn.classList.add('selected');
        }
    });

    isEditMode = isEdit;
    editingHolidayId = holidayId;

    if (isEdit && holidayId) {
        const holiday = holidaysData.find(h => h.id === holidayId);
        if (holiday) {
            // --- РЕЖИМ РЕДАКТИРОВАНИЯ ---
            modalTitleEl.textContent = translations[currentLanguage]['edit-custom'] || 'Редактировать праздник';
            saveBtn.textContent = translations[currentLanguage]['update'] || 'Обновить';

            // Заполняем форму данными праздника
            document.getElementById('holidayName').value = holiday.title[currentLanguage];
            document.getElementById('holidayDate').value = holiday.date;
            document.getElementById('holidayDescription').value = holiday.description[currentLanguage];
            categorySelect.value = holiday.category || 'custom';
            selectedEmoji = holiday.emoji;
            selectedEmojiInput.value = holiday.emoji;

            // Выбираем соответствующий эмодзи
            emojiBtns.forEach(btn => {
                if (btn.getAttribute('data-emoji') === holiday.emoji) {
                    btn.classList.add('selected');
                }
            });

            // Убираем ограничение даты для редактирования
            document.getElementById('holidayDate').min = '';
        }
    } else {
        // --- РЕЖИМ ДОБАВЛЕНИЯ ---
        modalTitleEl.textContent = translations[currentLanguage]['add-custom'];
        saveBtn.textContent = translations[currentLanguage]['save'];
        categorySelect.value = 'custom'; // Категория по умолчанию для новых
        selectedEmoji = defaultEmoji;
        selectedEmojiInput.value = defaultEmoji;

        const today = new Date(); // Ограничение даты
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        document.getElementById('holidayDate').min = `${yyyy}-${mm}-${dd}`;
    }

    addHolidayModal.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

function closeAddHolidayModal() {
    addHolidayModal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    isEditMode = false;
    editingHolidayId = null;
}

function handleAddHoliday(e) {
    e.preventDefault();

    const name = document.getElementById('holidayName').value.trim();
    const date = document.getElementById('holidayDate').value;
    const description = document.getElementById('holidayDescription').value.trim();
    const category = document.getElementById('holidayCategory').value;

    if (!name || !date) {
        alert('Пожалуйста, заполните название и дату');
        return;
    }

    if (isEditMode && editingHolidayId) {
        // Обновляем существующий праздник
        updateCustomHoliday(editingHolidayId, name, date, description, selectedEmoji, category);
        showToast('✅ Праздник успешно обновлён!', '✏️');
    } else {
        // Добавляем новый праздник
        addCustomHoliday(name, date, description, selectedEmoji, category);
        showToast('✅ Праздник успешно добавлен!', '🎉');
    }

    closeAddHolidayModal();
    renderHolidays();
    updatePinnedDisplay();
}

/**
 * Добавляет новый пользовательский праздник в основной массив данных и сохраняет в localStorage.
 * @param {string} name - Название праздника.
 * @param {string} date - Дата в формате 'YYYY-MM-DD'.
 * @param {string} [description=''] - Описание.
 * @param {string} [emoji='🎉'] - Эмодзи.
 * @returns {object} - Созданный объект праздника.
 */
function addCustomHoliday(name, date, description = '', emoji = '🎉', category = 'custom') {
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
        category: 'custom', // Always set to 'custom' for user-created holidays
        isCustom: true
    };

    holidaysData.push(customHoliday);

    const customHolidays = holidaysData.filter(h => h.isCustom);
    localStorage.setItem('findholiday_custom_holidays', JSON.stringify(customHolidays));

    // Проверяем, не сегодня ли созданный праздник, и показываем уведомление
    checkIfHolidayIsToday(customHoliday);

    return customHoliday;
}

function updateCustomHoliday(id, name, date, description, emoji, category) {
    const holidayIndex = holidaysData.findIndex(h => h.id === id);
    if (holidayIndex === -1) return;

    const holiday = holidaysData[holidayIndex];

    // Обновляем данные
    holiday.title = { ru: name, en: name, de: name, fr: name, uk: name };
    holiday.date = date;
    holiday.emoji = emoji;
    holiday.category = 'custom'; // Always keep as 'custom' for user-created holidays
    holiday.description = {
        ru: description || 'Мой собственный праздник',
        en: description || 'My custom holiday',
        de: description || 'Mein benutzerdefinierter Feiertag',
        fr: description || 'Ma fête personnalisée',
        uk: description || 'Мій власний святок'
    };

    // Сохраняем в localStorage
    const customHolidays = holidaysData.filter(h => h.isCustom);
    localStorage.setItem('findholiday_custom_holidays', JSON.stringify(customHolidays));

    // Проверяем, не сегодня ли обновленный праздник
    checkIfHolidayIsToday(holiday);
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
/**
 * Показывает всплывающее уведомление (toast).
 * @param {string} message - Сообщение для отображения.
 * @param {string|null} icon - Эмодзи для иконки.
 */
function showToast(message, icon = null) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    // Создаем сам toast
    const toast = document.createElement('div');
    toast.className = 'toast';

    // Добавляем иконку, если она есть
    if (icon) {
        const toastIcon = document.createElement('span');
        toastIcon.className = 'toast-icon';
        toastIcon.textContent = icon;
        toast.appendChild(toastIcon);
    }

    // Создаем текст сообщения
    const toastMessage = document.createElement('span');
    toastMessage.textContent = message;

    // Создаем кнопку закрытия
    const closeButton = document.createElement('button');
    closeButton.className = 'toast-close-btn';
    closeButton.innerHTML = '&times;'; // Символ "крестик"

    toast.appendChild(toastMessage);
    toast.appendChild(closeButton);

    toastContainer.appendChild(toast);

    // Показываем toast с анимацией
    setTimeout(() => toast.classList.add('show'), 100);

    // Функция для удаления toast
    const removeToast = () => {
        toast.classList.remove('show');
        // Ждем завершения анимации исчезновения перед удалением из DOM
        toast.addEventListener('transitionend', () => toast.remove());
    };

    // Закрытие по клику на кнопку
    closeButton.addEventListener('click', removeToast);

    // Автоматическое закрытие через 5 секунд
    setTimeout(removeToast, 5000);
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
                    checkIfHolidayIsToday(holiday);
                }, index * 400); // 400ms между уведомлениями
            });
        }, 1000); // Начать показывать через 1 секунду после загрузки страницы
    }
}

function checkIfHolidayIsToday(holiday) {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    if (holiday.date === todayStr) {
        const message = `${translations[currentLanguage]['holiday-today']} — ${holiday.title[currentLanguage]}!`;
        // Передаем эмодзи праздника в качестве иконки
        showToast(message, holiday.emoji);
        const title = `${holiday.emoji} ${holiday.title[currentLanguage]}`;
        const options = {
            body: translations[currentLanguage]['holiday-today'] || 'Сегодня праздник!',
            // icon: 'path/to/icon.png' // Можно добавить иконку, если она есть
            // icon: 'path/to/icon.png' // Сюда можно добавить путь к иконке приложения
        };
        showBrowserNotification(title, options, holiday.id);
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

    // Отобразить категорию
    const categoryEl = document.getElementById('modalCategory');
    const categoryKey = holiday.category || (holiday.isCustom ? 'custom' : '');
    categoryEl.textContent = translations[currentLanguage][`category-${categoryKey}`] || '';
    categoryEl.style.display = categoryKey ? 'inline-block' : 'none';
    
    // Обновить кнопку избранного
    const isFavorite = favorites.includes(holidayId);
    updateFavoriteButton(isFavorite);

    // Показать или скрыть кнопки редактирования и удаления
    const isCustom = holiday.isCustom || false;
    editHolidayBtn.style.display = isCustom ? 'flex' : 'none';
    editHolidayBtn.style.alignItems = 'center'; // Для вертикального центрирования
    editHolidayBtn.style.justifyContent = 'center'; // Для горизонтального
    deleteHolidayBtn.style.display = isCustom ? 'flex' : 'none';
    deleteHolidayBtn.style.alignItems = 'center'; // Для вертикального центрирования
    deleteHolidayBtn.style.justifyContent = 'center'; // Для горизонтального
    // Открыть модальное окно
    modal.classList.remove('hidden');
    document.body.classList.add('no-scroll');


    // Запустить обратный отсчёт
    startCountdown(holiday.date);
}

function handleEditHoliday() {
    if (!currentHolidayId) return;

    const holidayToEdit = holidaysData.find(h => h.id === currentHolidayId);
    if (!holidayToEdit || !holidayToEdit.isCustom) return;

    closeModal();
    openAddHolidayModal(true, holidayToEdit.id);
}

function handleDeleteHoliday() {
    if (!currentHolidayId) return;

    const holidayToDelete = holidaysData.find(h => h.id === currentHolidayId);
    if (!holidayToDelete || !holidayToDelete.isCustom) return;

    // Анимация удаления карточки из основного списка
    const cardInList = document.querySelector(`.holiday-card[data-id="${holidayToDelete.id}"]`);
    if (cardInList) {
        cardInList.classList.add('fading-out');
    }
    // Анимация удаления из избранного
    const cardInPinned = document.querySelector(`.pinned-card[data-id="${holidayToDelete.id}"]`);
    if (cardInPinned) {
        cardInPinned.classList.add('fading-out');
    }
    // Удаляем из основного массива
    holidaysData = holidaysData.filter(h => h.id !== holidayToDelete.id);

    // Удаляем из избранного, если он там был
    favorites = favorites.filter(id => id !== holidayToDelete.id);
    localStorage.setItem('findholiday_favorites', JSON.stringify(favorites));

    // Обновляем localStorage с пользовательскими праздниками
    const customHolidays = holidaysData.filter(h => h.isCustom);
    localStorage.setItem('findholiday_custom_holidays', JSON.stringify(customHolidays));

    // Закрываем модальное окно и обновляем списки после анимации
    setTimeout(() => {
        closeModal();
        renderHolidays();
        updatePinnedDisplay();
    }, 300); // Задержка соответствует длительности анимации
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
    card.setAttribute('data-id', holiday.id);
    card.className = 'pinned-card';

    const title = holiday.title[currentLanguage];
    const date = formatDateForDisplay(holiday.date);

    card.innerHTML = `
        <button class="pinned-close-btn">×</button>
        <div class="pinned-card-title">${holiday.emoji} ${title}</div>
        <div class="pinned-card-date">${date}</div>
    `;

    // Клик на карточку открывает детали
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('pinned-close-btn')) {
            showHolidayDetails(holiday.id);
        }
    });

    // Кнопка удаления
    const removeHoliday = (e) => {
        e.stopPropagation();
        card.classList.add('fading-out');

        setTimeout(() => {
            favorites = favorites.filter(id => id !== holiday.id);
            localStorage.setItem('findholiday_favorites', JSON.stringify(favorites));
            updatePinnedDisplay();
        }, 300);


        // Если открыта деталь этого праздника, обновить кнопку
        if (currentHolidayId === holiday.id) {
            updateFavoriteButton(false);
        }
    };

    card.querySelector('.pinned-close-btn').addEventListener('click', removeHoliday);

    return card;
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

function showBrowserNotification(title, options, holidayId) {
    if (!('Notification' in window)) {
        console.log('Этот браузер не поддерживает уведомления.');
        return;
    }

    if (Notification.permission === 'granted') {
        const notification = new Notification(title, options);

        // Добавляем обработчик клика
        notification.onclick = function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение
            window.focus(); // Фокусируемся на вкладке с приложением
            showHolidayDetails(holidayId); // Показываем детали праздника
            this.close(); // Закрываем уведомление после клика
        };
    }
}

function requestAndCheckHolidays() {
    // Запрашиваем разрешение перед проверкой
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                const today = new Date();
                const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                const todaysHolidays = holidaysData.filter(h => h.date === todayStr);
                checkTodaysHolidays(todaysHolidays);
            }
        });
    }
}

function checkTodaysHolidays(holidays) {
    holidays.forEach((holiday, index) => {
        setTimeout(() => {
            showHolidayNotification(holiday);
        }, index * 500); // Небольшая задержка между уведомлениями
    });
}

function addTestButton() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '10px';
    container.style.right = '10px';
    container.style.zIndex = '1000';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '5px';

    const testBtn = document.createElement('button');
    testBtn.textContent = 'Test Sync';
    testBtn.addEventListener('click', () => {
        // Direct call for testing
        fetch('/holidays.json')
            .then(response => response.json())
            .then(holidaysData => {
                const today = new Date();
                const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                const todaysHolidays = holidaysData.filter(h => h.date === todayStr);
                console.log('Today:', todayStr, 'Holidays:', todaysHolidays);
                if (todaysHolidays.length > 0) {
                    todaysHolidays.forEach(holiday => {
                        if (Notification.permission === 'granted') {
                            const title = `${holiday.emoji} ${holiday.title.ru}`;
                            const options = {
                                body: 'Сегодня праздник!',
                                icon: '/icons/icon-192x192.png',
                                data: { holidayId: holiday.id }
                            };
                            new Notification(title, options);
                        } else {
                            console.log('Permission not granted');
                        }
                    });
                }
            });

        // Also try sync
        if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
            navigator.serviceWorker.ready.then(registration => {
                if ('sync' in registration) {
                    registration.sync.register('check-holidays');
                    console.log('Sync registered');
                } else {
                    console.log('Background Sync not supported');
                }
            });
        }
    });

    const unregisterBtn = document.createElement('button');
    unregisterBtn.textContent = 'Unregister SW';
    unregisterBtn.addEventListener('click', () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => {
                    registration.unregister();
                    console.log('Service Worker unregistered');
                });
            });
        }
    });

    container.appendChild(testBtn);
    container.appendChild(unregisterBtn);
    document.body.appendChild(container);
}

function showHolidayNotification(holiday) {
    const title = `${holiday.emoji} ${holiday.title[currentLanguage]}`;
    const options = {
        body: translations[currentLanguage]['holiday-today'] || 'Сегодня праздник!',
        icon: './icons/icon-192x192.png', // Путь к иконке
        data: { // Передаем данные в Service Worker
            holidayId: holiday.id
        }
    };

    // Отправляем уведомление через Service Worker
    if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    }
}
