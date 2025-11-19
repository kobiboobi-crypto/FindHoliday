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
        'view-list': 'Список',
        'view-calendar': 'Календарь',
        'today': 'Сегодня',
        'holidays-on-date': 'Праздники',
        'no-holidays-on-date': 'Нет праздников в этот день',
        'mon': 'Пн',
        'tue': 'Вт',
        'wed': 'Ср',
        'thu': 'Чт',
        'fri': 'Пт',
        'sat': 'Сб',
        'sun': 'Вс',
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
        'view-list': 'List',
        'view-calendar': 'Calendar',
        'today': 'Today',
        'holidays-on-date': 'Holidays',
        'no-holidays-on-date': 'No holidays on this day',
        'mon': 'Mon',
        'tue': 'Tue',
        'wed': 'Wed',
        'thu': 'Thu',
        'fri': 'Fri',
        'sat': 'Sat',
        'sun': 'Sun',
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
        'view-list': 'Liste',
        'view-calendar': 'Kalender',
        'today': 'Heute',
        'holidays-on-date': 'Feiertage',
        'no-holidays-on-date': 'Keine Feiertage an diesem Tag',
        'mon': 'Mo',
        'tue': 'Di',
        'wed': 'Mi',
        'thu': 'Do',
        'fri': 'Fr',
        'sat': 'Sa',
        'sun': 'So',
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
        'view-list': 'Liste',
        'view-calendar': 'Calendrier',
        'today': 'Aujourd\'hui',
        'holidays-on-date': 'Vacances',
        'no-holidays-on-date': 'Pas de vacances ce jour',
        'mon': 'Lun',
        'tue': 'Mar',
        'wed': 'Mer',
        'thu': 'Jeu',
        'fri': 'Ven',
        'sat': 'Sam',
        'sun': 'Dim',
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
        'view-list': 'Список',
        'view-calendar': 'Календар',
        'today': 'Сьогодні',
        'holidays-on-date': 'Свята',
        'no-holidays-on-date': 'Немає свят у цей день',
        'mon': 'Пн',
        'tue': 'Вт',
        'wed': 'Ср',
        'thu': 'Чт',
        'fri': 'Пт',
        'sat': 'Сб',
        'sun': 'Нд',
    }
};

