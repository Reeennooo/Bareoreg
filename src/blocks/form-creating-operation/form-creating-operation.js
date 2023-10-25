import tippy from 'tippy.js';
import { assignInputRules, setMasks } from '../../js/input-validate';
import { initGroupObserve, setValidCharacters } from '../../js/validate';
import { setRadioHandler } from '../../components/group-radio-buttons/group-radio-buttons';
import { OPERATIONS } from '../../js/operation-data';
import { OPERATIONS_RULES } from '../../js/operation-data';
import { initGroup } from '../../components/group/group';
import { createButton } from '../../components/btn/btn';
import { Complication } from '../complications/complication';

// export const VALIDATION_RULES = {
//     // key - это name инпута
//     // value - это правила проверки инпута
//     surgeon: {
//         required: {
//             message: 'Обязательное поле',
//         },
//     },
//     access: {
//         required: {
//             message: 'Обязательное поле',
//         },
//     },
//     'duration-operation': {
//         customRange: {
//             min: 40,
//             max: 120,
//         },
//     },
//     'weight-operation': {
//         customRange: {
//             min: 60,
//             max: 300,
//         },
//         required: {
//             message: 'Обязательное поле',
//         },
//         // сюда можно добавить еще тесты
//     },
//     'date-operation': {
//         range: {
//             min: 10,
//             max: 10,
//             message: 'Формат: 16.09.2023',
//         },
//         required: {
//             message: 'Обязательное поле',
//         },
//     },
//     'type-of-operation': {
//         required: {
//             message: 'Обязательное поле',
//         },
//     },
//     'kind-of-operation': {
//         required: {
//             message: 'Обязательное поле',
//         },
//     },
//     'reason-for-revision': {
//         required: {
//             message: 'Обязательное поле',
//         },
//     },
//     // Внутрижелудочный баллон
//     'ballon-type': {
//         required: {
//             message: 'Обязательное поле',
//         },
//     },
//     'fullness-of-the-balloon': {
//         required: {
//             message: 'Обязательное поле',
//         },
//     },
//     'date-ballon-delete': {
//         required: {
//             message: 'Обязательное поле',
//         },
//     },
// };

