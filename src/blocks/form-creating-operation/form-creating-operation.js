import AirDatepicker from 'air-datepicker';
import { ItcCustomSelect } from '../../components/itc-custom-select/itc-custom-select';
import { assignInputRules } from '../../js/input-validate';

const allRules = {
    // key - это name инпута
    // value - это правила проверки инпута
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
    surgeon: {
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
                    connectedEl.style.display = 'block';
                } else {
                    connectedEl.style.display = 'none';
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
                        document.querySelector(`[data-connected=${element.dataset.hasConnection}]`).style.display = 'none';
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
});
