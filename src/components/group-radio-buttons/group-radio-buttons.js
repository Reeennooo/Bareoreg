document.addEventListener('DOMContentLoaded', () => {
    const radioGroups = document.querySelectorAll('.group-radio-buttons');

    if (radioGroups) {
        radioGroups.forEach((radioGroup) => {
            const inputs = radioGroup.querySelectorAll('input');
            function radioGroupField() {
                // console.log('RADIO CHANGE');
                radioGroup.classList.add('is-filled');
                inputs.forEach((input) => input.removeEventListener('change', radioGroupField));
            }
            function setCurrentValue(value) {
                radioGroup.dataset.value = value
            }
            inputs.forEach((input) => input.addEventListener('change', radioGroupField));
            inputs.forEach((input) => input.addEventListener('change', () => setCurrentValue(input.value)));
        });
    }
});
