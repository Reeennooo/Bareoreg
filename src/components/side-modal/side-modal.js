import tippy from 'tippy.js';
const sideModal = document.querySelector('.side-modal');

tippy(sideModal.querySelector('.side-modal__remove'), {
    content: 'Удалить',
    theme: 'light',
});
tippy(sideModal.querySelector('.side-modal__edit'), {
    content: 'Редактировать',
    theme: 'light',
});
tippy(sideModal.querySelector('.side-modal__close'), {
    content: 'Закрыть',
    theme: 'light',
});
tippy(sideModal.querySelector('.side-modal__print'), {
    content: 'Распечатать',
    theme: 'light',
});
