function ucFirst(str) {
    if (!str) return;
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

const observers = [];
export function initGroupObserve() {
    // console.log(observers);
    if (observers && observers.length > 0) {
        observers.forEach((observer) => {
            observer.disconnect();
        });
    }
    observers.length = 0;

    const groups = document.querySelectorAll('.group');
    if (groups) {
        groups.forEach((group) => {
            // Проверяем заполненость group при изменениях дочерних элементов.
            let requiredElements = [];
            if (group.classList.contains('group--additional')) {
                const groupAdditionalForm = group.querySelector('.group__additional-form');
                // if (!groupAdditionalForm) {
                //     console.log(group);
                // }
                requiredElements = groupAdditionalForm.querySelectorAll('[data-required]');
            } else {
                const groupForms = group.querySelectorAll('.group__form');
                const groupForm = group.querySelector('.group__form');
                if (groupForms.length > 1) {
                    groupForms.forEach((form) => {
                        const required = [...form.querySelectorAll('[data-required]')];
                        requiredElements = requiredElements.concat(required);
                    });
                } else if (groupForm) {
                    requiredElements = groupForm.querySelectorAll('[data-required]');
                }
            }
            checkFilledInput(group);

            requiredElements.forEach((requiredEl) => {
                // дополнительно наблюдаем за элементами имеющими связь
                if (requiredEl.hasAttribute('data-connected')) {
                    let observer = new MutationObserver(() => checkFilledInput(group));
                    observer.observe(requiredEl, { attributes: true, attributeFilter: ['class'] });
                    if (!observer) {
                        console.log(observer);
                    }
                    observers.push(observer);
                }
                if (requiredEl.classList.contains('itc-select')) {
                    const button = requiredEl.querySelector('button');
                    let observer = new MutationObserver(() => checkFilledInput(group));
                    observer.observe(button, { attributes: true, attributeFilter: ['value'] });
                    observers.push(observer);
                } else if (requiredEl.classList.contains('group-radio-buttons')) {
                    let observer = new MutationObserver(() => checkFilledInput(group));
                    observer.observe(requiredEl, { attributes: true, attributeFilter: ['class'] });
                    if (!observer) {
                        console.log(observer);
                    }
                    observers.push(observer);
                } else {
                    requiredEl.addEventListener('blur', () => setTimeout(() => checkFilledInput(group)));
                    // requiredEl.addEventListener('change', () => checkFilledInput(group));
                    requiredEl.addEventListener('input', () => checkFilledInput(group));
                }
            });

            // Отслеживаем поялвение класса 'is-filled' у группы.
            let observer = new MutationObserver((mutationRecords) => {
                // Отслеживаем поялвение дополнительной группы и запускаем проверку
                if (mutationRecords[0].target.classList.contains('group--additional')) {
                    const parrentGroup = mutationRecords[0].target.closest('.group--parent');
                    // console.log('ПОЯВИЛАСЬ ДОДОПЛНИТЕЛЬНАЯ ГРУППА');
                    checkFilledInput(parrentGroup);
                }
                // console.log(mutationRecords[0]);
                if (mutationRecords[0].target.classList.contains('is-filled') || mutationRecords[0].oldValue.includes('is-filled')) {
                    checkFilledForm(mutationRecords[0].target);
                }
            });
            observer.observe(group, { attributeFilter: ['class'], attributeOldValue: true });
            if (!observer) {
                console.log(observer);
            }
            observers.push(observer);

            // несколько group__form
            const groupForms = group.querySelectorAll('.group__form');
            if (groupForms.length) {
                groupForms.forEach((groupForm) => {
                    let groupFormObserver = new MutationObserver(() => {
                        // console.log('.group__form - CHANGE');
                        checkFilledInput(group);
                    });
                    groupFormObserver.observe(groupForm, { attributeFilter: ['class'] });
                    if (!groupFormObserver) {
                        console.log(observer);
                    }
                    observers.push(groupFormObserver);
                });
            }
        });
    }
}

function checkFilledInput(group) {
    // console.log(group);
    // console.log('INPUT CHECKING...');
    let requiredElements = [];
    let additionalGroupsFilled = [];
    // group
    if (!group.classList.contains('group--additional')) {
        // несколько форм внутри
        const groupForms = [...group.querySelectorAll('.group__form')];
        const groupForm = group.querySelector('.group__form');
        const additionalGroups = group.querySelectorAll('.group--additional');

        // if(groupForms.length > 1 && additionalGroups.length) {

        // }

        if (groupForms.length > 1) {
            // console.log(groupForms);
            groupForms.map((form) => {
                // if(!form.hasAttribute('data-connected')) {
                //     return form.querySelectorAll('[data-required]')
                // }
                if (form.hasAttribute('data-connected') && form.classList.contains('is-active')) {
                    const requiredArr = [...form.querySelectorAll('[data-required]')];
                    // console.log(requiredArr);
                    requiredElements = requiredElements.concat(requiredArr);
                }
            });
        }
        // есть вложенные группы
        if (additionalGroups.length) {
            additionalGroups.forEach((addGroup) => {
                if (addGroup.classList.contains('is-active') && !addGroup.classList.contains('is-filled')) {
                    // console.log(addGroup);
                    // console.log(addGroup.classList.contains('is-filled'));
                    additionalGroupsFilled.push(false);
                } else if (addGroup.classList.contains('is-active') && addGroup.classList.contains('is-filled')) {
                    additionalGroupsFilled.push(true);
                }
            });
        }
        // обычная группа с одной формой внутри
        if (groupForms.length === 1) {
            requiredElements = groupForm.querySelectorAll('[data-required]');
        }
    }
    // group--additional
    else {
        // console.log(group);
        const groupAdditionalForm = group.querySelector('.group__additional-form');
        requiredElements = groupAdditionalForm.querySelectorAll('[data-required]');
    }
    // К вложенным группам is-filled добавляется уже после проверки заполненности родительской группы
    // console.log(requiredElements);
    // console.log(additionalGroupsFilled);
    let inputsField = false;
    const checkResult = [...requiredElements].map((element) => {
        if (element.hasAttribute('data-connected') && !element.classList.contains('is-active')) {
            return true;
        } else if (element.classList.contains('itc-select')) {
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
                // console.log(element);
                return true;
            } else {
                return false;
            }
        }
    });

    if (checkResult.indexOf(false) === -1) {
        inputsField = true;
    }

    // Если нет активных обязательных элементов
    // и поле имеет class required, то не добавляем is-filled. (Например группа операция. data-group-name='operation')

    if (additionalGroupsFilled.length) {
        // console.log(additionalGroupsFilled);
        if (inputsField && additionalGroupsFilled.indexOf(false) === -1) {
            group.classList.add('is-filled');
        } else if (group.classList.contains('is-filled')) {
            group.classList.remove('is-filled');
        }
    } else {
        if (inputsField) {
            group.classList.add('is-filled');
        } else if (group.classList.contains('is-filled')) {
            group.classList.remove('is-filled');
        }
    }
}