export const CONNECTED_RULES = {
    // key - имя связи
    // value - подходящие значений(для выпадающих списков можно использовать индексы(формат число)).
    // статус пациента
    status: [
        {
            value: 2,
        },
    ],

    access: [
        {
            value: 'Лапаратомия',
        },
        {
            value: 'Конверсия из лапароскопии в лапаротомию',
        },
    ],
    'operation-type': [
        {
            value: 0,
            connectedID: 'dissection',
        },
        {
            value: 1,
            connectedID: 'revision',
        },
        {
            value: 3,
            connectedID: 'revision',
        },
    ],
    'fatal-outcome': [
        {
            value: 'Летальный исход',
        },
    ],
    'intraoperative-complications': [{}],
    'emergency-situations': [{}],
    'method-determination-small-gut': [
        {
            value: 'Отступ от илеоцекального угла',
            connectedID: 'indent',
            rules: {
                'gut-indent': {
                    customRange: {
                        min: 250,
                        max: 350,
                        message: 'Минимальное значение: 250, максимальное значение 350',
                    },
                },
            },
        },
        {
            value: 'Отступ от связки трейца',
            connectedID: 'indent',
            rules: {
                'gut-indent': {
                    customRange: {
                        min: 20,
                        max: 350,
                        message: 'Минимальное значение: 20, максимальное значение 350',
                    },
                },
            },
        },
        {
            value: 'Процент от общей длины тонкой кишки',
            connectedID: 'percent-gut',
        },
    ],
    'method-determination-duodenoenteroanastomosis': [
        {
            value: 'Отступ от илеоцекального угла',
            connectedID: 'indent',
            rules: {
                'gut-indent': {
                    customRange: {
                        min: 250,
                        max: 350,
                        message: 'Минимальное значение: 250, максимальное значение 350',
                    },
                },
            },
        },
        {
            value: 'Отступ от связки Трейтца',
            connectedID: 'indent',
            rules: {
                'gut-indent': {
                    customRange: {
                        min: 20,
                        max: 350,
                        message: 'Минимальное значение: 20, максимальное значение 350',
                    },
                },
            },
        },
        {
            value: 'Процент от общей длины тонкой кишки',
            connectedID: 'percent-gut',
        },
    ],
    gastroenteroanastomosis: [
        {
            value: 'Аппаратный циркулярный',
            connectedID: 'circle',
        },
        {
            value: 'Аппаратный линейный',
            connectedID: 'linear',
        },
        {
            value: 'Ручной',
            connectedID: 'manual',
        },
    ],
    herjunojunoanastomosis: [
        {
            value: 'Аппаратный с ручным закрытием',
            connectedID: 'hardware-with-manual',
        },
        {
            value: 'Аппаратный полностью',
            connectedID: 'hardware-completely',
        },
        {
            value: 'Ручной',
            connectedID: 'fully-manual',
        },
    ],
    treitz: [
        {
            value: 1,
            connectedID: 'ident-treitz',
        },
    ],
    'formation-gea': [
        {
            value: 'Аппаратный циркулярный',
            connectedID: 'hardware',
        },
        {
            value: 'Аппаратный линейный',
            connectedID: 'hardware',
        },
        {
            value: 'Ручной',
            connectedID: 'manual',
        },
    ],
    spur: [
        {
            value: 'Да',
        },
    ],
    'drainage-tube': [
        {
            value: 'Да',
        },
    ],
    'seam-row': [
        {
            value: 'Однорядный',
            connectedID: '1',
        },
        {
            value: 'Двухрядный',
            connectedID: '2',
        },
        {
            value: 'Трехрядный',
            connectedID: '3',
        },
    ],
    // Осложнения
};

const selects = {
    'general-information': ['surgeon', 'assistants', 'type-of-operation', 'reason-for-revision', 'kind-of-operation', 'access', 'simultaneous-operation', 'pain-relief'],
    hospital: ['vomiting', 'discharge-where'],
    complications: ['bleeding', 'positive-leak-test', 'injury-of-organs', 'electrotrauma-of-organs'],
};

function initSelects(selects) {
    const selectsList = Object.entries(selects);
    let allSelectsId = [];
    selectsList.map((item) => {
        allSelectsId = allSelectsId.concat(item[1]);
    });
    allSelectsId.forEach((selectId) => {
        if (selectId === 'type-of-operation') {
            selectTypeOperation = new window.ItcCustomSelect(`#${selectId}`);
        } else if (selectId === 'kind-of-operation') {
            selectKindOperation = new window.ItcCustomSelect(`#${selectId}`);
        } else {
            let select = new window.ItcCustomSelect(`#${selectId}`);
            // console.log(select);
        }
    });
}

let selectTypeOperation;
let selectKindOperation;

