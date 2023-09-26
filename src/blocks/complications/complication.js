import { createGroup } from '../form-creating-operation/form-creating-operation';
import { createAditionalGroup } from '../form-creating-operation/form-creating-operation';
import { initGroupObserve } from '../../js/validate';
// const COMPLCIATIONS_RULES = {

// }

export class Complication {
    title = 'Раннее осложнение №';

    constructor(data) {
        this.number = data.number;
        this.fields = [
            {
                type: 'INPUT',
                data: {
                    name: `date-of-detection-complication${data.number}`,
                    type: 'text',
                    placeholder: 'Дата выявления осложнения*',
                    required: true,
                    addClass: 'only-number',
                    mod: 'calendar',
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `main-complication${data.number}`,
                    placeholder: 'Основное осложнение*',
                    options: [
                        ['Кровотечение', 'Кровотечение'],
                        ['Несостоятельность', 'Несостоятельность'],
                        ['Непроходимость, стеноз, стриктура', 'Непроходимость, стеноз, стриктура'],
                        ['Перфорация и ранение органов', 'Перфорация и ранение органов'],
                        ['Жидкостные скопления', 'Жидкостные скопления'],
                        ['Декомпенсация сопутствующих заболеваний', 'Декомпенсация сопутствующих заболеваний'],
                        ['Сердечно-сосудистые осложнения', 'Сердечно-сосудистые осложнения'],
                        ['Осложнения БЖ', 'Осложнения ВЖБ'],
                        ['Другое', 'Другое'],
                    ],
                    hasConnection: `complication${this.number}`,
                    required: false,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `scale-complication${data.number}`,
                    placeholder: 'Масштаб',
                    options: [
                        ['Внутрипросветное', 'Внутрипросветное'],
                        ['Внутрибрюшноее', 'Внутрибрюшноее'],
                        ['Не определено', 'Не определено'],
                    ],
                    required: false,
                    connected: `complication${this.number}`,
                    connectedID: `bleeding${data.number}`,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `localization-complication${data.number}`,
                    placeholder: 'Локализация',
                    options: [
                        ['Из степлерной линии', 'Из степлерной линии'],
                        ['Из гастроэнтероанастомоза', 'Из гастроэнтероанастомоза'],
                        ['Из еюноеюноанастомоза', 'Из еюноеюноанастомоза'],
                        ['Из троакарной раны', 'Из троакарной раны'],
                        ['Не определено', 'Не определено'],
                        ['Другое', 'Другое'],
                    ],
                    required: false,
                    connected: `complication${this.number}`,
                    connectedID: `bleeding${data.number}`,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `type-of-complication${data.number}`,
                    placeholder: 'Тип осложнения*',
                    options: [['У каждого свой вариант', 'У каждого свой вариант']],
                    required: false,
                    connected: `complication${this.number}`,
                    connectedID: `other${data.number}`,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `complications-by-Clavien-Dindo${data.number}`,
                    placeholder: 'Тяжесть осложнения по Clavien-Dindo*',
                    options: [
                        ['I степень - разрешилось без терапии', 'I степень - разрешилось без терапии'],
                        ['II степень - медикаментозная терапия', 'II степень - медикаментозная терапия'],
                        ['IIIa степень - повторное вмешательство без общего обезболивания', 'IIIa степень - повторное вмешательство без общего обезболивания'],
                        ['IIIb степень - повторное вмешательство с общим обезболиванием', 'IIIb степень - повторное вмешательство с общим обезболиванием'],
                        ['IVa степень - интенсивная терапия (полиорганная недостаточность)', 'IVa степень - интенсивная терапия (полиорганная недостаточность)'],
                        ['V степень - летальный исход', 'V степень - летальный исход'],
                    ],
                    hasConnection: `degree-complication${data.number}`,
                    required: true,
                },
            },
            {
                type: 'BUTTON',
                data: {
                    text: 'Добавить повторное вмешательство',
                    icon: 'plus-icon',
                    mod: 'btn--text',
                    connected: `degree-complication${data.number}`,
                    addClass: 'add-intervention',
                },
            },
        ];
        this.connectionRules = [
            {
                name: `complication${this.number}`,
                rules: [
                    {
                        value: 'Кровотечение',
                        connectedID: `bleeding${data.number}`,
                    },
                    {
                        value: 'Несостоятельность',
                        connectedID: `other${data.number}`,
                        changeSelect: {
                            id: `type-of-complication${data.number}`,
                            options: [
                                ['Степлерной линии', 'Степлерной линии'],
                                ['Гастроэнтероанастомоза', 'Гастроэнтероанастомоза'],
                                ['Непроходимость кишечная', 'Непроходимость кишечная'],
                                ['Еюноеюноанастомоза', 'Еюноеюноанастомоза'],
                                ['Раны', 'Раны'],
                            ],
                        },
                    },
                    {
                        value: 'Непроходимость, стеноз, стриктура',
                        connectedID: `other${data.number}`,
                        changeSelect: {
                            id: `type-of-complication${data.number}`,
                            options: [
                                ['Непроходимость кишечная', 'Непроходимость кишечная'],
                                ['Непроходимость желудка', 'Непроходимость желудка'],
                                ['Cтеноз желудочной трубки', 'Cтеноз желудочной трубки'],
                                ['Cтеноз гастроэнтероанастомоза', 'Cтеноз гастроэнтероанастомоза'],
                                ['Cтеноз еюноеюноанастомоза', 'Cтеноз еюноеюноанастомоза'],
                            ],
                        },
                    },
                    {
                        value: 'Перфорация и ранение органов',
                        connectedID: `other${data.number}`,
                        changeSelect: {
                            id: `type-of-complication${data.number}`,
                            options: [
                                ['Тонкой кишки', 'Тонкой кишки'],
                                ['12-перстной кишки', '12-перстной кишки'],
                                ['Ободочной кишки', 'Ободочной кишки'],
                                ['Желудка', 'Желудка'],
                                ['Пищевода', 'Пищевода'],
                                ['Диафрагмы', 'Диафрагмы'],
                                ['Печени', 'Печени'],
                                ['Селезенки', 'Селезенки'],
                                ['Поджелудочной железы', 'Поджелудочной железы'],
                                ['Другое', 'Другое'],
                            ],
                        },
                    },
                    {
                        value: 'Жидкостные скопления',
                        connectedID: `other${data.number}`,
                        changeSelect: {
                            id: `type-of-complication${data.number}`,
                            options: [
                                ['Серома', 'Серома'],
                                ['Гемотома', 'Гемотома'],
                            ],
                        },
                    },
                    {
                        value: 'Декомпенсация сопутствующих заболеваний',
                        connectedID: `other${data.number}`,
                        changeSelect: {
                            id: `type-of-complication${data.number}`,
                            options: [
                                ['Острый холецистит', 'Острый холецистит'],
                                ['Острый панкреатит', 'Острый панкреатит'],
                                ['Ущемление грыжи', 'Ущемление грыжи'],
                                ['Другое', 'Другое'],
                            ],
                        },
                    },
                    {
                        value: 'Сердечно-сосудистые осложнения',
                        connectedID: `other${data.number}`,
                        changeSelect: {
                            id: `type-of-complication${data.number}`,
                            options: [
                                ['Инсульт', 'Инсульт'],
                                ['Аритмия', 'Аритмия'],
                                ['Остановка сердца', 'Остановка сердца'],
                                ['ТЭЛА', 'ТЭЛА'],
                                ['Тромбоз глубоких вен', 'Тромбоз глубоких вен'],
                                ['Инфаркт миокарда', 'Инфаркт миокарда'],
                            ],
                        },
                    },
                    {
                        value: 'Осложнения БЖ',
                        connectedID: `other${data.number}`,
                        changeSelect: {
                            id: `type-of-complication${data.number}`,
                            options: [
                                ['Cмещение бандажа', 'Cмещение бандажа'],
                                ['Инфицирование системы/порта', 'Инфицирование системы/порта'],
                                ['Поломка, протечка системы', 'Поломка, протечка системы'],
                                ['Миграция порта', 'Миграция порта'],
                                ['Тромбоз глубоких вен', 'Тромбоз глубоких вен'],
                                ['Дисфагия', 'Дисфагия'],
                            ],
                        },
                    },
                    {
                        value: 'Инфекция',
                        connectedID: `other${data.number}`,
                        changeSelect: {
                            id: `type-of-complication${data.number}`,
                            options: [
                                ['Локальная инфекция (перитонит, абсцесс, нагноение раны и др.)', 'Локальная инфекция (перитонит, абсцесс, нагноение раны и др.)'],
                                ['Иная инфекция  (пневмония, флебит, инфекция мочевыводящих путей и др.)', 'Иная инфекция  (пневмония, флебит, инфекция мочевыводящих путей и др.)'],
                                ['Сепсис/SIRS', 'Сепсис/SIRS'],
                            ],
                        },
                    },
                    {
                        value: 'Осложнение ВЖБ',
                        connectedID: `other${data.number}`,
                        changeSelect: {
                            id: `type-of-complication${data.number}`,
                            options: [
                                ['Разгерметизация', 'Разгерметизация'],
                                ['Непереносимость', 'Непереносимость'],
                                ['Пролежень стенки желудка', 'Пролежень стенки желудка'],
                                ['Эрозия, язва желудка', 'Эрозия, язва желудка'],
                                ['Другое', 'Другое'],
                            ],
                        },
                    },
                    {
                        value: 'Другое',
                        connectedID: `other${data.number}`,
                    },
                ],
            },
            {
                name: `degree-complication${data.number}`,
                rules: [
                    {
                        value: 2,
                    },
                    {
                        value: 3,
                    },
                    {
                        value: 4,
                    },
                    {
                        value: 5,
                    },
                ],
            },
        ];
        this.el = createGroup({ number: this.number, title: this.title, fields: this.fields, addClass: data.addClass });
        this.complicationName = this.el.querySelector('.group__add-info');
        this._buttonIntervention = this.el.querySelector('.add-intervention');
        this._allInterventions = [];
        this._buttonIntervention.addEventListener('click', this._addIntervention().bind(this));
        this.fieldsRules = {
            [`date-of-detection-complication${data.number}`]: {
                required: {
                    message: 'Обязательное поле',
                },
                range: {
                    min: 10,
                    max: 10,
                    message: 'Формат: 16.09.2023',
                },
            },
            [`complications-by-Clavien-Dindo${data.number}`]: {
                required: {
                    message: 'Обязательное поле',
                },
            },
        };
        // Установка имени выбранного осложнения
        const mainComplication = this.el.querySelector(`.itc-select__toggle[name='main-complication${data.number}']`);
        const complicationObserver = new MutationObserver((mutations) => {
            const selectedTxt = mutations[0].target.querySelector('.itc-select__text-selected').innerText;
            this._setComplicationName(selectedTxt);
        });
        complicationObserver.observe(mainComplication, { attributeFilter: ['data-index', 'value'] });
        console.log(this.fieldsRules);
    }

