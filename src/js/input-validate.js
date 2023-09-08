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

export function inputValidate(input, rules) {
    const inputWrapper = input.closest('.input-custom');
    const inputMessage = inputWrapper.querySelector('.input-custom__message');
    const result = approve.value(input.value, rules);
    if (!result.required.approved) {
        inputMessage.innerText = result.required.errors[0];
        inputMessage.classList.add('error-message');
        input.classList.add('is-invalid');
    } else if (!result.approved) {
        // console.log(result);
        inputMessage.innerText = result.errors[0];
        inputMessage.classList.add('error-message');
        input.classList.add('is-invalid');
    } else {
        input.classList.remove('is-invalid');
        inputMessage.classList.remove('error-message');
    }
}
