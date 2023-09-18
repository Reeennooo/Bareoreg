import AirDatepicker from 'air-datepicker';
import { ItcCustomSelect } from '../../components/itc-custom-select/itc-custom-select';
import { assignInputRules } from '../../js/input-validate';

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
    'ballon-filling-volume': {
        required: {
            message: 'Обязательное поле',
        },
        range: {
            min: 200,
            max: 700,
            message: 'Минимальное значение: 200, максимальное значение 700',
        },
    },
    'date-ballon-delete': {
        required: {
            message: 'Обязательное поле',
        },
    },
};

document.addEventListener('DOMContentLoaded', () => {
    assignInputRules(allRules);
    // calendars
    new AirDatepicker('#calendar-operation', {
        // inline: true,
    });
    new AirDatepicker('#calendar-discharge', {});
    new AirDatepicker('#calendar-adjustment-bandage', {});
    new AirDatepicker('#calendar-ballon-delete', {});

    // выпадающие списки
    new ItcCustomSelect('#surgeon');
    new ItcCustomSelect('#assistants');
    const selectTypeOperation = new ItcCustomSelect('#type-of-operation');
    new ItcCustomSelect('#reason-for-revision');
    const selectKindOperation = new ItcCustomSelect('#kind-of-operation');
    new ItcCustomSelect('#access');
    new ItcCustomSelect('#pain-relief');
    new ItcCustomSelect('#simultaneous-operation');

    // RYGB (Гастрошунтирование)
    new ItcCustomSelect('#stitching-machine');
    new ItcCustomSelect('#strengthening-the-seam');
    new ItcCustomSelect('#used-cassettes');
    new ItcCustomSelect('#indent-gatekeeper');
    new ItcCustomSelect('#hiatus-treatment');
    new ItcCustomSelect('#mobilization-bulb');
    new ItcCustomSelect('#gut-place');
    new ItcCustomSelect('#stitching-machine2');
    new ItcCustomSelect('#used-cassettes2');
    new ItcCustomSelect('#used-cassettes2');
    new ItcCustomSelect('#manual-anastomosis');
    new ItcCustomSelect('#select-diameter-anastomosis');
    new ItcCustomSelect('#formation-of-EEA');
    new ItcCustomSelect('#stitching-machine3');
    new ItcCustomSelect('#used-cassettes3');
    new ItcCustomSelect('#select-diameter-anastomosis2');
    new ItcCustomSelect('#manual-anastomosis2');
    new ItcCustomSelect('#closure-hernia-defects');
    new ItcCustomSelect('#thickness-drainage-tube');
    new ItcCustomSelect('#hemostasis-from-staplers');

    new ItcCustomSelect('#diameter-of-the-anastomosis');

    // Внутрижелудочный баллон
    new ItcCustomSelect('#ballon-type');

    // Бандажирование желудка
    new ItcCustomSelect('#type-of-bandage');

    // BPD
    new ItcCustomSelect('#bpd-mobilization-bulb');
    new ItcCustomSelect('#bpd-formation-of-EEA');

    // связи
    const hasConnections = document.querySelectorAll('[data-has-connection]');
    hasConnections.forEach((hasConnectEl) => {
        if (hasConnectEl.dataset.hasConnection === 'intraoperative-complications' || hasConnectEl.dataset.hasConnection === 'emergency-situations') {
            let connectedEl = document.querySelector(`[data-connected=${hasConnectEl.dataset.hasConnection}]`);
            function checkState() {
                if (hasConnectEl.checked) {
                    connectedEl.classList.add('is-active');
                } else {
                    connectedEl.classList.remove('is-active');
                }
            }
            hasConnectEl.addEventListener('change', checkState);
        } else if (hasConnectEl.dataset.hasConnection === 'no-complications') {
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
        } else if (hasConnectEl.dataset.hasConnection === 'revision') {
            let connectedEl = document.querySelector(`[data-connected=${hasConnectEl.dataset.hasConnection}]`);
            let button = hasConnectEl.querySelector('button');
            let observer = new MutationObserver((mutationRecords) => {
                for (const mutation of mutationRecords) {
                    const index = mutation.target.dataset.index;
                    if (index === '1' || index === '3') {
                        connectedEl.classList.add('is-active');
                    } else {
                        connectedEl.classList.remove('is-active');
                    }
                }
            });
            observer.observe(button, { attributes: true, attributeFilter: ['data-index'] });
        } else if (hasConnectEl.dataset.hasConnection === 'access') {
            let connectedEls = document.querySelectorAll(`[data-connected=${hasConnectEl.dataset.hasConnection}]`);
            let button = hasConnectEl.querySelector('button');
            let observer = new MutationObserver((mutationRecords) => {
                for (const mutation of mutationRecords) {
                    const value = mutation.target.value;
                    console.log(value);
                    if (value === 'conversion-to-laparotomy' || value === 'laparotomy') {
                        for (const element of connectedEls) {
                            element.classList.add('is-active');
                        }
                    } else {
                        for (const element of connectedEls) {
                            element.classList.remove('is-active');
                        }
                    }
                }
            });
            observer.observe(button, { attributes: true, attributeFilter: ['value'] });
        }

        // связи операций.
        // Будем искать элементы которые привязаны к полю операция data-connected='operation'
        // т.к таких элементов будет несколько, то нам придётся перебрать их
        // и сделать активным только тот элемент у которого data-name === value активного элемента списка.
        else if (hasConnectEl.dataset.hasConnection === 'operation') {
            let connectedElements = document.querySelectorAll(`[data-connected=${hasConnectEl.dataset.hasConnection}]`);
            // console.log(connectedElements);
            let button = selectKindOperation._elToggle;
            let buttonObvserver = new MutationObserver(() => {
                setOperationBlock(button, connectedElements);
            });
            buttonObvserver.observe(button, { attributeFilter: ['value'] });
        }
    });

    // УСТАНОВКА ОПЕРАЦИЙ И ОТКРЫТИЕ СЛЕДУЮЩЕГО ЭТАПА
    const observers = [];
    const operationForm = document.querySelector('.form-creating-operation__operation');
    const operationNameElement = operationForm.querySelector('.group__add-info');
    const selectOperationHint = operationForm.querySelector('.group__info');

    function setOperationBlock(observationElement, connectedElements) {
        // убираем предыдущих наблюдателей
        observers.forEach((observer) => observer.disconnect());
        observers.length = 0;
        // устанавливаем название операции в блок
        let operationName = selectKindOperation._textSelectedEl.innerText;
        operationNameElement.innerText = operationName;
        const selectedOperationValue = observationElement.value;
        const connectedGroupArr = [...connectedElements];
        let operationNumber = 1;

        connectedGroupArr.forEach((group) => {
            if (group.classList.contains('is-active')) {
                group.classList.remove('is-active');
            }
        });

        const operationGroups = connectedGroupArr.filter((group) => group.dataset.name === selectedOperationValue && group.dataset.number === String(operationNumber));

        if (!operationGroups.length) return;

        showOperationGroup(operationGroups);

        function showOperationGroup(groups) {
            if (!groups.length) return;

            for (const group of groups) {
                group.classList.add('is-active');

                if (group.classList.contains('is-filled')) {
                    operationNumber++;

                    const nextOperationGroups = connectedGroupArr.filter((group) => group.dataset.name === selectedOperationValue && group.dataset.number === String(operationNumber));
                    if (nextOperationGroups) {
                        showOperationGroup(nextOperationGroups);
                    }
                    return;
                }

                createObserver(group);
            }
            selectOperationHint.style.display = 'none';
        }

        function createObserver(observeredElement) {
            // console.log('Создаю наблюдателя за элементном:');
            // console.log(observeredElement);

            const operationGroupObserver = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.target.classList.contains('is-filled')) {
                        operationNumber++;
                        const nextOperationGroups = connectedGroupArr.filter((group) => group.dataset.name === selectedOperationValue && group.dataset.number === String(operationNumber));
                        console.log(nextOperationGroups);
                        showOperationGroup(nextOperationGroups);
                    }
                }
            });
            operationGroupObserver.observe(observeredElement, { attributeFilter: ['class'] });
            observers.push(operationGroupObserver);
        }
    }

    // связи пунктов в различных select
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
});