    _setComplicationName(txt) {
        this.complicationName.innerText = txt;
    }

    _addIntervention() {
        let interventionNumber = 1;

        return function () {
            let intervention = new RepeatedIntervention({ number: interventionNumber, id: `complication-${this.number}_intervention-${interventionNumber}` });

            interventionNumber++;

            this._allInterventions.push(intervention);
            this.el.querySelector('.group__inner').append(intervention.el);
            // console.log(interventionNumber++);
            initGroupObserve();

            function deleteIntervention() {
                intervention.el.remove();
                // console.log(this._allInterventions);
                let deleteIndex = this._allInterventions.findIndex((el) => el === intervention);
                this._allInterventions.splice(deleteIndex, 1);
                console.log(this._allInterventions);

                interventionNumber = this._allInterventions.length + 1;

                this._allInterventions.forEach((element, index) => {
                    element.changeFieldsData(index + 1);
                });
            }
            // удаление вмешательства
            intervention.el.querySelector('.group__delete').addEventListener('click', deleteIntervention.bind(this));
        };
    }
}

export class RepeatedIntervention {
    title = 'Повторное вмешательство №';

    constructor(data) {
        this.number = data.number;
        this._id = data.id;
        this.fields = [
            {
                type: 'INPUT',
                data: {
                    name: `date-repeated-operation_${this._id}`,
                    type: 'text',
                    placeholder: 'Дата повторной операции*',
                    required: true,
                    addClass: 'only-number',
                    mod: 'calendar',
                },
            },
            {
                type: 'INPUT',
                data: {
                    name: `hours-from-main-operation_${this._id}`,
                    type: 'text',
                    placeholder: 'Часов прошло от основной операции*',
                    required: true,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `method-repeated-operation_${this._id}`,
                    placeholder: 'Метод повторной операции*',
                    options: [
                        ['Лапаротомия', 'Лапаротомия'],
                        ['Конверсионная лапаротомия - Лапароскопия', 'Конверсионная лапаротомия - Лапароскопия'],
                        ['Эндоскопическая коррекция', 'Эндоскопическая коррекция'],
                    ],
                    required: true,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `type-repeated-operation_${this._id}`,
                    placeholder: 'Тип повторной операции*',
                    options: [
                        ['Ревизионная лапароскопия', 'Ревизионная лапароскопия'],
                        ['Остановка кровотечения', 'Остановка кровотечения'],
                        ['Ушивание дефекта', 'Ушивание дефекта'],
                        ['Санация, дренирование', 'Санация, дренирование'],
                        ['Вскрытие флегмоны, абсцесса', 'Вскрытие флегмоны, абсцесса'],
                        ['Гастростомия', 'Гастростомия'],
                        ['Еюностомия', 'Еюностомия'],
                        ['Холецистэктомия', 'Холецистэктомия'],
                        ['Устранение грыжи, ущемления', 'Устранение грыжи, ущемления'],
                        ['Устранение непроходимости', 'Устранение непроходимости'],
                        ['Переналожение анастомоза', 'Переналожение анастомоза'],
                        ['Переустановка бандажа', 'Переустановка бандажа'],
                        ['Коррекция порта', 'Коррекция порта'],
                        ['Удаление порта бандажа', 'Удаление порта бандажа'],
                        ['Удаление бандажа/баллона', 'Удаление бандажа/баллона'],
                        ['Установка кава-фильтра', 'Установка кава-фильтра'],
                        ['Другое', 'Другое'],
                    ],
                    multiple: true,
                    required: true,
                },
            },
            {
                type: 'TEXTAREA',
                data: {
                    name: `note-intervention_${this._id}`,
                    type: 'text',
                    placeholder: 'Примечание',
                    required: false,
                    addClass: 'textarea--small',
                },
            },
        ];
        this.el = createAditionalGroup({
            name: this.title + this.number,
            content: this.fields,
            deleteButton: true,
            active: true,
        });
    }