function checkFilledForm(mutationElement) {
    // console.log('checkFilledForm');
    const form = mutationElement.closest('form');
    if (!form) return;
    const btnSubmit = form.querySelector('.submit-button');
    const groups = form.querySelectorAll('.group');
    const groupsBoolean = [...groups].map((group) => {
        if (group.classList.contains('group--additional') && !group.classList.contains('is-active')) {
            return true;
        } else if (group.classList.contains('is-filled')) {
            return true;
        } else {
            return false;
        }
    });
    if (groupsBoolean.indexOf(false) === -1) {
        btnSubmit.removeAttribute('disabled');
    } else {
        btnSubmit.setAttribute('disabled', 'disabled');
    }
}

const FORM = document.querySelector('form');
if (FORM) {
    FORM.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(FORM);

        for (let key of formData.keys()) {
            console.log(`${key}: ${formData.get(key)}`);
        }

        // console.log(data);
        // console.log(data.getAll());
    });
}

// ОГРАНИЧЕНИЯ НА ВВОД В ИНПУТ.
// Из-за класса only-txt не работает табуляция по инпутам.
document.addEventListener('DOMContentLoaded', () => {
    setValidCharacters();
    // Инициализируем observers
    initGroupObserve(observers);
});

// Ограничения при вводе
export function setValidCharacters(element) {
    if (element) {
        const input = element.querySelector('input');
        if (input.classList.contains('only-txt')) {
            onlyTxt(input);
            firstLetterCapital(input);
            return;
        }
        if (input.classList.contains('only-number')) {
            onlyNumber(input);
            return;
        }
        if (input.classList.contains('only-number-strict')) {
            onlyNumberStrict(input);
            return;
        }
        return;
    }

    let onlyTxtInputs = document.querySelectorAll('.only-txt');
    onlyTxtInputs.forEach((input) => {
        if (input.id === 'name' || input.id === 'middle-name' || input.id === 'surname') {
            firstLetterCapital(input);
        }
        onlyTxt(input);
    });

    let onlyNumberInputs = document.querySelectorAll('.only-number');
    onlyNumberInputs.forEach((input) => {
        onlyNumber(input);
    });
}

function onlyTxt(input) {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' || event.key === 'Tab') return;
        if (!/[А-я]|-/.test(event.key)) event.preventDefault();
    });
}

function onlyNumber(input) {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' || event.key === 'Tab') return;
        if (!/[0-9]|\./.test(event.key)) event.preventDefault();
    });
}

function onlyNumberStrict(input) {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' || event.key === 'Tab') return;
        if (!/[0-9]/.test(event.key)) event.preventDefault();
    });
}

function firstLetterCapital(input) {
    input.addEventListener('blur', () => {
        if (input.value) {
            input.value = ucFirst(input.value);
        }
    });
}
