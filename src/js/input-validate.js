let approve = require('approvejs');
/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
// customRange
let customRange = {
    expects: ['min', 'max'],
    message: 'Минимальное значение: {min}, максимальное значение {max}',
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

approve.addTest(customRange, 'customRange');

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

    // console.log(result);
    if (!result.required.approved) {
        message.innerText = result.required.errors[0];
        message.classList.add('error-message');
        element.classList.add('is-invalid');
    } else if (!result.approved) {
        message.innerText = result.errors[0];
        message.classList.add('error-message');
        element.classList.add('is-invalid');
    } else {
        element.classList.remove('is-invalid');
        message.classList.remove('error-message');
    }
}

export function assignInputRules(allRules) {
    const AllElements = document.querySelectorAll('.input-custom input, .itc-select button');
    const rules = Object.keys(allRules);

    AllElements.forEach((element) => {
        if (rules.indexOf(element.name) !== -1) {
            if (element.dataset.select === 'toggle') {
                const select = element.closest('.itc-select');
                // const selectItems = select.querySelectorAll('.itc-select__option');
                select.addEventListener('click', () => checkValidate(select, allRules[element.name]));
                // selectItems.forEach((item) => item.addEventListener('click', () => checkValidate(select, allRules[element.name])));
                const observer = new MutationObserver(() => checkValidate(select, allRules[element.name]));
                observer.observe(element, { attributes: true, attributeFilter: ['value'] });
            } else {
                element.addEventListener('input', () => checkValidate(element, allRules[element.name]));
                element.addEventListener('blur', () => checkValidate(element, allRules[element.name]));
            }
        }
    });
}
