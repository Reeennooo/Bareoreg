import { createAditionalGroup, createGroup, checkConnectionValue, CONNECTED_RULES } from '../form-creating-operation/form-creating-operation';
import { PATIENT_RULES } from '../form-new-patient/form-new-patient';
import { OPERATIONS_RULES } from '../../js/operation-data';
import { FileLoader } from '../../components/observation-file-loader/observation-file-loader';
import { Complication } from '../complications/complication';
import { assignInputRules } from '../../js/input-validate';
import { initGroupObserve } from '../../js/validate';

document.addEventListener('DOMContentLoaded', () => {
    if (!location.pathname.includes('patient-card')) return;
    let initObservers = [];

    const sideModalData = {
        operation: {
            observations: ['45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.', '45 мес.'],
            groups: [
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
                    subtitle: 'Трудности и отклонения от стандартного хода операции, которые возникли в операционной и привели к изменению тактики, увеличению длительности или прекращению вмешательства.',
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
        },
        observation: {
            fileloader: true,
            // - - - Этот код можно удалить при работе с настоящими файлами
            // files: [
            //     { template: true, name: 'Название файла', type: 'file' },
            //     { template: true, name: 'Название изображения', type: 'PNG', src: 'img/logo.svg' },
            // ],
            groups: [
                {
                    name: 'Сведения о пациенте',
                    addClass: ['group--simple', 'three-columns'],
                    dataBlocks: [
                        {
                            name: 'Дата наблюдения',
                            value: '01.01.2023',
                        },
                        {
                            name: 'Вес на момент наблюдения',
                            value: '01.01.2023',
                        },
                        {
                            name: '%EWL',
                            value: '0%',
                        },
                    ],
                },
                {
                    name: 'Бандажирование желудка',
                    addClass: ['group--simple', 'three-columns'],
                    dataBlocks: [
                        {
                            name: 'Причина регулировки',
                            value: 'Дисфагия',
                        },
                        {
                            name: 'Изменение объема заполнения',
                            value: '+ 2л',
                        },
                        {
                            name: 'Планируемая дата регулировки',
                            value: '02.04.2023',
                        },
                    ],
                },
                {
                    name: 'Общие сведения',
                    addClass: ['group--simple'],
                    dataBlocks: [
                        {
                            name: 'Прием витаминов и микроэлементов',
                            value: 'Нет',
                        },
                        {
                            name: 'Признаки питательной недостаточности',
                            value: 'Есть',
                        },
                        {
                            name: 'Чувство голода',
                            value: 'Сниженное',
                        },
                        {
                            name: 'Комфортность питания',
                            value: 'Дискомфорт при приеме пищи',
                        },
                        {
                            name: 'Диарея',
                            value: 'Нет',
                        },
                        {
                            name: 'Наличие запоров',
                            value: 'Нет или очень редко',
                        },
                        {
                            name: 'Частота стула',
                            value: '1-2 раза в день',
                        },
                    ],
                },
                {
                    name: 'Течение сопутствующих заболеваний',
                    addClass: ['group--simple'],
                    dataBlocks: [
                        {
                            name: 'Артериальная гипертензия',
                            value: 'Есть, терапию не получает',
                        },
                        {
                            name: 'Срок наступления компенсации СД?',
                            value: 'Снижение доз пероральных препаратов',
                        },
                        {
                            name: 'ГЭРБ',
                            value: 'Ежедневный прием препаратов',
                        },
                        {
                            name: 'Дислипидемия',
                            value: 'Да',
                        },
                        {
                            name: 'Атеросклероз',
                            value: 'Нет',
                        },
                        {
                            name: 'Апноэ',
                            value: 'Нет',
                        },
                        {
                            name: 'Бронхиальная астма',
                            value: 'Ингалятор',
                        },
                        {
                            name: 'Функциональный статус',
                            value: '1 этаж без отдыха',
                        },
                        {
                            name: 'Боль в спине и конечностях',
                            value: 'Нет симптомов',
                        },
                        {
                            name: 'Грыжа',
                            value: 'Пупочная',
                        },
                        {
                            name: 'Обвисание кожи',
                            value: 'Целлюлит / изъязвление',
                        },
                        {
                            name: 'Жировой фартук',
                            value: 'Значительная кожно-жировая складка',
                        },
                        {
                            name: 'Недержание мочи',
                            value: 'Нет',
                        },
                        {
                            name: 'Депрессия',
                            value: 'Нет',
                        },
                        {
                            name: 'Желчнокаменная болезнь',
                            value: 'Нет',
                        },
                    ],
                },
                {
                    name: 'Женское здоровье',
                    addClass: ['group--simple'],
                    dataBlocks: [
                        {
                            name: 'Синдром поликистозных яичников',
                            value: 'СПКЯ с терапией',
                        },
                        {
                            name: 'Менструальная функция',
                            value: 'Нерегулярный цикл',
                        },
                        {
                            name: 'Наступление беременности',
                            value: 'Беременность в результате ЭКО',
                        },
                    ],
                },
                {
                    name: 'Дополнительная информация',
                    addClass: ['group--simple'],
                    dataBlocks: [
                        {
                            name: 'Примечания',
                            value: 'Звонить после 9:00 до 18:00<br> Только в рабочие дни.',
                        },
                    ],
                },
            ],
        },
    };

    const fields = {
        operation: [
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
                            required: true,
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
                            hasConnection: 'operation-type',
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
                            connected: 'operation-type',
                            connectedID: 'revision',
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
                                    required: true,
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
                subtitle: 'Трудности и отклонения от стандартного хода операции, которые возникли в операционной и привели к изменению тактики, увеличению длительности или прекращению вмешательства.',
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
                interventions: [
                    {
                        'date-repeated-operation': '12.12.2012',
                        'hours-from-main-operation': 12,
                        'method-repeated-operation': 'Конверсионная лапаротомия - Лапароскопия',
                        'type-repeated-operation': 'Остановка кровотечения',
                        'note-intervention': 'Всё в порядке',
                    },
                ],
            },
            {
                complication: true,
                data: {
                    addClass: 'group--simple',
                    'date-of-detection-complication': '02.04.2016',
                    'main-complication': 'Декомпенсация сопутствующих заболеваний',
                    'scale-complication': 'Внутрипросветное',
                    'localization-complication': 'Из гастроэнтероанастомоза',
                    'type-of-complication': '1',
                    'complications-by-Clavien-Dindo': 'IVa степень - интенсивная терапия (полиорганная недостаточность)',
                },
            },
            {
                complication: true,
                data: {
                    addClass: 'group--simple',
                    'date-of-detection-complication': '01.01.2015',
                    'main-complication': 'Декомпенсация сопутствующих заболеваний',
                    'scale-complication': 'Внутрипросветное',
                    'localization-complication': 'Из гастроэнтероанастомоза',
                    'type-of-complication': '1',
                    'complications-by-Clavien-Dindo': 'IVa степень - интенсивная терапия (полиорганная недостаточность)',
                },
            },
        ],
        observation: [
            {
                title: 'Сведения о пациенте',
                addClass: ['group--simple', 'group--parent'],
                fields: [
                    {
                        type: 'INPUT',
                        data: {
                            name: 'date-operation',
                            type: 'text',
                            placeholder: 'Дата наблюдения',
                            required: false,
                            mod: 'calendar',
                            addClass: ['only-number', 'input-custom--violet'],
                            value: '01.01.2023',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'weight-observation',
                            type: 'number',
                            placeholder: 'Вес на момент наблюдения',
                            required: false,
                            value: 86,
                        },
                    },
                ],
                additionalGroups: [
                    {
                        name: 'Женское здоровье',
                        addClass: ['group--simple'],
                        active: true,
                        number: 1,
                        content: [
                            {
                                type: 'SELECT',
                                data: {
                                    name: 'polycystic-ovary',
                                    placeholder: 'Синдром поликистозных яичников',
                                    options: [
                                        ['Нет', 'Нет'],
                                        ['СПКЯ без терапии', 'СПКЯ без терапии'],
                                        ['СПКЯ с терапией', 'СПКЯ с терапией'],
                                        ['Бесплодие', 'Бесплодие'],
                                    ],
                                },
                            },
                            {
                                type: 'SELECT',
                                data: {
                                    name: 'menstrual-function',
                                    placeholder: 'Менструальная функция',
                                    options: [
                                        ['Регулярный цикл', 'Регулярный цикл'],
                                        ['Нерегулярный цикл', 'Нерегулярный цикл'],
                                        ['Гиперменорея', 'Гиперменорея'],
                                        ['Гистерэктомия в анамнезе', 'Гистерэктомия в анамнезе'],
                                    ],
                                },
                            },
                            {
                                type: 'SELECT',
                                data: {
                                    name: 'onset-of-pregnancy',
                                    placeholder: 'Наступление беремности',
                                    options: [
                                        ['Беременнось не наступила', 'Беременнось не наступила'],
                                        ['Беременность в результате ЭКО', 'Беременность в результате ЭКО'],
                                        ['Безуспешное ЭКО', 'Безуспешное ЭКО'],
                                        ['Естественная беременность', 'Естественная беременность'],
                                    ],
                                },
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Бандажирование желудка',
                addClass: ['group--simple', 'three-columns'],
                fields: [
                    {
                        type: 'SELECT',
                        data: {
                            name: 'reason-adjusting-bandage',
                            placeholder: 'Причина регулировки',
                            options: [
                                ['Первичная регулировка после операции', 'Первичная регулировка после операции'],
                                ['Дисфагия', 'Дисфагия'],
                                ['Повторный набор веса', 'Повторный набор веса'],
                                ['Неудовлетворенность пациента', 'Неудовлетворенность пациента'],
                            ],
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'changing-filling-volume',
                            type: 'text',
                            placeholder: 'Изменение объема заполнения',
                            required: false,
                            value: '+ 2л',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'date-adjusting-bandage',
                            type: 'text',
                            placeholder: 'Планируемая дата регулировки',
                            required: false,
                            mod: 'calendar',
                            addClass: ['only-number', 'input-custom--violet'],
                            value: '02.04.2023',
                        },
                    },
                ],
            },
            {
                title: 'Общие сведения',
                addClass: ['group--simple'],
                fields: [
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Чувство голода',
                            name: 'feeling-hungry',
                            options: [
                                ['Нет', 'Нет'],
                                ['Сниженое', 'Сниженое'],
                                ['Обычное', 'Обычное'],
                                ['Выраженное', 'Выраженное'],
                            ],
                            addClass: 'long',
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Приём витаминов и микроэлементов',
                            name: 'intake-of-vitamins',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Нет',
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Признаки питательной недостаточности',
                            name: 'signs-of-nutritional-deficiency',
                            options: [
                                ['Есть', 'Есть'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Есть',
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Комфортность питания',
                            name: 'сomfort-of-nutrition',
                            options: [
                                ['Нормальная', 'Нормальная'],
                                ['Дискомфорт при приеме пищи', 'Дискомфорт при приеме пищи'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Диарея',
                            name: 'diarrhea',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Наличие запора',
                            name: 'has-constipation',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'how-often-poop',
                            type: 'text',
                            placeholder: 'Частота стула',
                            required: false,
                            value: '1-2 раза в день',
                        },
                    },
                ],
            },
            {
                title: 'Течение сопутствующих заболеваний',
                addClass: ['group--simple'],
                fields: [
                    {
                        type: 'SELECT',
                        data: {
                            name: 'arterial-hypertension',
                            placeholder: 'Артериальная гипертензия',
                            options: [
                                ['Нет', 'Нет'],
                                ['Есть, терапию не получает', 'Есть, терапию не получает'],
                                ['Компенсирована терапией', 'Компенсирована терапией'],
                                ['Не компенсирована терапией', 'Не компенсирована терапией'],
                            ],
                            value: 'Есть, терапию не получает',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'compensation-SD',
                            placeholder: 'Срок наступления компенсации СД?',
                            options: [
                                ['Нет признаков', 'Нет признаков'],
                                ['Инсулинорезистентность, гипергликемия или нарушение толерантности к глюкозе', 'Инсулинорезистентность, гипергликемия или нарушение толерантности к глюкозе'],
                                ['Снижение доз пероральных препаратов', 'Снижение доз пероральных препаратов'],
                                ['Прежние дозы пероральных препаратов', 'Прежние дозы пероральных препаратов'],
                                ['Инсулинотерапия', 'Инсулинотерапия'],
                            ],
                            value: 'Снижение доз пероральных препаратов',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'GERD',
                            placeholder: 'ГЭРБ',
                            options: [
                                ['Нет признаков', 'Нет признаков'],
                                ['Периодически возникающие симптомы, купируются самостоятельно', 'Периодически возникающие симптомы, купируются самостоятельно'],
                                ['Периодические возникающие симптомы, купируются препаратами', 'Периодические возникающие симптомы, купируются препаратами'],
                                ['Ежедневный прием препаратов', 'Ежедневный прием препаратов'],
                            ],
                            value: 'Ежедневный прием препаратов',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Дислипидемия',
                            name: 'dyslipidemia',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Да',
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Атеросклероз',
                            name: 'atherosclerosis',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Апноэ',
                            name: 'apnea',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Нет',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'bronchial-asthma',
                            placeholder: 'Бронхиальная астма',
                            options: [
                                ['Нет', 'Нет'],
                                ['Ингалятор', 'Ингалятор'],
                                ['Небулайзер/пероральные стероиды', 'Небулайзер/пероральные стероиды'],
                            ],
                            value: 'Ингалятор',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'functional-status',
                            placeholder: 'Функциональный статус',
                            options: [
                                ['3 этажа без отдыха', '3 этажа без отдыха'],
                                ['1 этаж без отдыха', '1 этаж без отдыха'],
                                ['Половина лестничного пролета', 'Половина лестничного пролета'],
                                ['Не передвигается самостоятельно / Не выходит из дом', 'Не передвигается самостоятельно / Не выходит из дом'],
                            ],
                            value: '1 этаж без отдыха',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'back-and-limb-pain',
                            placeholder: 'Боль в спине и конечностях',
                            options: [
                                ['Нет симптомов', 'Нет симптомов'],
                                ['Периодически возникающие симптомы', 'Периодически возникающие симптомы'],
                                ['Регулярный прием препаратов', 'Регулярный прием препаратов'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hernia',
                            placeholder: 'Грыжа',
                            options: [
                                ['Нет', 'Нет'],
                                ['Вентральная', 'Вентральная'],
                                ['Паховая', 'Паховая'],
                                ['ГПОД', 'ГПОД'],
                            ],
                        },
                        value: 'Пупочная',
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'sagging-skin',
                            placeholder: 'Обвисание кожи',
                            options: [
                                ['Выраженное обвисание кожи на руках, бедрах', 'Выраженное обвисание кожи на руках, бедрах'],
                                ['Выраженное обвисание кожи на животе', 'Выраженное обвисание кожи на животе'],
                                ['Обвисания кожи нет, есть морщинистость', 'Обвисания кожи нет, есть морщинистость'],
                                ['Обвисания, морщинистость отсутствуют', 'Обвисания, морщинистость отсутствуют'],
                            ],
                        },
                        value: 'Обвисания кожи нет, есть морщинистость',
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'fat-apron',
                            placeholder: 'Жировой фартук',
                            options: [
                                ['Значительная кожно-жировая складка', 'Значительная кожно-жировая складка'],
                                ['Воспаление в складках', 'Воспаление в складках'],
                                ['Затрудняет ходьбу', 'Затрудняет ходьбу'],
                                ['Целлюлит/изъязвление', 'Целлюлит/изъязвление'],
                                ['Дерматолипэктомия в анамнезе', 'Дерматолипэктомия в анамнезе'],
                            ],
                        },
                        value: 'Целлюлит/изъязвление',
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Недержание мочи',
                            name: 'urinary-incontinence',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Нет',
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Депрессия',
                            name: 'depression',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Нет',
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желчнокаменная болезнь',
                            name: 'cholelithiasis',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Нет',
                            required: true,
                        },
                    },
                ],
            },
            {
                title: 'Дополнительная информация',
                addClass: ['group--simple'],
                fields: [
                    {
                        type: 'TEXTAREA',
                        data: {
                            name: 'observation-additional',
                            type: 'text',
                            placeholder: 'Примечания',
                            addClass: 'long',
                            value: 'Звонить после 9:00 до 18:00 Только в рабочие дни.',
                        },
                    },
                ],
            },
        ],
        patient: [
            {
                title: 'Персональные данные пациента',
                addClass: ['group--simple'],
                fields: [
                    {
                        type: 'INPUT',
                        data: {
                            name: 'surname',
                            type: 'text',
                            placeholder: 'Фамилия*',
                            required: true,

                            value: 'Павленко',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'name',
                            type: 'text',
                            placeholder: 'Имя*',
                            required: true,
                            value: 'Павел',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'middle-name',
                            type: 'text',
                            placeholder: 'Отчество*',
                            required: true,
                            value: 'Павлович',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'date-of-birth',
                            type: 'text',
                            placeholder: 'Дата рождения*',
                            required: true,
                            mod: 'calendar',
                            value: '09.01.1985',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Пол*',
                            name: 'gender',
                            options: [
                                ['Мужской', 'Мужской'],
                                ['Женский', 'Женский'],
                            ],
                            value: 'Мужской',
                            required: true,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'weight',
                            type: 'number',
                            placeholder: 'Вес кг*',
                            required: true,
                            value: 88.3,
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'height',
                            type: 'number',
                            placeholder: 'Рост (см)*',
                            required: true,
                            value: 178,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'patient-status',
                            placeholder: 'Статус',
                            options: [
                                ['Новый пациент', 'Новый пациент'],
                                ['Наблюдается', 'Наблюдается'],
                                ['Выбыл из наблюдения', 'Выбыл из наблюдения'],
                                ['Летальный исход', 'Летальный исход'],
                            ],
                            hasConnection: 'status',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'reason-for-disposal',
                            type: 'text',
                            placeholder: 'Причина выбытия*',
                            required: true,
                            value: 'Отказался от лечения. Ушел в лес жить в единении с природой',
                            addClass: 'long',
                            connected: 'status',
                        },
                    },
                ],
            },
            {
                title: 'Общая информация и контактные данные',
                addClass: ['group--simple'],
                fields: [
                    {
                        type: 'INPUT',
                        data: {
                            name: 'who-directed',
                            type: 'text',
                            placeholder: 'Кем направлен',
                            required: false,
                            value: 'Самостоятельно',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'phone',
                            type: 'text',
                            placeholder: 'Телефон',
                            required: false,
                            value: '8(999)123-45-67',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'email',
                            type: 'text',
                            placeholder: 'E-mail',
                            required: false,
                            value: 'Example@mail.ru',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'city',
                            type: 'text',
                            placeholder: 'Город',
                            required: false,
                            value: 'Москва',
                        },
                    },
                    {
                        type: 'INPUT',
                        data: {
                            name: 'address',
                            type: 'text',
                            placeholder: 'Адрес (с почтовым индексом)',
                            required: false,
                            value: 'Рождественский б-р, 10/7 стр. 1 (111538)',
                        },
                    },
                    {
                        type: 'CHECKBOX',
                        data: {
                            name: 'permission for videomaterial',
                            value: 'Получено разрешение на использование <br>фото- и видеоматериалов',
                            label: 'Получено разрешение на использование <br>фото- и видеоматериалов',
                        },
                    },
                    {
                        type: 'CHECKBOX',
                        data: {
                            name: 'permission for Email mailing',
                            value: 'Получено разрешение на email-рассылку',
                            label: 'Получено разрешение на email-рассылку',
                        },
                    },
                    {
                        type: 'CHECKBOX',
                        data: {
                            name: 'permission for SMS mailing',
                            value: 'Получено разрешение на sms-рассылку',
                            label: 'Получено разрешение на sms-рассылку',
                        },
                    },
                ],
            },
            {
                title: 'Сопутствующие заболевания',
                addClass: ['group--simple'],
                fields: [
                    {
                        type: 'SELECT',
                        data: {
                            name: 'arterial-hypertension',
                            placeholder: 'Артериальная гипертензия',
                            options: [
                                ['Нет', 'Нет'],
                                ['Есть терапию не получает', 'Есть терапию не получает'],
                                ['Компенсирована терапией', 'Компенсирована терапией'],
                                ['Не компенсирована терапией', 'Не компенсирована терапией'],
                            ],
                            required: false,
                            value: 'Есть терапию не получает',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'diabetes-mellitus-2',
                            placeholder: 'Сахарный диабет 2-го типа',
                            options: [
                                ['Нет признаков', 'Нет признаков'],
                                ['Инсулинорезистентность, гипергликемия или нарушение толерантности к глюкозе', 'Инсулинорезистентность, гипергликемия или нарушение толерантности к глюкозе'],
                                ['Прием пероральных гипогликемических препаратов', 'Прием пероральных гипогликемических препаратов'],
                                ['Инсулинотерапия', 'Инсулинотерапия'],
                            ],
                            required: false,
                            value: 'Нет признаков',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'diabetes-mellitus-2-duraation',
                            placeholder: 'Сахарный диабет 2-го типа',
                            options: [
                                ['Впервые выявлен', 'Впервые выявлен'],
                                ['Менее 1 года', 'Менее 1 года'],
                                ['1 год', '1 год'],
                                ['2 года', '2 года'],
                                ['3 года', '3 года'],
                                ['4 года', '4 года'],
                                ['5 лет', '5 лет'],
                                ['6 лет', '6 лет'],
                                ['7 лет', '7 лет'],
                                ['8 лет', '8 лет'],
                                ['9 лет', '9 лет'],
                                ['10 лет', '10 лет'],
                                ['Более 10 лет', 'Более 10 лет'],
                            ],
                            required: false,
                            value: 'Впервые выявлен',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'GERD',
                            placeholder: 'ГЭРБ',
                            options: [
                                ['Нет признаков', 'Нет признаков'],
                                ['Периодически возникающие симптомы, купируются самостоятельно', 'Периодически возникающие симптомы, купируются самостоятельно'],
                                ['Периодические возникающие симптомы, купируются препаратами', 'Периодические возникающие симптомы, купируются препаратами'],
                                ['Ежедневный прием препаратов', 'Ежедневный прием препаратов'],
                            ],
                            value: 'Ежедневный прием препаратов',
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Дислипидемия',
                            name: 'dyslipidemia',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Да',
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Атеросклероз',
                            name: 'atherosclerosis',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Апноэ',
                            name: 'apnea',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Нет',
                            required: true,
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'bronchial-asthma',
                            placeholder: 'Бронхиальная астма',
                            options: [
                                ['Нет', 'Нет'],
                                ['Ингалятор', 'Ингалятор'],
                                ['Небулайзер/пероральные стероиды', 'Небулайзер/пероральные стероиды'],
                            ],
                            value: 'Ингалятор',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'functional-status',
                            placeholder: 'Функциональный статус',
                            options: [
                                ['3 этажа без отдыха', '3 этажа без отдыха'],
                                ['1 этаж без отдыха', '1 этаж без отдыха'],
                                ['Половина лестничного пролета', 'Половина лестничного пролета'],
                                ['Не передвигается самостоятельно / Не выходит из дом', 'Не передвигается самостоятельно / Не выходит из дом'],
                            ],
                            value: '1 этаж без отдыха',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'back-and-limb-pain',
                            placeholder: 'Боль в спине и конечностях',
                            options: [
                                ['Нет симптомов', 'Нет симптомов'],
                                ['Периодически возникающие симптомы', 'Периодически возникающие симптомы'],
                                ['Регулярный прием препаратов', 'Регулярный прием препаратов'],
                            ],
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'liver-diseases',
                            placeholder: 'Боль в спине и конечностях',
                            options: [
                                ['Нет данных', 'Нет данных'],
                                ['Признаки стеатогепатоза', 'Признаки стеатогепатоза'],
                                ['Неалкогольная жировая болезнь печени', 'Неалкогольная жировая болезнь печени'],
                                ['Цирроз печени', 'Цирроз печени'],
                            ],
                            value: 'Признаки стеатогепатоза',
                        },
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'hernia',
                            placeholder: 'Грыжа',
                            options: [
                                ['Нет', 'Нет'],
                                ['Вентральная', 'Вентральная'],
                                ['Паховая', 'Паховая'],
                                ['Under', 'Under'],
                            ],
                        },
                        value: 'Пупочная',
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'fat-apron',
                            placeholder: 'Жировой фартук',
                            options: [
                                ['Значительная кожно-жировая складка', 'Значительная кожно-жировая складка'],
                                ['Воспаление в складках', 'Воспаление в складках'],
                                ['Затрудняет ходьбу', 'Затрудняет ходьбу'],
                                ['Целлюлит/изъязвление', 'Целлюлит/изъязвление'],
                                ['Дерматолипэктомия в анамнезе', 'Дерматолипэктомия в анамнезе'],
                            ],
                        },
                        value: 'Целлюлит/изъязвление',
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Недержание мочи',
                            name: 'urinary-incontinence',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Нет',
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Депрессия',
                            name: 'depression',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Нет',
                            required: true,
                        },
                    },
                    {
                        type: 'RADIO-GROUP',
                        data: {
                            title: 'Желчнокаменная болезнь',
                            name: 'cholelithiasis',
                            options: [
                                ['Да', 'Да'],
                                ['Нет', 'Нет'],
                            ],
                            value: 'Нет',
                            required: true,
                        },
                    },
                ],
            },
            {
                title: 'Сопутствующие заболевания',
                addClass: ['group--simple'],
                fields: [
                    {
                        type: 'SELECT',
                        data: {
                            name: 'ASA Scale',
                            placeholder: 'Жировой фартук',
                            options: [
                                ['ASA I', 'ASA I (здоровый пациент)'],
                                ['ASA II', 'ASA II (системное заболевание умеренной тяжести)'],
                                ['ASA III', 'ASA III (тяжелое, но компенсированное либо субкомпенсированное заболевание)'],
                                ['ASA IV', 'ASA IV (тяжелое заболевание, представляющее постоянную угрозу жизни)'],
                            ],
                        },
                        value: 'ASA III',
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'smoking',
                            placeholder: 'Курение',
                            options: [
                                ['Никогда не курил / бросил', 'Никогда не курил / бросил'],
                                ['Курит иногда / Редко', 'Курит иногда / Редко'],
                                ['До 20 сигарет в день', 'До 20 сигарет в день'],
                                ['Более 20 сигарет в день', 'Более 20 сигарет в день'],
                            ],
                        },
                        value: 'Курит иногда / Редко',
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'PE risk Factors',
                            placeholder: 'Факторы риска ТЭЛА',
                            options: [
                                ['Нет', 'Нет'],
                                ['Тромбоз глубоких вен или ТЭЛА', 'Тромбоз глубоких вен или ТЭЛА'],
                                ['Венозный отек с изъязвлением', 'Венозный отек с изъязвлением'],
                                ['Кава-фильтр', 'Кава-фильтр'],
                                ['Гиповентиляция', 'Гиповентиляция'],
                            ],
                        },
                        value: 'Тромбоз глубоких вен или ТЭЛА',
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'Regular-intake-of-medications',
                            placeholder: 'Регулярный прием препаратов',
                            options: [
                                ['От давления', 'От давления'],
                                ['От сахараного диабета 2-го типа', 'От сахараного диабета 2-го типа'],
                                ['НПВС/Обезболивающие', 'НПВС/Обезболивающие'],
                                ['ВИЧ-терапия', 'ВИЧ-терапия'],
                                ['От психо-неврологических заболеваний', 'От психо-неврологических заболеваний'],
                                ['Противозачаточные', 'Противозачаточные'],
                                ["Другое(Дополните 'Примечание')", "Другое(Дополните 'Примечание')"],
                            ],
                        },
                        value: "Другое(Дополните 'Примечание')",
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'Weight loss attempts',
                            placeholder: 'Попытки снижения веса',
                            options: [
                                ['Не было', 'Не было'],
                                ['Диета', 'Диета'],
                                ['Психологические методы', 'Психологические методы'],
                                ['Лечение в клинике питания', 'Лечение в клинике питания'],
                                ['Ксеникал (Орлистат)', 'Ксеникал (Орлистат)'],
                                ['Сибутрамин (Меридиа)', 'Сибутрамин (Меридиа)'],
                                ['Агонисты (ингибиторы) ГПП-1 и ГИП', 'Агонисты (ингибиторы) ГПП-1 и ГИП'],
                                ['Другие препараты', 'Другие препараты'],
                            ],
                        },
                        value: 'Другие препараты',
                    },
                    {
                        type: 'SELECT',
                        data: {
                            name: 'previous-bariatric-surgery',
                            placeholder: 'Предыдущая бариотрическая операция',
                            options: [
                                ['Не было', 'Не было'],
                                ['Бандажирование', 'Бандажирование'],
                                ['Внутрижелудочный баллон', 'Внутрижелудочный баллон'],
                                ['Гастропликация', 'Гастропликация'],
                                ['Sleeve (Продольная резекция)', 'Sleeve (Продольная резекция)'],
                                ['MGB-OAGB (Минигастрошунтирование)', 'MGB-OAGB (Минигастрошунтирование)'],
                                ['RYGB (Гастрошунтирование)', 'RYGB (Гастрошунтирование)'],
                                ['BPD (Билиопанкреатическое шунтирование)', 'BPD (Билиопанкреатическое шунтирование)'],
                                ['SADI (Дуоденоилешунтирование)', 'SADI (Дуоденоилешунтирование)'],
                                ['SLIM OAGB (Гастрошунтирование на короткой петле)', 'SLIM OAGB (Гастрошунтирование на короткой петле)'],
                                ['Другая операция', 'Другая операция'],
                            ],
                        },
                        value: 'Другие препараты',
                    },
                ],
            },
            {
                title: 'Дополнительная информация',
                addClass: ['group--simple', 'patient-additional-info'],
                fields: [
                    {
                        type: 'TEXTAREA',
                        data: {
                            name: 'new-patient-files',
                            type: 'text',
                            placeholder: 'Примечания',
                            addClass: 'long',
                            value: 'Звонить после 9:00 до 18:00 Только в рабочие дни.',
                        },
                    },
                ],
            },
        ],
    };

    const sideModal = document.querySelector('.side-modal');
    const trashBtn = sideModal.querySelector('.side-modal__remove');
    const main = sideModal.querySelector('.side-modal__main');
    const obsLoader = new FileLoader({ name: 'observation-fileloader', type: 'loader' });
    const patientLoader = new FileLoader({ name: 'patient-files', type: 'loader' });
    patientLoader.createDropZone({ name: 'patient-file-zone' });
    patientLoader.dropZone.classList.add('long');
    let paperclipBtn = document.querySelector('.side-modal__add-file');

    const obsLoaderTrigger = obsLoader.triggerLoader.bind(obsLoader);
    const patientLoaderTrigger = patientLoader.triggerLoader.bind(patientLoader);

    function rerenderPaperclip(modaName) {
        const paperClone = paperclipBtn.cloneNode(true);
        switch (modaName) {
            case 'observation':
                paperClone.addEventListener('click', obsLoaderTrigger);
                break;
            case 'patient':
                paperClone.addEventListener('click', patientLoaderTrigger);
                break;
        }
        sideModal.querySelector('.side-modal__header-buttons').replaceChild(paperClone, paperclipBtn);
        paperclipBtn = paperClone;
    }

    document.addEventListener('click', (event) => {
        const element = event.target.closest('[data-modal-name]');
        if (!element) return;
        let modalName = element.dataset.modalName;
        setGeneralInfo(modalName, event.target);

        if (sideModalData[modalName]) {
            fillSideModal(modalName);
        } else if (fields[modalName]) {
            enableEditMode(modalName);
        }
    });

    function setGeneralInfo(modalName, element) {
        if (!modalName) return;
        const title = sideModal.querySelector('.side-modal__title');
        const operationName = sideModal.querySelector('.side-modal__add-txt span');
        rerenderPaperclip(modalName);
        switch (modalName) {
            case 'operation':
                title.innerText = 'RYGB (Гастрошунтирование)';
                trashBtn.setAttribute('data-modal-name', 'remove-operation');
                sideModal.dataset.sideModalName = modalName;
                const pill = element.closest('.pill');
                trashBtn.setAttribute('data-operation-id', pill.dataset.operationId);
                break;
            case 'observation':
                trashBtn.setAttribute('data-modal-name', 'remove-observation');
                operationName.innerText = 'RYGB (Гастрошунтирование)';
                sideModal.dataset.sideModalName = modalName;
                main.append(obsLoader.fileLoader);
                // paperclipBtn.addEventListener('click', obsLoaderTrigger);
                const pillObservation = element.closest('.pill__observation');
                trashBtn.setAttribute('data-observation-id', pillObservation.dataset.observationId);
                title.innerText = `Наблюдение: ${pillObservation.innerText} после операции`;
                break;
            case 'patient':
                title.innerText = 'Редактирование карты пациента';
                sideModal.dataset.sideModalName = modalName;
                // patientLoader = new FileLoader({ type: 'loader', name: 'patient-files' });
                // main.append(patientLoader.fileLoader);

                break;
            // default:
            //     title.innerText = 'Просмотр данных';
        }
    }

    const editBtn = sideModal.querySelector('.side-modal__edit');
    const cancelBtn = sideModal.querySelector('.cancel-button');
    editBtn.addEventListener('click', () => enableEditMode(sideModal.dataset.sideModalName));
    cancelBtn.addEventListener('click', () => disabledEditMode(sideModal.dataset.sideModalName));

    function createDataBlock(data) {
        const element = document.createElement('div');
        element.classList.add('data-block');
        element.classList.add('data-block--invert');
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

        const addBtn = document.createElement('a');
        addBtn.setAttribute('href', 'creating-observation.html');
        addBtn.classList.add('observations__add');
        addBtn.setAttribute('type', 'button');
        addBtn.innerHTML = `<svg><use href='img/sprite.svg#plus-icon'></use></svg>`;
        wrapper.append(addBtn);

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
        main.innerHTML = '';
        sideModal.classList.add('view-mode');

        if (sideModalData[modalName].observations) {
            renderObservations(sideModalData[modalName].observations);
        }

        sideModalData[modalName].groups.forEach((item) => {
            let dataBlocks;
            let group;

            if (item.dataBlocks) {
                dataBlocks = item.dataBlocks.map((block) => createDataBlock(block));
                group = createGroup({ title: item.name, addClass: item.addClass, dataBlocks: dataBlocks });
            } else {
                group = createGroup({ title: item.name, addClass: item.addClass, subtitle: item.subtitle });
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

    function enableEditMode(modalName) {
        main.innerHTML = '';
        sideModal.classList.remove('view-mode');
        sideModal.classList.add('is-editable');
        renderFields(modalName);
        if (modalName === 'patient') {
            main.prepend(patientLoader.fileLoader);
            main.querySelector('.group__form .textarea').after(patientLoader.dropZone);
        }

        if (modalName === 'observation') {
            main.prepend(obsLoader.fileLoader);
        }
    }

    function disabledEditMode(modalName) {
        if (modalName === 'patient') return;
        main.innerHTML = '';
        sideModal.classList.add('view-mode');
        sideModal.classList.remove('is-editable');
        fillSideModal(modalName);
        if (modalName === 'obsrevation') {
            main.append(obsLoader.fileLoader);
            paperclipBtn.addEventListener('click', obsLoader.triggerLoader);
        }
    }

    function renderFields(modalName) {
        createComplication.count = 0;
        fields[modalName].forEach((el) => {
            if (el.complication) {
                const complicationInstance = createComplication(el.data);
                const complicationBlock = complicationInstance.el;
                main.append(complicationBlock);
                let connectedEls = complicationBlock.querySelectorAll('[data-connected]');
                connectedEls.forEach((el) => {
                    checkConnectionValue(el, CONNECTED_RULES);
                });

                if (el.interventions && el.interventions.length) {
                    el.interventions.forEach((repeatedInt) => {
                        complicationInstance.addIntervention(repeatedInt);
                    });
                }
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
        initGroupObserve();

        if (modalName === 'operation') {
            assignInputRules(OPERATIONS_RULES);
        }
        if (modalName === 'patient') {
            assignInputRules(PATIENT_RULES);
        }
    }

    // function createComplicationFn() {
    //     let count = 0;
    //     return function (data) {
    //         const complication = new Complication({ number: ++count, addClass: ['group--parent', 'group--simple'], interventionClass: 'group--simple', fieldsValue: data });
    //         // Добавляем правила к общим правилам.
    //         complication.connectionRules.forEach((item) => {
    //             CONNECTED_RULES[item.name] = item.rules;
    //         });
    //         assignInputRules(complication.fieldsRules);
    //         initGroupObserve(initObservers);
    //         initObservers = [];

    //         return complication;
    //     };
    // }

    function makeCreateComplication() {
        function createComplication(data) {
            const complication = new Complication({ number: ++createComplication.count, addClass: ['group--parent', 'group--simple'], interventionClass: 'group--simple', fieldsValue: data });
            // Добавляем правила к общим правилам.
            complication.connectionRules.forEach((item) => {
                CONNECTED_RULES[item.name] = item.rules;
            });
            assignInputRules(complication.fieldsRules);
            initGroupObserve(initObservers);
            initObservers = [];

            return complication;
        }
        createComplication.count = 0;
        return createComplication;
    }

    const createComplication = makeCreateComplication();
});
