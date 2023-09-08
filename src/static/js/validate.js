function ucFirst(str) {
    if (!str) return;
    return str[0].toUpperCase() + str.slice(1);
}

// Ограничения при вводе
// only-text input
document.addEventListener('DOMContentLoaded', () => {
    let onlyTxtInputs = document.querySelectorAll('.only-txt input');

    onlyTxtInputs.forEach((input) => {
        if (input.name === 'name' || input.name === 'middle-name' || input.name === 'surname') {
            input.addEventListener('blur', () => {
                if (input.value) {
                    input.value = ucFirst(input.value);
                }
            });
        }
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace') return;
            if (!/[А-я]|-/.test(event.key)) event.preventDefault();
        });
    });

    // only-number input
    let onlyNumberInputs = document.querySelectorAll('.only-number input');
    onlyNumberInputs.forEach((input) => {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace') return;
            if (!/[0-9]|\./.test(event.key)) event.preventDefault();
        });
    });

    // group field
    const groups = document.querySelectorAll('.group');
    groups.forEach((group) => {
        // console.log(group)
        // Проверяем заполненость group при изменениях дочерних элементов.
        const groupInner = group.querySelector('.group__inner');
        const requiredElements = groupInner.querySelectorAll('[data-required]');
        if(!requiredElements.length) {group.classList.add('required-are-filled')}
        // console.log(requiredElements)
        requiredElements.forEach((requiredEl) => {
            if (requiredEl.classList.contains('itc-select')) {
                const button = requiredEl.querySelector('button');
                let observer = new MutationObserver(() => checkFilledInput(group, requiredElements));
                observer.observe(button, { attributes: true, attributeFilter: ['value'] });
            } else if (requiredEl.classList.contains('group-radio-buttons')) {
                let observer = new MutationObserver(() => checkFilledInput(group, requiredElements));
                observer.observe(requiredEl, { attributes: true, attributeFilter: ['class'] });
            } else {
                requiredEl.addEventListener('change', () => checkFilledInput(group, requiredElements));
            }
            // console.log(requiredEl.nodeName);
        });

        // Отслеживаем поялвение класса 'is-filled' у группы.
        let observer = new MutationObserver((mutationRecords) => {
            checkFilledForm(mutationRecords[0].target)
            console.log(mutationRecords)
        });
        observer.observe(group, {attributeFilter: ['class'], attributeOldValue: true})
    });

    function checkFilledForm(mutationElement) {
        const form = mutationElement.closest('form');
        if(!form) return
        const btnSubmit = form.querySelector('.submit-button');
        const groups = form.querySelectorAll('.group');
        const groupsBoolean = [...groups].map(group => {
            if(group.classList.contains('required-are-filled')) {
                return true
            } else {
                return false
            }
        })
        if(groupsBoolean.indexOf(false) === -1) {
            btnSubmit.removeAttribute('disabled')
        } else {
            btnSubmit.setAttribute('disabled', 'disabled')
        }
        console.log(groupsBoolean)
    }
    // const formNewPatient = document.querySelector('.form-new-patient')
    // checkFilledForm(formNewPatient)

    function checkFilledInput(group, requiredElements) {
        let inputsField = false;
        const checkResult = [...requiredElements].map((element) => {
            if (element.classList.contains('itc-select')) {
                if (element.querySelector('button').getAttribute('value')) {
                    return true;
                } else {
                    return false;
                }
            } else if (element.classList.contains('group-radio-buttons')) {
                if (element.classList.contains('is-filled')) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (element.value && !element.classList.contains('is-invalid')) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        if (checkResult.indexOf(false) === -1) {
            inputsField = true;
        }
        if(inputsField) {
            group.classList.add('is-filled')
            group.classList.add('required-are-filled')
        } 
        else if(group.classList.contains('is-filled')) {
            group.classList.remove('is-filled')
            group.classList.remove('required-are-filled')
        }
        // inputField = checkResult.indexOf(false)
        console.log(checkResult);
    }
});
