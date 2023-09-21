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
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            info: {
                                content: 'Не игнорируйте это поле',
                                theme: 'violet',
                            },
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
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-of-cassettes',
                            type: 'text',
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
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'text',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: '2',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'used-cassettes',
                            placeholder: 'Использованные кассеты',
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
                        type: 'SELECT',
                        data: {
                            name: 'indent-gatekeeper',
                            placeholder: 'Отступ от привратника (см)',
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
                        type: 'SELECT',
                        data: {
                            name: 'hiatus-treatment',
                            placeholder: 'Обработка хиатуса',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                content: [
                    {
                        type: 'SELECT',
                        data: {
                            name: 'gut-place',
                            placeholder: 'Метод определения места пересечения тонкой кишки',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                            hasConnection: 'gut-indent',
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
                            connected: 'gut-indent',
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
                            required: true,
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
                            required: true,
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
                            required: true,
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
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'gastroenteroanastomosis-stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['Endopath Echelon 60', 'Endopath Echelon 60'],
                                ['Endo GIA', 'Endo GIA'],
                                ['Endopath Echelon Flex 45', 'Endopath Echelon Flex 45'],
                                ['Endopath Echelon 45', 'Endopath Echelon 45'],
                                ['Covidien GIA 80', 'Covidien GIA 80'],
                                ['NTLC 75', 'NTLC 75'],
                                ['Китайский производитель', 'Китайский производитель'],
                            ],
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
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'gastroenteroanastomosis-used-cassettes',
                            placeholder: 'Использованные кассеты',
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
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Закрытие технологического отверстия',
                            name: 'сlosing-process-hole',
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
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'select-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                            placeholder: 'Аппаратный с ручным закрытием',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'herjunojunoanastomosis-number-of-cassettes',
                            type: 'number',
                            placeholder: 'Количество кассет',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-used-cassettes',
                            placeholder: 'Использованные кассеты',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-manual-anastomosis',
                            placeholder: 'Ручной анастомозРучной анастомоз',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'herjunojunoanastomosis-сommentary-heandly-anastomosis',
                            type: 'number',
                            placeholder: 'Комментарий к ручному анастомозу',
                            addClass: 'long',
                        },
                    },
                ],
                // additionalGroups: [],
            },
            {
                name: 'Завершающий этап',
                active: false,
                number: 3,
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'closure-hernia-defects',
                            placeholder: 'Закрытие внутренних грыжевых дефетков',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлернх линий',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                    required: false,
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
                    required: false,
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
                    name: 'date-adjustment-bandage',
                    type: 'text',
                    placeholder: 'Планируемая дата регулировки бандажа',
                    required: false,
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлернх линий',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                            type: 'text',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: '2',
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'seam-row',
                            placeholder: 'Рядность шва',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
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
                        },
                    },
                ],
            },
            {
                name: 'Завершающий этап',
                number: 2,
                active: false,
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлернх линий',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            info: {
                                content: 'Не игнорируйте это поле',
                                theme: 'violet',
                            },
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
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-of-cassettes',
                            type: 'text',
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
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'text',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: '2',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'used-cassettes',
                            placeholder: 'Использованные кассеты',
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
                        type: 'SELECT',
                        data: {
                            name: 'indent-gatekeeper',
                            placeholder: 'Отступ от привратника (см)',
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
                        type: 'SELECT',
                        data: {
                            name: 'hiatus-treatment',
                            placeholder: 'Обработка хиатуса',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                            required: false,
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
                            required: true,
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
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'herjunojunoanastomosis-number-of-cassettes',
                            type: 'number',
                            placeholder: 'Количество кассет',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-used-cassettes',
                            placeholder: 'Использованные кассеты',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'herjunojunoanastomosis-manual-anastomosis',
                            placeholder: 'Ручной анастомозРучной анастомоз',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'herjunojunoanastomosis-сommentary-heandly-anastomosis',
                            type: 'number',
                            placeholder: 'Комментарий к ручному анастомозу',
                            addClass: 'long',
                        },
                    },
                ],
            },
            {
                name: 'Завершающий этап',
                number: 3,
                active: false,
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'closure-hernia-defects',
                            placeholder: 'Закрытие внутренних грыжевых дефетков',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлернх линий',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            info: {
                                content: 'Не игнорируйте это поле',
                                theme: 'violet',
                            },
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
                            type: 'text',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: '2',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'distance-from-gatekeeper-to-first cassette',
                            placeholder: 'Расстояние от привратника до первой кассеты',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'stitching-machine',
                            placeholder: 'Сшивающий аппарат',
                            options: [
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'number-cassettes-for-stomach-separation',
                            placeholder: 'Количество кассет для разделения желудка',
                            options: [
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'cassettes-for-stomach-separation',
                            placeholder: 'Кассеты для разделения желудка',
                            options: [
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
                            ],
                            required: false,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'strengthening-stapler-line',
                            placeholder: 'Укрепление степлерной линии',
                            options: [
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
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
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлернх линий',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                        ['value1', 'Подошел срок удаления'],
                        ['value2', 'Рецидив или недостаточное снижение веса'],
                        ['value3', 'Инфицирование системы/порта'],
                        ['value4', 'Эрозия бандажа'],
                        ['value3', 'Поломка, протечка'],
                        ['value4', 'Непроходимость'],
                        ['value3', 'Непереносимость'],
                        ['value4', 'Дисфагия'],
                        ['value4', 'Слиппейдж'],
                        ['value4', 'Растяжение пищевода'],
                        ['value4', 'Дискомфорт пациента'],
                        ['value4', 'Другое'],
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
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            info: {
                                content: 'Не игнорируйте это поле',
                                theme: 'violet',
                            },
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
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-of-cassettes',
                            type: 'text',
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
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'text',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: '2',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'used-cassettes',
                            placeholder: 'Использованные кассеты',
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
                        type: 'SELECT',
                        data: {
                            name: 'indent-gatekeeper',
                            placeholder: 'Отступ от привратника (см)',
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
                        type: 'SELECT',
                        data: {
                            name: 'hiatus-treatment',
                            placeholder: 'Обработка хиатуса',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'Method-determining location of duodenoenteroanastomosis',
                            placeholder: 'Метод определения места дуоденоэнтероанастомоза',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
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
                            required: true,
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
                        type: 'SELECT',
                        data: {
                            name: 'select-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлернх линий',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                name: 'Формирование желудочной трубки',
                number: 1,
                active: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            info: {
                                content: 'Не игнорируйте это поле',
                                theme: 'violet',
                            },
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
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-of-cassettes',
                            type: 'text',
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
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'text',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: '2',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'used-cassettes',
                            placeholder: 'Использованные кассеты',
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
                        type: 'SELECT',
                        data: {
                            name: 'first-flashing',
                            placeholder: 'Первое прошивание',
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
                        type: 'SELECT',
                        data: {
                            name: 'hiatus-treatment',
                            placeholder: 'Обработка хиатуса',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                content: [
                    {
                        type: 'SELECT',
                        data: {
                            name: 'Method-determining-place-gastroenteroanastomosis',
                            placeholder: 'Метод определения места гастроэнтероанастомоза',
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
                            required: true,
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
                            required: true,
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
                            required: true,
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'manual-anastomosis',
                            placeholder: 'Ручной анастомоз',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'select-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Закрытие технологического отверстия',
                            name: 'spur-been-formed?',
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
                            value: 2,
                        },
                    },
                ],
            },
            {
                name: 'Завершающий этап',
                active: false,
                number: 3,
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'closure-hernia-defects',
                            placeholder: 'Закрытие внутренних грыжевых дефетков',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлернх линий',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
    slim: {
        additionalGroups: [
            {
                name: 'Формирование желудочной трубки',
                number: 1,
                active: true,
                content: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желудочек сформирован по зонду',
                            name: 'ventricle-formed-probe',
                            info: {
                                content: 'Не игнорируйте это поле',
                                theme: 'violet',
                            },
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
                                ['device1', 'Endopath Echelon Flex 60'],
                                ['device2', 'Endopath Echelon Flex 60'],
                            ],
                            // targetValue: 'device2',
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'number-of-cassettes',
                            type: 'text',
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
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                            value: 36,
                            required: false,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'probe-diameter',
                            type: 'text',
                            placeholder: 'Диаметр зонда (Fr)',
                            value: '2',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'used-cassettes',
                            placeholder: 'Использованные кассеты',
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
                        type: 'SELECT',
                        data: {
                            name: 'first-flashing',
                            placeholder: 'Первое прошивание',
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
                        type: 'SELECT',
                        data: {
                            name: 'hiatus-treatment',
                            placeholder: 'Обработка хиатуса',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                content: [
                    {
                        type: 'SELECT',
                        data: {
                            name: 'Method-determining-place-gastroenteroanastomosis',
                            placeholder: 'Метод определения места гастроэнтероанастомоза',
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
                            required: true,
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
                            required: true,
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
                            required: true,
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'manual-anastomosis',
                            placeholder: 'Ручной анастомоз',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'select-diameter-anastomosis',
                            placeholder: 'Диаметр анастомоза (см)',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Закрытие технологического отверстия',
                            name: 'spur-been-formed?',
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
                            value: 2,
                        },
                    },
                ],
            },
            {
                name: 'Завершающий этап',
                active: false,
                number: 3,
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
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'closure-hernia-defects',
                            placeholder: 'Закрытие внутренних грыжевых дефетков',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'thickness-drainage-tube',
                            placeholder: 'Толщина дренажной трубки',
                            options: [
                                ['1,5 - 3 см', '1,5 - 3 см'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hemostasis-from-staplers',
                            placeholder: 'Гемостаз от степлернх линий',
                            options: [
                                ['value1', 'List item1'],
                                ['value2', 'List item2'],
                                ['value3', 'List item3'],
                                ['value4', 'List item4'],
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
};

export const OPERATIONS_RULES = {
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
            min: 60,
            max: 300,
            message: 'Минимальное значение: 100, максимальное значение 150',
        },
    },
};
