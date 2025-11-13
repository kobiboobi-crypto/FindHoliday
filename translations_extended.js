// Объект с переводами для всех поддерживаемых языков
const translations = {
    ru: {
        'favorites': 'Избранные',
        'countdown': 'Обратный отсчёт',
        'days': 'дней',
        'hours': 'часов',
        'minutes': 'минут',
        'seconds': 'секунд',
        'add-favorite': 'Добавить в избранное',
        'remove-favorite': 'Удалить из избранного',
        'search-placeholder': 'Поиск праздников...',
        'no-results': 'Праздники не найдены',
        'holiday-today': 'Сегодня!',
        'holiday-passed': 'Прошёл',
        'days-left': 'Дней осталось',
        'add-custom': 'Добавить свой праздник',
        'custom-name': 'Название праздника',
        'custom-date': 'Выберите дату',
        'custom-description': 'Описание (опционально)',
        'save': 'Сохранить',
        'cancel': 'Отмена',
        'my-holidays': 'Мои праздники',
    },
    en: {
        'favorites': 'Favorites',
        'countdown': 'Countdown',
        'days': 'days',
        'hours': 'hours',
        'minutes': 'minutes',
        'seconds': 'seconds',
        'add-favorite': 'Add to favorites',
        'remove-favorite': 'Remove from favorites',
        'search-placeholder': 'Search holidays...',
        'no-results': 'No holidays found',
        'holiday-today': 'Today!',
        'holiday-passed': 'Passed',
        'days-left': 'Days left',
        'add-custom': 'Add custom holiday',
        'custom-name': 'Holiday name',
        'custom-date': 'Select date',
        'custom-description': 'Description (optional)',
        'save': 'Save',
        'cancel': 'Cancel',
        'my-holidays': 'My holidays',
    },
    de: {
        'favorites': 'Favoriten',
        'countdown': 'Countdown',
        'days': 'Tage',
        'hours': 'Stunden',
        'minutes': 'Minuten',
        'seconds': 'Sekunden',
        'add-favorite': 'Zu Favoriten hinzufügen',
        'remove-favorite': 'Aus Favoriten entfernen',
        'search-placeholder': 'Feiertage durchsuchen...',
        'no-results': 'Keine Feiertage gefunden',
        'holiday-today': 'Heute!',
        'holiday-passed': 'Abgelaufen',
        'days-left': 'Tage verbleibend',
        'add-custom': 'Benutzerdefinierten Feiertag hinzufügen',
        'custom-name': 'Name des Feiertags',
        'custom-date': 'Datum wählen',
        'custom-description': 'Beschreibung (optional)',
        'save': 'Speichern',
        'cancel': 'Abbrechen',
        'my-holidays': 'Meine Feiertage',
    },
    fr: {
        'favorites': 'Favoris',
        'countdown': 'Compte à rebours',
        'days': 'jours',
        'hours': 'heures',
        'minutes': 'minutes',
        'seconds': 'secondes',
        'add-favorite': 'Ajouter aux favoris',
        'remove-favorite': 'Retirer des favoris',
        'search-placeholder': 'Rechercher des vacances...',
        'no-results': 'Aucune vacance trouvée',
        'holiday-today': 'Aujourd\'hui!',
        'holiday-passed': 'Passé',
        'days-left': 'Jours restants',
        'add-custom': 'Ajouter une vacance personnalisée',
        'custom-name': 'Nom de la vacance',
        'custom-date': 'Sélectionner la date',
        'custom-description': 'Description (optionnel)',
        'save': 'Enregistrer',
        'cancel': 'Annuler',
        'my-holidays': 'Mes vacances',
    },
    uk: {
        'favorites': 'Улюблені',
        'countdown': 'Зворотний відлік',
        'days': 'днів',
        'hours': 'годин',
        'minutes': 'хвилин',
        'seconds': 'секунд',
        'add-favorite': 'Додати до улюблених',
        'remove-favorite': 'Видалити з улюблених',
        'search-placeholder': 'Пошук святкувань...',
        'no-results': 'Святкування не знайдено',
        'holiday-today': 'Сьогодні!',
        'holiday-passed': 'Минув',
        'days-left': 'Днів залишилось',
        'add-custom': 'Додати власне святкування',
        'custom-name': 'Назва святкування',
        'custom-date': 'Виберіть дату',
        'custom-description': 'Опис (опційно)',
        'save': 'Зберегти',
        'cancel': 'Скасувати',
        'my-holidays': 'Мої святкування',
    }
};

