class TooltipActions {
    static _createTooltip(options) {
        const tooltip = document.createElement('ul');
        tooltip.classList.add('tooltip-menu');
        options.forEach((opt) => {
            tooltip.insertAdjacentHTML('beforeend', `<a href='${opt.href}'><li class='tooltip-menu__option'><svg><use href='img/sprite.svg#${opt.icon}'></use></svg><span>${opt.txt}</span></li></a>`);
        });
        return tooltip;
    }

    constructor(data) {
        this.tooltip = TooltipActions._createTooltip(data.options);
    }
}

const tooltipActions = new TooltipActions({
    options: [
        { txt: 'Добавить операцию', icon: 'mask', href: '#' },
        { txt: 'Добавить наблюдение', icon: 'list', href: '#' },
        { txt: 'Карта пациента', icon: 'user', href: '#' },
    ],
}).tooltip;

document.addEventListener('DOMContentLoaded', () => {
    const patientActions = document.querySelectorAll('.patient__actions');
    patientActions.forEach((el) => el.addEventListener('click', () => showEl(el)));

    function showEl(el) {
        tooltipActions.classList.remove('is-active');
        el.append(tooltipActions);
        setTimeout(() => {
            tooltipActions.classList.add('is-active');
        }, 100);
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.patient__actions')) {
            tooltipActions.classList.remove('is-active');
        }
    });
});
