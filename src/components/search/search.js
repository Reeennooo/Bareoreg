import { createChip } from '../chip/chip';

document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.search');
    if (!search) return;
    const selectedFilterWrapper = document.querySelector('.control-panel__active-filters');
    const searchInput = search.querySelector('.search__input input');
    let searchChip;

    document.addEventListener('click', (event) => {
        const search = document.querySelector('.search');
        if (!event.target.closest('.search') && search.classList.contains('is-active')) {
            closeSearch();
            createSearchChip();
        } else if (event.target.closest('.search__clear')) {
            clearSeacrh();
            closeSearch();
        }
        // searchBtn
        if(event.target.closest('.search__btn')) {
            openSearch()
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' && search.classList.contains('is-active')) {
            createSearchChip();
            closeSearch();
        }
    });

    function openSearch() {
        search.classList.add('is-active');
        searchInput.focus();
    }

    function closeSearch() {
        search.classList.remove('is-active');
    }

    function createSearchChip() {
        if (!searchChip && searchInput.value) {
            searchChip = createChip({ txt: searchInput.value, mod: 'search' });
            searchChip.querySelector('.chip__remove').addEventListener('click', clearSeacrh);
            selectedFilterWrapper.prepend(searchChip);
        } else if (searchChip && searchInput.value) {
            searchChip.querySelector('.chip__txt').innerText = searchInput.value;
        }
    }

    function clearSeacrh() {
        searchInput.value = '';
        if (searchChip) {
            searchChip.remove();
            searchChip = null;
        }
    }
});