document.addEventListener('DOMContentLoaded', () => {
    // отключаю выполнение скрипта
    // console.log(window.location);
    if (!window.location.pathname.includes('creating-operation')) return;
    setMasks();
    assignInputRules(OPERATIONS_RULES);
    initSelects(selects);

    // calendars
    // Написать функцию которая делает календарь 100% ширины, под инпут.
    // Считывать ширину инпута и задавать нужному календарю
    new window.Calendar('#calendar-operation');
    new window.Calendar('#calendar-discharge');

    // СВЯЗИ
    const hasConnections = document.querySelectorAll('[data-has-connection]');
    hasConnections.forEach((hasConnectEl) => {
        setConnectionsForElements(hasConnectEl);

        // частный случай с disabled чекбоксов.
        if (hasConnectEl.dataset.hasConnection === 'no-complications') {
            let connectedEls = document.querySelectorAll(`[data-connected=${hasConnectEl.dataset.hasConnection}]`);
            function checkState() {
                if (hasConnectEl.checked) {
                    connectedEls.forEach((element) => {
                        element.checked = false;
                        element.setAttribute('disabled', 'disabled');
                        document.querySelector(`[data-connected=${element.dataset.hasConnection}]`).classList.remove('is-active');
                    });
                } else {
                    connectedEls.forEach((element) => {
                        element.removeAttribute('disabled', 'disabled');
                    });
                }
            }
            hasConnectEl.addEventListener('change', checkState);
        }
    });

    // связи пунктов выпадающих списков
    // Операция ВЖБ
    const button = selectTypeOperation._elToggle;
    const connectedOption = selectKindOperation._el.querySelector(`.itc-select__option[data-index='9']`);
    if (button) {
        let observer = new MutationObserver(() => {
            if (selectTypeOperation.selectedIndex !== '0') {
                connectedOption.classList.add('disabled');
            } else {
                connectedOption.classList.remove('disabled');
            }
        });
        observer.observe(button, { attributeFilter: ['data-index'] });
    }

    // связи пунктов select и допустимых значений
    const kindOperationBtn = selectKindOperation._elToggle;
    if (kindOperationBtn) {
        let observer = new MutationObserver(() => {
            if (selectKindOperation.selectedIndex === '7') {
                assignInputRules(
                    {
                        'duration-operation': {
                            customRange: {
                                min: 10,
                                max: 30,
                            },
                            required: {
                                message: 'Обязательное поле',
                            },
                        },
                    },
                    true
                );
            } else {
                assignInputRules(
                    {
                        'duration-operation': {
                            customRange: {
                                min: 40,
                                max: 120,
                            },
                            required: {
                                message: 'Обязательное поле',
                            },
                        },
                    },
                    true
                );
            }
        });
        observer.observe(kindOperationBtn, { attributeFilter: ['data-index', 'value'] });
    }

    // УСТАНАВЛИВАЕМ НАБЛЮДЕНИЕ ЗА СПИСКОМ ОПЕРАЦИЙ
    const selectOperationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            setOperation(mutation.target.value);
        }
    });
    selectOperationObserver.observe(selectKindOperation._elToggle, { attributeFilter: ['value'] });

    const operationForm = document.querySelector(`[data-group-name="operation"]`);
    const optionFormInner = operationForm.querySelector('.group__inner');
    const operationNameElement = operationForm?.querySelector('.group__add-info');
    let initObservers = [];

    // МЕТОД ДОБАВЛЕНИЯ ОПЕРАЦИИ
    function setOperation(value) {
        if (!OPERATIONS[value]) return;

        // устанавливаем имя в блок.
        let operationName = selectKindOperation._textSelectedEl.innerText;
        operationNameElement.innerText = operationName;
        optionFormInner.innerHTML = '';

        const operation = OPERATIONS[value];

        if (operation) {
            if (operation.mainFields) {
                const fieldWrapper = document.createElement('div');
                fieldWrapper.classList.add('group__form');

                console.log(operation.mainFields);
                operation.mainFields.forEach((item) => {
                    const node = createSingleField(item);
                    fieldWrapper.append(node);
                });
                optionFormInner.append(fieldWrapper);
                // initSelects(operation.mainFields);
            }
            if (operation.additionalGroups) {
                operation.additionalGroups.forEach((item) => {
                    const group = createAditionalGroup(item);
                    optionFormInner.append(group);
                });
                // const group = createAditionalGroup();
                // optionFormInner.innerHTML(group);
            }
        }
        initGroupObserve(initObservers);
        assignInputRules(OPERATIONS_RULES);
        initObservers = [];
    }

    // Осложнения
    const addComplicationBtn = document.querySelector('.add-complication');
    const buttonsBlock = document.querySelector('.form__wrapper-btns');

    function setComplication() {
        let count = 0;
        return function () {
            const complication = new Complication({ number: ++count, addClass: 'group--parent' });
            // Добавляем правила к общим правилам.
            complication.connectionRules.forEach((item) => {
                CONNECTED_RULES[item.name] = item.rules;
            });
            buttonsBlock.before(complication.el);
            assignInputRules(complication.fieldsRules);
            initGroupObserve(initObservers);
            initObservers = [];
        };
    }

    function debounce(f, ms) {
        let isCooldown = false;

        return function () {
            if (isCooldown) return;

            f.apply(this, arguments);

            isCooldown = true;

            setTimeout(() => (isCooldown = false), ms);
        };
    }

    let setComplicationDebounce = debounce(setComplication(), 1000);
    addComplicationBtn.addEventListener('click', setComplicationDebounce);
});

