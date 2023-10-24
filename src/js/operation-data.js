// mainFields - основные поля родительской группы.
// additionalGroups - группы вложенные в основную группу.
// additionalGroups [
//     {
// name - название вложенной группы
// number - порядковый номер группы, отвечат за появление группы после заполнения предыдущей группы.
// active - true/false отобразить сразу/отобразить после заполнения группы с предыдущем номером.
// content - поля находящиеся внутри вложенной группы
//     }
// ]
export const OPERATIONS = {
    rygb: {
        // name: 'RYGB (Гастрошунтирование)',
        mainFields: '',
        additionalGroups: [
            {
                name: 'Формирование малого желудочка',
                active: true,
                number: 1,
                observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            // info: {
                            //     content: 'Не игнорируйте это поле',
                            //     theme: 'violet',
                            // },
                            options: [
                                ['Да', 'Да'],
                                ['С отступом от зонда', 'С отступом от зонда'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Endopath Echelon Flex 60', 'Endopath Echelon Flex 60'],
                                ['Endopath Echelon 60', 'Endopath Echelon 60'],
                                ['Endo GIA', 'Endo GIA'],
                                ['Endopath Echelon Flex 45', 'Endopath Echelon Flex 45'],
                                ['Endopath Echelon 45', 'Endopath Echelon 45'],
                                ['Powered Echelon', 'Powered Echelon'],
                                ['Covidien GIA 80', 'Covidien GIA 80'],
                                ['NTLC 75', 'NTLC 75'],
                                ['Китайский производитель', 'Китайский производитель'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-of-cassettes',
                            type: 'number',
                            placeholder: 'Количество кассет',
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'strengthening-the-seam',
                            placeholder: 'Укрепление линии шва',
                            options: [
                                ['Нет', 'Нет'],
                                ['Ушивание', 'Ушивание'],
                                ['Seamguard', 'Seamguard'],
                                ['Peristrips', 'Peristrips'],
                                ['Biodesign SLR', 'Biodesign SLR'],
                                ['Duet TRS', 'Duet TRS'],
                            ],
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'number',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'used-cassettes',
                            placeholder: 'Использованные кассеты',
                            options: [
                                ['Черные (4-4.5-5 мм)', 'Черные (4-4.5-5 мм)'],
                                ['Зеленые (4.1 мм)', 'Зеленые (4.1 мм)'],
                                ['Фиолетовые (3-3.5-4 мм)', 'Фиолетовые (3-3.5-4 мм)'],
                                ['Золотые (3.8 мм)', 'Золотые (3.8 мм)'],
                                ['Синие (3.5 мм)', 'Синие (3.5 мм)'],
                                ['Белые (2.5 мм)', 'Белые (2.5 мм)'],
                            ],
                            multiple: true,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'indent-gatekeeper',
                            placeholder: 'Отступ от привратника (см)',
                            options: [
                                ['Не оценивали', 'Не оценивали'],
                                ['2 см', '2 см'],
                                ['3 см', '3 см'],
                                ['4 см', '4 см'],
                                ['5 см', '5 см'],
                                ['более 5 см', 'более 5 см'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hiatus-treatment',
                            placeholder: 'Обработка хиатуса',
                            options: [
                                ['Нет', 'Нет'],
                                ['Круроррафия', 'Круроррафия'],
                                ['Мобилизация абдоминального отдела пищевода', 'Мобилизация абдоминального отдела пищевода'],
                                ['Отсечение желудочно-диафрагмальной связки', 'Отсечение желудочно-диафрагмальной связки'],
                                ['Отсечение жировой подушечки (Fat Pad)', 'Отсечение жировой подушечки (Fat Pad)'],
                            ],
                            required: false,
                        },
                    },
                ],
            },
            {
                name: 'Формирование анастамозов',
                active: false,
                number: 2,
                observe: true,
                content: [
                    {
                        type: 'SELECT',
                        data: {
                            name: 'gut-place',
                            placeholder: 'Метод определения места пересечения тонкой кишки',
                            options: [
                                ['Отступ от илеоцекального угла', 'Отступ от илеоцекального угла'],
                                ['Отступ от связки трейца', 'Отступ от связки трейца'],
                                ['Процент от общей длины тонкой кишки', 'Процент от общей длины тонкой кишки'],
                            ],
                            hasConnection: 'method-determination-small-gut',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'gut-indent',
                            type: 'number',
                            placeholder: 'Расстояние (см)',
                            required: false,
                            connectedID: 'indent',
                            connected: 'method-determination-small-gut',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'small-intestine-length',
                            type: 'number',
                            placeholder: 'Длина тонкой кишки (см)',
                            required: false,
                            connectedID: 'percent-gut',
                            connected: 'method-determination-small-gut',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'total-loop-length',
                            type: 'number',
                            placeholder: 'Длина общей петли (см)',
                            required: false,
                            connectedID: 'percent-gut',
                            connected: 'method-determination-small-gut',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'ident-treitz',
                            type: 'number',
                            placeholder: 'Отступ от связки Трейтца (см)',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'length-alimentary-loop',
                            type: 'number',
                            placeholder: 'Длина алиментарной петли (см)',
                            required: false,
                        },
                    },
                    {
                        type: 'SUBTITLE',
                        data: {
                            subtitle: 'Гастроэнтероанастомоз',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Расположение гастроэнтероанастомоза',
                            name: 'location-gastroenteroanastomosis',
                            options: [
                                ['Впередиободочное', 'Впередиободочное'],
                                ['Позадиободочное', 'Позадиободочное'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Расположение алиментарной петли',
                            name: 'location-alimentary-loop',
                            options: [
                                ['Впередиободочное', 'Впередиободочное'],
                                ['Позадиободочное', 'Позадиободочное'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Отсечение торцевой степлерной линии',
                            name: 'cutting-stapler-line',
                            options: [
                                ['Да', 'Да'],
                                ['Просвет вскрыт другим способом', 'Просвет вскрыт другим способом'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Формирование ГЭА',
                            name: 'formation-GEA',
                            options: [
                                ['Аппаратный циркулярный', 'Аппаратный циркулярный'],
                                ['Аппаратный линейный', 'Аппаратный линейный'],
                                ['Ручной', 'Ручной'],
                            ],
                            hasConnection: 'gastroenteroanastomosis',
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'gastroenteroanastomosis-stitching-machine-circle',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Ethicon', 'Ethicon'],
                                ['Medtronic', 'Medtronic'],
                                ['Китайский аппарат', 'Китайский аппарат'],
                            ],
                            connectedID: 'circle',
                            connected: 'gastroenteroanastomosis',
                            multiple: true,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'gastroenteroanastomosis-stitching-machine-linear',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Endopath Echelon Flex 60', 'Endopath Echelon Flex 60'],
                                ['Endopath Echelon 60', 'Endopath Echelon 60'],
                                ['Endo GIA', 'Endo GIA'],
                                ['Endopath Echelon Flex 45', 'Endopath Echelon Flex 45'],
                                ['Endopath Echelon 45', 'Endopath Echelon 45'],
                                ['Powered Echelon', 'Powered Echelon'],
                                ['Covidien GIA 80', 'Covidien GIA 80'],
                                ['NTLC 75', 'NTLC 75'],
                                ['Китайский производитель', 'Китайский производитель'],
                            ],
                            connectedID: 'linear',
                            connected: 'gastroenteroanastomosis',
                            multiple: true,
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'gastroenteroanastomosis-number-of-cassettes',
                            type: 'number',
                            placeholder: 'Количество кассет',
                            connectedID: 'linear',
                            connected: 'gastroenteroanastomosis',
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'gastroenteroanastomosis-used-cassettes',
                            placeholder: 'Использованные кассеты',
                            options: [
                                ['Черные (4-4.5-5 мм)', 'Черные (4-4.5-5 мм)'],
                                ['Зеленые (4.1 мм)', 'Зеленые (4.1 мм)'],
                                ['Фиолетовые (3-3.5-4 мм)', 'Фиолетовые (3-3.5-4 мм)'],
                                ['Золотые (3.8 мм)', 'Золотые (3.8 мм)'],
                                ['Синие (3.5 мм)', 'Синие (3.5 мм)'],
                                ['Белые (2.5 мм)', 'Белые (2.5 мм)'],
                            ],
                            connectedID: 'linear',
                            connected: 'gastroenteroanastomosis',
                            multiple: true,
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Закрытие технологического отверстия',
                            name: 'herjunojunoanastomosis-сlosing-process-hole',
                            connectedID: 'linear, circle',
                            connected: 'gastroenteroanastomosis',
                            options: [
                                ['Ручное', 'Ручное'],
                                ['Аппаратное', 'Аппаратное'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'manual-anastomosis',
                            placeholder: 'Ручной анастомоз',
                            options: [
                                ['Однорядный, монофиламентной нитью', 'Однорядный, монофиламентной нитью'],
                                ['Однорядный, нитью Stratafix', 'Однорядный, нитью Stratafix'],
                                ['Однорядный, нитью V-loc', 'Однорядный, нитью V-loc'],
                                ['Двухрядный, монофиламентной нитью', 'Двухрядный, монофиламентной нитью'],
                                ['Другой', 'Другой'],
                            ],
                            connectedID: 'manual',
                            connected: 'gastroenteroanastomosis',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'select-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['До 1, 5 см ', 'До 1, 5 см '],
                                ['1,5 - 3 см ', '1,5 - 3 см '],
                                ['4 см ', '4 см '],
                                ['5 см', '5 см'],
                            ],
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'сommentary-heandly-anastomosis',
                            type: 'text',
                            placeholder: 'Комментарий к ручному анастомозу',
                            addClass: 'long',
                            connectedID: 'manual',
                            connected: 'gastroenteroanastomosis',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Была ли сформирована шпора?',
                            name: 'spur-been-formed',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'spur-height',
                            type: 'number',
                            placeholder: 'Высота шпоры (см)',
                        },
                    },
                    {
                        type: 'SUBTITLE',
                        data: {
                            subtitle: 'Еюноеюноанастомоз',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'formation-of-EEA',
                            placeholder: 'Формирование EEA',
                            options: [
                                ['Аппаратный с ручным закрытием', 'Аппаратный с ручным закрытием'],
                                ['Аппаратный полностью', 'Аппаратный полностью'],
                                ['Ручной', 'Ручной'],
                            ],
                            hasConnection: 'herjunojunoanastomosis',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Endopath Echelon Flex 60', 'Endopath Echelon Flex 60'],
                                ['Endopath Echelon 60', 'Endopath Echelon 60'],
                                ['Endo GIA', 'Endo GIA'],
                                ['Endopath Echelon Flex 45', 'Endopath Echelon Flex 45'],
                                ['Endopath Echelon 45', 'Endopath Echelon 45'],
                                ['Powered Echelon', 'Powered Echelon'],
                                ['Covidien GIA 80', 'Covidien GIA 80'],
                                ['NTLC 75', 'NTLC 75'],
                                ['Китайский производитель', 'Китайский производитель'],
                            ],
                            connectedID: 'hardware-with-manual, hardware-completely',
                            connected: 'herjunojunoanastomosis',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'herjunojunoanastomosis-number-of-cassettes',
                            type: 'number',
                            placeholder: 'Количество кассет',
                            connectedID: 'hardware-with-manual, hardware-completely',
                            connected: 'herjunojunoanastomosis',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-used-cassettes',
                            placeholder: 'Использованные кассеты',
                            options: [
                                ['Черные (4-4.5-5 мм)', 'Черные (4-4.5-5 мм)'],
                                ['Зеленые (4.1 мм)', 'Зеленые (4.1 мм)'],
                                ['Фиолетовые (3-3.5-4 мм)', 'Фиолетовые (3-3.5-4 мм)'],
                                ['Золотые (3.8 мм)', 'Золотые (3.8 мм)'],
                                ['Синие (3.5 мм)', 'Синие (3.5 мм)'],
                                ['Белые (2.5 мм)', 'Белые (2.5 мм)'],
                            ],
                            multiple: true,
                            connectedID: 'hardware-with-manual, hardware-completely',
                            connected: 'herjunojunoanastomosis',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['менее 3 см', 'менее 3 см'],
                                ['3 см', '3 см'],
                                ['4 см ', '4 см '],
                                ['5 см', '5 см'],
                                ['более 5 см', 'более 5 см'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Закрытие технологического отверстия',
                            name: 'herjunojunoanastomosis-сlosing-process-hole',
                            options: [
                                ['Ручное', 'Ручное'],
                                ['Аппаратное', 'Аппаратное'],
                            ],
                            connectedID: 'hardware-with-manual',
                            connected: 'herjunojunoanastomosis',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-manual-anastomosis',
                            placeholder: 'Ручной анастомоз',
                            options: [
                                ['Однорядный, монофиламентной нитью', 'Однорядный, монофиламентной нитью'],
                                ['Однорядный, нитью Stratafix', 'Однорядный, нитью Stratafix'],
                                ['Однорядный, нитью V-loc', 'Однорядный, нитью V-loc'],
                                ['Двухрядный, монофиламентной нитью', 'Двухрядный, монофиламентной нитью'],
                                ['Другой', 'Другой'],
                            ],
                            connectedID: 'fully-manual',
                            connected: 'herjunojunoanastomosis',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'herjunojunoanastomosis-сommentary-heandly-anastomosis',
                            type: 'number',
                            placeholder: 'Комментарий к ручному анастомозу',
                            addClass: 'long',
                            connectedID: 'fully-manual',
                            connected: 'herjunojunoanastomosis',
                        },
                    },
                ],
                // additionalGroups: [],
            },
            {
                name: 'Завершающий этап',
                active: false,
                number: 3,
                // observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Дренирование брюшной полости и зон анастомоза',
                            name: 'drainage-of-the-abdominal-cavity',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            hasConnection: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'closure-hernia-defects',
                            placeholder: 'Закрытие внутренних грыжевых дефетков',
                            options: [
                                ['Пространство Петерсена', 'Пространство Петерсена'],
                                ['Дефект в зоне тонкокишечного анастамоза', 'Дефект в зоне тонкокишечного анастамоза'],
                                ['Мезоколон', 'Мезоколон'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['Не учитываю', 'Не учитываю'],
                                ['12 Fr', '12 Fr'],
                                ['13 Fr', '13 Fr'],
                                ['27 Fr', '28 Fr'],
                            ],
                            connected: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлерных линий',
                            options: [
                                ['Ушивание вдоль всей длины', 'Ушивание вдоль всей длины'],
                                ['Частичное ушивание', 'Частичное ушивание'],
                                ['Гемостаз клипсами', 'Гемостаз клипсами'],
                                ['Гемостаз биполяром', 'Гемостаз биполяром'],
                                ['Гемостаз монополяром', 'Гемостаз монополяром'],
                            ],
                            multiple: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Ушивание лапаротомной раны',
                            name: 'suturing-laparotomy-wound',
                            options: [
                                ['Узловым способом', 'Узловым способом'],
                                ['Непрерывной нитью', 'Непрерывной нитью'],
                            ],
                            connected: 'access',
                        },
                    },
                ],
            },
        ],
    },
    'intragastric-ballon': {
        mainFields: [
            {
                type: 'SELECT',
                data: {
                    name: 'ballon-type',
                    placeholder: 'Тип баллона',
                    options: [
                        ['heliosphere', 'Heliosphere'],
                        ['device2', 'device2'],
                    ],
                    required: false,
                },
            },
            {
                type: 'RADIO-GROUP',
                data: {
                    title: 'Чем заполнен балон',
                    name: 'fullness-of-the-balloon',
                    options: [
                        ['Воздух', 'Воздух'],
                        ['Физраствор', 'Физраствор'],
                    ],
                    required: true,
                    info: {
                        id: 'test-id',
                        content: 'Не игнорируйте это поле',
                        theme: 'violet',
                    },
                },
            },
            {
                type: 'INPUT',
                data: {
                    name: 'ballon-filling-volume',
                    type: 'number',
                    placeholder: 'Объем заполнения',
                    required: true,
                    info: {
                        id: 'test-id2',
                        content: 'Не игнорируйте это поле',
                        theme: 'violet',
                    },
                },
            },
            {
                type: 'INPUT',
                data: {
                    name: 'date-ballon-delete',
                    type: 'text',
                    placeholder: 'Планируемая дата удаления баллона',
                    required: false,
                    addClass: 'only-number',
                    mod: 'calendar',
                },
            },
        ],
    },
    'gastric-banding': {
        mainFields: [
            {
                type: 'SELECT',
                data: {
                    name: 'type-of-bandage',
                    placeholder: 'Тип бандажа',
                    options: [
                        ['Allergan AP large', 'Allergan AP large'],
                        ['Allergan AP small', 'Allergan AP small'],
                        ['BioEnterics LAP-BAND', 'BioEnterics LAP-BAND'],
                        ['Bioring (Cousin)', 'Bioring (Cousin)'],
                        ['Heliogast', 'Heliogast'],
                        ['MID', 'MID'],
                        ['Minimizer Extra', 'Minimizer Extra'],
                        ['SAGB (Quickclose)', 'SAGB (Quickclose)'],
                        ['SAGB (Velocity)', 'SAGB (Velocity)'],
                        ['Медсил', 'Медсил'],
                        ['Другой', 'Другой'],
                    ],
                    required: true,
                },
            },
            {
                type: 'RADIO-GROUP',
                data: {
                    title: 'Диссекция',
                    name: 'dissection',
                    options: [
                        ['Pars flaccida', 'Pars flaccida'],
                        ['Перигастральная', 'Перигастральная'],
                    ],
                    required: false,
                    info: {
                        id: 'test-id',
                        content: 'Не игнорируйте это поле',
                        theme: 'violet',
                    },
                },
            },
            {
                type: 'INPUT',
                data: {
                    name: 'date-adjustment-bandage',
                    type: 'text',
                    placeholder: 'Планируемая дата регулировки бандажа',
                    required: true,
                    addClass: 'only-number',
                    mod: 'calendar',
                },
            },
            {
                type: 'CHECKBOX',
                data: {
                    name: 'hemming-stomach-wall',
                    value: 'Подшивание стенки желудка - да',
                    label: 'Подшивание стенки желудка',
                },
            },
        ],
        additionalGroups: [
            {
                name: 'Завершающий этап',
                active: true,
                // observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Дренирование брюшной полости и зон анастомоза',
                            name: 'drainage-of-the-abdominal-cavity',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            hasConnection: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['Не учитываю', 'Не учитываю'],
                                ['12 Fr', '12 Fr'],
                                ['13 Fr', '13 Fr'],
                                ['27 Fr', '28 Fr'],
                            ],
                            connected: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлерных линий',
                            options: [
                                ['Частичное ушивание', 'Частичное ушивание'],
                                ['Гемостаз клипсами', 'Гемостаз клипсами'],
                                ['Гемостаз биполяром', 'Гемостаз биполяром'],
                                ['Гемостаз монополяром', 'Гемостаз монополяром'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Ушивание лапаротомной раны',
                            name: 'suturing-laparotomy-wound',
                            options: [
                                ['Узловым способом', 'Узловым способом'],
                                ['Непрерывной нитью', 'Непрерывной нитью'],
                            ],
                            connected: 'access',
                        },
                    },
                ],
            },
        ],
    },
    gastroplication: {
        additionalGroups: [
            {
                name: 'Формирование желудочной трубки',
                number: 1,
                active: true,
                observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочная трубка сформирована по зонду?',
                            name: 'gastric-tube-by-probe',
                            options: [
                                ['Да', 'Да'],
                                ['С отступом от зонда', 'С отступом от зонда'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'number',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'seam-row',
                            placeholder: 'Рядность шва',
                            options: [
                                ['Однорядный', 'Однорядный'],
                                ['Двухрядный', 'Двухрядный'],
                                ['Трехрядный', 'Трехрядный'],
                            ],
                            hasConnection: 'seam-row',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Первый ряд',
                            name: 'first-row',
                            options: [
                                ['Узловой', 'Узловой'],
                                ['Непрерывный', 'Непрерывный'],
                            ],
                            connected: 'seam-row',
                            connectedID: '1,2,3',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Второй ряд',
                            name: 'second-row',
                            options: [
                                ['Узловой', 'Узловой'],
                                ['Непрерывный', 'Непрерывный'],
                            ],
                            connected: 'seam-row',
                            connectedID: '2,3',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Третий ряд',
                            name: 'third-row',
                            options: [
                                ['Узловой', 'Узловой'],
                                ['Непрерывный', 'Непрерывный'],
                            ],
                            connected: 'seam-row',
                            connectedID: '3',
                        },
                    },
                ],
            },
            {
                name: 'Завершающий этап',
                number: 2,
                active: false,
                // observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Дренирование брюшной полости и зон анастомоза',
                            name: 'drainage-of-the-abdominal-cavity',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            hasConnection: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['Не учитываю', 'Не учитываю'],
                                ['12 Fr', '12 Fr'],
                                ['13 Fr', '13 Fr'],
                                ['27 Fr', '28 Fr'],
                            ],
                            connected: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлерных линий',
                            options: [
                                ['Частичное ушивание', 'Частичное ушивание'],
                                ['Гемостаз клипсами', 'Гемостаз клипсами'],
                                ['Гемостаз биполяром', 'Гемостаз биполяром'],
                                ['Гемостаз монополяром', 'Гемостаз монополяром'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Ушивание лапаротомной раны',
                            name: 'suturing-laparotomy-wound',
                            options: [
                                ['Узловым способом', 'Узловым способом'],
                                ['Непрерывной нитью', 'Непрерывной нитью'],
                            ],
                            connected: 'access',
                        },
                    },
                ],
            },
        ],
    },
    bpd: {
        additionalGroups: [
            {
                name: 'Формирование малого желудочка',
                active: true,
                number: 1,
                observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            options: [
                                ['Да', 'Да'],
                                ['С отступом от зонда', 'С отступом от зонда'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Endopath Echelon Flex 60', 'Endopath Echelon Flex 60'],
                                ['Endopath Echelon 60', 'Endopath Echelon 60'],
                                ['Endo GIA', 'Endo GIA'],
                                ['Endopath Echelon Flex 45', 'Endopath Echelon Flex 45'],
                                ['Endopath Echelon 45', 'Endopath Echelon 45'],
                                ['Powered Echelon', 'Powered Echelon'],
                                ['Covidien GIA 80', 'Covidien GIA 80'],
                                ['NTLC 75', 'NTLC 75'],
                                ['Китайский производитель', 'Китайский производитель'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-of-cassettes',
                            type: 'number',
                            placeholder: 'Количество кассет',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'strengthening-the-seam',
                            placeholder: 'Укрепление линии шва',
                            options: [
                                ['Нет', 'Нет'],
                                ['Ушивание', 'Ушивание'],
                                ['Seamguard', 'Seamguard'],
                                ['Peristrips', 'Peristrips'],
                                ['Biodesign SLR', 'Biodesign SLR'],
                                ['Duet TRS', 'Duet TRS'],
                            ],
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'number',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'used-cassettes',
                            placeholder: 'Использованные кассеты',
                            options: [
                                ['Черные (4-4.5-5 мм)', 'Черные (4-4.5-5 мм)'],
                                ['Зеленые (4.1 мм)', 'Зеленые (4.1 мм)'],
                                ['Фиолетовые (3-3.5-4 мм)', 'Фиолетовые (3-3.5-4 мм)'],
                                ['Золотые (3.8 мм)', 'Золотые (3.8 мм)'],
                                ['Синие (3.5 мм)', 'Синие (3.5 мм)'],
                                ['Белые (2.5 мм)', 'Белые (2.5 мм)'],
                            ],
                            multiple: true,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'indent-gatekeeper',
                            placeholder: 'Отступ от привратника (см)',
                            options: [
                                ['Не оценивали', 'Не оценивали'],
                                ['2 см', '2 см'],
                                ['3 см', '3 см'],
                                ['4 см', '4 см'],
                                ['5 см', '5 см'],
                                ['более 5 см', 'более 5 см'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hiatus-treatment',
                            placeholder: 'Обработка хиатуса',
                            options: [
                                ['Нет', 'Нет'],
                                ['Круроррафия', 'Круроррафия'],
                                ['Мобилизация абдоминального отдела пищевода', 'Мобилизация абдоминального отдела пищевода'],
                                ['Отсечение желудочно-диафрагмальной связки', 'Отсечение желудочно-диафрагмальной связки'],
                                ['Отсечение жировой подушечки (Fat Pad)', 'Отсечение жировой подушечки (Fat Pad)'],
                            ],
                            required: false,
                        },
                    },
                ],
            },
            {
                name: 'Формирование анастомозов',
                active: false,
                number: 2,
                observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Сохранение правой гастродуоденальной артерии',
                            name: 'preservation-right-artery',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'gut-place',
                            placeholder: 'Метод определения места пересечения тонкой кишки',
                            options: [
                                ['Отступ от илеоцекального угла', 'Отступ от илеоцекального угла'],
                                ['Отступ от связки трейца', 'Отступ от связки трейца'],
                                ['Процент от общей длины тонкой кишки', 'Процент от общей длины тонкой кишки'],
                            ],
                            hasConnection: 'method-determination-small-gut',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'gut-indent',
                            type: 'number',
                            placeholder: 'Расстояние (см)',
                            required: false,
                            connectedID: 'indent',
                            connected: 'method-determination-small-gut',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'small-intestine-length',
                            type: 'number',
                            placeholder: 'Длина тонкой кишки (см)',
                            required: false,
                            connectedID: 'percent-gut',
                            connected: 'method-determination-small-gut',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'total-loop-length',
                            type: 'number',
                            placeholder: 'Длина общей петли (см)',
                            required: false,
                            connectedID: 'percent-gut',
                            connected: 'method-determination-small-gut',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'ident-treitz',
                            type: 'number',
                            placeholder: 'Отступ от связки Трейтца (см)',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'length-alimentary-loop',
                            type: 'number',
                            placeholder: 'Длина алиментарной петли (см)',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'length-biliopancreatic-loop',
                            type: 'number',
                            placeholder: 'Длина билиопанкреатической петли (см)',
                            required: true,
                        },
                    },
                    {
                        type: 'SUBTITLE',
                        data: {
                            subtitle: 'Дуоденоэнтероанастомоз',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Отсечение торцевой степлерной линии',
                            name: 'cutting-stapler-line',
                            options: [
                                ['Да', 'Да'],
                                ['Просвет вскрыт другим способом', 'Просвет вскрыт другим способом'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'formation-of-DEA',
                            placeholder: 'Формирование ДЭА',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'diameter-anastomosis',
                            type: 'number',
                            placeholder: 'Диаметр анастомоза (см)',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'сommentary-anastomosis',
                            type: 'number',
                            placeholder: 'Комментарий к анастомозу',
                            required: false,
                        },
                    },
                    {
                        type: 'SUBTITLE',
                        data: {
                            subtitle: 'Еюноеюноанастомоз',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'formation-of-EEA',
                            placeholder: 'Формирование EEA',
                            options: [
                                ['Аппаратный с ручным закрытием', 'Аппаратный с ручным закрытием'],
                                ['Аппаратный полностью', 'Аппаратный полностью'],
                                ['Ручной', 'Ручной'],
                            ],
                            hasConnection: 'herjunojunoanastomosis',
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Endopath Echelon Flex 60', 'Endopath Echelon Flex 60'],
                                ['Endopath Echelon 60', 'Endopath Echelon 60'],
                                ['Endo GIA', 'Endo GIA'],
                                ['Endopath Echelon Flex 45', 'Endopath Echelon Flex 45'],
                                ['Endopath Echelon 45', 'Endopath Echelon 45'],
                                ['Powered Echelon', 'Powered Echelon'],
                                ['Covidien GIA 80', 'Covidien GIA 80'],
                                ['NTLC 75', 'NTLC 75'],
                                ['Китайский производитель', 'Китайский производитель'],
                            ],
                            connectedID: 'hardware-with-manual, hardware-completely',
                            connected: 'herjunojunoanastomosis',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'herjunojunoanastomosis-number-of-cassettes',
                            type: 'number',
                            placeholder: 'Количество кассет',
                            connectedID: 'hardware-with-manual, hardware-completely',
                            connected: 'herjunojunoanastomosis',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-used-cassettes',
                            placeholder: 'Использованные кассеты',
                            options: [
                                ['Черные (4-4.5-5 мм)', 'Черные (4-4.5-5 мм)'],
                                ['Зеленые (4.1 мм)', 'Зеленые (4.1 мм)'],
                                ['Фиолетовые (3-3.5-4 мм)', 'Фиолетовые (3-3.5-4 мм)'],
                                ['Золотые (3.8 мм)', 'Золотые (3.8 мм)'],
                                ['Синие (3.5 мм)', 'Синие (3.5 мм)'],
                                ['Белые (2.5 мм)', 'Белые (2.5 мм)'],
                            ],
                            connectedID: 'hardware-with-manual, hardware-completely',
                            connected: 'herjunojunoanastomosis',
                            multiple: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['До 1, 5 см ', 'До 1, 5 см '],
                                ['1,5 - 3 см ', '1,5 - 3 см '],
                                ['4 см ', '4 см '],
                                ['5 см', '5 см'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Закрытие технологического отверстия',
                            name: 'herjunojunoanastomosis-сlosing-process-hole',
                            options: [
                                ['Ручное', 'Ручное'],
                                ['Аппаратное', 'Аппаратное'],
                            ],
                            connectedID: 'hardware-with-manual',
                            connected: 'herjunojunoanastomosis',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-manual-anastomosis',
                            placeholder: 'Ручной анастомоз',
                            options: [
                                ['Однорядный, монофиламентной нитью', 'Однорядный, монофиламентной нитью'],
                                ['Однорядный, нитью Stratafix', 'Однорядный, нитью Stratafix'],
                                ['Однорядный, нитью V-loc', 'Однорядный, нитью V-loc'],
                                ['Двухрядный, монофиламентной нитью', 'Двухрядный, монофиламентной нитью'],
                                ['Другой', 'Другой'],
                            ],
                            connectedID: 'fully-manual',
                            connected: 'herjunojunoanastomosis',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'herjunojunoanastomosis-сommentary-heandly-anastomosis',
                            type: 'text',
                            placeholder: 'Комментарий к ручному анастомозу',
                            addClass: 'long',
                            connectedID: 'fully-manual',
                            connected: 'herjunojunoanastomosis',
                        },
                    },
                ],
            },
            {
                name: 'Завершающий этап',
                number: 3,
                active: false,
                // observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Дренирование брюшной полости и зон анастомоза',
                            name: 'drainage-of-the-abdominal-cavity',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            hasConnection: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'closure-hernia-defects',
                            placeholder: 'Закрытие внутренних грыжевых дефетков',
                            options: [
                                ['Пространство Петерсена', 'Пространство Петерсена'],
                                ['Дефект в зоне тонкокишечного анастамоза', 'Дефект в зоне тонкокишечного анастамоза'],
                                ['Мезоколон', 'Мезоколон'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['Не учитываю', 'Не учитываю'],
                                ['12 Fr', '12 Fr'],
                                ['13 Fr', '13 Fr'],
                                ['27 Fr', '28 Fr'],
                            ],
                            connected: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлерных линий',
                            options: [
                                ['Частичное ушивание', 'Частичное ушивание'],
                                ['Гемостаз клипсами', 'Гемостаз клипсами'],
                                ['Гемостаз биполяром', 'Гемостаз биполяром'],
                                ['Гемостаз монополяром', 'Гемостаз монополяром'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Ушивание лапаротомной раны',
                            name: 'suturing-laparotomy-wound',
                            options: [
                                ['Узловым способом', 'Узловым способом'],
                                ['Непрерывной нитью', 'Непрерывной нитью'],
                            ],
                            connected: 'access',
                        },
                    },
                ],
            },
        ],
    },
    sleeve: {
        additionalGroups: [
            {
                name: 'Формирование желудочной трубки',
                number: 1,
                active: true,
                observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            options: [
                                ['Да', 'Да'],
                                ['С отступом от зонда', 'С отступом от зонда'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'number',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'distance-from-gatekeeper-to-first cassette',
                            placeholder: 'Расстояние от привратника до первой кассеты',
                            options: [
                                ['Не оценивали', 'Не оценивали'],
                                ['2 см', '2 см'],
                                ['3 см', '3 см'],
                                ['4 см', '4 см'],
                                ['5 см', '5 см'],
                                ['более 5 см', 'более 5 см'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Endopath Echelon Flex 60', 'Endopath Echelon Flex 60'],
                                ['Endopath Echelon 60', 'Endopath Echelon 60'],
                                ['Endo GIA', 'Endo GIA'],
                                ['Endopath Echelon Flex 45', 'Endopath Echelon Flex 45'],
                                ['Endopath Echelon 45', 'Endopath Echelon 45'],
                                ['Powered Echelon', 'Powered Echelon'],
                                ['Covidien GIA 80', 'Covidien GIA 80'],
                                ['NTLC 75', 'NTLC 75'],
                                ['Китайский производитель', 'Китайский производитель'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-cassettes-for-stomach-separation',
                            placeholder: 'Количество кассет для разделения желудка',
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'cassettes-for-stomach-separation',
                            placeholder: 'Кассеты для разделения желудка',
                            options: [
                                ['Черные (4-4.5-5 мм)', 'Черные (4-4.5-5 мм)'],
                                ['Зеленые (4.1 мм)', 'Зеленые (4.1 мм)'],
                                ['Фиолетовые (3-3.5-4 мм)', 'Фиолетовые (3-3.5-4 мм)'],
                                ['Золотые (3.8 мм)', 'Золотые (3.8 мм)'],
                                ['Синие (3.5 мм)', 'Синие (3.5 мм)'],
                                ['Белые (2.5 мм)', 'Белые (2.5 мм)'],
                            ],
                            multiple: true,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'strengthening-stapler-line',
                            placeholder: 'Укрепление степлерной линии',
                            options: [
                                ['Нет', 'Нет'],
                                ['Ушивание', 'Ушивание'],
                                ['Seamguard', 'Seamguard'],
                                ['Peristrips', 'Peristrips'],
                                ['Biodesign SLR', 'Biodesign SLR'],
                                ['Duet TRS', 'Duet TRS'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'additional-processing-hiatus',
                            placeholder: 'Дополнительная обработка хиатуса',
                            options: [
                                ['Нет', 'Нет'],
                                ['Круроррафия', 'Круроррафия'],
                                ['Мобилизация абдоминального отдела пищевода', 'Мобилизация абдоминального отдела пищевода'],
                                ['Отсечение желудочно-диафрагмальной связки', 'Отсечение желудочно-диафрагмальной связки'],
                                ['Отсечение жировой подушечки (Fat Pad)', 'Отсечение жировой подушечки (Fat Pad)'],
                            ],
                            required: false,
                        },
                    },
                ],
            },
            {
                name: 'Завершающий этап',
                number: 2,
                active: false,
                // observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Дренирование брюшной полости и зон анастомоза',
                            name: 'drainage-of-the-abdominal-cavity',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            hasConnection: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['Не учитываю', 'Не учитываю'],
                                ['12 Fr', '12 Fr'],
                                ['13 Fr', '13 Fr'],
                                ['27 Fr', '28 Fr'],
                            ],
                            connected: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлерных линий',
                            options: [
                                ['Частичное ушивание', 'Частичное ушивание'],
                                ['Гемостаз клипсами', 'Гемостаз клипсами'],
                                ['Гемостаз биполяром', 'Гемостаз биполяром'],
                                ['Гемостаз монополяром', 'Гемостаз монополяром'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Ушивание лапаротомной раны',
                            name: 'suturing-laparotomy-wound',
                            options: [
                                ['Узловым способом', 'Узловым способом'],
                                ['Непрерывной нитью', 'Непрерывной нитью'],
                            ],
                            connected: 'access',
                        },
                    },
                ],
            },
        ],
    },
    'removal-of-vzhb': {
        mainFields: [
            {
                type: 'SELECT',
                data: {
                    name: 'reason-removing-balloon',
                    placeholder: 'Причина удаления баллона',
                    options: [
                        ['Подошел срок удаления', 'Подошел срок удаления'],
                        ['Рецидив или недостаточное снижение веса', 'Рецидив или недостаточное снижение веса'],
                        ['Инфицирование системы/порта', 'Инфицирование системы/порта'],
                        ['Эрозия бандажа', 'Эрозия бандажа'],
                        ['Поломка, протечка', 'Поломка, протечка'],
                        ['Непроходимость', 'Непроходимость'],
                        ['Непереносимость', 'Непереносимость'],
                        ['Дисфагия', 'Дисфагия'],
                        ['Слиппейдж', 'Слиппейдж'],
                        ['Растяжение пищевода', 'Растяжение пищевода'],
                        ['Дискомфорт пациента', 'Дискомфорт пациента'],
                        ['Другое', 'Другое'],
                    ],
                },
            },
        ],
    },
    'another-operation': {
        mainFields: [
            {
                type: 'INPUT',
                data: {
                    name: 'another-operation-name',
                    type: 'text',
                    placeholder: 'Название операции',
                    required: true,
                },
            },
            {
                type: 'TEXTAREA',
                data: {
                    name: 'another-operation-name',
                    type: 'text',
                    placeholder: 'Название операции',
                    required: true,
                    addClass: 'long',
                },
            },
        ],
    },
    sadi: {
        additionalGroups: [
            {
                name: 'Формирование желудочной трубки',
                number: 1,
                active: true,
                observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            options: [
                                ['Да', 'Да'],
                                ['С отступом от зонда', 'С отступом от зонда'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Endopath Echelon Flex 60', 'Endopath Echelon Flex 60'],
                                ['Endopath Echelon 60', 'Endopath Echelon 60'],
                                ['Endo GIA', 'Endo GIA'],
                                ['Endopath Echelon Flex 45', 'Endopath Echelon Flex 45'],
                                ['Endopath Echelon 45', 'Endopath Echelon 45'],
                                ['Powered Echelon', 'Powered Echelon'],
                                ['Covidien GIA 80', 'Covidien GIA 80'],
                                ['NTLC 75', 'NTLC 75'],
                                ['Китайский производитель', 'Китайский производитель'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-of-cassettes',
                            type: 'number',
                            placeholder: 'Количество кассет',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'strengthening-the-seam',
                            placeholder: 'Укрепление линии шва',
                            options: [
                                ['Нет', 'Нет'],
                                ['Ушивание', 'Ушивание'],
                                ['Seamguard', 'Seamguard'],
                                ['Peristrips', 'Peristrips'],
                                ['Biodesign SLR', 'Biodesign SLR'],
                                ['Duet TRS', 'Duet TRS'],
                            ],
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'number',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'used-cassettes',
                            placeholder: 'Использованные кассеты',
                            options: [
                                ['Черные (4-4.5-5 мм)', 'Черные (4-4.5-5 мм)'],
                                ['Зеленые (4.1 мм)', 'Зеленые (4.1 мм)'],
                                ['Фиолетовые (3-3.5-4 мм)', 'Фиолетовые (3-3.5-4 мм)'],
                                ['Золотые (3.8 мм)', 'Золотые (3.8 мм)'],
                                ['Синие (3.5 мм)', 'Синие (3.5 мм)'],
                                ['Белые (2.5 мм)', 'Белые (2.5 мм)'],
                            ],
                            multiple: true,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'indent-gatekeeper',
                            placeholder: 'Отступ от привратника (см)',
                            options: [
                                ['Не оценивали', 'Не оценивали'],
                                ['2 см', '2 см'],
                                ['3 см', '3 см'],
                                ['4 см', '4 см'],
                                ['5 см', '5 см'],
                                ['более 5 см', 'более 5 см'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hiatus-treatment',
                            placeholder: 'Обработка хиатуса',
                            options: [
                                ['Нет', 'Нет'],
                                ['Круроррафия', 'Круроррафия'],
                                ['Мобилизация абдоминального отдела пищевода', 'Мобилизация абдоминального отдела пищевода'],
                                ['Отсечение желудочно-диафрагмальной связки', 'Отсечение желудочно-диафрагмальной связки'],
                                ['Отсечение жировой подушечки (Fat Pad)', 'Отсечение жировой подушечки (Fat Pad)'],
                            ],
                            required: false,
                        },
                    },
                ],
            },
            {
                name: 'Формирование анастомоза',
                number: 2,
                active: false,
                observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Сохранение правой гастродуоденальной артерии',
                            name: 'preservation-right-artery',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'level-mobilization-bulb',
                            placeholder: 'Уровень мобилизации луковицы (отступ от привратника)',
                            options: [
                                ['Не оценивали', 'Не оценивали'],
                                ['2 см', '2 см'],
                                ['3 см', '3 см'],
                                ['4 см', '4 см'],
                                ['5 см', '5 см'],
                                ['более 5 см', 'более 5 см'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'Method-determining location of duodenoenteroanastomosis',
                            placeholder: 'Метод определения места дуоденоэнтероанастомоза',
                            options: [
                                ['Отступ от илеоцекального угла', 'Отступ от илеоцекального угла'],
                                ['Отступ от связки Трейтца', 'Отступ от связки Трейтца'],
                                ['Процент от общей длины тонкой кишки', 'Процент от общей длины тонкой кишки'],
                            ],
                            hasConnection: 'method-determination-duodenoenteroanastomosis',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'gut-indent',
                            type: 'number',
                            placeholder: 'Расстояние (см)',
                            required: false,
                            connected: 'method-determination-duodenoenteroanastomosis',
                            connectedID: 'indent',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'small-intestine-length',
                            type: 'number',
                            placeholder: 'Длина тонкой кишки (см)',
                            required: false,
                            connected: 'method-determination-duodenoenteroanastomosis',
                            connectedID: 'percent-gut',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'total-loop-length',
                            type: 'number',
                            placeholder: 'Длина общей петли (см)',
                            required: true,
                            connected: 'method-determination-duodenoenteroanastomosis',
                            connectedID: 'percent-gut',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'length-biliopancreatic-loop',
                            type: 'number',
                            placeholder: 'Длина билиопанкреатической петли (см',
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Отсечение торцевой степлерной линии',
                            name: 'cutting-stapler-line',
                            options: [
                                ['Да', 'Да'],
                                ['Просвет вскрыт другим способом', 'Просвет вскрыт другим способом'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'formation-of-DEA',
                            placeholder: 'Формирование ДЭА',
                            options: [
                                ['Однорядный, монофиламентной нитью', 'Однорядный, монофиламентной нитью'],
                                ['Однорядный, нитью Stratafix', 'Однорядный, нитью Stratafix'],
                                ['Однорядный, нитью V-loc', 'Однорядный, нитью V-loc'],
                                ['Двухрядный, монофиламентной нитью', 'Двухрядный, монофиламентной нитью'],
                                ['Другой', 'Другой'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'select-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['До 1, 5 см ', 'До 1, 5 см '],
                                ['1,5 - 3 см ', '1,5 - 3 см '],
                                ['4 см ', '4 см '],
                                ['5 см', '5 см'],
                            ],
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'сommentary-anastomosis',
                            type: 'number',
                            placeholder: 'Комментарий к анастомозу',
                            required: false,
                        },
                    },
                ],
            },
            {
                name: 'Завершающий этап',
                active: false,
                number: 3,
                // observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Дренирование брюшной полости и зон анастомоза',
                            name: 'drainage-of-the-abdominal-cavity',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            hasConnection: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['Не учитываю', 'Не учитываю'],
                                ['12 Fr', '12 Fr'],
                                ['13 Fr', '13 Fr'],
                                ['27 Fr', '28 Fr'],
                            ],
                            connected: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлерных линий',
                            options: [
                                ['Частичное ушивание', 'Частичное ушивание'],
                                ['Гемостаз клипсами', 'Гемостаз клипсами'],
                                ['Гемостаз биполяром', 'Гемостаз биполяром'],
                                ['Гемостаз монополяром', 'Гемостаз монополяром'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Ушивание лапаротомной раны',
                            name: 'suturing-laparotomy-wound',
                            options: [
                                ['Узловым способом', 'Узловым способом'],
                                ['Непрерывной нитью', 'Непрерывной нитью'],
                            ],
                            connected: 'access',
                        },
                    },
                ],
            },
        ],
    },
    mgb: {
        additionalGroups: [
            {
                name: 'Формирование малого желудочка',
                number: 1,
                active: true,
                observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            options: [
                                ['Да', 'Да'],
                                ['С отступом от зонда', 'С отступом от зонда'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Endopath Echelon Flex 60', 'Endopath Echelon Flex 60'],
                                ['Endopath Echelon 60', 'Endopath Echelon 60'],
                                ['Endo GIA', 'Endo GIA'],
                                ['Endopath Echelon Flex 45', 'Endopath Echelon Flex 45'],
                                ['Endopath Echelon 45', 'Endopath Echelon 45'],
                                ['Powered Echelon', 'Powered Echelon'],
                                ['Covidien GIA 80', 'Covidien GIA 80'],
                                ['NTLC 75', 'NTLC 75'],
                                ['Китайский производитель', 'Китайский производитель'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                            multiple: true,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-of-cassettes',
                            type: 'number',
                            placeholder: 'Количество кассет',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'strengthening-the-seam',
                            placeholder: 'Укрепление линии шва',
                            options: [
                                ['Нет', 'Нет'],
                                ['Ушивание', 'Ушивание'],
                                ['Seamguard', 'Seamguard'],
                                ['Peristrips', 'Peristrips'],
                                ['Biodesign SLR', 'Biodesign SLR'],
                                ['Duet TRS', 'Duet TRS'],
                            ],
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'number',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'used-cassettes',
                            placeholder: 'Использованные кассеты',
                            options: [
                                ['Черные (4-4.5-5 мм)', 'Черные (4-4.5-5 мм)'],
                                ['Зеленые (4.1 мм)', 'Зеленые (4.1 мм)'],
                                ['Фиолетовые (3-3.5-4 мм)', 'Фиолетовые (3-3.5-4 мм)'],
                                ['Золотые (3.8 мм)', 'Золотые (3.8 мм)'],
                                ['Синие (3.5 мм)', 'Синие (3.5 мм)'],
                                ['Белые (2.5 мм)', 'Белые (2.5 мм)'],
                            ],
                            multiple: true,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'first-flashing',
                            placeholder: 'Первое прошивание',
                            options: [
                                ['Выше гусиной лапки', 'Выше гусиной лапки'],
                                ['На уровне гусиной лапки', 'На уровне гусиной лапки'],
                                ['Ниже гусиной лапки', 'Ниже гусиной лапки'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hiatus-treatment',
                            placeholder: 'Обработка хиатуса',
                            options: [
                                ['Нет', 'Нет'],
                                ['Круроррафия', 'Круроррафия'],
                                ['Мобилизация абдоминального отдела пищевода', 'Отсечение желудочно-диафрагмальной связки'],
                                ['Отсечение желудочно-диафрагмальной связки', 'Отсечение желудочно-диафрагмальной связки'],
                                ['Отсечение жировой подушечки (Fat Pad)', 'Отсечение жировой подушечки (Fat Pad)'],
                            ],
                            required: false,
                        },
                    },
                ],
            },
            {
                name: 'Формирование анастомоза',
                number: 2,
                active: false,
                observe: true,
                content: [
                    {
                        type: 'SELECT',
                        data: {
                            name: 'method-determining-place-gastroenteroanastomosis',
                            placeholder: 'Метод определения места гастроэнтероанастомоза',
                            options: [
                                ['отступ от илеоцекального угла', 'отступ от илеоцекального угла'],
                                ['отступ от связки трейца', 'отступ от связки трейца'],
                                ['% от общей длины тонкой кишки', '% от общей длины тонкой кишки'],
                            ],
                            required: false,
                            hasConnection: 'treitz',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'ident-treitz',
                            type: 'number',
                            placeholder: 'Отступ от связки Трейтца (см)',
                            required: false,
                            connected: 'treitz',
                            connectedID: 'ident-treitz',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'small-intestine-length',
                            type: 'number',
                            placeholder: 'Длина тонкой кишки (см)',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'total-loop-length',
                            type: 'number',
                            placeholder: 'Длина общей петли (см)',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'length-biliopancreatic-loop',
                            type: 'number',
                            placeholder: 'Длина билиопанкреатической петли (см)',
                            required: true,
                        },
                    },
                    {
                        type: 'SUBTITLE',
                        data: {
                            subtitle: 'Гастроэнтероанастомоз',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Расположение гастроэнтероанастомоза',
                            name: 'location-gastroenteroanastomosis',
                            options: [
                                ['Впередиободочное', 'Впередиободочное'],
                                ['Позадиободочное', 'Позадиободочное'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Отсечение торцевой степлерной линии',
                            name: 'cutting-stapler-line',
                            options: [
                                ['Да', 'Да'],
                                ['Просвет вскрыт другим способом', 'Просвет вскрыт другим способом'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Формирование ГЭА',
                            name: 'formation-GEA',
                            options: [
                                ['Аппаратный циркулярный', 'Аппаратный циркулярный'],
                                ['Аппаратный линейный', 'Аппаратный линейный'],
                                ['Ручной', 'Ручной'],
                            ],
                            hasConnection: 'formation-gea',
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Выбор стенки трубки при формировании аппаратного гастроэнтероанастомоза',
                            name: 'selection-tube-wall-hardware-gastroenteroanastomosis',
                            options: [
                                ['По передней стенке трубки', 'По передней стенке трубки'],
                                ['По задней стенке трубки', 'По задней стенке трубки'],
                            ],
                            connected: 'formation-gea',
                            connectedID: 'hardware',
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Закрытие технологического отверстия',
                            name: 'сlosing-process-hole',
                            options: [
                                ['Ручное', 'Ручное'],
                                ['Аппаратное', 'Аппаратное'],
                            ],
                            connected: 'formation-gea',
                            connectedID: 'hardware',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'manual-anastomosis',
                            placeholder: 'Ручной анастомоз',
                            options: [
                                ['Однорядный, монофиламентной нитью', 'Однорядный, монофиламентной нитью'],
                                ['Однорядный, нитью Stratafix', 'Однорядный, нитью Stratafix'],
                                ['Однорядный, нитью V-loc', 'Однорядный, нитью V-loc'],
                                ['Двухрядный, монофиламентной нитью', 'Двухрядный, монофиламентной нитью'],
                                ['Другой', 'Другой'],
                            ],
                            connected: 'formation-gea',
                            connectedID: 'manual',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'сommentary-heandly-anastomosis',
                            type: 'text',
                            placeholder: 'Комментарий к ручному анастомозу',
                            addClass: 'long',
                            connected: 'formation-gea',
                            connectedID: 'manual',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'select-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['До 1, 5 см ', 'До 1, 5 см '],
                                ['1,5 - 3 см ', '1,5 - 3 см '],
                                ['4 см ', '4 см '],
                                ['5 см', '5 см'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Была ли сформирована шпора?',
                            name: 'spur-been-formed',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            hasConnection: 'spur',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'spur-height',
                            type: 'number',
                            placeholder: 'Высота шпоры (см)',
                            connected: 'spur',
                        },
                    },
                ],
            },
            {
                name: 'Завершающий этап',
                active: false,
                number: 3,
                // observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Дренирование брюшной полости и зон анастомоза',
                            name: 'drainage-of-the-abdominal-cavity',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            hasConnection: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'closure-hernia-defects',
                            placeholder: 'Ушивание пространства Петерсона',
                            options: [
                                ['Ушито непрерывным швом', 'Ушито непрерывным швом'],
                                ['Ушито отдельным швом', 'Ушито отдельным швом'],
                                ['Не ушивалось', 'Не ушивалось'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['Не учитываю', 'Не учитываю'],
                                ['12 Fr', '12 Fr'],
                                ['13 Fr', '13 Fr'],
                                ['27 Fr', '28 Fr'],
                            ],
                            connected: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлерных линий',
                            options: [
                                ['Частичное ушивание', 'Частичное ушивание'],
                                ['Гемостаз клипсами', 'Гемостаз клипсами'],
                                ['Гемостаз биполяром', 'Гемостаз биполяром'],
                                ['Гемостаз монополяром', 'Гемостаз монополяром'],
                            ],
                            multiple: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Ушивание лапаротомной раны',
                            name: 'suturing-laparotomy-wound',
                            options: [
                                ['Узловым способом', 'Узловым способом'],
                                ['Непрерывной нитью', 'Непрерывной нитью'],
                            ],
                            connected: 'access',
                        },
                    },
                ],
            },
        ],
    },
    slim: {
        additionalGroups: [
            {
                name: 'Формирование малого желудочка',
                number: 1,
                active: true,
                observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            options: [
                                ['Да', 'Да'],
                                ['С отступом от зонда', 'С отступом от зонда'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Endopath Echelon Flex 60', 'Endopath Echelon Flex 60'],
                                ['Endopath Echelon 60', 'Endopath Echelon 60'],
                                ['Endo GIA', 'Endo GIA'],
                                ['Endopath Echelon Flex 45', 'Endopath Echelon Flex 45'],
                                ['Endopath Echelon 45', 'Endopath Echelon 45'],
                                ['Powered Echelon', 'Powered Echelon'],
                                ['Covidien GIA 80', 'Covidien GIA 80'],
                                ['NTLC 75', 'NTLC 75'],
                                ['Китайский производитель', 'Китайский производитель'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                            multiple: true,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-of-cassettes',
                            type: 'number',
                            placeholder: 'Количество кассет',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'strengthening-the-seam',
                            placeholder: 'Укрепление линии шва',
                            options: [
                                ['Нет', 'Нет'],
                                ['Ушивание', 'Ушивание'],
                                ['Seamguard', 'Seamguard'],
                                ['Peristrips', 'Peristrips'],
                                ['Biodesign SLR', 'Biodesign SLR'],
                                ['Duet TRS', 'Duet TRS'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'number',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'used-cassettes',
                            placeholder: 'Использованные кассеты',
                            options: [
                                ['Черные (4-4.5-5 мм)', 'Черные (4-4.5-5 мм)'],
                                ['Зеленые (4.1 мм)', 'Зеленые (4.1 мм)'],
                                ['Фиолетовые (3-3.5-4 мм)', 'Фиолетовые (3-3.5-4 мм)'],
                                ['Золотые (3.8 мм)', 'Золотые (3.8 мм)'],
                                ['Синие (3.5 мм)', 'Синие (3.5 мм)'],
                                ['Белые (2.5 мм)', 'Белые (2.5 мм)'],
                            ],
                            multiple: true,
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'first-flashing',
                            placeholder: 'Первое прошивание',
                            options: [
                                ['Выше гусиной лапки', 'Выше гусиной лапки'],
                                ['На уровне гусиной лапки', 'На уровне гусиной лапки'],
                                ['Ниже гусиной лапки', 'Ниже гусиной лапки'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hiatus-treatment',
                            placeholder: 'Обработка хиатуса',
                            options: [
                                ['Нет', 'Нет'],
                                ['Круроррафия', 'Круроррафия'],
                                ['Мобилизация абдоминального отдела пищевода', 'Отсечение желудочно-диафрагмальной связки'],
                                ['Отсечение желудочно-диафрагмальной связки', 'Отсечение желудочно-диафрагмальной связки'],
                                ['Отсечение жировой подушечки (Fat Pad)', 'Отсечение жировой подушечки (Fat Pad)'],
                            ],
                            required: false,
                        },
                    },
                ],
            },
            {
                name: 'Формирование анастомоза',
                number: 2,
                active: false,
                observe: true,
                content: [
                    {
                        type: 'SELECT',
                        data: {
                            name: 'method-determining-place-gastroenteroanastomosis',
                            placeholder: 'Метод определения места гастроэнтероанастомоза',
                            options: [
                                ['отступ от илеоцекального угла', 'отступ от илеоцекального угла'],
                                ['отступ от связки трейца', 'отступ от связки трейца'],
                                ['% от общей длины тонкой кишки', '% от общей длины тонкой кишки'],
                            ],
                            required: false,
                            hasConnection: 'treitz',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'ident-treitz',
                            type: 'number',
                            placeholder: 'Отступ от связки Трейтца (см)',
                            required: false,
                            connected: 'treitz',
                            connectedID: 'ident-treitz',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'small-intestine-length',
                            type: 'number',
                            placeholder: 'Длина тонкой кишки (см)',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'total-loop-length',
                            type: 'number',
                            placeholder: 'Длина общей петли (см)',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'length-biliopancreatic-loop',
                            type: 'number',
                            placeholder: 'Длина билиопанкреатической петли (см)',
                            required: true,
                        },
                    },
                    {
                        type: 'SUBTITLE',
                        data: {
                            subtitle: 'Гастроэнтероанастомоз',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Расположение гастроэнтероанастомоза',
                            name: 'location-gastroenteroanastomosis',
                            options: [
                                ['Впередиободочное', 'Впередиободочное'],
                                ['Позадиободочное', 'Позадиободочное'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Отсечение торцевой степлерной линии',
                            name: 'cutting-stapler-line',
                            options: [
                                ['Да', 'Да'],
                                ['Просвет вскрыт другим способом', 'Просвет вскрыт другим способом'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Формирование ГЭА',
                            name: 'formation-GEA',
                            options: [
                                ['Аппаратный циркулярный', 'Аппаратный циркулярный'],
                                ['Аппаратный линейный', 'Аппаратный линейный'],
                                ['Ручной', 'Ручной'],
                            ],
                            hasConnection: 'formation-gea',
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Выбор стенки трубки при формировании аппаратного гастроэнтероанастомоза',
                            name: 'selection-tube-wall-hardware-gastroenteroanastomosis',
                            options: [
                                ['По передней стенке трубки', 'По передней стенке трубки'],
                                ['По задней стенке трубки', 'По задней стенке трубки'],
                            ],
                            connected: 'formation-gea',
                            connectedID: 'hardware',
                            required: false,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Закрытие технологического отверстия',
                            name: 'сlosing-process-hole',
                            options: [
                                ['Ручное', 'Ручное'],
                                ['Аппаратное', 'Аппаратное'],
                            ],
                            connected: 'formation-gea',
                            connectedID: 'hardware',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'manual-anastomosis',
                            placeholder: 'Ручной анастомоз',
                            options: [
                                ['Однорядный, монофиламентной нитью', 'Однорядный, монофиламентной нитью'],
                                ['Однорядный, нитью Stratafix', 'Однорядный, нитью Stratafix'],
                                ['Однорядный, нитью V-loc', 'Однорядный, нитью V-loc'],
                                ['Двухрядный, монофиламентной нитью', 'Двухрядный, монофиламентной нитью'],
                                ['Другой', 'Другой'],
                            ],
                            connected: 'formation-gea',
                            connectedID: 'manual',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'сommentary-heandly-anastomosis',
                            type: 'text',
                            placeholder: 'Комментарий к ручному анастомозу',
                            addClass: 'long',
                            connected: 'formation-gea',
                            connectedID: 'manual',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'select-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['До 1, 5 см ', 'До 1, 5 см '],
                                ['1,5 - 3 см ', '1,5 - 3 см '],
                                ['4 см ', '4 см '],
                                ['5 см', '5 см'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Была ли сформирована шпора?',
                            name: 'spur-been-formed',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            hasConnection: 'spur',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'spur-height',
                            type: 'number',
                            placeholder: 'Высота шпоры (см)',
                            connected: 'spur',
                        },
                    },
                ],
            },
            {
                name: 'Завершающий этап',
                active: false,
                number: 3,
                // observe: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Дренирование брюшной полости и зон анастомоза',
                            name: 'drainage-of-the-abdominal-cavity',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            hasConnection: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'closure-hernia-defects',
                            placeholder: 'Ушивание пространства Петерсона',
                            options: [
                                ['Ушито непрерывным швом', 'Ушито непрерывным швом'],
                                ['Ушито отдельным швом', 'Ушито отдельным швом'],
                                ['Не ушивалось', 'Не ушивалось'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['Не учитываю', 'Не учитываю'],
                                ['12 Fr', '12 Fr'],
                                ['13 Fr', '13 Fr'],
                                ['27 Fr', '28 Fr'],
                            ],
                            connected: 'drainage-tube',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлерных линий',
                            options: [
                                ['Частичное ушивание', 'Частичное ушивание'],
                                ['Гемостаз клипсами', 'Гемостаз клипсами'],
                                ['Гемостаз биполяром', 'Гемостаз биполяром'],
                                ['Гемостаз монополяром', 'Гемостаз монополяром'],
                            ],
                            multiple: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Ушивание лапаротомной раны',
                            name: 'suturing-laparotomy-wound',
                            options: [
                                ['Узловым способом', 'Узловым способом'],
                                ['Непрерывной нитью', 'Непрерывной нитью'],
                            ],
                            connected: 'access',
                        },
                    },
                ],
            },
        ],
    },
};

export const OPERATIONS_RULES = {
    // ОБЩИЕ ПОЛЯ
    surgeon: {
        required: {
            message: 'Обязательное поле',
        },
    },
    access: {
        required: {
            message: 'Обязательное поле',
        },
    },
    'duration-operation': {
        customRange: {
            min: 40,
            max: 120,
        },
    },
    'weight-operation': {
        customRange: {
            min: 60,
            max: 300,
        },
        required: {
            message: 'Обязательное поле',
        },
        // сюда можно добавить еще тесты
    },
    'date-operation': {
        range: {
            min: 10,
            max: 10,
            message: 'Формат: 16.09.2023',
        },
        required: {
            message: 'Обязательное поле',
        },
    },
    'type-of-operation': {
        required: {
            message: 'Обязательное поле',
        },
    },
    'kind-of-operation': {
        required: {
            message: 'Обязательное поле',
        },
    },
    'reason-for-revision': {
        required: {
            message: 'Обязательное поле',
        },
    },
    // Внутрижелудочный баллон
    'ballon-type': {
        required: {
            message: 'Обязательное поле',
        },
    },
    'fullness-of-the-balloon': {
        required: {
            message: 'Обязательное поле',
        },
    },
    'date-ballon-delete': {
        required: {
            message: 'Обязательное поле',
        },
    },
    'probe-diameter': {
        customRange: {
            min: 32,
            max: 46,
            message: 'Минимальное значение: 32, максимальное значение 46',
        },
    },
    // Внутрижелудочный баллон
    'ballon-type': {
        required: {
            message: 'Обязательное поле',
        },
    },
    'ballon-filling-volume': {
        required: {
            message: 'Обязательное поле',
        },
        customRange: {
            min: 200,
            max: 700,
            message: 'Минимальное значение: 200, максимальное значение 700',
        },
    },
    'date-ballon-delete': {
        required: {
            message: 'Обязательное поле',
        },
        range: {
            min: 10,
            max: 10,
            message: 'Формат: 16.09.2023',
        },
    },
    // Бандажирование желудка
    'type-of-bandage': {
        required: {
            message: 'Обязательное поле',
        },
    },
    'date-adjustment-bandage': {
        required: {
            message: 'Обязательное поле',
        },
        range: {
            min: 10,
            max: 10,
            message: 'Формат: 16.09.2023',
        },
    },
    'number-of-cassettes': {
        customRange: {
            min: 1,
            max: 10,
            message: 'Минимальное значение: 1, максимальное значение 10',
        },
    },
    'gastroenteroanastomosis-number-of-cassettes': {
        customRange: {
            min: 1,
            max: 10,
            message: 'Минимальное значение: 1, максимальное значение 10',
        },
    },
    'herjunojunoanastomosis-number-of-cassettes': {
        customRange: {
            min: 1,
            max: 10,
            message: 'Минимальное значение: 1, максимальное значение 10',
        },
    },
    // Формирование анастомоза
    'small-intestine-length': {
        customRange: {
            min: 2500,
            max: 6000,
            message: 'Минимальное значение: 2500, максимальное значение 6000',
        },
    },
    'length-biliopancreatic-loop': {
        required: {
            message: 'Обязательное поле',
        },
    },
    'spur-height': {
        customRange: {
            min: 1,
            max: 10,
            message: 'Минимальное значение: 2500, максимальное значение 6000',
        },
    },
    'ident-treitz': {
        customRange: {
            min: 20,
            max: 350,
            message: 'Минимальное значение: 20, максимальное значение 350',
        },
    },
};
