import { assignInputRules, setMasks } from '../../js/input-validate';
import { FileLoader } from '../../components/file-loader/file-loader';
import { setConnectionsForElements } from '../form-creating-operation/form-creating-operation';
import { hightlightRequiredFields } from '../../js/utils/create-group';

const selects = {
    'main-data': ['patient-status', 'who-directed'],
    disease: ['arterial-hypertension', 'diabetes-mellitus-2-type', 'duration-diabetes-mellitus', 'GERD', 'bronchial-asthma', 'functional-status', 'back-and-limb-pain', 'liver-diseases', 'hernia', 'fat-apron'],
    anamnesis: ['ASA-scale', 'smoking', 'PE-risk-factors', 'regular-medication-intake', 'weight-loss-attempts', 'previous-bariatric-surgery', 'history-of-operations', 'types-operations-in-anamnesis-select'],
    women: ['menstrual-function', 'polycystic-ovary'],
};

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
        required: {
            message: 'Обязательное поле',
        },
        customRange: {
            min: 60,
            max: 300,
        },
        // сюда можно добавить еще тесты
    },

    height: {
        required: {
            message: 'Обязательное поле',
        },
        customRange: {
            min: 140,
            max: 200,
        },
    },

    email: {
        required: {
            message: 'Обязательное поле',
        },
        email: {
            message: 'Неверный адрес электронной почты',
        },
    },

    phone: {
        required: {
            message: 'Обязательное поле',
        },
        range: {
            min: 16,
            max: 16,
            message: 'Номер телефона слишком короткий',
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
        required: {
            message: 'Обязательное поле',
        },
        range: {
            min: 10,
            max: 10,
            message: 'Формат xx.xx.xxxx',
        },
    },
};

document.addEventListener('DOMContentLoaded', () => {
    if (!location.pathname.includes('new-patient')) return;
    initSelects(selects);
    hightlightRequiredFields();
    setMasks();

    // устанавливаем правила
    assignInputRules(PATIENT_RULES);

    // СВЯЗИ
    // искать по всему документу или только внутри конкретной группы?
    const hasConnections = document.querySelectorAll('[data-has-connection]');
    hasConnections.forEach((hasConnectEl) => {
        // Из-за этого ошибка в консоли

        setConnectionsForElements(hasConnectEl, {
            'types-operations-anamnesis': [],
            gender: [
                {
                    value: 'Женский',
                },
            ],
            status: [
                {
                    value: 2,
                },
            ],
            diabetes: [
                {
                    value: 1,
                },
                {
                    value: 2,
                },
                {
                    value: 3,
                },
            ],
        });
    });
});