// function isJsonString(str) {
//     try {
//         JSON.parse(str);
//     } catch (e) {
//         return false;
//     }
//     return true;
// }

function setConnectionsForElements(element, rules) {
    let connectedKey = '';

    if (element.dataset.hasConnection) {
        connectedKey = element.dataset.hasConnection;
        putObservation(element);
    }

    function putObservation(element) {
        if (element.closest('.group-radio-buttons')) {
            const monitoringElement = element.closest('.group-radio-buttons');
            const elementObserver = new MutationObserver((mutations) => {
                console.log(connectedKey);
                let connectedElements = document.querySelectorAll(`[data-connected=${connectedKey}]`);
                const rulesItem = CONNECTED_RULES[connectedKey].find((el) => el.value === mutations[0].target.dataset.value);
                if (rulesItem) {
                    if (rulesItem.connectedID) {
                        connectedElements.forEach((connectedEL) => {
                            // console.log(connectedEL.dataset.id);
                            // console.log(rulesItem);
                            if (connectedEL.dataset.id.includes(rulesItem.connectedID)) {
                                connectedEL.classList.add('is-active');
                            } else {
                                connectedEL.classList.remove('is-active');
                            }
                        });
                    } else {
                        connectedElements.forEach((connectedEL) => connectedEL.classList.add('is-active'));
                    }

                    // connectedElements.forEach((connectedEL) => connectedEL.classList.add('is-active'));
                    if (rulesItem.rules) {
                        assignInputRules(rulesItem.rules, true);
                    }
                } else {
                    connectedElements.forEach((connectedEL) => {
                        if (connectedEL.classList.contains('is-active')) {
                            connectedEL.classList.remove('is-active');
                        }
                    });
                }
            });
            elementObserver.observe(monitoringElement, { attributeFilter: ['data-value'] });
            return;
        }
        if (element.closest('.itc-select')) {
            const monitoringElement = element.querySelector('button');
            const elementObserver = new MutationObserver((mutations) => {
                let connectedElements = document.querySelectorAll(`[data-connected=${connectedKey}]`);
                console.log(connectedElements);
                const rulesItem = CONNECTED_RULES[connectedKey].find((item) => {
                    if (item.value === mutations[0].target.value || item.value === Number(mutations[0].target.dataset.index)) {
                        return item;
                    }
                });
                console.log(rulesItem);
                if (rulesItem) {
                    if (rulesItem.connectedID) {
                        connectedElements.forEach((connectedEL) => {
                            // console.log(connectedEL);
                            // console.log(connectedEL.dataset.id);
                            // console.log(rulesItem);
                            if (rulesItem.changeSelect) {
                                const newSelect = document.querySelector(`#${rulesItem.changeSelect.id}`);
                                if (newSelect) {
                                    const selectOptions = newSelect.querySelector('.itc-select__options');
                                    selectOptions.innerHTML = '';
                                    const selectBtn = newSelect.querySelector('button');
                                    console.log(selectBtn);
                                    selectBtn.querySelector('.itc-select__text-selected span').innerHTML = '';
                                    selectBtn.dataset.index = '-1';
                                    const newOptions = rulesItem.changeSelect.options.map((option, index) => {
                                        return `<li class="itc-select__option" data-select="option" data-value='${option[0]}' data-index='${index}'>
                                        ${option[1]}</li>`;
                                    });
                                    selectOptions.insertAdjacentHTML('afterbegin', newOptions.join(''));
                                }
                            }
                            if (connectedEL.dataset.id.includes(rulesItem.connectedID)) {
                                connectedEL.classList.add('is-active');
                            } else {
                                connectedEL.classList.remove('is-active');
                            }
                        });
                    } else {
                        connectedElements.forEach((connectedEL) => connectedEL.classList.add('is-active'));
                    }
                    if (rulesItem.rules) {
                        assignInputRules(rulesItem.rules, true);
                    }
                } else {
                    connectedElements.forEach((connectedEL) => {
                        if (connectedEL.classList.contains('is-active')) {
                            console.log(connectedEL);
                            connectedEL.classList.remove('is-active');
                        }
                    });
                }
            });
            elementObserver.observe(monitoringElement, { attributeFilter: ['value'] });
            return;
        }
        if (element.closest('.checkbox')) {
            const monitoringElement = element;
            let connectedElements = document.querySelectorAll(`[data-connected=${connectedKey}]`);
            function elementObserver() {
                if (monitoringElement.checked) {
                    connectedElements.forEach((connectedEL) => connectedEL.classList.add('is-active'));
                } else {
                    connectedElements.forEach((connectedEL) => {
                        if (connectedEL.classList.contains('is-active')) {
                            connectedEL.classList.remove('is-active');
                        }
                    });
                }
            }
            monitoringElement.addEventListener('change', elementObserver);
            return;
        }
    }
}

