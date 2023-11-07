import { createGroup } from '../form-creating-operation/form-creating-operation';
import { createAditionalGroup } from '../form-creating-operation/form-creating-operation';
import { initGroupObserve } from '../../js/validate';
// const COMPLCIATIONS_RULES = {

// }

export class Complication {
    title = 'Раннее осложнение №';
    static complictionCount = 0;

    constructor(data) {
        Complication.complictionCount++;
        this.number = Complication.complictionCount;
        this.fields = [
            {
                type: 'INPUT',
                data: {
                    name: `date-of-detection-complication${this.number}`,
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
                    name: `main-complication${this.number}`,
                    placeholder: 'Основное осложнение*',
                    options: [
                        ['Кровотечение', 'Кровотечение'],
                        ['Несостоятельность', 'Несостоятельность'],
                        ['Непроходимость, стеноз, стриктура', 'Непроходимость, стеноз, стриктура'],
                        ['Перфорация и ранение органов', 'Перфорация и ранение органов'],
                        ['Жидкостные скопления', 'Жидкостные скопления'],
                        ['Декомпенсация сопутствующих заболеваний', 'Декомпенсация сопутствующих заболеваний'],
                        ['Сердечно-сосудистые осложнения', 'Сердечно-сосудистые осложнения'],
                        ['Осложнение ВЖБ', 'Осложнение ВЖБ'],
                        ['Осложнение БЖ', 'Осложнение БЖ'],
                        ['Другое', 'Другое'],
                    ],
                    hasConnection: `complication${this.number}`,
                    required: false,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `scale-complication${this.number}`,
                    placeholder: 'Масштаб',
                    options: [
                        ['Внутрипросветное', 'Внутрипросветное'],
                        ['Внутрибрюшноее', 'Внутрибрюшноее'],
                        ['Не определено', 'Не определено'],
                    ],
                    required: false,
                    connected: `complication${this.number}`,
                    connectedID: `bleeding${this.number}`,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `localization-complication${this.number}`,
                    placeholder: 'Локализация',
                    options: [
                        ['Не определено', 'Не определено'],
                        ['Из степлерной линии', 'Из степлерной линии'],
                        ['Из гастроэнтероанастомоза', 'Из гастроэнтероанастомоза'],
                        ['Из еюноеюноанастомоза', 'Из еюноеюноанастомоза'],
                        ['Из троакарной раны', 'Из троакарной раны'],
                        ['Другое', 'Другое'],
                    ],
                    required: false,
                    connected: `complication${this.number}`,
                    connectedID: `bleeding${this.number}`,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `type-of-complication${this.number}`,
                    placeholder: 'Тип осложнения*',
                    options: [['У каждого свой вариант', 'У каждого свой вариант']],
                    required: false,
                    connected: `complication${this.number}`,
                    connectedID: `other${this.number}`,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `by-Clavien-Dindo-complication${this.number}`,
                    placeholder: 'Тяжесть осложнения по Clavien-Dindo*',
                    options: [
                        ['I степень - разрешилось без терапии', 'I степень - разрешилось без терапии'],
                        ['II степень - медикаментозная терапия', 'II степень - медикаментозная терапия'],
                        ['IIIa степень - повторное вмешательство без общего обезболивания', 'IIIa степень - повторное вмешательство без общего обезболивания'],
                        ['IIIb степень - повторное вмешательство с общим обезболиванием', 'IIIb степень - повторное вмешательство с общим обезболиванием'],
                        ['IVa степень - интенсивная терапия (полиорганная недостаточность)', 'IVa степень - интенсивная терапия (полиорганная недостаточность)'],
                        ['V степень - летальный исход', 'V степень - летальный исход'],
                    ],
                    hasConnection: `degree-complication${this.number}`,
                    required: true,
                },
            },
            {
                type: 'TEXTAREA',
                data: {
                    name: `note-complication${this.number}`,
                    type: 'text',
                    placeholder: 'Примечание',
                    required: false,
                    addClass: 'textarea--small',
                    connected: `degree-complication${this.number}`,
                    connectedID: 'note',
                },
            },
            {
                type: 'BUTTON',
                data: {
                    text: 'Добавить повторное вмешательство',
                    icon: 'plus-icon',
                    mod: 'btn--text',
                    connected: `degree-complication${this.number}`,
                    connectedID: 'intervention',
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
                        connectedID: `bleeding${this.number}`,
                    },
                    {
                        value: 'Несостоятельность',
                        connectedID: `other${this.number}`,
                        changeSelect: {
                            id: `type-of-complication${this.number}`,
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
                        connectedID: `other${this.number}`,
                        changeSelect: {
                            id: `type-of-complication${this.number}`,
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
                        connectedID: `other${this.number}`,
                        changeSelect: {
                            id: `type-of-complication${this.number}`,
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
                        connectedID: `other${this.number}`,
                        changeSelect: {
                            id: `type-of-complication${this.number}`,
                            options: [
                                ['Серома', 'Серома'],
                                ['Гемотома', 'Гемотома'],
                            ],
                        },
                    },
                    {
                        value: 'Декомпенсация сопутствующих заболеваний',
                        connectedID: `other${this.number}`,
                        changeSelect: {
                            id: `type-of-complication${this.number}`,
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
                        connectedID: `other${this.number}`,
                        changeSelect: {
                            id: `type-of-complication${this.number}`,
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
                        value: 'Осложнение БЖ',
                        connectedID: `other${this.number}`,
                        changeSelect: {
                            id: `type-of-complication${this.number}`,
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
                        connectedID: `other${this.number}`,
                        changeSelect: {
                            id: `type-of-complication${this.number}`,
                            options: [
                                ['Локальная инфекция (перитонит, абсцесс, нагноение раны и др.)', 'Локальная инфекция (перитонит, абсцесс, нагноение раны и др.)'],
                                ['Иная инфекция  (пневмония, флебит, инфекция мочевыводящих путей и др.)', 'Иная инфекция  (пневмония, флебит, инфекция мочевыводящих путей и др.)'],
                                ['Сепсис/SIRS', 'Сепсис/SIRS'],
                            ],
                        },
                    },
                    {
                        value: 'Осложнение ВЖБ',
                        connectedID: `other${this.number}`,
                        changeSelect: {
                            id: `type-of-complication${this.number}`,
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
                        connectedID: `other${this.number}`,
                    },
                ],
            },
            {
                name: `degree-complication${this.number}`,
                rules: [
                    {
                        value: 0,
                        connectedID: 'note',
                    },
                    {
                        value: 1,
                        connectedID: 'note',
                    },
                    {
                        value: 2,
                        connectedID: 'intervention',
                    },
                    {
                        value: 3,
                        connectedID: 'intervention',
                    },
                    {
                        value: 4,
                        connectedID: 'intervention',
                    },
                    {
                        value: 5,
                        connectedID: 'intervention',
                    },
                ],
            },
        ];
        this.fieldsValue = data.fieldsValue;
        if (this.fieldsValue) {
            this._setComplicationValue();
        }

        this.interventionClass = data.interventionClass;
        this.el = createGroup({ number: this.number, title: this.title, fields: this.fields, deleteButton: true, addClass: ['complication', ...data.addClass] });
        this.complicationName = this.el.querySelector('.group__add-info');
        this._buttonIntervention = this.el.querySelector('.add-intervention');
        this._allInterventions = [];
        this._deleteBtn = this.el.querySelector('.group__header .group__delete');
        this._deleteBtn.addEventListener('click', this._deleteComplication.bind(this));
        this._buttonIntervention.addEventListener('click', this.addIntervention.bind(this));
        this.fieldsRules = {
            [`date-of-detection-complication${this.number}`]: {
                required: {
                    message: 'Обязательное поле',
                },
                range: {
                    min: 10,
                    max: 10,
                    message: 'Формат: 16.09.2023',
                },
            },
            [`complications-by-Clavien-Dindo${this.number}`]: {
                required: {
                    message: 'Обязательное поле',
                },
            },
        };
        // Установка имени выбранного осложнения
        const mainComplication = this.el.querySelector(`.itc-select__toggle[name='main-complication${this.number}']`);
        const complicationObserver = new MutationObserver((mutations) => {
            const selectedTxt = mutations[0].target.querySelector('.itc-select__text-selected').innerText;
            this._setComplicationName(selectedTxt);
        });
        complicationObserver.observe(mainComplication, { attributeFilter: ['data-index', 'value'] });

        if (this.fieldsValue) {
            this._setComplicationName(this.fieldsValue['main-complication']);
        }
    }

    _setComplicationName(txt) {
        this.complicationName.innerText = txt;
    }

    _setComplicationValue() {
        const valueKeys = Object.keys(this.fieldsValue);

        this.fields.find((element) => {
            valueKeys.forEach((key) => {
                if (element.data.name && element.data.name.includes(key)) {
                    element.data.value = this.fieldsValue[key];
                }
            });
        });
    }

    _deleteComplication() {
        console.log('delete');
        console.log(Complication.complictionCount);
        // console.log(this.el);
        this.el.remove();
        Complication.complictionCount = Complication.complictionCount - 1;
        this._correctNumbers();
    }

    _correctNumbers() {
        const allComplications = document.querySelectorAll('.complication');
        allComplications.forEach((complication, i) => {
            const newNumber = i + 1;
            complication.querySelector('.group__title span').innerHTML = `Раннее осложнение №${newNumber}`;

            const fields = [...complication.querySelectorAll('.input-custom__input, .itc-select, .textarea')];
            fields.forEach((element) => {
                if (element.classList.contains('input-custom__input')) {
                    let oldValue = element.querySelector('input').getAttribute('name');
                    let newValue = oldValue.replace(/complication\d*/, `complication${newNumber}`);

                    const input = element.querySelector('input');
                    const label = element.querySelector('label');
                    input.setAttribute('name', newValue);
                    input.setAttribute('id', newValue);
                    label.setAttribute('for', newValue);
                } else if (element.classList.contains('itc-select')) {
                    let oldValue = element.getAttribute('id');
                    let newValue = oldValue.replace(/complication\d*/, `complication${newNumber}`);
                    const selectBtn = element.querySelector('button');
                    selectBtn.setAttribute('name', newValue);
                    element.setAttribute('id', newValue);
                    element.querySelector('input').setAttribute('name', newValue);
                } else if (element.classList.contains('textarea')) {
                    const textarea = element.querySelector('textarea');
                    let oldValue = textarea?.getAttribute('id');
                    let newValue = oldValue.replace(/complication\d*/, `complication${newNumber}`);

                    textarea.setAttribute('name', newValue);
                    textarea.setAttribute('id', newValue);
                    element.querySelector('label').setAttribute('for', newValue);
                }
            });
        });
    }

    _createInterventionFn() {
        let interventionNumber = 1;

        return function (repeatedIntData) {
            let intervention = new RepeatedIntervention({ number: interventionNumber, id: `complication-${this.number}_intervention-${interventionNumber}`, addClass: this.interventionClass, interventionData: repeatedIntData });

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

    addIntervention = this._createInterventionFn();
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
                    type: 'number',
                    placeholder: 'Часов прошло от основной операции*',
                    required: true,
                    addClass: 'only-number',
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: `method-repeated-operation_${this._id}`,
                    placeholder: 'Метод повторной операции*',
                    options: [
                        ['Лапаротомия', 'Лапаротомия'],
                        ['Конверсионная лапаротомия', 'Конверсионная лапаротомия'],
                        ['Лапароскопия', 'Лапароскопия'],
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
        if (data.interventionData) {
            Object.entries(data.interventionData).forEach((item) => {
                this.fields.forEach((field) => {
                    if (field.data.name.includes(item[0])) {
                        field.data.value = item[1];
                    }
                });
            });
        }
        this.el = createAditionalGroup({
            name: this.title + this.number,
            content: this.fields,
            deleteButton: true,
            active: true,
            addClass: data.addClass,
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
