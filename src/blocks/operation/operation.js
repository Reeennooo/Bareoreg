import { createAditionalGroup, createGroup, checkConnectionValue, CONNECTED_RULES } from '../form-creating-operation/form-creating-operation';
import { Complication } from '../complications/complication';
import { assignInputRules } from '../../js/input-validate';
import { initGroupObserve } from '../../js/validate';

document.addEventListener('DOMContentLoaded', () => {
    if (!location.pathname.includes('patient-card')) return;
    let initObservers = [];

    const sideModalData = {
        observations: ['45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.'],
        operation: [
            {
                name: 'Общие сведения',
                addClass: ['group--simple'],
                dataBlocks: [
                    {
                        name: 'Вес на момент операции',
                        value: '83.2 кг',
                    },
                    {
                        name: 'Дата операции',
                        value: '02.06.2023',
                    },
                    {
                        name: 'Хирург',
                        value: 'Петров Петр Петрович',
                    },
                    {
                        name: 'Ассистент №1',
                        value: 'Анастасьевна Анастасия Петрова',
                    },
                    {
                        name: 'Ассистент №2',
                        value: 'Викториан Виктор Викторович',
                    },
                    {
                        name: 'Тип операции',
                        value: 'Ревизия после бариатрической операции в другой клинике',
                    },
                    {
                        name: 'Причина ревизии',
                        value: 'Рецидив набора веса',
                    },
                    {
                        name: 'Доступ',
                        value: 'Лапароскопия',
                    },
                    {
                        name: 'Длительность операции (мин)',
                        value: '52',
                    },
                    {
                        name: 'Обезболивание',
                        value: 'ЭТН + пластырь',
                    },
                    {
                        name: 'Обезболивание',
                        value: 'ЭТН + пластырь',
                    },
                ],
            },
            {
                name: 'Этапы операции',
                addClass: 'group--simple',
                additionalGroup: [
                    {
                        name: 'Формирование малого желудочка',
                        addClass: 'group--simple',
                        active: true,
                        dataBlocks: [
                            {
                                name: 'Желудочек сформирован по зонду',
                                value: 'Да',
                            },
                            {
                                name: 'Сшивающий аппарат',
                                value: 'Endopath Echelon 60, Endopath Echelon 45',
                            },
                            {
                                name: 'Укрепление линии шва',
                                value: 'Нужны варианты ответа',
                            },
                            {
                                name: 'Количество кассет',
                                value: '2',
                            },
                            {
                                name: 'Диаметр зонда (Fr)',
                                value: '36',
                            },
                            {
                                name: 'Использованные кассеты',
                                value: 'Черные (4-4.5-5 мм)',
                            },
                            {
                                name: 'Отступ от привратника (см)',
                                value: 'Ушивание',
                            },
                            {
                                name: 'Обработка хиатуса',
                                value: 'Мобилизация абдоминального отдела пищевода',
                            },
                            {
                                name: 'Количество кассет',
                                value: '2',
                            },
                        ],
                    },
                    {
                        name: 'Формирование анастомозов',
                        addClass: ['group--simple'],
                        active: true,
                        dataBlocks: [
                            {
                                name: 'Метод определения места пересечения тонкой кишки',
                                value: 'Отступ от илеоцекального угла',
                            },
                            {
                                name: 'Длина тонкой кишки (см)',
                                value: '4000',
                            },
                            {
                                name: 'Длина общей петли (см)',
                                value: '4000',
                            },
                            {
                                name: 'Длина алиментарной петли (см)',
                                value: '4000',
                            },
                            {
                                name: 'Длина общей петли (см)',
                                value: '4000',
                            },
                            {
                                name: 'Использованные кассеты',
                                value: 'Черные (4-4.5-5 мм)',
                            },
                        ],
                    },
                    {
                        name: 'Гастроэнтероанастомоз',
                        addClass: ['group--simple'],
                        active: true,
                        dataBlocks: [
                            {
                                name: 'Расположение гастроэнтероанастомоза',
                                value: 'Впередиободочное',
                            },
                            {
                                name: 'Расположение алиментарной петли',
                                value: '4000',
                            },
                            {
                                name: 'Отсечение торцевой степлерной линии',
                                value: 'Да',
                            },
                            {
                                name: 'Формирование ГЭА',
                                value: 'Аппаратный циркулярный',
                            },
                            {
                                name: 'Сшивающий аппарат',
                                value: 'Ethicon',
                            },
                            {
                                name: 'Количество кассет',
                                value: '8',
                            },
                            {
                                name: 'Использованные кассеты',
                                value: 'Зеленые (4.1 мм), Синие (3.5 мм)',
                            },
                            {
                                name: 'Закрытие технологического отверстия',
                                value: 'Ручное',
                            },
                            {
                                name: 'Ручной анастомоз',
                                value: 'Однорядный, нитью Stratafix',
                            },
                            {
                                name: 'Диаметр анастомоза (см)',
                                value: '1,5 - 3 см',
                            },
                            {
                                name: 'Была ли сформирована шпора?',
                                value: 'Да',
                            },
                            {
                                name: 'Высота шпоры (см)',
                                value: '2',
                            },
                            {
                                name: 'Комментарий к ручному анастомозу',
                                value: 'Без осложнений',
                            },
                        ],
                    },
                    {
                        name: 'Завершающий этап',
                        addClass: ['group--simple'],
                        active: true,
                        dataBlocks: [
                            {
                                name: 'Дренирование брюшной полости и зон анастомоза',
                                value: 'Да',
                            },
                            {
                                name: 'Закрытие внутренных грыжевых дефектов',
                                value: 'Дефект в зоне тонкокишечного анастамоза',
                            },
                            {
                                name: 'Толщина дренажной трубки',
                                value: '12 Fr',
                            },
                            {
                                name: 'Гемостаз из степлерных линий',
                                value: 'Частичное ушивание, Гемостаз клипсами',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Интраоперационные осложнения',
                addClass: ['group--simple'],
                additionalGroup: [
                    {
                        name: 'Интраоперационные осложнения',
                        addClass: ['group--simple'],
                        active: true,
                        dataBlocks: [
                            {
                                name: 'Кровотечение',
                                value: 'Из троакарной раны',
                            },
                            {
                                name: 'Позитивный тест на герметичность',
                                value: 'Степлерной линии',
                            },
                            {
                                name: 'Перфорация и ранение органов',
                                value: 'Поджелудочной железы',
                            },
                            {
                                name: 'Элекротравма органов',
                                value: 'Поджелудочной железы',
                            },
                        ],
                    },
                    {
                        name: 'Нештатные ситуации',
                        addClass: ['group--simple'],
                        active: true,
                        dataBlocks: [
                            {
                                name: 'Неправильное срабатывание кассеты',
                                value: 'Да',
                            },
                            {
                                name: 'Резкое ухудшение состояния хирурга/ ассистента',
                                value: 'Да',
                            },
                            {
                                name: 'Другое/уточнить',
                                value: 'Без осложнений',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Пребывание в стационаре и исход',
                addClass: ['group--simple'],
                dataBlocks: [
                    {
                        name: 'Наличие рвоты после операции',
                        value: 'Кратковременная, прошла самостоятельно',
                    },
                    {
                        name: 'Дата выписки',
                        value: '02.05.2023',
                    },
                    {
                        name: 'Выписка',
                        value: 'В другой госпиталь',
                    },
                    {
                        name: 'Электролитные нарушения',
                        value: 'Да',
                    },
                    {
                        name: 'Рабдомиолиз',
                        value: 'Да',
                    },
                ],
            },
        ],
    };

    const fieldsOperationData = [
        {
            title: 'Общие сведения',
            addClass: ['group--simple'],
            fields: [
                {
                    type: 'INPUT',
                    data: {
                        name: 'weight-operation',
                        type: 'number',
                        placeholder: 'Вес на момент операции*',
                        required: false,

                        value: '150',
                    },
                },
                {
                    type: 'INPUT',
                    data: {
                        name: 'date-operation',
                        type: 'text',
                        placeholder: 'Дата операции*',
                        required: false,
                        mod: 'calendar',
                        addClass: ['only-number', 'input-custom--violet'],
                        value: '10.12.2023',
                    },
                },
                {
                    type: 'SELECT',
                    data: {
                        name: 'surgeon',
                        placeholder: 'Хирург',
                        options: [
                            ['List item 1', 'List item 1'],
                            ['List item 1', 'List item 1'],
                            ['List item 1', 'List item 1'],
                            ['List item 1', 'List item 1'],
                        ],

                        required: false,
                        value: 'List item 1',
                    },
                },
                {
                    type: 'SELECT',
                    data: {
                        name: 'assistant-1',
                        placeholder: 'Ассистент №1',
                        options: [
                            ['List item 1', 'List item 1'],
                            ['List item 1', 'List item 1'],
                            ['List item 1', 'List item 1'],
                            ['List item 1', 'List item 1'],
                        ],

                        required: false,
                        value: 'List item 1',
                    },
                },
                {
                    type: 'SELECT',
                    data: {
                        name: 'assistant-2',
                        placeholder: 'Ассистент №2',
                        options: [
                            ['List item 1', 'List item 1'],
                            ['List item 2', 'List item 2'],
                            ['List item 1', 'List item 1'],
                            ['List item 1', 'List item 1'],
                        ],

                        required: false,
                        value: 'List item 2',
                    },
                },
                {
                    type: 'SELECT',
                    data: {
                        name: 'type-of-operation',
                        placeholder: 'Тип операции',
                        options: [
                            ['Первичная', 'Первичная'],
                            ['Ревизионная (по поводу неэффективности или осложнений предыдущей операции)', 'Ревизионная (по поводу неэффективности или осложнений предыдущей операции)'],
                            ['Плановый второй этап', 'Плановый второй этап'],
                            ['Ревизия после бариатрической операции в другой клинике', 'Ревизия после бариатрической операции в другой клинике'],
                        ],

                        required: false,
                        hasConnection: 'revision',
                        value: 'Плановый второй этап',
                    },
                },
                {
                    type: 'SELECT',
                    data: {
                        name: 'type-of-operation',
                        placeholder: 'Причина ревизии',
                        options: [
                            ['Рецидив набора веса', 'Рецидив набора веса'],
                            ['Недостаточное снижение веса', 'Недостаточное снижение веса'],
                            ['Осложнение', 'Осложнение'],
                            ['Удаление БЖ/ВЖБ', 'Удаление БЖ/ВЖБ'],
                        ],

                        required: false,
                        connected: 'revision',
                        value: 'Удаление БЖ/ВЖБ',
                    },
                },
                {
                    type: 'SELECT',
                    data: {
                        name: 'access',
                        placeholder: 'Доступ',
                        options: [
                            ['Лапароскопия', 'Лапароскопия'],
                            ['Лапаратомия', 'Лапаратомия'],
                            ['Конверсия из лапароскопии в лапаротомию', 'Конверсия из лапароскопии в лапаротомию'],
                            ['Конверсия из лапароскопии в мануально ассистированную', 'Конверсия из лапароскопии в мануально ассистированную'],
                        ],

                        required: false,
                        hasConnection: 'access',
                        value: 'Конверсия из лапароскопии в лапаротомию',
                    },
                },
                {
                    type: 'INPUT',
                    data: {
                        name: 'duration-operation',
                        type: 'number',
                        placeholder: 'Длительность операции (мин)',
                        required: false,

                        value: '60',
                    },
                },
                {
                    type: 'SELECT',
                    data: {
                        name: 'pain-relief',
                        placeholder: 'Обезболивание',
                        options: [
                            ['в/в', 'в/в'],
                            ['ЭТН', 'ЭТН'],
                            ['ЭТН + перидуральная анестезия', 'ЭТН + перидуральная анестезия'],
                            ['ЭТН + пластырь', 'ЭТН + пластырь'],
                        ],

                        required: false,
                        value: 'ЭТН + перидуральная анестезия',
                    },
                },
            ],
        },
        {
            title: 'Этапы операции',
            addClass: ['group--simple', 'group--parent'],
            additionalGroups: [
                {
                    name: 'Формирование малого желудочка',
                    addClass: ['group--simple'],
                    active: true,
                    number: 1,
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
                    active: true,
                    addClass: ['group--simple'],
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
                    ],
                },
                {
                    name: 'Гастроэнтероанастомоз',
                    active: true,
                    addClass: ['group--simple'],
                    content: [
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
                                addClass: 'long',
                                value: 'Аппаратный циркулярный',
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
                                addClass: 'long',
                                value: 'Да',
                                required: false,
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
                                value: 'Впередиободочное',
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
                                value: 'Позадиободочное',
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
                                value: 'Ethicon',
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
                                value: 8,
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

                                value: ['Зеленые (4.1 мм)', 'Синие (3.5 мм)'],
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
                            type: 'RADIO-GROUP',
                            data: {
                                title: 'Была ли сформирована шпора?',
                                name: 'spur-been-formed',
                                options: [
                                    ['Да', 'Да'],
                                    ['Нет', 'Нет'],
                                ],
                                value: 'Нет',
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
                            type: 'INPUT',
                            data: {
                                name: 'сommentary-heandly-anastomosis',
                                type: 'text',
                                placeholder: 'Комментарий к ручному анастомозу',
                                connectedID: 'manual',
                                connected: 'gastroenteroanastomosis',
                                addClass: ['long', 'input-custom--violet'],
                            },
                        },
                    ],
                },
                {
                    name: 'Еюноеюноанастомоз',
                    active: true,
                    addClass: ['group--simple'],
                    content: [
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

                                value: 'Аппаратный с ручным закрытием',
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
                                value: 'Endopath Echelon Flex 45',
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

                                value: 8,
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
                                value: ['Зеленые (4.1 мм)', 'Синие (3.5 мм)'],
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

                                value: 'менее 3 см',
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
                                value: 'Ручное',
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
                                value: 'Однорядный, нитью Stratafix',
                            },
                        },
                        {
                            type: 'INPUT',
                            data: {
                                name: 'herjunojunoanastomosis-сommentary-heandly-anastomosis',
                                type: 'number',
                                placeholder: 'Комментарий к ручному анастомозу',
                                connectedID: 'fully-manual',
                                connected: 'herjunojunoanastomosis',
                                addClass: ['long', 'input-custom--violet'],
                                value: 'Без осложнений',
                            },
                        },
                    ],
                },
                {
                    name: 'Завершающий этап',
                    active: true,
                    addClass: ['group--simple'],
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
        {
            title: 'Интраоперационные осложнения',
            addClass: ['group--simple'],
            additionalGroups: [
                {
                    name: 'Вид осложнения',
                    active: true,
                    addClass: ['group--simple'],
                    content: [
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'intraoperative-complications',
                                value: 'Интраоперационные осложнения',
                                label: 'Интраоперационные осложнения',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'emergency-situations',
                                value: 'Нештатные ситуации',
                                label: 'Нештатные ситуации',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Нет осложнений',
                                label: 'Нет осложнений',
                            },
                        },
                    ],
                },
                {
                    name: 'Интраоперационные осложнения',
                    active: true,
                    addClass: ['group--simple'],
                    content: [
                        {
                            type: 'SELECT',
                            data: {
                                name: 'bleeding',
                                placeholder: 'Кровотечение',
                                options: [
                                    ['Из троакарной раны', 'Из троакарной раны'],
                                    ['Из троакарной раны', 'Из троакарной раны'],
                                    ['Из троакарной раны', 'Из троакарной раны'],
                                    ['Из троакарной раны', 'Из троакарной раны'],
                                ],
                            },
                        },
                        {
                            type: 'SELECT',
                            data: {
                                name: 'positive-leak-test',
                                placeholder: 'Позитивный тест на герметичность',
                                options: [
                                    ['List item 1', 'List item 1'],
                                    ['List item 1', 'List item 1'],
                                    ['List item 1', 'List item 1'],
                                    ['List item 1', 'List item 1'],
                                ],
                            },
                        },
                        {
                            type: 'SELECT',
                            data: {
                                name: 'injury-of-organs',
                                placeholder: 'Перфорация и ранение органов',
                                options: [
                                    ['List item 1', 'List item 1'],
                                    ['List item 1', 'List item 1'],
                                    ['List item 1', 'List item 1'],
                                    ['List item 1', 'List item 1'],
                                ],
                            },
                        },
                        {
                            type: 'SELECT',
                            data: {
                                name: 'electrotrauma-of-organs',
                                placeholder: 'Электротравма органов',
                                options: [
                                    ['List item 1', 'List item 1'],
                                    ['List item 1', 'List item 1'],
                                    ['List item 1', 'List item 1'],
                                    ['List item 1', 'List item 1'],
                                ],
                            },
                        },
                    ],
                },
                {
                    name: 'Нештатные ситуации',
                    active: true,
                    addClass: ['group--simple'],
                    content: [
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Заклинивание степлера',
                                label: 'Заклинивание степлера',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Неправильное срабатывание кассеты',
                                label: 'Неправильное срабатывание кассеты',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Трудности установки зонда',
                                label: 'Трудности установки зонда',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Пршивание зонда степлером',
                                label: 'Пршивание зонда степлером',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Невозможность экспозиции печени',
                                label: 'Невозможность экспозиции печени',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Выраженный спаечный процесс',
                                label: 'Выраженный спаечный процесс',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Анестезиологические осложнения',
                                label: 'Анестезиологические осложнения',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Обнаружено новообразование',
                                label: 'Обнаружено новообразование',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Резкое ухудшение состояния хирурга/ассистента',
                                label: 'Резкое ухудшение состояния хирурга/ассистента',
                            },
                        },
                        {
                            type: 'CHECKBOX',
                            data: {
                                name: 'no-complications',
                                value: 'Поломка элементов оборудования',
                                label: 'Поломка элементов оборудования',
                            },
                        },
                        {
                            type: 'INPUT',
                            data: {
                                name: 'comment',
                                type: 'text',
                                placeholder: 'Другое/комментарии',
                                addClass: ['long', 'input-custom--violet'],
                            },
                        },
                    ],
                },
            ],
        },
        {
            title: 'Пребывание в стационаре и исход',
            addClass: ['group--simple'],
            fields: [
                {
                    type: 'SELECT',
                    data: {
                        name: 'voomiting',
                        placeholder: 'Наличие рвоты',
                        options: [
                            ['List item 1', 'List item 1'],
                            ['List item 1', 'List item 1'],
                            ['List item 1', 'List item 1'],
                            ['List item 1', 'List item 1'],
                        ],
                    },
                },
                {
                    type: 'INPUT',
                    data: {
                        name: 'discharge-from-hospital',
                        type: 'text',
                        placeholder: 'Дата выписки',
                        addClass: ['long', 'input-custom--violet'],
                        mod: 'calendar',
                        addClass: ['only-number', 'input-custom--violet'],
                        value: '02.05.2023',
                    },
                },
                {
                    type: 'SELECT',
                    data: {
                        name: 'voomiting',
                        placeholder: 'Выписка',
                        options: [
                            ['В другой госпиталь', 'В другой госпиталь'],
                            ['Летальный исход', 'Летальный исход'],
                            ['Домой', 'Домой'],
                        ],
                    },
                },
                {
                    type: 'CHECKBOX',
                    data: {
                        name: 'electrolyte-disturbances',
                        value: 'Электролитные нарушения',
                        label: 'Электролитные нарушения',
                    },
                },
                {
                    type: 'CHECKBOX',
                    data: {
                        name: 'rhabdomyolysis',
                        value: 'Рабдомиолиз',
                        label: 'Рабдомиолиз',
                    },
                },
            ],
        },
        {
            complication: true,
            data: {
                addClass: 'group--simple',
                'date-of-detection-complication': '16.12.2020',
                'main-complication': 'Кровотечение',
                'scale-complication': 'Внутрипросветное',
                'localization-complication': 'Из гастроэнтероанастомоза',
                'type-of-complication': '1',
                'complications-by-Clavien-Dindo': 'IVa степень - интенсивная терапия (полиорганная недостаточность)',
            },
        },
    ];

    const sideModal = document.querySelector('.side-modal');

    document.addEventListener('click', (event) => {
        const element = event.target.closest('[data-modal-name]');
        if (!element) return;
        if (sideModalData[element.dataset.modalName]) {
            fillSideModal(element.dataset.modalName);
            sideModal.classList.add('view-mode');
        }
    });

    const editBtn = sideModal.querySelector('.side-modal__edit');
    editBtn.addEventListener('click', enableEditSideModal);

    function createDataBlock(data) {
        const element = document.createElement('div');
        element.classList.add('data-block');
        element.innerHTML = `
    <div class='data-block__title'>${data.name}</div>
    <div class='data-block__value'>${data.value}</div>
  `;

        return element;
    }

    function renderObservations(observationsArr) {
        const observationsBlock = document.createElement('div');
        observationsBlock.classList.add('observations');
        observationsBlock.innerHTML = `
            <div class='observations__title'>Наблюдения ${observationsArr.length}:</div>
            <div class='observations__wrapper'></div>
            `;
        const wrapper = observationsBlock.querySelector('.observations__wrapper');

        function createObservationPill(data) {
            const observationPill = document.createElement('div');
            observationPill.classList.add('observations__observation');
            observationPill.innerText = data;

            return observationPill;
        }

        observationsArr.forEach((item) => {
            wrapper.append(createObservationPill(item));
        });

        sideModal.querySelector('.side-modal__main').prepend(observationsBlock);
    }

    function fillSideModal(modalName) {
        const main = document.querySelector('.side-modal__main');

        main.innerHTML = '';

        if (sideModalData.observations) {
            renderObservations(sideModalData.observations);
        }

        sideModalData[modalName].forEach((item) => {
            let dataBlocks;
            let group;

            if (item.dataBlocks) {
                dataBlocks = item.dataBlocks.map((block) => createDataBlock(block));
                group = createGroup({ title: item.name, addClass: item.addClass, dataBlocks: dataBlocks });
            } else {
                group = createGroup({ title: item.name, addClass: item.addClass });
            }

            if (item.additionalGroup) {
                const additionalGroups = item.additionalGroup.map((data) => {
                    let dataBlocks;
                    if (data.dataBlocks) {
                        dataBlocks = data.dataBlocks.map((block) => createDataBlock(block));
                    }
                    return createAditionalGroup({ ...data, dataBlocks: dataBlocks });
                });

                additionalGroups.forEach((el) => {
                    group.querySelector('.group__form').after(el);
                });
            }

            main.append(group);
        });
    }

    function enableEditSideModal() {
        sideModal.classList.remove('view-mode');
        sideModal.classList.add('is-editable');
        renderFields();
    }

    function renderFields() {
        const main = document.querySelector('.side-modal__main');

        main.innerHTML = '';
        fieldsOperationData.forEach((el) => {
            if (el.complication) {
                console.log('complication');
                const complicationBlock = createComplication(el.data);
                main.append(complicationBlock);
                let connectedEls = complicationBlock.querySelectorAll('[data-connected]');
                connectedEls.forEach((el) => {
                    checkConnectionValue(el, CONNECTED_RULES);
                });
                return;
            }

            let group = createGroup(el);

            if (el.additionalGroups) {
                let additionalGroups = [];
                let groupInner = group.querySelector('.group__inner');
                el.additionalGroups.forEach((addGroup) => {
                    additionalGroups.push(createAditionalGroup(addGroup));
                });
                additionalGroups.forEach((item) => groupInner.append(item));
            }

            main.append(group);
            let connectedEls = group.querySelectorAll('[data-connected]');
            connectedEls.forEach((el) => {
                checkConnectionValue(el, CONNECTED_RULES);
            });
        });
    }

    function createComplicationFn() {
        let count = 0;
        return function (data) {
            const complication = new Complication({ number: ++count, addClass: ['group--parent', 'group--simple'], interventionClass: 'group--simple', fieldsValue: data });
            // Добавляем правила к общим правилам.
            complication.connectionRules.forEach((item) => {
                CONNECTED_RULES[item.name] = item.rules;
            });
            console.log(CONNECTED_RULES);
            assignInputRules(complication.fieldsRules);
            initGroupObserve(initObservers);
            initObservers = [];

            return complication.el;
        };
    }

    const createComplication = createComplicationFn();
});
