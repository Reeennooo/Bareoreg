import { assignInputRules } from '../../js/input-validate';
import AirDatepicker from 'air-datepicker';
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
    initSelects(selects);
    assignInputRules(rules);
    new window.Calendar('#calendar-observation')
    new window.Calendar('#calendar-adjusting-bandage')
});
