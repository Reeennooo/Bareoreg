import tippy from 'tippy.js';
import { assignInputRules, setMasks } from '../../js/input-validate';
import { initGroupObserve, setValidCharacters } from '../../js/validate';
import { setRadioHandler } from '../../components/group-radio-buttons/group-radio-buttons';
import { OPERATIONS, REVISION_OPERATIONS, OPERATIONS_RULES } from '../../js/operation-data';
import { initGroup } from '../../components/group/group';
import { createButton } from '../../components/btn/btn';
import { Complication } from '../complications/complication';
import { hightlightRequiredFields } from '../../js/utils/create-group';
import { inputTrigger } from '../../js/input-validate';

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
            value: 'Лапаротомия',
        },
        {
            value: 'Конверсия из лапароскопии в лапаротомию',
        },
    ],
    'operation-type': [
        {
            value: 0,
            connectedID: 'primary',
        },
        {
            value: 1,
            connectedID: 'revision',
        },
        {
            value: 2,
            connectedID: 'second-stage',
        },
        {
            value: 3,
            connectedID: 'revision',
        },
    ],
    'type-revision-operation': [
        {
            value: 0,
            connectedID: 'other',
        },
        {
            value: 1,
            connectedID: 'conversion',
        },
    ],
    'reason-revision': [
        {
            value: 2,
            connectedID: 'complication',
        },
        {
            value: 3,
            connectedID: 'remove',
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
            connectedID: 'ileocecal',
        },
        {
            value: 'Отступ от связки Трейтца',
            connectedID: 'treitz',
        },
        {
            value: 'Процент от общей длины тонкой кишки',
            connectedID: 'percent-gut',
        },
    ],
    'method-determining-place-gastroenteroanastomosis': [
        {
            value: 'Отступ от илеоцекального угла',
            connectedID: 'ileocecal',
            rules: {
                'gut-indent': {
                    customRange: {
                        min: 250,
                        max: 350,
                    },
                },
            },
        },
        {
            value: 'Отступ от связки Трейтца',
            connectedID: 'treitz',
            'gut-indent': {
                customRange: {
                    min: 20,
                    max: 350,
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
                    },
                },
            },
        },
        {
            value: 'Отступ от связки Трейтца',
            connectedID: 'treitz',
            rules: {
                'gut-indent': {
                    customRange: {
                        min: 20,
                        max: 350,
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
            value: 'Линейным степлером 60 мм',
            connectedID: 'hardware',
        },
        {
            value: 'Линейным степлером 45 мм',
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
    // 'view-complication': [
    //     {
    //         value: 'Да',
    //     },
    // ],
};

const selects = {
    'general-information': ['surgeon', 'assistants', 'сhoosing-clinic', 'type-of-operation', 'type-of-revision-operation', 'reason-for-revision', 'type-of-complication', 'reason-deletion-ballon', 'kind-of-operation', 'type-of-bariatric-operation', 'access', 'simultaneous-operation', 'pain-relief'],
    hospital: ['vomiting', 'discharge-where', 'сause-of-death', 'other-revision-operation'],
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
        } else if (selectId === 'type-of-revision-operation') {
            selectTypeRevisionOperation = new window.ItcCustomSelect(`#${selectId}`);
        } else if (selectId === 'other-revision-operation') {
            otherRevisionOperation = new window.ItcCustomSelect(`#${selectId}`);
        } else if (selectId === 'reason-for-revision') {
            selectReasonRevision = new window.ItcCustomSelect(`#${selectId}`);
        } else {
            let select = new window.ItcCustomSelect(`#${selectId}`);
            // console.log(select);
        }
    });
}

let selectTypeOperation;
let selectKindOperation;
let selectTypeRevisionOperation;
let otherRevisionOperation;
let selectReasonRevision;

