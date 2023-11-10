export function hightlightRequiredFields() {
    const requiredElements = document.querySelectorAll('[data-required]');
    requiredElements.forEach((element) => {
        if (!element.classList.contains('hightlight')) {
            element.classList.add('hightlight');
        }

        // select
        if (element.classList.contains('itc-select')) {
        }
        // radio group
        else if (element.classList.contains('group-radio-buttons')) {
        }
        // input
        else {
        }
    });
}
