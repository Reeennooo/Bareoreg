export function createChip(data) {
    const chip = document.createElement('div');
    chip.classList.add('chip');
    chip.innerHTML = `<div class='chip__txt'>${data.txt}</div>`;
    if (data.mod === 'search') {
        chip.classList.add('chip--search');
        chip.insertAdjacentHTML('afterbegin', `<svg><use href='img/sprite.svg#search'></use></svg>`);
        chip.insertAdjacentHTML('beforeend', `<div class='chip__remove'><svg><use href='img/sprite.svg#close'></use></svg></div>`);
    }
    if (data.mod === 'selected-filter') {
        chip.classList.add('chip--selected-filter');
        chip.insertAdjacentHTML('beforeend', `<div class='chip__remove'><svg><use href='img/sprite.svg#close'></use></svg></div>`);
    }

    return chip;
}