document.addEventListener('DOMContentLoaded', () => {
    // отключаю выполнение скрипта
    // console.log(window.location);
    if (!window.location.pathname.includes('creating-operation')) return;
    setMasks();
    assignInputRules(OPERATIONS_RULES);
    initSelects(selects);
    hightlightRequiredFields();

    const operationForm = document.querySelector(`[data-group-name="operation"]`);
    const operationFormInner = operationForm.querySelector('.group__inner');
    const operationNameElement = operationForm?.querySelector('.group__add-info');

    // calendars
    // Написать функцию которая делает календарь 100% ширины, под инпут.
    // Считывать ширину инпута и задавать нужному календарю
    new window.Calendar('#calendar-operation');
    new window.Calendar('#calendar-discharge');

    // СВЯЗИ
    const hasConnections = document.querySelectorAll('[data-has-connection]');
    hasConnections.forEach((hasConnectEl) => {
        setConnectionsForElements(hasConnectEl, CONNECTED_RULES);

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

    // Дата операции и Дата выписки
    const dateOperationField = document.getElementById('calendar-operation');
    // if (dateOperationField.value) {
    //     assignInputRules({
    //         'calendar-discharge': {
    //             dateRange: {
    //                 minDate: dateOperationField.value,
    //                 message: 'Не может быть раньше даты операции',
    //             },
    //         },
    //     });
    // }
    dateOperationField.addEventListener('blur', () =>
        assignInputRules({
            'calendar-discharge': {
                required: {
                    message: 'Обязательное поле',
                },
                range: {
                    min: 10,
                    max: 10,
                    message: 'Формат xx.xx.xxxx',
                },
                dateRange: {
                    minDate: dateOperationField.value,
                    message: 'Не может быть раньше даты операции',
                },
            },
        })
    );

    // СВЯЗИ МЕЖДУ ТИПАМИ И ВИДАМИ ОПЕРАЦИЙ
    const button = selectTypeOperation._elToggle;
    const connectedOption = selectKindOperation._el.querySelector(`.itc-select__option[data-index='9']`);
    const removeBallonItem = selectKindOperation._el.querySelector(`.itc-select__option[data-value='removal-of-vzhb']`);
    if (button) {
        // НАБЛЮДЕНИЕ ЗА ПОЛЕМ ТИП ОПЕРАЦИИ
        let observer = new MutationObserver(() => {
            // СБРОС поля Вид операции/Вид бариатрической операции* при смене типа операции.
            if (selectKindOperation.selectedIndex !== '-1') {
                selectKindOperation.selectedIndex = '-1';
            }
            if (selectReasonRevision.selectedIndex !== '-1') {
                selectReasonRevision.selectedIndex = '-1';
            }
            selectKindOperation._el.querySelector('.itc-select__placeholder').innerHTML = 'Вид операции';
            operationFormInner.innerHTML = '<div class="group__info">Выберите «Вид операции»</div>';
            operationNameElement.innerHTML = '';

            // Тип операции - Первичная
            if (selectTypeOperation.selectedIndex === '0') {
                connectedOption.classList.add('disabled');
                // СБРОС поля вид ревизионной операции
                if (selectTypeRevisionOperation.selectedIndex !== '-1') {
                    selectTypeRevisionOperation.selectedIndex = '-1';
                }
                setTimeout(() => {
                    selectKindOperation._el.classList.add('is-active');
                }, 0);
            }
            // Тип операции - Ревизионная(по поводу)
            else if (selectTypeOperation.selectedIndex === '1' || selectTypeOperation.selectedIndex === '3') {
                selectKindOperation._el.querySelector('.itc-select__placeholder').innerHTML = 'Вид бариатрической операции*';
                // СБРОС поля вид ревизионной операции
                if (selectTypeRevisionOperation.selectedIndex !== '-1') {
                    selectTypeRevisionOperation.selectedIndex = '-1';
                }
                selectKindOperation._el.classList.remove('is-active');

                connectedOption.classList.add('disabled');
            }
            // Тип операции - Плановый второй этап
            else if (selectTypeOperation.selectedIndex === '2') {
                selectKindOperation._el.querySelector('.itc-select__options').prepend(removeBallonItem);
                connectedOption.classList.remove('disabled');
            }
            // Тип операции - Любой другой
            // else {
            //     connectedOption.classList.remove('disabled');
            // }
        });
        observer.observe(button, { attributeFilter: ['data-index'] });
    }

    // связи пунктов select и допустимых значений
    const kindOperationBtn = selectKindOperation._elToggle;
    if (kindOperationBtn) {
        let observer = new MutationObserver(() => {
            if (selectKindOperation.selectedIndex === '7') {
                OPERATIONS_RULES['duration-operation'] = {
                    customRange: {
                        min: 10,
                        max: 30,
                    },
                    required: {
                        message: 'Обязательное поле',
                    },
                };
            } else {
                OPERATIONS_RULES['duration-operation'] = {
                    customRange: {
                        min: 40,
                        max: 120,
                    },
                    required: {
                        message: 'Обязательное поле',
                    },
                };
            }
        });
        observer.observe(kindOperationBtn, { attributeFilter: ['data-index', 'value'] });
    }

    // УСТАНАВЛИВАЕМ НАБЛЮДЕНИЕ ЗА СПИСКОМ ОПЕРАЦИЙ
    const selectOperationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            setOperation(mutation.target.value, 'operation');
        }
    });
    selectOperationObserver.observe(selectKindOperation._elToggle, { attributeFilter: ['value'] });

    const revisionOperationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            setOperation(mutation.target.value, 'revision-operation');
        }
    });
    revisionOperationObserver.observe(otherRevisionOperation._elToggle, { attributeFilter: ['value'] });

    let initObservers = [];

    // МЕТОД ДОБАВЛЕНИЯ ОПЕРАЦИИ
    function setOperation(value, type = 'operation') {
        const operationData = type === 'operation' ? OPERATIONS : REVISION_OPERATIONS;
        if (!operationData[value]) return;

        // устанавливаем имя в блок.
        let operationName = type === 'operation' ? selectKindOperation._textSelectedEl.innerText : otherRevisionOperation._textSelectedEl.innerText;
        operationNameElement.innerText = operationName;
        operationFormInner.innerHTML = '';

        const operation = operationData[value];

        if (operation) {
            if (operation.mainFields) {
                const fieldWrapper = document.createElement('div');
                fieldWrapper.classList.add('group__form');

                operation.mainFields.forEach((item) => {
                    const node = createSingleField(item);
                    fieldWrapper.append(node);
                });
                operationFormInner.append(fieldWrapper);
            }
            if (operation.additionalGroups) {
                operation.additionalGroups.forEach((item) => {
                    const group = createAditionalGroup(item);
                    operationFormInner.append(group);
                });
            }
        }
        initGroupObserve(initObservers);
        assignInputRules(OPERATIONS_RULES, true);
        hightlightRequiredFields();
        initCalculateLengthLoops();
        initObservers = [];
    }

    // Осложнения
    const addComplicationBtn = document.querySelector('.add-complication');
    const buttonsBlock = document.querySelector('.form__wrapper-btns');

    function setComplication() {
        const complication = new Complication({ addClass: ['group--parent'], operationDate: dateOperationField.value });
        console.log(complication);
        // Добавляем правила к общим правилам.
        complication.connectionRules.forEach((item) => {
            CONNECTED_RULES[item.name] = item.rules;
        });
        buttonsBlock.before(complication.el);
        assignInputRules(complication.fieldsRules);
        hightlightRequiredFields();
        initGroupObserve(initObservers);
        initObservers = [];
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

    let setComplicationDebounce = debounce(setComplication, 1000);
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

export function setConnectionsForElements(element, connectedRules) {
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
                const rulesItem = connectedRules[connectedKey].find((el) => el.value === mutations[0].target.dataset.value);
                if (rulesItem) {
                    if (rulesItem.connectedID) {
                        connectedElements.forEach((connectedEL) => {
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
                const rulesItem = connectedRules[connectedKey].find((item) => {
                    if (item.value === mutations[0].target.value || item.value === Number(mutations[0].target.dataset.index)) {
                        return item;
                    }
                });
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
                                    // console.log(selectBtn);
                                    selectBtn.querySelector('.itc-select__text-selected').innerHTML = '';
                                    selectBtn.dataset.index = '-1';
                                    const newOptions = rulesItem.changeSelect.options.map((option, index) => {
                                        return `<li class="itc-select__option" data-select="option" data-value='${option[0]}' data-index='${index}'>
                                        ${option[1]}</li>`;
                                    });
                                    selectOptions.insertAdjacentHTML('afterbegin', newOptions.join(''));
                                }
                            }
                            // console.log(connectedEL);
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
    // удалил form-creating-operation__complication
    group.classList.add('group', 'is-active');
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
            <div class='group__buttons'>
                <div class='group__toggle'>
                    <svg class='svg'>
                        <use href='img/sprite.svg#caret-up'></use>
                    </svg>
                </div>
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

    if (data.deleteButton) {
        group.querySelector('.group__buttons').insertAdjacentHTML(
            'afterbegin',
            `<button class='group__delete btn btn--text' type='button'>
                <svg>
                    <use href='img/sprite.svg#trash'></use>
                </svg>
            <span>Удалить</span>
            </button>`
        );
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
            groupData.addClass.filter(Boolean).forEach((el) => {
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

// !!! СЕЙЧАС ID УСТАНАВЛИВАЕТСЯ В СООТВЕТСТВИИ С NAME
// ПРИ СМЕНЕ NAME НУЖНО ОСТАВИТЬ ПРЕЖНИЙ ID, Т.К У МЕНЯ ВСЕ ПРАВИЛА
// ДЛЯ ПОЛЕЙ ОРИЕНТИРУЮТСЯ НА ID
export function createInput(data) {
    const input = document.createElement('div');
    input.classList.add('input-custom');
    input.innerHTML = `
        <div class='input-custom__input'>
            <input type='${data.type}' name='${data.name}' placeholder='' id='${data.name}' value='${data.value ? data.value : ''}'>
            <label for='${data.name}'>${data.placeholder}</label>
        </div>
        <div class='input-custom__message'>${data.message}</div>`;
    const inputField = input.querySelector('input');

    if (data.required) {
        input?.querySelector('input')?.setAttribute('data-required', '');
        OPERATIONS_RULES[data.name] = { required: { message: 'Обязательное поле' }, ...OPERATIONS_RULES[data.name] };
    } else if (OPERATIONS_RULES[data.name]) {
        if (OPERATIONS_RULES[data.name].required) {
            delete OPERATIONS_RULES[data.name].required;
        }
    }

    if (data.value) {
        inputField.value = data.value;
    }

    if (data.mod === 'calendar') {
        // new AirDatepicker(input.querySelector('input'), {});
        let calendarToggler = `
        <div class='calendar-toggler'>
            <svg>
                <use href='img/sprite.svg#calendar'></use>
            </svg>
        </div>`;
        input.querySelector('.input-custom__input').insertAdjacentHTML('beforeend', calendarToggler);
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

    if (data.connectedID) {
        inputField.setAttribute('data-id', data.connectedID);
        // `[${data.connectedId.join(',')}]`
    }
    if (data.connected) {
        inputField.setAttribute('data-connected', data.connected);
        checkConnectionValue(input, CONNECTED_RULES);
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

// !!! СЕЙЧАС ID УСТАНАВЛИВАЕТСЯ В СООТВЕТСТВИИ С NAME
// ПРИ СМЕНЕ NAME НУЖНО ОСТАВИТЬ ПРЕЖНИЙ ID, Т.К У МЕНЯ ВСЕ ПРАВИЛА
// ДЛЯ ПОЛЕЙ ОРИЕНТИРУЮТСЯ НА ID
function createRadioGroup(data) {
    const radioGroup = document.createElement('div');
    radioGroup.classList.add('group-radio-buttons');

    if (data.required) {
        radioGroup.setAttribute('data-required', '');
    }

    const options = [];
    data.options.forEach((el) => {
        const option = document.createElement('label');
        // option.id = data.name;
        option.classList.add('radio');
        option.innerHTML = `
            <input type='radio' name='${data.name}' value='${el[0] || ''}'>
            <span class='radio__fake'></span>
            <span class='radio__label'>${el[1]}</span>
            `;
        if (data.value === el[0]) {
            option.querySelector('input').checked = true;
            radioGroup.classList.add('is-filled');
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

    if (data.connectedID) {
        radioGroup.setAttribute('data-id', data.connectedID);
    }
    if (data.hasConnection) {
        radioGroup.setAttribute('data-has-connection', data.hasConnection);
        setConnectionsForElements(radioGroup, CONNECTED_RULES);
    }
    if (data.connected) {
        radioGroup.setAttribute('data-connected', data.connected);
        checkConnectionValue(radioGroup, CONNECTED_RULES);
    }

    setRadioHandler(radioGroup);

    return radioGroup;
}

// !!! СЕЙЧАС ID УСТАНАВЛИВАЕТСЯ В СООТВЕТСТВИИ С NAME
// ПРИ СМЕНЕ NAME НУЖНО ОСТАВИТЬ ПРЕЖНИЙ ID, Т.К У МЕНЯ ВСЕ ПРАВИЛА
// ДЛЯ ПОЛЕЙ ОРИЕНТИРУЮТСЯ НА ID
export function createSelect(data) {
    const select = document.createElement('div');
    select.setAttribute('id', data.name);
    // if (data.required) {
    //     select.setAttribute('data-required', '');

    // }

    if (data.required) {
        select.setAttribute('data-required', '');
        OPERATIONS_RULES[data.name] = { required: { message: 'Обязательное поле' }, ...OPERATIONS_RULES[data.name] };
    } else if (OPERATIONS_RULES[data.name]) {
        if (OPERATIONS_RULES[data.name].required) {
            delete OPERATIONS_RULES[data.name].required;
        }
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
        setConnectionsForElements(select, CONNECTED_RULES);
    }

    if (data.connectedID) {
        select.setAttribute('data-id', data.connectedID);
    }
    if (data.connected) {
        select.setAttribute('data-connected', data.connected);
        checkConnectionValue(select, CONNECTED_RULES);
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
    // console.log(element);
    // console.log(connectedRules);
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

// Вычисление длин петель
function initCalculateLengthLoops() {
    const connectedFields = [
        {
            name: 'total-loop-length',
            field: null,
        },
        {
            name: 'small-intestine-length',
            field: null,
        },
        {
            name: 'length-alimentary-loop',
            field: null,
        },
        {
            name: 'length-biliopancreatic-loop',
            field: null,
        },
    ];

    connectedFields.forEach((item) => {
        item.field = document.querySelector(`input[name="${item.name}"]`);
        // if (item.name !== 'total-loop-length') {
        //     item.field.addEventListener('change', calculateLengthLoops);
        // }
        if (item.field) {
            item.field.addEventListener('change', (event) => calculateLengthLoops(event.target));
        }
    });

    const smallIntestine = connectedFields.find((el) => el.name === 'small-intestine-length').field;
    const totalLoop = connectedFields.find((el) => el.name === 'total-loop-length').field;
    const alimentaryLoop = connectedFields.find((el) => el.name === 'length-alimentary-loop').field;
    const biliopancreaticLoop = connectedFields.find((el) => el.name === 'length-biliopancreatic-loop').field;

    function calculateLengthLoops(changedInput) {
        if (changedInput.name === 'small-intestine-length' && connectedFields.filter((item) => item.field?.value).length === connectedFields.length) {
            totalLoop.value = '';
            biliopancreaticLoop.value = '';
            if (alimentaryLoop) alimentaryLoop.value = '';
        }

        const smallIntestineValue = Number(smallIntestine.value); // 0
        const totalLoopValue = Number(totalLoop.value); // 1
        const alimentaryLoopValue = Number(alimentaryLoop?.value) || null; // 2
        const biliopancreaticValue = Number(biliopancreaticLoop.value); // 3

        const indices = [];
        const arrValues = [smallIntestineValue, totalLoopValue, alimentaryLoopValue, biliopancreaticValue];

        // Находим в массиве нули (0)
        let index = arrValues.indexOf(0);

        // Записываем индексы нулевых значений в новый массив
        while (index != -1) {
            indices.push(index);
            index = arrValues.indexOf(0, index + 1);
        }

        if (indices.length <= 1) {
            const index = indices[0] || 0;
            switch (index) {
                case 0:
                    // console.log('Длина тонкой кишки');
                    smallIntestine.value = totalLoopValue + alimentaryLoopValue + biliopancreaticValue;
                    inputTrigger(smallIntestine);
                    break;
                case 1:
                    // console.log('Длина общей петли');
                    totalLoop.value = smallIntestineValue - alimentaryLoopValue - biliopancreaticValue;
                    break;
                case 2:
                    // console.log('Длина алиментарной петли');
                    if (alimentaryLoop) {
                        alimentaryLoop.value = smallIntestineValue - totalLoopValue - biliopancreaticValue;
                    }
                    break;
                case 3:
                    // console.log('Длина билеопанкреатической петли');
                    biliopancreaticLoop.value = smallIntestineValue - totalLoopValue - alimentaryLoopValue;
                    break;
            }
        }
    }
}
