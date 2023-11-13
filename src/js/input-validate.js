import IMask from 'imask';
let approve = require('approvejs');
/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
// customRange
let customRange = {
    expects: ['min', 'max'],
    message: 'Диапазон значений: {min}-{max}',
    validate: function (value, params) {
        let result = {
            valid: true,
            errors: [],
        };

        if (value <= 0) {
            result.valid = false;
            // this.message = 'Ты толстый лох';
            // console.log(this);
        } else if (value >= params.min && value <= params.max) {
            result.valid = true;
        } else {
            result.valid = false;
        }

        return result;
    },
};

let minValue = {
    expects: ['min'],
    message: 'Не может быть меньше {min}',
    validate: function (value, params) {
        let result = {
            valid: true,
            errors: [],
        };

        if (value < params.min) {
            result.valid = false;
        }

        return result;
    },
};

let dateRange = {
    expects: ['minDate'],
    message: 'Неверная дата',
    validate: function (value, params) {
        let result = {
            valid: true,
            errors: [],
        };

        if (value.length < 10) return result;

        const minYear = params.minDate.slice(6, 10);
        const minMonth = params.minDate.slice(3, 5);
        const minDay = params.minDate.slice(0, 2);
        const minDate = new Date(`${minYear}-${minMonth}-${minDay}`);

        const valueDateYear = value.slice(6, 10);
        const valueDateMonth = value.slice(3, 5);
        const valueDateDay = value.slice(0, 2);
        const valueDate = new Date(`${valueDateYear}-${valueDateMonth}-${valueDateDay}`);

        if (minDate <= valueDate) {
            // console.log('Корректная дата');
            result.valid = true;
        } else {
            // console.log('Слишком рано');
            result.valid = false;
        }

        return result;
    },
};

approve.addTest(customRange, 'customRange');
approve.addTest(dateRange, 'dateRange');
approve.addTest(minValue, 'minValue');

export function checkValidate(element, rules) {
    let message;
    let result;

    // input
    const inputWrapper = element.closest('.input-custom');
    if (inputWrapper) {
        message = inputWrapper.querySelector('.input-custom__message');
        result = approve.value(element.value, rules);
    }
    // select
    else {
        const button = element.querySelector('button');
        message = element.querySelector('.itc-select__message');
        result = approve.value(button.value, rules);
    }

    console.log(result);
    // if (result.required && !result?.required?.approved) {
    //     message.innerText = result.required.errors[0];
    //     message.classList.add('error-message');
    //     element.classList.add('is-invalid');
    // } else
    if (!result.approved) {
        message.innerText = result.errors[0];
        message.classList.add('error-message');
        element.classList.add('is-invalid');
    } else {
        element.classList.remove('is-invalid');
        message.classList.remove('error-message');
    }
}

export function assignInputRules(allRules, checkRightNow) {
    const AllElements = document.querySelectorAll('.input-custom input, .itc-select button');
    const rules = Object.keys(allRules);
    // console.log(allRules);
    AllElements.forEach((element) => {
        if (rules.indexOf(element.name) !== -1) {
            let currentElement;
            if (element.dataset.select === 'toggle') {
                currentElement = element.closest('.itc-select');
                // const selectItems = select.querySelectorAll('.itc-select__option');
                currentElement.addEventListener('click', () => checkValidate(currentElement, allRules[element.name]));
                // selectItems.forEach((item) => item.addEventListener('click', () => checkValidate(select, allRules[element.name])));
                const observer = new MutationObserver(() => checkValidate(currentElement, allRules[element.name]));
                observer.observe(element, { attributes: true, attributeFilter: ['value'] });
            } else {
                currentElement = element;
                currentElement.addEventListener('input', () => checkValidate(currentElement, allRules[element.name]));
                // currentElement.addEventListener('change', () => checkValidate(currentElement, allRules[element.name]));
                currentElement.addEventListener('blur', () => {
                    if (!currentElement.value && !currentElement.hasAttribute('data-required')) {
                        currentElement.classList.remove('is-invalid');
                    }
                });
            }

            if (checkRightNow) {
                let inputInner;
                if (currentElement.closest('.itc-select')) {
                    inputInner = currentElement.querySelector('input');
                } else {
                    inputInner = currentElement;
                }
                // console.log(inputInner);
                if (inputInner.value) {
                    checkValidate(currentElement, allRules[element.name]);
                }
            }
        }
    });
}

export function setMasks(input) {
    // masks
    const maskRules = {
        phone: {
            mask: '+{7}(#00)000-00-00',
            definitions: {
                '#': /9/,
            },
        },
        date: {
            mask: Date,
            // min: new Date(1990, 0, 1),
            // max: new Date(2020, 0, 1),
            // lazy: false,
        },
    };

    if (input) {
        IMask(input, maskRules[input.dataset.mask]);
        return;
    }

    const elements = document.querySelectorAll('[data-mask]');
    if (elements) {
        elements.forEach((el) => {
            IMask(el, maskRules[el.dataset.mask]);
        });
    }
}