export function createGroup(data) {
    const group = document.createElement('div');
    group.classList.add('group', 'is-active', 'form-creating-operation__complication');
    group.innerHTML = `
        <div class='group__header'>
            <div class='group__text'>
                <div class='group__title'>
                <div class='group__completed'>
                    <svg class='svg'>
                        <use href='img/sprite.svg#check'></use>
                    </svg>
                    </div>
                    <span>${data.title}${data.number ? data.number : ''}</span>
                    <span class='group__add-info'></span>
                </div>
            </div>
            <div class='group__toggle'>
                <svg class='svg'>
                    <use href='img/sprite.svg#caret-up'></use>
                </svg>
            </div>
        </div>
        <div class='group__inner-wrapper'>
            <div class='group__inner'>
                <div class='group__form'></div>
            </div>
        </div>`;

    const form = group.querySelector('.group__form');

    if (data.subtitle) {
        const subtitle = document.createElement('div');
        subtitle.classList.add('group__subtitle');
        subtitle.innerHTML = data.subtitle;
        group.querySelector('.group__title').after(subtitle);
    }

    if (data.addClass) {
        if (typeof data.addClass === 'object') {
            data.addClass.forEach((el) => group.classList.add(el));
        } else {
            group.classList.add(data.addClass);
        }
    }

    let fields;

    if (data.fields) {
        fields = data.fields.map((item) => {
            switch (item.type) {
                case 'RADIO-GROUP':
                    return createRadioGroup(item.data);
                case 'SELECT':
                    return createSelect(item.data);
                case 'INPUT':
                    return createInput(item.data);
                case 'SUBTITLE':
                    return createSubtitle(item.data);
                case 'CHECKBOX':
                    return createCheckbox(item.data);
                case 'TEXTAREA':
                    return createTextarea(item.data);
                case 'BUTTON':
                    return createButton(item.data);
            }
        });
        fields.forEach((field) => form.append(field));
    }

    if (data.dataBlocks) {
        data.dataBlocks.forEach((item) => form.append(item));
    }

    initGroup([group]);
    return group;
}

