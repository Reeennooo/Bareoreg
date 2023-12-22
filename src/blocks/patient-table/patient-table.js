import { setMasks } from '../../js/input-validate';
import { TooltipActions } from '../../components/tooltipActions/tooltipActions';

const tooltipActions = new TooltipActions({
    options: [
        { txt: 'Добавить операцию', icon: 'mask', href: '#' },
        { txt: 'Добавить наблюдение', icon: 'list', href: '#' },
        { txt: 'Карта пациента', icon: 'user', href: '#' },
    ],
}).tooltip;

// const tableContainer = document.querySelector('.table-container');
// const observer = new MutationObserver(() => setEventListeners())
// observer.observe(tableContainer, {childList: true, subtree: true})

document.addEventListener("DOMContentLoaded", setEventListeners)

function setEventListeners() {
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

    document.addEventListener('click', (e) => {
        const patientActionBtn = e.target.closest('.patient__actions')
        if (!patientActionBtn) {
            tooltipActions.classList.remove('is-active');
        }
        else if(patientActionBtn) {
            showEl(patientActionBtn)
        }
    });

    function showEl(el) {
        tooltipActions.classList.remove('is-active');

        // Установка href
        const linksObj = JSON.parse(el.dataset.links);
        tooltipActions.firstElementChild.href = linksObj.operation;
        tooltipActions.firstElementChild.nextElementSibling.href = linksObj.observation;
        tooltipActions.lastElementChild.href = linksObj.patient;

        el.append(tooltipActions);
        setTimeout(() => {
            tooltipActions.classList.add('is-active');
        }, 100);
    }
}