// Данные о праздниках (50 ПРАЗДНИКОВ!)
const holidaysData = [
    // ЯНВАРЬ
    {
        id: 1,
        title: {
            ru: 'Новый Год',
            en: 'New Year',
            de: 'Neujahrstag',
            fr: 'Jour de l\'an',
            uk: 'Новий рік'
        },
        date: '2026-01-01',
        emoji: '🎆',
        description: {
            ru: 'Самый волшебный и долгожданный праздник года! Новый год символизирует новое начало, надежду и обновление. В этот день люди по всему миру собираются с семьёй, встречают мы новый год с размахом, с шампанским и надеждой на лучшее будущее.',
            en: 'The most magical and anticipated holiday of the year! New Year symbolizes new beginnings, hope and renewal. On this day, people around the world gather with their families, celebrate with champagne and hope for a better future.',
            de: 'Das magischste und sehnlichst erwartete Fest des Jahres! Der Neujahrstag symbolisiert neue Anfänge, Hoffnung und Erneuerung.',
            fr: 'La fête la plus magique et la plus attendue de l\'année! Le Jour de l\'an symbolise les nouveaux débuts, l\'espoir et le renouvellement.',
            uk: 'Найбільш чарівне та очікуване свято року! Новий рік символізує новий початок, надію та оновлення.'
        }
    },
    {
        id: 2,
        title: {
            ru: 'День Святого Архангела Михаила',
            en: 'Orthodox Christmas',
            de: 'Orthodoxes Weihnachten',
            fr: 'Noël orthodoxe',
            uk: 'Православне Різдво'
        },
        date: '2026-01-07',
        emoji: '✨',
        description: {
            ru: 'Рождество по православному календарю. День, когда рождается Иисус Христос согласно юлианскому календарю.',
            en: 'Orthodox Christmas, celebrated on January 7th according to the Julian calendar.',
            de: 'Orthodoxes Weihnachten nach dem julianischen Kalender.',
            fr: 'Noël orthodoxe célébré le 7 janvier selon le calendrier julien.',
            uk: 'Православне Різдво за юліанським календарем.'
        }
    },

    // ФЕВРАЛЬ
    {
        id: 3,
        title: {
            ru: 'Всемирный день радио',
            en: 'World Radio Day',
            de: 'Welttag des Radios',
            fr: 'Journée mondiale de la radio',
            uk: 'Всесвітній день радіо'
        },
        date: '2026-02-13',
        emoji: '📻',
        description: {
            ru: 'День, посвящённый истории и значению радио в мировой коммуникации. Отмечается важность радиовещания для информирования и развлечения.',
            en: 'A day celebrating the history and importance of radio in global communication.',
            de: 'Ein Tag, der der Geschichte und Bedeutung des Radios in der globalen Kommunikation gewidmet ist.',
            fr: 'Une journée célébrant l\'histoire et l\'importance de la radio dans la communication mondiale.',
            uk: 'День, присвячений історії та значенню радіо у світовій комунікації.'
        }
    },
    {
        id: 4,
        title: {
            ru: 'День Святого Валентина',
            en: 'Valentine\'s Day',
            de: 'Valentinstag',
            fr: 'Saint-Valentin',
            uk: 'День святого Валентина'
        },
        date: '2026-02-14',
        emoji: '💝',
        description: {
            ru: 'День любви и признания в чувствах. Это время, когда люди дарят своим близким цветы, подарки и открытки с добрыми пожеланиями.',
            en: 'A day of love and affection. People give flowers, gifts and cards to their loved ones.',
            de: 'Der Tag der Liebe und Zuneigung, an dem Menschen Blumen und Geschenke austauschen.',
            fr: 'La fête de l\'amour où les gens échangent des cadeaux et des fleurs.',
            uk: 'День кохання та прихильності, коли люди дарують один одному квіти та подарунки.'
        }
    },
    {
        id: 5,
        title: {
            ru: 'Международный день дарения книг',
            en: 'International Book Giving Day',
            de: 'Internationaler Tag des Bücherschenkens',
            fr: 'Journée internationale du don de livres',
            uk: 'Міжнародний день дарування книг'
        },
        date: '2026-02-14',
        emoji: '📚',
        description: {
            ru: 'День, посвящённый любви к чтению и распространению книг. Люди дарят книги друг другу и пропагандируют грамотность.',
            en: 'A day dedicated to the love of reading and spreading books to others.',
            de: 'Ein Tag, der der Liebe zum Lesen und der Verbreitung von Büchern gewidmet ist.',
            fr: 'Une journée dédiée à l\'amour de la lecture et au partage des livres.',
            uk: 'День, присвячений любові до читання та поширенню книг.'
        }
    },

    {
        id: 7,
        title: {
            ru: 'Всемирный день правильного обращения с горным беспозвоночным видом',
            en: 'World NGO Day',
            de: 'Welttag der Nichtregierungsorganisationen',
            fr: 'Journée mondiale des ONG',
            uk: 'Всесвітній день НДО'
        },
        date: '2026-02-21',
        emoji: '🌍',
        description: {
            ru: 'День признания важной роли неправительственных организаций в демократии и развитии международных отношений.',
            en: 'A day celebrating the role of non-governmental organizations in society.',
            de: 'Ein Tag zur Feier der Rolle von Nichtregierungsorganisationen.',
            fr: 'Une journée célébrant le rôle des organisations non gouvernementales.',
            uk: 'День святкування ролі неурядових організацій у суспільстві.'
        }
    },
    {
        id: 8,
        title: {
            ru: 'Хиджра (Исламский Новый год)',
            en: 'Islamic New Year (Hijri)',
            de: 'Islamisches Neujahr',
            fr: 'Nouvel An Islamique',
            uk: 'Ісламський Новий Рік'
        },
        date: '2026-07-07',
        emoji: '🕌',
        description: {
            ru: 'Начало нового года по мусульманскому лунному календарю (Хиджре). Это важное событие в исламской традиции.',
            en: 'The start of the new Islamic year according to the Hijri calendar.',
            de: 'Der Beginn des neuen Jahres nach dem islamischen Mondkalender.',
            fr: 'Le début de la nouvelle année selon le calendrier islamique.',
            uk: 'Початок нового року за ісламським місячним календарем.'
        }
    },
    {
        id: 9,
        title: {
            ru: 'День Матери (США/Канада)',
            en: 'Mother\'s Day',
            de: 'Muttertag',
            fr: 'Fête des Mères',
            uk: 'День матері'
        },
        date: '2026-05-10',
        emoji: '👩‍❤️‍👨',
        description: {
            ru: 'День, посвящённый матерям и их неоценимому вкладу в воспитание и развитие детей.',
            en: 'A day dedicated to mothers and their invaluable contribution to raising children.',
            de: 'Ein Tag, der Müttern und ihrem wertvollen Beitrag zur Kindererziehung gewidmet ist.',
            fr: 'Une journée dédiée aux mères et à leur précieuse contribution à l\'éducation des enfants.',
            uk: 'День, присвячений матерям та їхньому цінному внеску у виховання дітей.'
        }
    },
    {
        id: 10,
        title: {
            ru: 'Праздник Светлого Воскресения Христова',
            en: 'Easter',
            de: 'Ostern',
            fr: 'Pâques',
            uk: 'Великдень'
        },
        date: '2026-04-05',
        emoji: '🥚',
        description: {
            ru: 'Центральный праздник христианства, который отмечает воскресение Иисуса Христа. Люди украшают яйца, дарят подарки и семья собирается вместе.',
            en: 'The central holiday of Christianity celebrating the resurrection of Jesus Christ.',
            de: 'Der Hauptfeiertag des Christentums, der die Auferstehung Jesu Christi feiert.',
            fr: 'La fête centrale du christianisme célébrant la résurrection de Jésus-Christ.',
            uk: 'Центральне свято християнства, яке святкує воскресіння Ісуса Христа.'
        }
    },
    {
        id: 11,
        title: {
            ru: 'Белтэйн (Кельтский Новый год)',
            en: 'Beltane',
            de: 'Beltane',
            fr: 'Beltaine',
            uk: 'Белтейн'
        },
        date: '2026-05-01',
        emoji: '🔥',
        description: {
            ru: 'Древний кельтский праздник, знаменующий начало лета. Люди разжигали костры и совершали ритуалы для благополучия скота и урожая.',
            en: 'An ancient Celtic festival marking the beginning of summer with bonfires and rituals.',
            de: 'Ein altes keltisches Fest, das den Sommeranfang mit Lagerfeuern markiert.',
            fr: 'Une ancienne fête celtique marquant le début de l\'été avec des feux de joie.',
            uk: 'Давнє кельтське свято, що позначає початок літа з кострами та ритуалами.'
        }
    },
    {
        id: 12,
        title: {
            ru: 'День корифея',
            en: 'World Day for Cultural Diversity',
            de: 'Welttag der kulturellen Vielfalt',
            fr: 'Journée mondiale de la diversité culturelle',
            uk: 'Всесвітній день культурної різноманітності'
        },
        date: '2026-05-21',
        emoji: '🎨',
        description: {
            ru: 'День, посвящённый культурному разнообразию и обмену культурными ценностями между народами.',
            en: 'A day celebrating cultural diversity and the exchange of cultural values between peoples.',
            de: 'Ein Tag, der die kulturelle Vielfalt und den Austausch feiert.',
            fr: 'Une journée célébrant la diversité culturelle et l\'échange de valeurs.',
            uk: 'День святкування культурної різноманітності та обміну культурних цінностей.'
        }
    },
    {
        id: 13,
        title: {
            ru: 'Китайский фестиваль лодок-драконов',
            en: 'Dragon Boat Festival',
            de: 'Drachenbootfest',
            fr: 'Fête des bateaux-dragons',
            uk: 'Фестиваль драконових човнів'
        },
        date: '2026-06-09',
        emoji: '🐉',
        description: {
            ru: 'Праздник, посвящённый памяти древнего поэта Цюй Юаня. Люди едят рисовые пирамидки (чжундзы) и катаются на лодках-драконах.',
            en: 'A festival honoring the ancient poet Qu Yuan with dragon boat races and traditional rice dumplings.',
            de: 'Ein Fest zu Ehren des Dichters Qu Yuan mit Drachenbootrennen.',
            fr: 'Un festival célébrant le poète Qu Yuan avec des courses de bateaux-dragons.',
            uk: 'Фестиваль на честь давнього поета Цюй Юаня з гонками на драконових човнах.'
        }
    },
    {
        id: 14,
        title: {
            ru: 'День Бильбо (День рождения Толкина)',
            en: 'Tolkien\'s Birthday',
            de: 'Tolkiens Geburtstag',
            fr: 'Anniversaire de Tolkien',
            uk: 'День народження Толкієна'
        },
        date: '2026-01-03',
        emoji: '⚔️',
        description: {
            ru: 'День рождения автора Джона Толкина (3 января 1892). Поклонники отмечают день создателя Средиземья.',
            en: 'The birthday of author J.R.R. Tolkien, celebrating the creator of Middle-earth.',
            de: 'Der Geburtstag von J.R.R. Tolkien, dem Schöpfer von Mittelerde.',
            fr: 'L\'anniversaire de J.R.R. Tolkien, créateur de la Terre du Milieu.',
            uk: 'День народження автора Дж.Р.Р. Толкієна, творця Середзем\'я.'
        }
    },
    {
        id: 15,
        title: {
            ru: 'День Международного Полёта',
            en: 'International Flight Day',
            de: 'Internationaler Flugtag',
            fr: 'Journée internationale du vol',
            uk: 'Міжнародний день польоту'
        },
        date: '2026-12-17',
        emoji: '✈️',
        description: {
            ru: 'День, посвящённый первому управляемому полёту братьев Райт (1903). Праздник авиации и человеческих достижений.',
            en: 'Celebrating the first powered flight by the Wright Brothers in 1903.',
            de: 'Ein Tag, der den ersten Motorflug der Gebrüder Wright würdigt.',
            fr: 'Un jour célébrant le premier vol motorisé des frères Wright.',
            uk: 'День святкування першого моторизованого польоту братів Райт.'
        }
    },
    {
        id: 16,
        title: {
            ru: 'День Святого Люсии',
            en: 'Saint Lucy\'s Day',
            de: 'Luziertag',
            fr: 'Jour de Sainte-Lucie',
            uk: 'День святої Люції'
        },
        date: '2026-12-13',
        emoji: '🕯️',
        description: {
            ru: 'Шведский праздник света во время зимнего солнцестояния. Люди зажигают свечи и поют традиционные песни.',
            en: 'A Swedish festival of lights during the winter solstice with candles and traditional songs.',
            de: 'Ein schwedisches Lichtfest mit Kerzen und traditionellen Liedern.',
            fr: 'Une fête suédoise des lumières avec des bougies et des chants traditionnels.',
            uk: 'Шведське свято світла з свічками та традиційними піснями.'
        }
    },
    {
        id: 17,
        title: {
            ru: 'День Независимости Греции',
            en: 'Greek Independence Day',
            de: 'Griechischer Unabhängigkeitstag',
            fr: 'Jour de l\'Indépendance grecque',
            uk: 'День незалежності Греції'
        },
        date: '2026-03-25',
        emoji: '🇬🇷',
        description: {
            ru: 'День независимости Греции от Османской империи (1821). День национального патриотизма и гордости.',
            en: 'Greece\'s independence from the Ottoman Empire in 1821.',
            de: 'Die Unabhängigkeit Griechenlands vom Osmanischen Reich 1821.',
            fr: 'L\'indépendance de la Grèce de l\'Empire ottoman en 1821.',
            uk: 'Незалежність Греції від Османської імперії у 1821 році.'
        }
    },
    {
        id: 18,
        title: {
            ru: 'Дивали (Фестиваль Огней)',
            en: 'Diwali (Festival of Lights)',
            de: 'Diwali (Lichterfest)',
            fr: 'Diwali (Fête des Lumières)',
            uk: 'Діваалі (Свято Світла)'
        },
        date: '2026-11-01',
        emoji: '💡',
        description: {
            ru: 'Главный индийский праздник света, символизирующий победу добра над злом. Люди украшают дома светильниками и фейерверками.',
            en: 'India\'s major festival of lights celebrating the victory of good over evil.',
            de: 'Indiens Hauptlichtfest mit Lampen und Feuerwerk.',
            fr: 'La principale fête des lumières de l\'Inde avec lampes et feux d\'artifice.',
            uk: 'Головне індійське свято світла з лампами та феєрверками.'
        }
    },
    {
        id: 19,
        title: {
            ru: 'Колумбиада (День Колумба)',
            en: 'Columbus Day',
            de: 'Kolumbustag',
            fr: 'Jour de Christophe Colomb',
            uk: 'День Колумба'
        },
        date: '2026-10-12',
        emoji: '🧭',
        description: {
            ru: 'День, посвящённый путешествиям Христофора Колумба и открытию им Нового Света (1492).',
            en: 'Celebrating Christopher Columbus\'s voyage and the discovery of the New World in 1492.',
            de: 'Die Reise von Christoph Kolumbus und die Entdeckung der Neuen Welt 1492.',
            fr: 'Le voyage de Christophe Colomb et la découverte du Nouveau Monde en 1492.',
            uk: 'Подорож Крістофа Колумба та відкриття ним Нового Світу 1492 року.'
        }
    },
    {
        id: 20,
        title: {
            ru: 'Рош-ха-Шана (Еврейский Новый год)',
            en: 'Rosh Hashanah',
            de: 'Rosh Hashana',
            fr: 'Rosh Hashanah',
            uk: 'Рош-ха-Шана'
        },
        date: '2026-09-23',
        emoji: '🍎',
        description: {
            ru: 'Еврейский Новый год, начало периода размышления и кайания. Люди едят яблоки с медом как символ сладкого года.',
            en: 'The Jewish New Year, a time of reflection and repentance with apples and honey.',
            de: 'Das jüdische Neujahr mit Äpfeln und Honig als Symbole.',
            fr: 'La Nouvelle Année juive avec des pommes et du miel.',
            uk: 'Єврейський Новий Рік з яблуками та медом як символами.'
        }
    },
    {
        id: 21,
        title: {
            ru: 'День Солнца',
            en: 'International Day of the Sun',
            de: 'Internationaler Sonnentag',
            fr: 'Journée internationale du Soleil',
            uk: 'Міжнародний день Сонця'
        },
        date: '2026-06-21',
        emoji: '☀️',
        description: {
            ru: 'День, посвящённый важности солнечной энергии и её применению. Отмечает летнее солнцестояние - самый длинный день в году.',
            en: 'A day celebrating solar energy and the importance of the sun, marking the summer solstice.',
            de: 'Ein Tag zur Feier der Sonnenenergie und der Bedeutung der Sonne.',
            fr: 'Une journée célébrant l\'énergie solaire et l\'importance du soleil.',
            uk: 'День святкування сонячної енергії та значення Сонця.'
        }
    },
    {
        id: 22,
        title: {
            ru: 'Международный женский день',
            en: 'International Women\'s Day',
            de: 'Internationaler Frauentag',
            fr: 'Journée internationale des femmes',
            uk: 'Міжнародний жіночий день'
        },
        date: '2026-03-08',
        emoji: '👩',
        description: {
            ru: 'Праздник, посвящённый всем женщинам мира. День признания величия и красоты женщин, их вклада в общество и семью.',
            en: 'A holiday dedicated to all women in the world, recognizing their greatness and beauty.',
            de: 'Ein Feiertag, der allen Frauen der Welt gewidmet ist.',
            fr: 'Une fête dédiée à toutes les femmes du monde.',
            uk: 'Свято, присвячене всім жінкам світу.'
        }
    },
    {
        id: 23,
        title: {
            ru: 'День Святого Патрика',
            en: 'St. Patrick\'s Day',
            de: 'Heiliger Patrick Tag',
            fr: 'Jour de Saint-Patrick',
            uk: 'День святого Патрика'
        },
        date: '2026-03-17',
        emoji: '🍀',
        description: {
            ru: 'Ирландский праздник, отмечаемый по всему миру. День, когда все надевают зелёные одежды и украшают себя клевером.',
            en: 'An Irish holiday celebrated worldwide. People wear green and celebrate Irish culture.',
            de: 'Ein irischer Feiertag, an dem Menschen grüne Kleidung tragen und feiern.',
            fr: 'Une fête irlandaise célébrée dans le monde entier avec des vêtements verts.',
            uk: 'Ірландське свято, яке святкується по всьому світу, з зеленими одягом.'
        }
    },
    {
        id: 24,
        title: {
            ru: 'День поэзии',
            en: 'Poetry Day',
            de: 'Poesietag',
            fr: 'Jour de la poésie',
            uk: 'День поезії'
        },
        date: '2026-03-21',
        emoji: '✒️',
        description: {
            ru: 'День, посвящённый поэзии и литературе. Люди читают стихи, пишут свои произведения и делятся творчеством.',
            en: 'A day dedicated to poetry and literature, where people read and share poems.',
            de: 'Ein Tag, der der Poesie und Literatur gewidmet ist.',
            fr: 'Une journée dédiée à la poésie et à la littérature.',
            uk: 'День, присвячений поезії та літературі.'
        }
    },

    // АПРЕЛЬ
    {
        id: 11,
        title: {
            ru: 'Пасха',
            en: 'Easter',
            de: 'Ostern',
            fr: 'Pâques',
            uk: 'Великдень'
        },
        date: '2026-04-05',
        emoji: '🐣',
        description: {
            ru: 'Один из самых важных религиозных праздников. День воскресения Иисуса Христа. Люди украшают дома, красят яйца и собираются с семьёй.',
            en: 'One of the most important religious holidays, celebrating the resurrection of Jesus Christ.',
            de: 'Ostern, einer der wichtigsten religiösen Feiertage, mit bemalten Eiern und Familientreffen.',
            fr: 'Une des plus importantes fêtes religieuses, célébrant la résurrection de Jésus-Christ.',
            uk: 'Одне з найважливіших релігійних свят, яке святкується розписаними яйцями.'
        }
    },
    {
        id: 12,
        title: {
            ru: 'День рождения Земли',
            en: 'Earth Day',
            de: 'Tag der Erde',
            fr: 'Journée de la Terre',
            uk: 'День Землі'
        },
        date: '2026-04-22',
        emoji: '🌍',
        description: {
            ru: 'Глобальный день, посвящённый защите окружающей среды. Люди участвуют в экологических инициативах и сажают деревья.',
            en: 'A global day dedicated to protecting the environment. People participate in ecological initiatives.',
            de: 'Ein globaler Tag zum Schutz der Umwelt, an dem Menschen Bäume pflanzen.',
            fr: 'Une journée mondiale dédiée à la protection de l\'environnement.',
            uk: 'Глобальний день, присвячений захисту навколишнього середовища.'
        }
    },
    {
        id: 13,
        title: {
            ru: 'День книги',
            en: 'Book Day',
            de: 'Buchtag',
            fr: 'Jour du livre',
            uk: 'День книги'
        },
        date: '2026-04-23',
        emoji: '📖',
        description: {
            ru: 'День, посвящённый книгам и литературе. Люди обмениваются книгами и посещают библиотеки.',
            en: 'A day dedicated to books and literature, where people exchange books.',
            de: 'Ein Tag, der den Büchern und der Literatur gewidmet ist.',
            fr: 'Une journée dédiée aux livres et à la littérature.',
            uk: 'День, присвячений книгам та літературі.'
        }
    },

    // МАЙ
    {
        id: 14,
        title: {
            ru: 'День праздника труда',
            en: 'Labour Day',
            de: 'Tag der Arbeit',
            fr: 'Fête du Travail',
            uk: 'День праці'
        },
        date: '2026-05-01',
        emoji: '💼',
        description: {
            ru: 'Международный день, посвящённый рабочему движению и достижениям трудящихся. Люди отдыхают и проводят время с семьёй.',
            en: 'International Labour Day, celebrating workers and their achievements.',
            de: 'Der Tag der Arbeit, ein internationaler Feiertag für Arbeiter.',
            fr: 'La Fête du Travail, une journée internationale célébrant les travailleurs.',
            uk: 'Міжнародний день, присвячений робітничому руху.'
        }
    },

    {
        id: 16,
        title: {
            ru: 'День матери',
            en: 'Mother\'s Day',
            de: 'Muttertag',
            fr: 'Fête des Mères',
            uk: 'День матері'
        },
        date: '2026-05-10',
        emoji: '👩‍👧',
        description: {
            ru: 'День, посвящённый матерям и материнству. Люди дарят подарки, цветы и выражают благодарность своим матерям.',
            en: 'Mother\'s Day, a day dedicated to mothers. People give gifts and thanks to their mothers.',
            de: 'Der Muttertag, ein Tag der Würdigung von Müttern.',
            fr: 'La Fête des Mères, une journée dédiée aux mères.',
            uk: 'День, присвячений матерям та материнству.'
        }
    },

    // ИЮНЬ

    {
        id: 18,
        title: {
            ru: 'День отца',
            en: 'Father\'s Day',
            de: 'Vatertag',
            fr: 'Fête des Pères',
            uk: 'День батька'
        },
        date: '2026-06-21',
        emoji: '👨‍👧',
        description: {
            ru: 'День, посвящённый отцам и отцовству. Люди дарят подарки и выражают благодарность своим отцам.',
            en: 'Father\'s Day, a day dedicated to fathers. People give gifts and thanks to their fathers.',
            de: 'Der Vatertag, ein Tag der Würdigung von Vätern.',
            fr: 'La Fête des Pères, une journée dédiée aux pères.',
            uk: 'День, присвячений батькам та батьківству.'
        }
    },
    {
        id: 19,
        title: {
            ru: 'День летнего солнцестояния',
            en: 'Summer Solstice',
            de: 'Sommersonnenwende',
            fr: 'Solstice d\'été',
            uk: 'Літнє сонцестояння'
        },
        date: '2026-06-21',
        emoji: '☀️',
        description: {
            ru: 'Самый длинный день в году. Древний праздник, связанный с природой и солнцем.',
            en: 'The longest day of the year. An ancient holiday celebrating the sun.',
            de: 'Der längste Tag des Jahres, ein antiker Feiertag der Sonnenanbetung.',
            fr: 'Le jour le plus long de l\'année, célébrant le soleil et la nature.',
            uk: 'Найдовший день року, древнє свято, пов\'язане з природою.'
        }
    },

    // ИЮЛЬ
    {
        id: 20,
        title: {
            ru: 'День Независимости США',
            en: 'Independence Day',
            de: 'Unabhängigkeitstag',
            fr: 'Jour de l\'indépendance',
            uk: 'День Незалежності'
        },
        date: '2026-07-04',
        emoji: '🇺🇸',
        description: {
            ru: 'Национальный праздник США. День поднимают флаги, проводят парады, устраивают пикники и смотрят фейерверки.',
            en: 'Independence Day of the United States. People raise flags, hold parades and watch fireworks.',
            de: 'Der Unabhängigkeitstag der USA, mit Flaggen, Paraden und Feuerwerk.',
            fr: 'L\'Indépendance Américaine, célébrée avec des drapeaux, des défilés et des feux d\'artifice.',
            uk: 'День Незалежності США, святкується з прапорами та феєрверками.'
        }
    },
    {
        id: 21,
        title: {
            ru: 'День шоколада',
            en: 'Chocolate Day',
            de: 'Schokoladentag',
            fr: 'Journée du chocolat',
            uk: 'День шоколаду'
        },
        date: '2026-07-11',
        emoji: '🍫',
        description: {
            ru: 'День, посвящённый шоколаду и сладостям. Люди угощают друг друга шоколадом и наслаждаются сладким лакомством.',
            en: 'Chocolate Day, dedicated to chocolate and sweets. People share chocolate with friends.',
            de: 'Der Schokoladentag, ein Tag der Süßigkeiten und Schokolade.',
            fr: 'La Journée du Chocolat, une journée dédiée au chocolat et aux sucreries.',
            uk: 'День, присвячений шоколаду та солодощам.'
        }
    },

    // АВГУСТ



    // СЕНТЯБРЬ

    {
        id: 25,
        title: {
            ru: 'Осеннее равноденствие',
            en: 'Autumn Equinox',
            de: 'Herbsttagundnachtgleiche',
            fr: 'Équinoxe d\'automne',
            uk: 'Осіннє рівнодення'
        },
        date: '2026-09-22',
        emoji: '🍂',
        description: {
            ru: 'День, когда день и ночь равны по длине. Начало осени. Древний праздник урожая.',
            en: 'Autumn Equinox, when day and night are equal. The beginning of autumn.',
            de: 'Die Herbsttagundnachtgleiche, der Beginn des Herbstes.',
            fr: 'L\'Équinoxe d\'Automne, le début de l\'automne et de la récolte.',
            uk: 'День, коли день та ніч рівні. Початок осені.'
        }
    },

    // ОКТЯБРЬ

    {
        id: 27,
        title: {
            ru: 'Хеллоуин',
            en: 'Halloween',
            de: 'Halloween',
            fr: 'Halloween',
            uk: 'Хеллоуїн'
        },
        date: '2026-10-31',
        emoji: '👻',
        description: {
            ru: 'Праздник, который отмечается в ночь с 31 октября на 1 ноября. Люди надевают костюмы, украшают дома и раздают конфеты.',
            en: 'Halloween, celebrated on October 31st. People wear costumes and hand out candy.',
            de: 'Halloween, ein unterhaltsamer Feiertag mit Kostümen und Süßigkeiten.',
            fr: 'Halloween, célébré le 31 octobre avec des costumes et des bonbons.',
            uk: 'Свято, яке святкується ночу з 31 жовтня на 1 листопада.'
        }
    },
    {
        id: 28,
        title: {
            ru: 'День памяти умерших',
            en: 'All Souls Day',
            de: 'Allerseelensonntag',
            fr: 'Jour des Morts',
            uk: 'День поминання'
        },
        date: '2026-11-02',
        emoji: '🕯️',
        description: {
            ru: 'День, посвящённый памяти о умерших. Люди посещают кладбища и зажигают свечи в память о любимых.',
            en: 'All Souls Day, dedicated to remembering the dead.',
            de: 'Allerseelen, ein Tag zur Erinnerung an die Verstorbenen.',
            fr: 'Le Jour des Morts, pour se souvenir des défunts.',
            uk: 'День, присвячений пам\'яті про померлих.'
        }
    },

    // НОЯБРЬ
    {
        id: 29,
        title: {
            ru: 'День благодарения',
            en: 'Thanksgiving',
            de: 'Erntedankfest',
            fr: 'Action de grâces',
            uk: 'День подяки'
        },
        date: '2026-11-26',
        emoji: '🦃',
        description: {
            ru: 'Праздник благодарности за урожай и благословения. Люди собираются с семьёй, готовят праздничный ужин и благодарят за то, что имеют.',
            en: 'Thanksgiving, a day of gratitude for the harvest and blessings.',
            de: 'Erntedankfest, ein Tag der Dankbarkeit für die Ernte.',
            fr: 'L\'Action de grâces, une journée de gratitude.',
            uk: 'Свято подяки за урожай та благословення.'
        }
    },

    // ДЕКАБРЬ
    {
        id: 30,
        title: {
            ru: 'День художника',
            en: 'Artist\'s Day',
            de: 'Künstlertag',
            fr: 'Jour de l\'artiste',
            uk: 'День художника'
        },
        date: '2026-12-08',
        emoji: '🎨',
        description: {
            ru: 'День, посвящённый искусству и художникам. Люди посещают выставки, музеи и выражают благодарность творческим людям.',
            en: 'Artist\'s Day, dedicated to art and artists.',
            de: 'Der Künstlertag, gewidmet der Kunst und Künstlern.',
            fr: 'La Journée de l\'Artiste, dédiée à l\'art et aux artistes.',
            uk: 'День, присвячений мистецтву та художникам.'
        }
    },
    {
        id: 31,
        title: {
            ru: 'Рождество Христово',
            en: 'Christmas',
            de: 'Weihnachten',
            fr: 'Noël',
            uk: 'Різдво Христове'
        },
        date: '2026-12-25',
        emoji: '🎄',
        description: {
            ru: 'Один из самых значимых христианских праздников. День рождения Иисуса Христа отмечается по всему миру красивыми традициями: нарядная ёлка, подарки, песни.',
            en: 'Christmas, one of the most significant Christian holidays, celebrated with trees, gifts and songs.',
            de: 'Weihnachten, eines der bedeutendsten Feste der Christenheit.',
            fr: 'Noël, l\'une des plus importantes fêtes chrétiennes.',
            uk: 'Одне з найважливіших хрисиянських свят, яке святкується з ялинкою.'
        }
    },
    {
        id: 32,
        title: {
            ru: 'Новогодняя ночь',
            en: 'New Year\'s Eve',
            de: 'Silvesterabend',
            fr: 'Réveillon de l\'an',
            uk: 'Новорічна ніч'
        },
        date: '2026-12-31',
        emoji: '✨',
        description: {
            ru: 'Последняя ночь года. Время подведения итогов, загадывания желаний и ожидания чуда.',
            en: 'New Year\'s Eve, the last night of the year filled with hopes and celebrations.',
            de: 'Der Silvesterabend, die letzte Nacht des Jahres.',
            fr: 'Le Réveillon, la dernière nuit de l\'année.',
            uk: 'Остання ніч року, час загадування бажань та надії.'
        }
    },

    // ЕЩЁ ПРАЗДНИКИ
    {
        id: 33,
        title: {
            ru: 'Пурим',
            en: 'Purim',
            de: 'Purim',
            fr: 'Pourim',
            uk: 'Пурім'
        },
        date: '2026-03-16',
        emoji: '🎭',
        description: {
            ru: 'Еврейский праздник, отмечаемый костюмами и маскарадами. Люди дарят друг другу подарки и отмечают спасение еврейского народа.',
            en: 'A Jewish holiday celebrated with costumes and masquerades.',
            de: 'Ein jüdischer Feiertag mit Kostümen und Maskeraden.',
            fr: 'Une fête juive célébrée avec des costumes et des mascarades.',
            uk: 'Єврейське свято, яке святкується костюмами та маскарадами.'
        }
    },
    {
        id: 34,
        title: {
            ru: 'Пасха (Песах)',
            en: 'Passover',
            de: 'Passahfest',
            fr: 'Pessah',
            uk: 'Пасха'
        },
        date: '2026-04-13',
        emoji: '🍷',
        description: {
            ru: 'Еврейский праздник, посвящённый освобождению из рабства. Люди проводят семейный ужин Сейдер.',
            en: 'A Jewish holiday commemorating the exodus from Egypt.',
            de: 'Das Pessachfest, ein jüdischer Feiertag der Befreiung.',
            fr: 'La Pâque juive, commémorant l\'exode d\'Égypte.',
            uk: 'Єврейське свято, присвячене визволенню з рабства.'
        }
    },
    {
        id: 35,
        title: {
            ru: 'Шавуот',
            en: 'Shavuot',
            de: 'Schawuot',
            fr: 'Chavouot',
            uk: 'Шавуот'
        },
        date: '2026-06-02',
        emoji: '🌾',
        description: {
            ru: 'Еврейский праздник урожая, отмечаемый дарением Торы. Люди едят молочные продукты и готовят праздничные блюда.',
            en: 'A Jewish harvest festival celebrating the giving of the Torah.',
            de: 'Das Schawuot-Fest, ein jüdischer Erntedankfeiertag.',
            fr: 'Chavouot, la fête juive de la moisson.',
            uk: 'Єврейське свято урожаю, присвячене даруванню Тори.'
        }
    },
    {
        id: 36,
        title: {
            ru: 'День иммигранта',
            en: 'Immigrant Day',
            de: 'Immigrationstag',
            fr: 'Journée de l\'immigrant',
            uk: 'День імігранта'
        },
        date: '2026-12-03',
        emoji: '🌍',
        description: {
            ru: 'День, посвящённый изучению многокультурности и вкладу иммигрантов в общество.',
            en: 'A day celebrating immigration and multiculturalism.',
            de: 'Ein Tag zur Würdigung von Immigranten und Vielfalt.',
            fr: 'Une journée célébrant l\'immigration et la diversité.',
            uk: 'День, присвячений імігрантам та мультикультуралізму.'
        }
    },
    {
        id: 37,
        title: {
            ru: 'Виктория День',
            en: 'Victoria Day',
            de: 'Viktoriatag',
            fr: 'Fête de la Reine',
            uk: 'День королеви Вікторії'
        },
        date: '2026-05-18',
        emoji: '👑',
        description: {
            ru: 'Канадский праздник, посвящённый дню рождения королевы Виктории.',
            en: 'A Canadian holiday celebrating Queen Victoria\'s birthday.',
            de: 'Ein kanadischer Feiertag zum Geburtstag von Königin Victoria.',
            fr: 'Une fête canadienne célébrant l\'anniversaire de la Reine Victoria.',
            uk: 'Канадське свято, присвячене дню народження королеви Вікторії.'
        }
    },
    {
        id: 38,
        title: {
            ru: 'День благодарения (Канада)',
            en: 'Thanksgiving (Canada)',
            de: 'Erntedankfest (Kanada)',
            fr: 'Action de grâces (Canada)',
            uk: 'День подяки (Канада)'
        },
        date: '2026-10-11',
        emoji: '🍁',
        description: {
            ru: 'Канадский праздник благодарения, отмечаемый в октябре.',
            en: 'Canadian Thanksgiving, celebrated in October.',
            de: 'Das kanadische Erntedankfest im Oktober.',
            fr: 'L\'Action de grâces canadienne en octobre.',
            uk: 'Канадське свято подяки, яке святкується в жовтні.'
        }
    },
    {
        id: 39,
        title: {
            ru: 'Йом Кипур',
            en: 'Yom Kippur',
            de: 'Jom Kippur',
            fr: 'Yom Kippour',
            uk: 'Йом Кіпур'
        },
        date: '2026-09-23',
        emoji: '🕌',
        description: {
            ru: 'Еврейский день искупления. Люди постятся и проводят день в молитвах и размышлениях.',
            en: 'The Jewish Day of Atonement, celebrated with fasting and prayer.',
            de: 'Der Jom Kippur, der jüdische Versöhnungstag mit Fasten.',
            fr: 'Yom Kippour, le jour de l\'expiation juive.',
            uk: 'Єврейський день атонування, святкується постом та молитвами.'
        }
    },
    {
        id: 40,
        title: {
            ru: 'Сукко́т',
            en: 'Sukkot',
            de: 'Laubhüttenfest',
            fr: 'Souccot',
            uk: 'Сукот'
        },
        date: '2026-09-29',
        emoji: '🍂',
        description: {
            ru: 'Еврейский праздник кущей, посвящённый сбору урожая. Люди строят шалаши и проводят время на природе.',
            en: 'A Jewish festival celebrating the autumn harvest.',
            de: 'Das Laubhüttenfest, ein jüdisches Erntefest.',
            fr: 'Souccot, la fête juive des moissons.',
            uk: 'Єврейське свято кущей, присвячене урожаю.'
        }
    },
    {
        id: 41,
        title: {
            ru: 'Ночь Ляйлат аль-Кадр',
            en: 'Laylat al-Qadr',
            de: 'Nacht der Bestimmung',
            fr: 'Nuit du Destin',
            uk: 'Ніч Кадру'
        },
        date: '2026-03-18',
        emoji: '🌙',
        description: {
            ru: 'Ночь в исламском календаре, считающаяся ночью прощения и благословения.',
            en: 'A holy night in Islam, believed to be the night of forgiveness.',
            de: 'Eine heilige Nacht im Islam, die Nacht der Bestimmung.',
            fr: 'Une nuit sacrée en Islam, la Nuit du Destin.',
            uk: 'Свята ніч в ісламі, яка вважається ніччю прощення.'
        }
    },
    {
        id: 42,
        title: {
            ru: 'Ид аль-Фитр',
            en: 'Eid al-Fitr',
            de: 'Fest des Fastenbrechens',
            fr: 'Aïd al-Fitr',
            uk: 'Ід аль-Фітр'
        },
        date: '2026-05-12',
        emoji: '🕌',
        description: {
            ru: 'Исламский праздник разговения, отмечаемый после месяца Рамадана. Люди молятся, дарят подарки и собираются с семьёй.',
            en: 'An Islamic festival marking the end of Ramadan.',
            de: 'Das Fest des Fastenbrechens nach dem Ramadan.',
            fr: 'La fête musulmane marquant la fin du Ramadan.',
            uk: 'Ісламське свято розговення, яке святкується після Рамадану.'
        }
    },
    {
        id: 43,
        title: {
            ru: 'Ид аль-Адха',
            en: 'Eid al-Adha',
            de: 'Opferfest',
            fr: 'Aïd al-Adha',
            uk: 'Ід аль-Адха'
        },
        date: '2026-07-20',
        emoji: '🐑',
        description: {
            ru: 'Исламский праздник жертвоприношения, посвящённый испытанию Авраама. Люди приносят жертвы и делятся мясом с нуждающимися.',
            en: 'An Islamic festival celebrating Abraham\'s willingness to sacrifice.',
            de: 'Das islamische Opferfest, das Abrahams Opfer gedenkt.',
            fr: 'La fête musulmane du sacrifice commémorant Abraham.',
            uk: 'Ісламське свято жертвопринесення, присвячене випробуванню Авраама.'
        }
    },
    {
        id: 44,
        title: {
            ru: 'Новый год по китайскому календарю - Год дракона',
            en: 'Year of the Dragon',
            de: 'Jahr des Drachen',
            fr: 'Année du Dragon',
            uk: 'Рік Дракона'
        },
        date: '2026-02-17',
        emoji: '🐉',
        description: {
            ru: 'В китайском зодиаке это год Дракона. Люди верят, что дети, рождённые в этот год, получают определённые качества.',
            en: 'The Year of the Dragon in the Chinese zodiac, considered lucky.',
            de: 'Das Jahr des Drachen im chinesischen Tierkreis.',
            fr: 'L\'Année du Dragon dans le zodiaque chinois.',
            uk: 'Рік Дракона за китайським календарем, вважається удачним.'
        }
    },
    {
        id: 45,
        title: {
            ru: 'День св. Людмилы',
            en: 'Saint Ludmila\'s Day',
            de: 'Sankt-Ludmila-Tag',
            fr: 'Jour de Sainte Ludmila',
            uk: 'День святої Людмили'
        },
        date: '2026-09-16',
        emoji: '✨',
        description: {
            ru: 'День святой Людмилы, покровительницы Богемии.',
            en: 'Saint Ludmila\'s Day, commemorating the patron saint of Bohemia.',
            de: 'Der Gedenktag der heiligen Ludmila.',
            fr: 'Le jour de Sainte Ludmila.',
            uk: 'День святої Людмили, покровительниці Богемії.'
        }
    },
    {
        id: 46,
        title: {
            ru: 'Лунный новый год',
            en: 'Lunar New Year',
            de: 'Mondneujahr',
            fr: 'Nouvel An Lunaire',
            uk: 'Новий рік за луніцею'
        },
        date: '2026-02-29',
        emoji: '🌕',
        description: {
            ru: 'Отмечается по лунному календарю, это началоверни. Традиционный праздник во многих азиатских странах.',
            en: 'New Year\'s Day according to the lunar calendar, celebrated in Asia.',
            de: 'Das Mondneujahr, ein Feiertag in vielen asiatischen Ländern.',
            fr: 'Le Nouvel An Lunaire, célébré dans de nombreux pays asiatiques.',
            uk: 'Новий рік за луніцею, святкується в багатьох азіатських країнах.'
        }
    },

    {
        id: 48,
        title: {
            ru: 'День кино',
            en: 'Cinema Day',
            de: 'Kinosalon-Tag',
            fr: 'Journée du Cinéma',
            uk: 'День кіно'
        },
        date: '2026-08-28',
        emoji: '🎬',
        description: {
            ru: 'День, посвящённый кинематографии и фильмам. Люди посещают кинотеатры и наслаждаются фильмами.',
            en: 'Cinema Day, celebrating film and movies.',
            de: 'Der Kinotag, ein Tag für Filme und Kino.',
            fr: 'La Journée du Cinéma, célébrant le film.',
            uk: 'День, присвячений кінематографії та фільмам.'
        }
    },
    {
        id: 49,
        title: {
            ru: 'День музыки',
            en: 'Music Day',
            de: 'Musiktag',
            fr: 'Journée de la Musique',
            uk: 'День музики'
        },
        date: '2026-10-01',
        emoji: '🎵',
        description: {
            ru: 'День, посвящённый музыке и музыкальному искусству. Люди слушают музыку, поют и посещают концерты.',
            en: 'Music Day, celebrating music and musical arts.',
            de: 'Der Musiktag, ein Tag der Musik.',
            fr: 'La Journée de la Musique, célébrant la musique.',
            uk: 'День, присвячений музиці та музичному мистецтву.'
        }
    },
    {
        id: 50,
        title: {
            ru: 'Международный день океана',
            en: 'World Oceans Day',
            de: 'Weltozeantag',
            fr: 'Journée mondiale des océans',
            uk: 'Всесвітній день океанів'
        },
        date: '2026-06-08',
        emoji: '🌊',
        description: {
            en: 'A day celebrating the importance of oceans and marine conservation.',
            ru: 'День, посвящённый важности океанов и их сохранению.',
            de: 'Ein Tag zur Feier der Bedeutung der Ozeane.',
            fr: 'Une journée célébrant l\'importance des océans.',
            uk: 'День святкування важливості океанів та їх збереження.'
        }
    },
    {
        id: 51,
        title: {
            ru: 'День окружающей среды',
            en: 'Environmental Day',
            de: 'Umwelttag',
            fr: 'Journée de l\'environnement',
            uk: 'День навколишнього середовища'
        },
        date: '2026-06-05',
        emoji: '🌱',
        description: {
            en: 'A day dedicated to environmental protection and sustainability.',
            ru: 'День, посвящённый защите окружающей среды и устойчивости.',
            de: 'Ein Tag zum Schutz der Umwelt.',
            fr: 'Une journée pour la protection de l\'environnement.',
            uk: 'День, присвячений захисту навколишнього середовища.'
        }
    },
    {
        id: 52,
        title: {
            ru: 'Международный день без автомобиля',
            en: 'International Day Without a Car',
            de: 'Internationaler Autofrei-Tag',
            fr: 'Journée sans voiture',
            uk: 'Міжнародний день без автомобіля'
        },
        date: '2026-09-22',
        emoji: '🚶',
        description: {
            en: 'A day promoting sustainable transportation and reducing emissions.',
            ru: 'День, пропагандирующий устойчивый транспорт и снижение выбросов.',
            de: 'Ein Tag für nachhaltigen Verkehr.',
            fr: 'Une journée pour les transports durables.',
            uk: 'День для сталих перевозень та зменшення викидів.'
        }
    },
    {
        id: 53,
        title: {
            ru: 'День животных',
            en: 'World Animal Day',
            de: 'Welttierschutztag',
            fr: 'Journée mondiale des animaux',
            uk: 'Всесвітній день тварин'
        },
        date: '2026-10-04',
        emoji: '🦁',
        description: {
            en: 'A day celebrating the importance of protecting animal welfare.',
            ru: 'День, посвящённый защите благополучия животных.',
            de: 'Ein Tag zum Schutz der Tiere.',
            fr: 'Une journée pour la protection des animaux.',
            uk: 'День для захисту благополуччя тварин.'
        }
    },
    {
        id: 54,
        title: {
            ru: 'День волонтёра',
            en: 'International Volunteer Day',
            de: 'Internationaler Tag des Freiwilligendienstes',
            fr: 'Journée internationale des bénévoles',
            uk: 'Міжнародний день волонтера'
        },
        date: '2026-12-05',
        emoji: '🤝',
        description: {
            en: 'A day celebrating volunteerism and community service.',
            ru: 'День, посвящённый волонтёрству и общественному служению.',
            de: 'Ein Tag zur Feier der Freiwilligenarbeit.',
            fr: 'Une journée célébrant le bénévolat.',
            uk: 'День святкування волонтерства та громадського служіння.'
        }
    },
    {
        id: 55,
        title: {
            ru: 'День гордости ЛГБТ',
            en: 'Pride Month',
            de: 'Pride Month',
            fr: 'Mois des fierté',
            uk: 'Місяць гордості'
        },
        date: '2026-06-28',
        emoji: '🌈',
        description: {
            en: 'Celebrating the LGBTQ+ community and their rights.',
            ru: 'День, посвящённый ЛГБТ сообществу и их правам.',
            de: 'Feier der LGBTQ+-Gemeinschaft.',
            fr: 'Célébration de la communauté LGBTQ+.',
            uk: 'День святкування ЛГБТ спільноти та їх прав.'
        }
    },
    {
        id: 56,
        title: {
            ru: 'День счастья',
            en: 'International Day of Happiness',
            de: 'Internationaler Tag des Glücks',
            fr: 'Journée internationale du bonheur',
            uk: 'Міжнародний день щастя'
        },
        date: '2026-03-20',
        emoji: '😊',
        description: {
            en: 'A day promoting well-being and happiness for all.',
            ru: 'День, пропагандирующий благополучие и счастье для всех.',
            de: 'Ein Tag für Wohlbefinden und Glück.',
            fr: 'Une journée pour le bien-être et le bonheur.',
            uk: 'День для благополуччя та щастя всіх.'
        }
    },
    {
        id: 57,
        title: {
            ru: 'День в поддержку жертв пыток',
            en: 'International Day for Victims of Torture',
            de: 'Internationaler Tag der Unterstützung für Folteropfer',
            fr: 'Journée internationale en soutien des victimes de la torture',
            uk: 'Міжнародний день на підтримку жертв катування'
        },
        date: '2026-06-26',
        emoji: '✊',
        description: {
            en: 'A day supporting human rights and dignity.',
            ru: 'День, поддерживающий права человека и достоинство.',
            de: 'Ein Tag zur Unterstützung der Menschenrechte.',
            fr: 'Une journée pour les droits de l\'homme.',
            uk: 'День на підтримку прав людини та гідності.'
        }
    },

];

