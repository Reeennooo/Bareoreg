import { createChip } from '../chip/chip';

document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelector('.filters');
    if (!filters) return;
    new window.Calendar('#filter-start-period', { position: 'absolute' });
    new window.Calendar('#filter-end-period', { position: 'absolute', side: 'right' });
    const selectedFilterWrapper = document.querySelector('.control-panel__active-filters');
    const btnFIlter = filters.querySelector('.filters__btn');
    btnFIlter.addEventListener('click', toggleFilters);

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filters')) {
            filters.classList.remove('is-active');
        }
        const filter = event.target.closest('.chip--filter');
        if (filter) {
            selectFilter(filter);
        }
        if (event.target.closest('[data-reset-filters]')) {
            resetFilters();
        }
    });

    const filterTooltip = document.querySelector('.filters-tooltip');

    function selectFilter(filter) {
        if (filter.classList.contains('is-active')) {
            filter.classList.remove('is-active');
            removeFilter(filter.dataset.filterId);
        } else {
            filter.classList.add('is-active');
            if (filter.dataset.filterId) {
                const selectedFilterChip = createChip({ txt: filter.innerText, mod: 'selected-filter' });
                selectedFilterChip.dataset.filterId = filter.dataset.filterId;

                const removeBtn = selectedFilterChip.querySelector('.chip__remove');
                removeBtn.addEventListener('click', () => removeFilter(filter.dataset.filterId));

                selectedFilterWrapper?.append(selectedFilterChip);
            }
        }
    }

    function removeFilter(filterId) {
        if (!filterId) return;
        const filterSelectedChip = document.querySelector(`.chip--selected-filter[data-filter-id=${filterId}]`);
        filterSelectedChip?.remove();
        filterTooltip.querySelector(`[data-filter-id='${filterId}']`).classList.remove('is-active');
    }

    function resetFilters() {
        const elsActive = filterTooltip.querySelectorAll('.chip--filter.is-active');
        elsActive.forEach((el) => {
            el.classList.remove('is-active');
            document.querySelector(`.chip--selected-filter[data-filter-id=${el.dataset.filterId}]`)?.remove();
        });
    }

    function toggleFilters() {
        if (filters.classList.contains('is-active')) {
            filters.classList.remove('is-active');
        } else {
            filters.classList.add('is-active');
        }
    }
});
