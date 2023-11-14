import { setMasks } from '../../js/input-validate';
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
    // table header
    const patientTable = document.querySelector('.patient-table');
    if (!patientTable) return;
    setMasks();
    const tableHeader = patientTable.querySelector('.patient-table__header');
    window.addEventListener('scroll', tableScroll);

    function tableScroll() {
        const distanceFromTop = tableHeader.getBoundingClientRect().y;
        const styleTopValue = +getComputedStyle(tableHeader).top.replace(/[^0-9]/g, '') - 5;
        if (distanceFromTop >= styleTopValue) {
            tableHeader.classList.add('shadow');
        } else {
            tableHeader.classList.remove('shadow');
        }
    }

    const patientActions = document.querySelectorAll('.patient__actions');
    patientActions.forEach((el) => el.addEventListener('click', () => showEl(el)));

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.patient__actions')) {
            tooltipActions.classList.remove('is-active');
        }
    });

    function showEl(el) {
        tooltipActions.classList.remove('is-active');
        el.append(tooltipActions);
        setTimeout(() => {
            tooltipActions.classList.add('is-active');
        }, 100);
    }
});