// Данные о праздниках
const holidaysData = [
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
            de: 'Das magischste und sehnlichst erwartete Fest des Jahres! Der Neujahrstag symbolisiert neue Anfänge, Hoffnung und Erneuerung. An diesem Tag versammeln sich Menschen auf der ganzen Welt mit ihren Familien, um mit Champagner zu feiern und auf eine bessere Zukunft zu hoffen.',
            fr: 'La fête la plus magique et la plus attendue de l\'année! Le Jour de l\'an symbolise les nouveaux débuts, l\'espoir et le renouvellement. Ce jour-là, les gens du monde entier se réunissent en famille, célèbrent avec du champagne et espèrent un avenir meilleur.',
            uk: 'Найбільш чарівне та очікуване свято року! Новий рік символізує новий початок, надію та оновлення. У цей день люди по всьому світу збираються з сім\'єю, святкують з шампанським і надіються на краще майбутнє.'
        }
    },
    {
        id: 2,
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
            ru: 'День Святого Валентина - день любви и признания в чувствах. Это время, когда люди дарят своим близким цветы, подарки и открытки с добрыми пожеланиями. Кто-то встречается впервые, кто-то подтверждает свою любовь, а кто-то просто желает близким людям добра.',
            en: 'Valentine\'s Day is a day of love and affection. It\'s a time when people give their loved ones flowers, gifts and cards with warm wishes. Some meet for the first time, some confirm their love, and some just wish their loved ones well.',
            de: 'Der Valentinstag ist ein Tag der Liebe und Zuneigung. Es ist eine Zeit, in der Menschen ihren Liebsten Blumen, Geschenke und Karten mit herzlichen Wünschen schenken. Einige treffen sich zum ersten Mal, andere bestätigen ihre Liebe, und einige wünschen ihren Liebsten einfach Gutes.',
            fr: 'La Saint-Valentin est un jour d\'amour et d\'affection. C\'est un moment où les gens offrent à leurs proches des fleurs, des cadeaux et des cartes avec des vœux chaleureux. Certains se rencontrent pour la première fois, d\'autres confirment leur amour, et certains souhaitent simplement du bien à leurs proches.',
            uk: 'День святого Валентина - це день кохання та прихильності. Це час, коли люди дарують своїм близьким квіти, подарунки та листівки з теплими побажаннями. Деякі зустрічаються вперше, інші підтверджують своє кохання, а деякі просто бажають своїм близьким добра.'
        }
    },
    {
        id: 3,
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
            ru: 'Международный женский день - это праздник, посвящённый всем женщинам мира. В этот день принято дарить цветы, подарки и благодарность за заботу, любовь и поддержку. Это время признания величия и красоты женщин, их вклада в общество и семью.',
            en: 'International Women\'s Day is a holiday dedicated to all women in the world. On this day, it is customary to give flowers, gifts and thanks for care, love and support. It is a time to recognize the greatness and beauty of women, their contribution to society and family.',
            de: 'Der Internationale Frauentag ist ein Feiertag, das allen Frauen der Welt gewidmet ist. An diesem Tag ist es üblich, Blumen, Geschenke und Dank für Fürsorge, Liebe und Unterstützung zu geben. Es ist eine Zeit, die Größe und Schönheit von Frauen, ihren Beitrag zur Gesellschaft und Familie zu würdigen.',
            fr: 'La Journée internationale des femmes est une fête dédiée à toutes les femmes du monde. Ce jour-là, il est courant d\'offrir des fleurs, des cadeaux et des remerciements pour les soins, l\'amour et le soutien. C\'est un moment pour reconnaître la grandeur et la beauté des femmes, leur contribution à la société et à la famille.',
            uk: 'Міжнародний жіночий день - це свято, присвячене всім жінкам світу. У цей день прийнято дарувати квіти, подарунки та подяку за турботу, кохання та підтримку. Це час признання величини та краси жінок, їхнього внеску в суспільство та сім\'ю.'
        }
    },
    {
        id: 4,
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
            ru: 'День Святого Патрика - ирландский праздник, отмечаемый по всему миру. Это день, когда все надевают зелёные одежды, украшают себя клевером и веселятся. Праздник символизирует ирландскую культуру, традиции и позитивный дух. Люди веселятся, танцуют и делятся добротой.',
            en: 'St. Patrick\'s Day is an Irish holiday celebrated worldwide. It\'s a day when everyone wears green clothes, decorates themselves with clover and has fun. The holiday symbolizes Irish culture, traditions and positive spirit. People celebrate, dance and share kindness.',
            de: 'Der Heilige Patrick-Tag ist ein irischer Feiertag, der weltweit gefeiert wird. Es ist ein Tag, an dem alle grüne Kleidung tragen, sich mit Klee schmücken und Spaß haben. Der Feiertag symbolisiert irische Kultur, Traditionen und positiven Geist. Menschen feiern, tanzen und teilen Güte.',
            fr: 'Le Jour de Saint-Patrick est une fête irlandaise célébrée dans le monde entier. C\'est un jour où tout le monde porte des vêtements verts, se décore avec du trèfle et s\'amuse. La fête symbolise la culture irlandaise, les traditions et l\'esprit positif. Les gens célèbrent, dansent et partagent la bienveillance.',
            uk: 'День святого Патрика - це ірландське свято, яке святкується по всьому світу. Це день, коли всі надягають зелений одяг, прикрашають себе конюшиною і розважаються. Свято символізує ірландську культуру, традиції та позитивний дух. Люди святкують, танцюють і діляться добротою.'
        }
    },
    {
        id: 5,
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
            ru: 'Пасха - один из самых важных религиозных праздников, отмечаемый христианами по всему миру. Это день воскресения Иисуса Христа. Люди украшают дома, красят яйца, готовят специальные блюда и собираются с семьёй. Пасха символизирует обновление, надежду и жизнь.',
            en: 'Easter is one of the most important religious holidays celebrated by Christians worldwide. It is the day of the Resurrection of Jesus Christ. People decorate their homes, paint eggs, prepare special dishes and gather with their families. Easter symbolizes renewal, hope and life.',
            de: 'Ostern ist einer der wichtigsten religiösen Feiertage, der von Christen weltweit gefeiert wird. Es ist der Tag der Auferstehung Jesu Christi. Menschen schmücken ihre Häuser, malen Eier, bereiten spezielle Gerichte zu und versammeln sich mit ihren Familien. Ostern symbolisiert Erneuerung, Hoffnung und Leben.',
            fr: 'Pâques est l\'une des plus importantes fêtes religieuses célébrées par les chrétiens du monde entier. C\'est le jour de la Résurrection de Jésus-Christ. Les gens décorent leurs maisons, peignent des œufs, préparent des plats spéciaux et se réunissent en famille. Pâques symbolise le renouvellement, l\'espoir et la vie.',
            uk: 'Великдень - одне з найважливіших релігійних свят, які святкуються християнами по всьому світу. Це день воскресіння Ісуса Христа. Люди прикрашають свої дома, розписують яйця, готують спеціальні страви та збираються з сім\'єю. Великдень символізує оновлення, надію та життя.'
        }
    },
    {
        id: 6,
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
            ru: 'День рождения Земли - глобальный день, посвящённый защите окружающей среды. В этот день люди участвуют в экологических инициативах, сажают деревья, убирают парки и береги и пропагандируют осознанное потребление. Это день, когда мы признаём важность сохранения нашей планеты.',
            en: 'Earth Day is a global day dedicated to protecting the environment. On this day, people participate in environmental initiatives, plant trees, clean parks and promote conscious consumption. It\'s a day when we recognize the importance of preserving our planet.',
            de: 'Der Tag der Erde ist ein globaler Tag, der dem Schutz der Umwelt gewidmet ist. An diesem Tag nehmen Menschen an Umweltinitiativen teil, pflanzen Bäume, reinigen Parks und fördern bewussten Konsum. Es ist ein Tag, an dem wir die Wichtigkeit des Schutzes unseres Planeten erkennen.',
            fr: 'La Journée de la Terre est un jour mondial consacré à la protection de l\'environnement. Ce jour-là, les gens participent à des initiatives environnementales, plantent des arbres, nettoient les parcs et promeuvent la consommation consciente. C\'est un jour où nous reconnaissons l\'importance de préserver notre planète.',
            uk: 'День Землі - це глобальний день, присвячений захисту навколишнього середовища. У цей день люди беруть участь в екологічних ініціативах, садять дерева, прибирають парки та пропагують свідоме споживання. Це день, коли ми визнаємо важливість збереження нашої планети.'
        }
    },
    {
        id: 7,
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
            ru: 'День Независимости США - национальный праздник, отмечаемый во всех Соединённых Штатах. В этот день люди поднимают флаги, проводят парады, устраивают пикники и смотрят фейерверки. Это день гордости, свободы и единства американской нации.',
            en: 'Independence Day is a national holiday celebrated throughout the United States. On this day, people raise flags, hold parades, have picnics and watch fireworks. It\'s a day of pride, freedom and unity of the American nation.',
            de: 'Der Unabhängigkeitstag ist ein Nationalfeiertag, der in den gesamten Vereinigten Staaten gefeiert wird. An diesem Tag heben die Menschen Flaggen, veranstalten Paraden, haben Picknicks und schauen Feuerwerk. Es ist ein Tag des Stolzes, der Freiheit und der Einheit der amerikanischen Nation.',
            fr: 'Le Jour de l\'indépendance est une fête nationale célébrée dans tous les États-Unis. Ce jour-là, les gens hissent les drapeaux, organisent des défilés, font des pique-niques et regardent des feux d\'artifice. C\'est un jour de fierté, de liberté et d\'unité de la nation américaine.',
            uk: 'День Незалежності - це національне свято, яке святкується по всіх Сполучених Штатах. У цей день люди підіймають прапори, проводять паради, улаштовують пікніки та дивляться фейєрверки. Це день гордості, свободи та єдності американської нації.'
        }
    },
    {
        id: 8,
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
            ru: 'Хеллоуин - праздник, который отмечается в ночь с 31 октября на 1 ноября. Люди надевают костюмы, украшают дома, ходят на вечеринки и раздают конфеты. Это весёлый и немного страшный праздник, полный творчества и веселья. Хеллоуин имеет древние корни в кельтской культуре.',
            en: 'Halloween is a holiday celebrated on the night of October 31st to November 1st. People wear costumes, decorate their homes, go to parties and hand out candy. It\'s a fun and slightly spooky holiday full of creativity and fun. Halloween has ancient roots in Celtic culture.',
            de: 'Halloween ist ein Feiertag, der in der Nacht vom 31. Oktober bis 1. November gefeiert wird. Menschen tragen Kostüme, dekorieren ihre Häuser, gehen zu Partys und verteilen Süßigkeiten. Es ist ein unterhaltsamer und leicht gruseliger Feiertag voller Kreativität und Spaß. Halloween hat alte Wurzeln in der keltischen Kultur.',
            fr: 'Halloween est une fête célébrée la nuit du 31 octobre au 1er novembre. Les gens portent des costumes, décorent leurs maisons, vont à des fêtes et distribuent des bonbons. C\'est une fête amusante et légèrement effrayante pleine de créativité et de plaisir. Halloween a des racines anciennes dans la culture celtique.',
            uk: 'Хеллоуїн - це свято, яке святкується ночу з 31 жовтня на 1 листопада. Люди надягають костюми, прикрашають свої дома, ходять на вечірки та роздають цукерки. Це весела та трохи жахлива свято, повна творчості та веселощів. Хеллоуїн має давні корені в кельтській культурі.'
        }
    },
    {
        id: 9,
        title: {
            ru: 'Рождество Христово',
            en: 'Christmas',
            de: 'Weihnachten',
            fr: 'Noël',
            uk: 'Різдво Христове'
        },
        date: '2025-12-25',
        emoji: '🎄',
        description: {
            ru: 'Рождество Христово - один из самых значимых христианских праздников. День рождения Иисуса Христа отмечается по всему миру красивыми традициями: нарядная ёлка, подарки, песни и встречи с любимыми. Это время волшебства, мира и добра.',
            en: 'Christmas is one of the most significant Christian holidays. The birth of Jesus Christ is celebrated worldwide with beautiful traditions: decorated trees, gifts, songs and gatherings with loved ones. It\'s a time of magic, peace and goodness.',
            de: 'Weihnachten ist einer der bedeutendsten christlichen Feiertage. Die Geburt Jesu Christi wird weltweit mit wunderschönen Traditionen gefeiert: geschmückte Bäume, Geschenke, Lieder und Treffen mit Liebsten. Es ist eine Zeit der Magie, des Friedens und der Güte.',
            fr: 'Noël est l\'un des plus importants jours fériés chrétiens. La naissance de Jésus-Christ est célébrée dans le monde entier avec de belles traditions: arbres décorés, cadeaux, chansons et réunions avec les proches. C\'est un moment de magie, de paix et de bonté.',
            uk: 'Різдво Христове - одне з найважливіших христианських свят. День народження Ісуса Христа святкується по всьому світу красивими традиціями: прикрашена ялинка, подарунки, пісні та зустрічі з улюбленими. Це час чарівності, миру та добра.'
        }
    },
    {
        id: 10,
        title: {
            ru: 'Новый Год (Китайский)',
            en: 'Chinese New Year',
            de: 'Chinesisches Neujahr',
            fr: 'Nouvel An Chinois',
            uk: 'Китайський Новий Рік'
        },
        date: '2026-02-17',
        emoji: '🏮',
        description: {
            ru: 'Китайский Новый Год (Весенний фестиваль) - один из самых важных праздников в китайской культуре. Это время для семейных встреч, роскошных ужинов и святочных традиций. Люди украшают дома красным, жгут петарды, дарят красные конверты с деньгами. Это символ новых начинаний и процветания.',
            en: 'Chinese New Year (Spring Festival) is one of the most important holidays in Chinese culture. It\'s a time for family gatherings, lavish dinners and festive traditions. People decorate their homes in red, set off firecrackers, and give red envelopes with money. It\'s a symbol of new beginnings and prosperity.',
            de: 'Das Chinesische Neujahr (Frühlingsfest) ist einer der wichtigsten Feiertage in der chinesischen Kultur. Es ist eine Zeit für Familienzusammenkünfte, üppige Abendessen und festliche Traditionen. Menschen dekorieren ihre Häuser rot, zünden Feuerwerkskörper an und geben rote Umschläge mit Geld. Es ist ein Symbol für Neubeginn und Wohlstand.',
            fr: 'Le Nouvel An Chinois (Festival du Printemps) est l\'une des plus importantes fêtes de la culture chinoise. C\'est un moment pour les réunions de famille, les diners luxueux et les traditions festives. Les gens décorent leurs maisons en rouge, font exploser des pétards et offrent des enveloppes rouges avec de l\'argent. C\'est un symbole de nouveaux débuts et de prospérité.',
            uk: 'Китайський Новий Рік (Весняний фестиваль) - одне з найважливіших свят китайської культури. Це час для сімейних зібрань, розкішних вечер та святкових традицій. Люди прикрашають свої дома червоним, палять петарди, дарують червоні конверти з грошима. Це символ нового початку та процвітання.'
        }
    },
    {
        id: 11,
        title: {
            ru: 'День Канады',
            en: 'Canada Day',
            de: 'Kanada-Tag',
            fr: 'Jour du Canada',
            uk: 'День Канади'
        },
        date: '2026-07-01',
        emoji: '🇨🇦',
        description: {
            ru: 'День Канады - национальный праздник Канады, отмечающий вступление в силу Конституционного акта 1867 года. В этот день канадцы празднуют свою историю, культуру и достижения. Проводятся парады, фейерверки и семейные пикники.',
            en: 'Canada Day is Canada\'s national holiday celebrating the enactment of the Constitution Act of 1867. On this day, Canadians celebrate their history, culture and achievements. Parades, fireworks and family picnics are held.',
            de: 'Der Kanada-Tag ist Kanadas Nationalfeiertag, der die Verabschiedung des Verfassungsgesetzes von 1867 feiert. An diesem Tag feiern Kanadier ihre Geschichte, Kultur und Errungenschaften. Paraden, Feuerwerke und Familienpicknicks finden statt.',
            fr: 'Le Jour du Canada est la fête nationale du Canada célébrant l\'entrée en vigueur de la Loi constitutionnelle de 1867. Ce jour-là, les Canadiens célèbrent leur histoire, leur culture et leurs réalisations. Des défilés, des feux d\'artifice et des pique-niques en famille ont lieu.',
            uk: 'День Канади - національне свято Канади, яке відзначає набуття чинності Конституційного акту 1867 року. У цей день канадці святкують свою історію, культуру та досягнення. Проводяться паради, фейєрверки та сімейні пікніки.'
        },
        category: 'official'
    },
    {
        id: 12,
        title: {
            ru: 'День Независимости Украины',
            en: 'Independence Day of Ukraine',
            de: 'Unabhängigkeitstag der Ukraine',
            fr: 'Jour de l\'indépendance de l\'Ukraine',
            uk: 'День Незалежності України'
        },
        date: '2026-08-24',
        emoji: '🇺🇦',
        description: {
            ru: 'День Независимости Украины - главный государственный праздник Украины, отмечающий провозглашение независимости в 1991 году. Это день свободы, патриотизма и единства украинского народа. Проводятся парады, концерты и массовые мероприятия.',
            en: 'Ukraine\'s Independence Day is Ukraine\'s main public holiday celebrating the proclamation of independence in 1991. It is a day of freedom, patriotism and unity of the Ukrainian people. Parades, concerts and mass events are held.',
            de: 'Der Unabhängigkeitstag der Ukraine ist der wichtigste Staatsfeiertag der Ukraine, der die Ausrufung der Unabhängigkeit im Jahr 1991 feiert. Es ist ein Tag der Freiheit, des Patriotismus und der Einheit des ukrainischen Volkes. Paraden, Konzerte und Massenveranstaltungen finden statt.',
            fr: 'Le Jour de l\'indépendance de l\'Ukraine est la principale fête publique de l\'Ukraine célébrant la proclamation d\'indépendance en 1991. C\'est un jour de liberté, de patriotisme et d\'unité du peuple ukrainien. Des défilés, des concerts et des événements de masse ont lieu.',
            uk: 'День Незалежності України - головне державне свято України, яке відзначає проголошення незалежності в 1991 році. Це день свободи, патріотизму та єдності українського народу. Проводяться паради, концерти та масові заходи.'
        },
        category: 'official'
    },
    {
        id: 13,
        title: {
            ru: 'День германского единства',
            en: 'German Unity Day',
            de: 'Tag der Deutschen Einheit',
            fr: 'Jour de l\'unité allemande',
            uk: 'День німецької єдності'
        },
        date: '2026-10-03',
        emoji: '🇩🇪',
        description: {
            ru: 'День германского единства - национальный праздник Германии, отмечающий воссоединение Восточной и Западной Германии в 1990 году. Это день единства, свободы и демократии. Проводятся парады, концерты и семейные торжества.',
            en: 'German Unity Day is Germany\'s national holiday commemorating the reunification of East and West Germany in 1990. It is a day of unity, freedom and democracy. Parades, concerts and family celebrations are held.',
            de: 'Der Tag der Deutschen Einheit ist Deutschlands Nationalfeiertag, der die Wiedervereinigung von Ost- und Westdeutschland im Jahr 1990 feiert. Es ist ein Tag der Einheit, Freiheit und Demokratie. Paraden, Konzerte und Familienfeiern finden statt.',
            fr: 'Le Jour de l\'unité allemande est la fête nationale de l\'Allemagne commémorant la réunification de l\'Allemagne de l\'Est et de l\'Ouest en 1990. C\'est un jour d\'unité, de liberté et de démocratie. Des défilés, des concerts et des célébrations familiales ont lieu.',
            uk: 'День німецької єдності - національне свято Німеччини, яке відзначає возз\'єднання Східної та Західної Німеччини в 1990 році. Це день єдності, свободи та демократії. Проводяться паради, концерти та сімейні торжества.'
        },
        category: 'official'
    }
];