// Функция для добавления пользовательского праздника
function addCustomHoliday(name, date, description = '') {
    const customHoliday = {
        id: Math.max(...holidaysData.map(h => h.id), 0) + 1,
        title: {
            ru: name,
            en: name,
            de: name,
            fr: name,
            uk: name
        },
        date: date,
        emoji: '🎉',
        description: {
            ru: description || 'Мой собственный праздник',
            en: description || 'My custom holiday',
            de: description || 'Mein benutzerdefinierter Feiertag',
            fr: description || 'Ma fête personnalisée',
            uk: description || 'Мій власний святок'
        },
        isCustom: true
    };
    
    holidaysData.push(customHoliday);
    localStorage.setItem('findholiday_custom_holidays', JSON.stringify(
        holidaysData.filter(h => h.isCustom)
    ));
    
    return customHoliday;
}

// Загрузить сохранённые пользовательские праздники
function loadCustomHolidays() {
    const customHolidaysStr = localStorage.getItem('findholiday_custom_holidays');
    if (customHolidaysStr) {
        try {
            const customHolidays = JSON.parse(customHolidaysStr);
            customHolidays.forEach(holiday => {
                if (!holidaysData.find(h => h.id === holiday.id)) {
                    holidaysData.push(holiday);
                }
            });
        } catch (e) {
            console.error('Ошибка при загрузке пользовательских праздников:', e);
        }
    }
}

// Загрузить пользовательские праздники при загрузке страницы
document.addEventListener('DOMContentLoaded', loadCustomHolidays);