function createSingleField(item) {
    switch (item.type) {
        case 'RADIO-GROUP':
            return createRadioGroup(item.data);
        case 'SELECT':
            return createSelect(item.data);
        case 'INPUT':
            return createInput(item.data);
        case 'SUBTITLE':
            return createSubtitle(item.data);
        case 'CHECKBOX':
            return createCheckbox(item.data);
        case 'TEXTAREA':
            return createTextarea(item.data);
    }
}

export function createAditionalGroup(groupData) {
    const group = document.createElement('div');
    // console.log(groupData);
    const innerElements = groupData.content?.map((item) => {
        switch (item.type) {
            case 'RADIO-GROUP':
                return createRadioGroup(item.data);
            case 'SELECT':
                return createSelect(item.data);
            case 'INPUT':
                return createInput(item.data);
            case 'SUBTITLE':
                return createSubtitle(item.data);
            case 'CHECKBOX':
                return createCheckbox(item.data);
            case 'TEXTAREA':
                return createTextarea(item.data);
        }
    });
    group.classList.add('group', 'group--additional');
    if (groupData.active) {
        group.classList.add('is-active');
    }
    if (groupData.number) {
        group.setAttribute('data-number', groupData.number);
        if (groupData.number === 1) {
            group.classList.add('border-none');
        }
    }
    group.innerHTML = `
        <div class='group__header'>
            <div class='group__title'>
                <div class='group__completed'>
                    <svg class='svg'>
                        <use href='img/sprite.svg#check'></use>
                    </svg>
                </div>
                <span>${groupData.name}</span>
            </div>  
        </div>
        <div class='group__inner'>
            <div class='group__additional-form'>
                
            </div>
        </div>`;

    if (groupData.deleteButton) {
        group.querySelector('.group__header').insertAdjacentHTML(
            'beforeend',
            `<button class='group__delete btn btn--text' type='button'>
                <svg>
                    <use href='img/sprite.svg#trash'></use>
                </svg>
            <span>Удалить</span>
            </button>`
        );
    }

    if (groupData.addClass) {
        if (typeof groupData.addClass === 'object') {
            groupData.addClass.forEach((el) => {
                group.classList.add(el);
            });
        } else {
            group.classList.add(groupData.addClass);
        }
    }
    // console.log(innerElements);
    const groupAddForm = group.querySelector('.group__additional-form');
    innerElements?.map((item) => {
        if (item) groupAddForm.append(item);
    });

    if (groupData.dataBlocks) {
        groupData.dataBlocks.forEach((item) => groupAddForm.append(item));
    }

    if (groupData.observe) {
        // Появление следующего этапа операции
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.target.classList.contains('is-filled') && mutation.target.classList.contains('is-active')) {
                    // console.log('Терперь группа is-flled:');
                    // console.log(mutation.target);
                    const nextStep = document.querySelector(`.form-creating-operation__operation [data-number='${groupData.number + 1}']`);
                    nextStep?.classList.add('is-active');
                }
            }
        });
        observer.observe(group, { attributeFilter: ['class'] });
    }

    return group;
}

