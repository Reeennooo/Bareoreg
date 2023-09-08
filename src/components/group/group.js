document.addEventListener('DOMContentLoaded', () => {
    let allGroups = document.querySelectorAll('.group');
    allGroups.forEach((group) => {
        const toggleBtn = group.querySelector('.group__toggle');
        let wrapper = group.querySelector('.group__inner-wrapper');
        toggleBtn.addEventListener('click', () => toggleGroup(group));
        
        if (group.classList.contains('is-active')) {
            let inner = group.querySelector('.group__inner');
            wrapper.style.height = inner.offsetHeight + 'px';
        }

        setTimeout(() => {
            group.style.opacity = '1';
            wrapper.style.height = 'auto';
        }, 100);
    });
});

function toggleGroup(group) {
    let wrapper = group.querySelector('.group__inner-wrapper');
    let inner = group.querySelector('.group__inner');

    if (group.classList.contains('is-active')) {
        wrapper.style.height = inner.offsetHeight + 'px';
        setTimeout(() => {
            group.classList.remove('is-active');
            wrapper.style.height = '';
        }, 100);
    } else {
        group.classList.add('is-active');
        wrapper.style.height = inner.offsetHeight + 'px';
        setTimeout(() => {
            wrapper.style.height = 'auto';
        }, 100);
    }
}
