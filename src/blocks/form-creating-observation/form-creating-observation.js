import { setMasks } from '../../js/input-validate';
import { assignInputRules } from '../../js/input-validate';
import { FileLoader } from '../../components/observation-file-loader/observation-file-loader';
import { setConnectionsForElements } from '../form-creating-operation/form-creating-operation';

const selects = {
    'gastric-bandage': ['reason-adjusting-bandage'],
    'general-information': ['arterial-hypertension', 'compensation-SD', 'GERD', 'bronchial-asthma', 'functional-status', 'back-and-limb-pain', 'hernia', 'sagging-skin', 'fat-apron'],
    woman: ['polycystic-ovary', 'menstrual-function', 'onset-of-pregnancy'],
};

const rules = {
    'date-observation': {
        required: {
            message: 'Обязательное поле',
        },
    },
};

const CONNECTED = {
    'adjusting-bandage': [],
};

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

document.addEventListener('DOMContentLoaded', () => {
    if (!location.pathname.includes('creating-observation')) return;

    const hasConnections = document.querySelectorAll('[data-has-connection]');
    hasConnections.forEach((hasConnectEl) => {
        setConnectionsForElements(hasConnectEl, CONNECTED);
    });

    new FileLoader({
        type: 'dropzone',
        name: 'create-observation-files',
        target: '#create-observation-files',
    });
    setMasks();
    initSelects(selects);
    assignInputRules(rules);
    new window.Calendar('#calendar-observation');
    new window.Calendar('#calendar-adjusting-bandage');
});