export function createInput(data) {
    const input = document.createElement('div');
    input.classList.add('input-custom');
    input.innerHTML = `
        <div class='input-custom__input'>
            <input type='${data.type}' name='${data.name}' placeholder='' id='${data.name}' value='${data.value ? data.value : ''}'>
            <label for='${data.name}'>${data.placeholder}</label>
        </div>
        <div class='input-custom__message'>${data.message}</div>`;

    if (data.required) {
        input?.querySelector('input')?.setAttribute('data-required', '');
    }

    if (data.value) {
        input.querySelector('input').value = data.value;
    }

    if (data.mod === 'calendar') {
        // new AirDatepicker(input.querySelector('input'), {});
        const inputField = input.querySelector('input');
        let calendarToggler = `
        <div class='calendar-toggler'>
            <svg>
                <use href='img/sprite.svg#calendar'></use>
            </svg>
        </div>`;
        input.querySelector('.input-custom__input').insertAdjacentHTML('afterend', calendarToggler);
        inputField.dataset.mask = 'date';
        new window.Calendar(inputField);
        setMasks(inputField);
    }

    if (data.addClass) {
        if (typeof data.addClass === 'object') {
            data.addClass.forEach((el) => {
                if (el === 'long') {
                    input.classList.add(el);
                } else {
                    input?.querySelector('.input-custom__input input').classList.add(el);
                }
            });
        } else {
            if (data.addClass === 'long') {
                input.classList.add(data.addClass);
            } else {
                input?.querySelector('input').classList.add(data.addClass);
            }
        }
    }

    if (data.connected) {
        input.setAttribute('data-connected', data.connected);
        checkConnectionValue(input, CONNECTED_RULES);
    }

    if (data.connectedID) {
        input.setAttribute('data-id', data.connectedID);
        // `[${data.connectedId.join(',')}]`
    }

    if (data.info) {
        input.classList.add('input-custom--info');
        const info = document.createElement('div');
        info.classList.add('info', 'input-custom__info');
        info.setAttribute('id', data.info.id);
        info.innerHTML = `<svg><use href='img/sprite.svg#info'></use></svg>`;
        input.querySelector('.input-custom__input').append(info);
        tippy(info, {
            content: data.info.content,
            theme: data.info.theme,
        });
    }

    setValidCharacters(input);
    return input;
}

function createRadioGroup(data) {
    const radioGroup = document.createElement('div');
    radioGroup.classList.add('group-radio-buttons');

    if (data.required) {
        radioGroup.setAttribute('data-required', '');
    }

    const options = [];
    data.options.forEach((el) => {
        const option = document.createElement('label');
        option.classList.add('radio');
        option.innerHTML = `
            <input type='radio' name='${data.name}' value='${el[0] || ''}'>
            <span class='radio__fake'></span>
            <span class='radio__label'>${el[1]}</span>
            `;
        if (data.value === el[0]) {
            option.querySelector('input').checked = true;
        }
        options.push(option);
    });

    radioGroup.innerHTML = `
        <div class='group-radio-buttons__title'>
            <span>${data.title}</span>
        </div>
        <div class='group-radio-buttons__options'>
        </div>
        `;

    const groupOptions = radioGroup.querySelector('.group-radio-buttons__options');
    options.map((item) => {
        groupOptions.append(item);
    });

    if (data.info) {
        const info = document.createElement('div');
        info.classList.add('info');
        info.setAttribute('id', data.info.id);
        info.innerHTML = `<svg><use href='img/sprite.svg#info'></use></svg>`;
        radioGroup.querySelector('.group-radio-buttons__title').append(info);
        tippy(info, {
            content: data.info.content,
            theme: data.info.theme,
        });
    }

    if (data.addClass) {
        if (typeof data.addClass === 'object') {
            data.addClass.forEach((el) => radioGroup.classList.add(el));
        } else {
            radioGroup.classList.add(data.addClass);
        }
    }

    if (data.connected) {
        radioGroup.setAttribute('data-connected', data.connected);
        checkConnectionValue(radioGroup, CONNECTED_RULES);
    }
    if (data.connectedID) {
        radioGroup.setAttribute('data-id', data.connectedID);
    }
    if (data.hasConnection) {
        radioGroup.setAttribute('data-has-connection', data.hasConnection);
        setConnectionsForElements(radioGroup);
    }

    setRadioHandler(radioGroup);

    return radioGroup;
}

