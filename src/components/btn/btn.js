export function createButton(data) {
    const button = document.createElement('div');
    button.classList.add('btn', `${data.mod}`);
    if (data.icon) {
        button.insertAdjacentHTML('afterbegin', `<svg><use href='img/sprite.svg#${data.icon}'></use></svg>`);
    }
    button.insertAdjacentHTML('beforeend', `<span>${data.text}</span>`);

    if (data.connected) {
        button.setAttribute('data-connected', data.connected);
        // Доработать для кнопки
        // checkConnectionValue(input, CONNECTED_RULES);
    }

    if (data.addClass) {
        button.classList.add(data.addClass);
    }

    return button;
}