    changeFieldsData(newNumber) {
        // title
        this.el.querySelector('.group__title span').innerHTML = this.title + newNumber;
        // fields
        const fields = [...this.el.querySelectorAll('.input-custom__input, .itc-select, .textarea')];
        fields.forEach((element) => {
            if (element.classList.contains('input-custom__input')) {
                let oldValue = element.querySelector('input').getAttribute('name');
                let newValue = oldValue.replace(/intervention-\d*/, `intervention-${newNumber}`);

                const input = element.querySelector('input');
                const label = element.querySelector('label');
                input.setAttribute('name', newValue);
                input.setAttribute('id', newValue);
                label.setAttribute('for', newValue);
            } else if (element.classList.contains('itc-select')) {
                let oldValue = element.getAttribute('id');
                let newValue = oldValue.replace(/intervention-\d*/, `intervention-${newNumber}`);
                const selectBtn = element.querySelector('button');
                selectBtn.setAttribute('name', newValue);
                element.setAttribute('id', newValue);
                element.querySelector('input').setAttribute('name', newValue);
            } else if (element.classList.contains('textarea')) {
                const textarea = element.querySelector('textarea');
                let oldValue = textarea?.getAttribute('id');
                let newValue = oldValue.replace(/intervention-\d*/, `intervention-${newNumber}`);

                textarea.setAttribute('name', newValue);
                textarea.setAttribute('id', newValue);
                element.querySelector('label').setAttribute('for', newValue);
                // ${oldValue}${newNumber}
            }
        });
    }

    // снова ставить наблюдение за элементом?
}