export function createSelect(data) {
    const select = document.createElement('div');
    select.setAttribute('id', data.name);
    if (data.required) {
        select.setAttribute('data-required', '');
    }

    const itcSelect = initSelect(select, data);

    if (data.value) {
        if (typeof data.value === 'object') {
            data.value.forEach((val) => (itcSelect.value = val));
        } else {
            itcSelect.value = data.value;
        }
    }

    if (data.addClass) {
        select?.classList.add(data.addClass);
    }

    if (data.hasConnection) {
        select.setAttribute('data-has-connection', data.hasConnection);
        setConnectionsForElements(select);
    }

    if (data.connected) {
        select.setAttribute('data-connected', data.connected);
        checkConnectionValue(select, CONNECTED_RULES);
    }
    if (data.connectedID) {
        select.setAttribute('data-id', data.connectedID);
    }
    return select;
}

function createTextarea(data) {
    const textarea = document.createElement('div');
    textarea.classList.add('textarea');
    textarea.innerHTML = `<textarea name='${data.name}' id='${data.name}' placeholder=''></textarea><label for='${data.name}'>${data.placeholder}</label>`;

    if (data.addClass) {
        textarea.classList.add(data.addClass);
    }

    if (data.value) {
        textarea.querySelector('textarea').value = data.value;
    }

    if (data.connected) {
        textarea.setAttribute('data-connected', data.connected);
    }

    if (data.connectedID) {
        textarea.setAttribute('data-id', data.connectedID);
    }

    return textarea;
}

function createSubtitle(data) {
    const subtitle = document.createElement('div');
    subtitle.classList.add('group__title-subgroup');
    subtitle.innerHTML = `<span>${data.subtitle}</span>`;
    return subtitle;
}

function createCheckbox(data) {
    const checkbox = document.createElement('label');
    checkbox.classList.add('checkbox');
    checkbox.innerHTML = `<input type='checkbox' name='${data.name}' value='${data.value}'>
        <span class='checkbox__fake'></span>
        <span class='checkbox__label'>${data.label}</span>`;
    return checkbox;
}

function initSelect(select, data, variable) {
    if (variable) {
        variable = new window.ItcCustomSelect(select, {
            name: data.name,
            placeholder: data.placeholder,
            options: data.options,
            multiple: data.multiple,
            targetValue: data.targetValue,
        });
    } else {
        return new window.ItcCustomSelect(select, {
            name: data.name,
            placeholder: data.placeholder,
            options: data.options,
            multiple: data.multiple,
            targetValue: data.targetValue,
        });
    }
}

// проверка связи для созданных с помощью JS элементов.
export function checkConnectionValue(element, connectedRules) {
    const connectedKey = element.dataset.connected;
    const connectionParent = document.querySelector(`[data-has-connection=${connectedKey}]`);
    let monitoringElement;

    if (!connectionParent) return;

    function activeToggler(element, state) {
        // console.log(element);
        // console.log(state);
        if (state) {
            element.classList.add('is-active');
        } else if (element.classList.contains('is-active')) {
            element.classList.remove('is-active');
        }
    }

    if (connectionParent.closest('.group-radio-buttons')) {
        monitoringElement = connectionParent.closest('.group-radio-buttons');
        activeToggler(
            element,
            connectedRules[connectedKey].find((item) => item.value === monitoringElement.dataset.value)
        );
        return;
    }
    if (connectionParent.closest('.itc-select')) {
        monitoringElement = connectionParent.querySelector('button');

        let dataId = element.getAttribute('data-id');
        if (dataId) {
            let state = connectedRules[connectedKey].find((item) => (item.value === Number(monitoringElement.dataset.index) || item.value === monitoringElement.value) && item.connectedID === dataId);
            activeToggler(element, state);
        } else {
            activeToggler(
                element,
                connectedRules[connectedKey].find((item) => item.value === monitoringElement.value)
            );
        }

        return;
    }
    if (connectionParent.closest('.checkbox')) {
        monitoringElement = connectionParent.closest('.group-radio-buttons');
        activeToggler(element, monitoringElement.checked);
        return;
    }
}
