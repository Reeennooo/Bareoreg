import IMask from 'imask/esm/index';
import { assignInputRules, setMasks } from '../../js/input-validate';
import { FileLoader } from '../../components/observation-file-loader/observation-file-loader';

const selects = {
    'main-data': ['patient-status', 'who-directed'],
    disease: ['disease1', 'disease2', 'disease3', 'disease4', 'disease5', 'disease6', 'disease7', 'disease8', 'disease9'],
    anamnesis: ['anamnesis1', 'anamnesis2', 'anamnesis3', 'anamnesis4', 'anamnesis5', 'anamnesis6', 'anamnesis7'],
    women: ['menstrual-function', 'polycystic-ovary'],
};

// заболевания
// disease1 - Артериальная гипертензия
// disease2 - Сахарный диабет 2-го типа
// disease2-duration - Длительность течения СД2
// disease3 - ГЭРБ
// disease4 - Бронхиальная астма
// disease5 - Функциональный статус
// disease6 - Боль в спине и конечностях
// disease7 - Заболевания печени
// disease8 - Грыжа
// disease9 - Жировой фартук
// анамнез
// anamnesis1 - Шкала АСА
// anamnesis2 - Курение
// anamnesis3 - Факторы риска ТЭЛА
// anamnesis4 - Регулярный прием препаратов
// anamnesis5 - Попытки снижения веса
// anamnesis6 - Предыдущая бариатрическая операция
// anamnesis7 - Операции в анамнезе

// calendar
new window.Calendar('#calendar-date-birth', { position: 'absolute' });

// dropZone
const newPatientFiles = new FileLoader({
    type: 'dropzone',
    name: 'new-patient-files',
    target: '#new-patient-files',
});

function initSelects(selects) {
    const selectsList = Object.entries(selects);
    let allSelectsId = [];
    selectsList.map((item) => {
        allSelectsId = allSelectsId.concat(item[1]);
    });
    allSelectsId.forEach((selectId) => {
        new window.ItcCustomSelect(`#${selectId}`);
    });
}

export const PATIENT_RULES = {
    // key - это name инпута
    // value - это правила проверки инпута
    name: {
        required: {
            message: 'Обязательное поле',
        },
    },
    surname: {
        required: {
            message: 'Обязательное поле',
        },
    },

    weight: {
        customRange: {
            min: 60,
            max: 300,
        },
        required: {
            message: 'Обязательное поле',
        },
        // сюда можно добавить еще тесты
    },

    height: {
        customRange: {
            min: 140,
            max: 200,
        },
        required: {
            message: 'Обязательное поле',
        },
    },

    email: {
        email: {
            message: 'Неверный адрес электронной почты',
        },
        required: {
            message: 'Обязательное поле',
        },
    },

    phone: {
        range: {
            min: 16,
            max: 16,
            message: 'Номер телефона слишком короткий',
        },
        required: {
            message: 'Обязательное поле',
        },
    },

    city: {
        required: {
            message: 'Обязательное поле',
        },
    },

    'middle-name': {
        required: {
            message: 'Обязательное поле',
        },
    },

    'date-of-birth': {
        range: {
            min: 10,
            max: 10,
            message: 'Формат xx.xx.xxxx',
        },
        required: {
            message: 'Обязательное поле',
        },
    },
};

document.addEventListener('DOMContentLoaded', () => {
    initSelects(selects);
    setMasks();
    // устанавливаем правила
    assignInputRules(PATIENT_RULES);

    // СВЯЗИ
    // искать по всему документу или только внутри конкретной группы?
    const hasConnections = document.querySelectorAll('[data-has-connection]');
    hasConnections.forEach((hasConnectEl) => {
        if (hasConnectEl.dataset.hasConnection === 'diabetes') {
            let connectedEl = document.querySelector(`[data-connected=${hasConnectEl.dataset.hasConnection}]`);
            let observer = new MutationObserver((mutationRecords) => {
                for (const mutation of mutationRecords) {
                    // console.log(mutation.target)
                    if (mutation.target.dataset.index > 1) {
                        connectedEl.classList.add('is-active');
                    } else {
                        connectedEl.classList.remove('is-active');
                    }
                }
            });
            let button = hasConnectEl.querySelector('button');
            observer.observe(button, { attributes: true, attributeFilter: ['value'] });
        } else if (hasConnectEl.dataset.hasConnection === 'gender') {
            let connectedEl = document.querySelector(`[data-connected=${hasConnectEl.dataset.hasConnection}]`);
            let observer = new MutationObserver((mutationRecords) => {
                for (const mutation of mutationRecords) {
                    // console.log(mutation)
                    if (mutation.target.dataset.value === 'woman') {
                        connectedEl.classList.add('is-active');
                    } else {
                        connectedEl.classList.remove('is-active');
                    }
                }
            });
            observer.observe(hasConnectEl, { attributes: true, attributeFilter: ['data-value'] });
        } else if (hasConnectEl.dataset.hasConnection === 'status') {
            let connectedEl = document.querySelector(`[data-connected=${hasConnectEl.dataset.hasConnection}]`);
            let button = hasConnectEl.querySelector('button');
            let observer = new MutationObserver((mutationRecords) => {
                for (const mutation of mutationRecords) {
                    if (mutation.target.value === 'out-observation') {
                        connectedEl.style.display = 'block';
                    } else {
                        connectedEl.style.display = 'none';
                    }
                }
            });
            observer.observe(button, { attributes: true, attributeFilter: ['value'] });
        }
    });
});
