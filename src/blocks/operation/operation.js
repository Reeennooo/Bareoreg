import { createAditionalGroup, createGroup } from '../form-creating-operation/form-creating-operation';

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
                    addClass: ['group--simple'],
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

const sideModal = document.querySelector('.side-modal');

function fillSideModal(modalName) {
    const main = document.querySelector('.side-modal__main');

    main.innerHTML = '';

    if (sideModalData.observations) {
        renderObservations(sideModalData.observations);
    }

    sideModalData[modalName].forEach((item) => {
        let dataBlocks;

        if (item.dataBlocks) {
            dataBlocks = item.dataBlocks.map((block) => createDataBlock(block));
        }

        const group = createGroup({ title: item.name, addClass: item.addClass, dataBlocks: dataBlocks });

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

document.addEventListener('click', (event) => {
    const element = event.target.closest('[data-modal-name]');
    if (!element) return;
    if (sideModalData[element.dataset.modalName]) {
        fillSideModal(element.dataset.modalName);
        sideModal.classList.add('view-mode');
    }
});
