document.addEventListener('DOMContentLoaded', () => initGroup());

export function initGroup(groups) {
    const initGroups = groups ? groups : document.querySelectorAll('.group');

    if (!initGroups) return;

    initGroups.forEach((group) => {
        if (group.classList.contains('group--additional')) return;

        const toggler = group.querySelector('.group__header');
        let wrapper = group.querySelector('.group__inner-wrapper');
        toggler.addEventListener('click', (event) => {
            if (event.target.closest('.btn')) return;
            toggleGroup(group);
        });

        if (group.classList.contains('is-active')) {
            let inner = group.querySelector('.group__inner');
            wrapper.style.height = inner.offsetHeight + 'px';
        }

        setTimeout(() => {
            group.style.opacity = '1';
            wrapper.style.height = 'auto';
        }, 100);
    });
}

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
