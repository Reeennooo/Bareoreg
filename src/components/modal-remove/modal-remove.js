const removeData = {
    'remove-work': {
        title: 'Удаление места работы',
    },
    'remove-assistant': {
        title: 'Удаление ассистена',
    },
};
const removeModal = document.querySelector('.modal-remove');

document.addEventListener('click', (event) => {
    const element = event.target.closest('[data-modal-name]');
    if (!element) return;

    const itemWrap = removeModal.querySelector('.modal-remove__item');

    switch (element.dataset.modalName) {
        case 'remove-work':
            const place = event.target.closest('.place-of-work');
            const placeClone = place.cloneNode(true);
            placeClone.querySelector('.place-of-work__remove')?.remove();
            itemWrap.innerHTML = '';
            removeModal.querySelector('.modal-remove__item').append(placeClone);

            break;
        case 'remove-assistant':
            const assistant = event.target.closest('.assistant');
            const assistantClone = assistant.cloneNode(true);
            assistantClone.querySelector('.assistant__btns')?.remove();
            itemWrap.innerHTML = '';
            removeModal.querySelector('.modal-remove__item').append(assistantClone);
            break;
    }

    if (removeData[element.dataset.modalName]) {
        removeModal.querySelector('.modal-remove__title').innerText = removeData[element.dataset.modalName].title;
    }
});
