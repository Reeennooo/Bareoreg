import { ItcCustomSelect } from '../../components/itc-custom-select/itc-custom-select';
import AirDatepicker from 'air-datepicker';
import { inputValidate } from '../../js/input-validate';
import IMask from 'imask/esm/index';
// Заболевание и его name
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

// Группа Анамнез
// anamnesis1 - Шкала АСА
// anamnesis2 - Курение
// anamnesis3 - Факторы риска ТЭЛА
// anamnesis4 - Регулярный прием препаратов
// anamnesis5 - Попытки снижения веса
// anamnesis6 - Предыдущая бариатрическая операция
// anamnesis7 - Операции в анамнезе
new ItcCustomSelect('#patient-status');
new ItcCustomSelect('#who-directed');
new ItcCustomSelect('#disease1');
new ItcCustomSelect('#disease2');
new ItcCustomSelect('#disease2-duration');
new ItcCustomSelect('#disease3');
new ItcCustomSelect('#disease4');
new ItcCustomSelect('#disease5');
new ItcCustomSelect('#disease6');
new ItcCustomSelect('#disease7');
new ItcCustomSelect('#disease8');
new ItcCustomSelect('#disease9');

// hidden
new ItcCustomSelect('#menstrual-function');
new ItcCustomSelect('#polycystic-ovary');


new ItcCustomSelect('#anamnesis1');
new ItcCustomSelect('#anamnesis2');
new ItcCustomSelect('#anamnesis3');
new ItcCustomSelect('#anamnesis4');
new ItcCustomSelect('#anamnesis5');
new ItcCustomSelect('#anamnesis6');
new ItcCustomSelect('#anamnesis7');

// calendar
new AirDatepicker('#calendar', {
    // inline: true,
});

const allRules = {
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
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // masks
    const elements = document.querySelectorAll("[data-mask='phone']");
    if (elements) {
        const phoneOptions = {
            mask: '+{7}(000)000-00-00',
        };
        elements.forEach((el) => {
            IMask(el, phoneOptions);
        });
    }
    // устанавливаем правила
    assignInputRules();

    // СВЯЗИ
    // искать по всему документу или только внутри конкретной группы?
    const hasConnections = document.querySelectorAll('[data-has-connection]')
    hasConnections.forEach(hasConnectEl => {
        if(hasConnectEl.dataset.hasConnection === 'diabetes') {
            let connectedEl = document.querySelector(`[data-connected=${hasConnectEl.dataset.hasConnection}]`)
            let observer = new MutationObserver((mutationRecords) => {
                for(const mutation of mutationRecords) {
                    // console.log(mutation.target)
                    if(mutation.target.dataset.index > 1) {
                        connectedEl.style.display = 'block'
                    } else {

                        connectedEl.style.display = 'none'
                    }
                }
                
            })
            let button = hasConnectEl.querySelector('button');
            observer.observe(button, {attributes: true, attributeFilter: ['value']})
        } 
        else if(hasConnectEl.dataset.hasConnection === 'gender') {
            let connectedEl = document.querySelector(`[data-connected=${hasConnectEl.dataset.hasConnection}]`)
            let observer = new MutationObserver((mutationRecords) => {
                for(const mutation of mutationRecords) {
                    // console.log(mutation)
                    if(mutation.target.dataset.value === 'woman') {
                        connectedEl.style.display = 'grid'
                    } else {
                        connectedEl.style.display = 'none'
                    }
                }
                
            })
            observer.observe(hasConnectEl, {attributes: true, attributeFilter: ['data-value']})
        }
        else if(hasConnectEl.dataset.hasConnection === 'status') {
            let connectedEl = document.querySelector(`[data-connected=${hasConnectEl.dataset.hasConnection}]`)
            let button = hasConnectEl.querySelector('button');
            let observer = new MutationObserver((mutationRecords) => {
                for(const mutation of mutationRecords) {
                    if(mutation.target.value === 'out-observation') {
                        connectedEl.style.display = 'block'
                    } else {
                        connectedEl.style.display = 'none'
                    }
                }
                
            })
            observer.observe(button, {attributes: true, attributeFilter: ['value']})
        }
    })
});

function assignInputRules() {
    const allInputs = document.querySelectorAll('.input-custom input');
    const rules = Object.keys(allRules);

    allInputs.forEach((input) => {
        if (rules.indexOf(input.name) !== -1) {
            input.addEventListener('input', () => inputValidate(input, allRules[input.name]));
            // может не стоит blur?
            input.addEventListener('blur', () => inputValidate(input, allRules[input.name]));
        }
    });
}
