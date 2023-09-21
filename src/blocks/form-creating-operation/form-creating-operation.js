import AirDatepicker from 'air-datepicker';
import { ItcCustomSelect } from '../../components/itc-custom-select/itc-custom-select';
import { assignInputRules } from '../../js/input-validate';
import { initGroupObserve } from '../../js/validate';
import { setRadioHandler } from '../../components/group-radio-buttons/group-radio-buttons';
import { OPERATIONS } from '../../js/operation-data';
import { OPERATIONS_RULES } from '../../js/operation-data';
import tippy from 'tippy.js';

const allRules = {
    // key - это name инпута
    // value - это правила проверки инпута
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
            message: 'Формат xx.xx.xxxx',
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
};

const selects = {
    'general-information': ['surgeon', 'assistants', 'type-of-operation', 'reason-for-revision', 'kind-of-operation', 'access', 'simultaneous-operation'],
    hospital: ['vomiting'],
};

function initSelects(selects) {
    const selectsList = Object.entries(selects);
    let allSelectsId = [];
    selectsList.map((item) => {
        allSelectsId = allSelectsId.concat(item[1]);
    });
    allSelectsId.forEach((selectId) => {
        if (selectId === 'type-of-operation') {
            selectTypeOperation = new ItcCustomSelect(`#${selectId}`);
        } else if (selectId === 'kind-of-operation') {
            selectKindOperation = new ItcCustomSelect(`#${selectId}`);
        } else {
            new ItcCustomSelect(`#${selectId}`);
        }
    });
}

let selectTypeOperation;
let selectKindOperation;

document.addEventListener('DOMContentLoaded', () => {
    assignInputRules(allRules);
    initSelects(selects);

    // calendars
    new AirDatepicker('#calendar-operation', {
        // inline: true,
    });
    new AirDatepicker('#calendar-discharge', {});
    new AirDatepicker('#calendar-adjustment-bandage', {});
    new AirDatepicker('#calendar-ballon-delete', {});

    const connectedRules = {
        // key - имя связи
        // value - [] подходящих значений(для выпадающих списков можно использовать индексы(формат число)).
        access: ['laparotomy', 'conversion-to-laparotomy'],
        revision: [1, 3],
        'intraoperative-complications': [],
        'emergency-situations': [],
        'gut-indent': ['value2', 'value4'],
        surgeon: ['value2'],
    };

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
            if (selectKindOperation.selectedIndex === '8') {
                assignInputRules({
                    'duration-operation': {
                        customRange: {
                            min: 10,
                            max: 30,
                        },
                        required: {
                            message: 'Обязательное поле',
                        },
                    },
                });
            } else {
                assignInputRules({
                    'duration-operation': {
                        customRange: {
                            min: 40,
                            max: 120,
                        },
                        required: {
                            message: 'Обязательное поле',
                        },
                    },
                });
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

    function setConnectionsForElements(element, rules) {
        let connectedKey = '';

        function putObservation(element) {
            if (element.closest('.group-radio-buttons')) {
                const monitoringElement = element.closest('.group-radio-buttons');
                const elementObserver = new MutationObserver((mutations) => {
                    console.log(connectedKey);
                    let connectedElements = document.querySelectorAll(`[data-connected=${connectedKey}]`);
                    if (connectedRules[connectedKey].includes(mutations[0].target.dataset.value)) {
                        connectedElements.forEach((connectedEL) => connectedEL.classList.add('is-active'));
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
                    // console.log(mutations[0].target.dataset.index);
                    // console.log(mutations[0].target.value);
                    if (connectedRules[connectedKey].includes(mutations[0].target.value) || connectedRules[connectedKey].includes(Number(mutations[0].target.dataset.index))) {
                        console.log(connectedElements);
                        connectedElements.forEach((connectedEL) => connectedEL.classList.add('is-active'));
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

        if (element.dataset.hasConnection) {
            connectedKey = element.dataset.hasConnection;
            putObservation(element);
        } else if (element.dataset.connected) {
            connectedKey = element.dataset.connected;
            if (connectedRules[connectedKey]) {
            }
        }
    }

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

    function createAditionalGroup(groupData) {
        const group = document.createElement('div');
        // console.log(groupData);
        const innerElements = groupData.content.map((item) => {
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
        // console.log(innerElements);
        const groupAddForm = group.querySelector('.group__additional-form');
        innerElements.map((item) => {
            groupAddForm.append(item);
        });

        // Появление следующего этапа операции
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.target.classList.contains('is-filled')) {
                    // console.log('Терперь группа is-flled:');
                    // console.log(mutation.target);
                    const nextStep = document.querySelector(`.form-creating-operation__operation [data-number='${groupData.number + 1}']`);
                    nextStep?.classList.add('is-active');
                }
            }
        });
        observer.observe(group, { attributeFilter: ['class'] });

        return group;
    }

    function createInput(data) {
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
        if (data.mod === 'calendar') {
            new AirDatepicker(input.querySelector('input'), {});
        }

        if (data.addClass) {
            input?.querySelector('input').classList.add(data.addClass);
        }

        if (data.connected) {
            input.setAttribute('data-connected', data.connected);
            checkConnectionValue(input, connectedRules);
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

        if (data.connected) {
            radioGroup.setAttribute('data-connected', data.connected);
            checkConnectionValue(radioGroup, connectedRules);
        }

        setRadioHandler(radioGroup);

        return radioGroup;
    }

    function createSelect(data) {
        const select = document.createElement('div');
        select.setAttribute('id', data.name);
        if (data.required) {
            select.setAttribute('data-required', '');
        }
        initSelect(select, data);
        if (data.hasConnection) {
            select.setAttribute('data-has-connection', data.hasConnection);
            setConnectionsForElements(select);
        }
        if (data.connected) {
            select.setAttribute('data-connected', data.connected);
            checkConnectionValue(select, connectedRules);
        }
        return select;
    }

    function createTextarea(data) {
        const textarea = document.createElement('div');
        textarea.classList.add('textarea');
        textarea.innerHTML = `<textarea name='${data.name}' id='${data.id}' placeholder=''></textarea><label for='${data.id}'>${data.placeholder}</label>`;

        if (data.addClass) {
            textarea.classList.add(data.addClass);
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

    function initSelect(select, data) {
        new ItcCustomSelect(select, {
            name: data.name,
            placeholder: data.placeholder,
            options: data.options,
            multiple: data.multiple,
            targetValue: data.targetValue,
        });
    }

    // проверка связи для созданных с помощью JS элементов.
    function checkConnectionValue(element, connectedRules) {
        // console.log(element);
        const connectedKey = element.dataset.connected;
        const connectionParent = document.querySelector(`[data-has-connection=${connectedKey}]`);
        let monitoringElement;

        if (!connectionParent) return;

        function activeToggler(element, state) {
            if (state) {
                element.classList.add('is-active');
            } else if (element.classList.contains('is-active')) {
                element.classList.remove('is-active');
            }
        }

        if (connectionParent.closest('.group-radio-buttons')) {
            monitoringElement = connectionParent.closest('.group-radio-buttons');
            activeToggler(element, connectedRules[connectedKey].includes(monitoringElement.dataset.value));
            return;
        }
        if (connectionParent.closest('.itc-select')) {
            monitoringElement = connectionParent.querySelector('button');
            activeToggler(element, connectedRules[connectedKey].includes(monitoringElement.value));
            return;
        }
        if (connectionParent.closest('.checkbox')) {
            monitoringElement = connectionParent.closest('.group-radio-buttons');
            activeToggler(element, monitoringElement.checked);
            return;
        }
    }
});
