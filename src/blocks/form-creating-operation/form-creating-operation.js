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
};

document.addEventListener('DOMContentLoaded', () => {
    assignInputRules(allRules);
    // calendars
    new AirDatepicker('#calendar-operation', {
        // inline: true,
    });
    new AirDatepicker('#calendar-discharge', {});

    // выпадающие списки
    new ItcCustomSelect('#surgeon');
    new ItcCustomSelect('#assistants');
    new ItcCustomSelect('#type-of-operation');
    new ItcCustomSelect('#reason-for-revision');
    new ItcCustomSelect('#kind-of-operation');
    new ItcCustomSelect('#access');
    new ItcCustomSelect('#pain-relief');
    new ItcCustomSelect('#simultaneous-operation');

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
                        // document.querySelector(`[data-connected=${element.dataset.hasConnection}]`).style.display = 'none';
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
                        // connectedEl.style.display = 'block';
                    } else {
                        connectedEl.classList.remove('is-active');
                        // connectedEl.style.display = 'none';
                    }
                }
            });
            observer.observe(button, { attributes: true, attributeFilter: ['data-index'] });
        }
    });
});
