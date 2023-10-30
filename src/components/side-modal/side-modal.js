import tippy from 'tippy.js';
const sideModal = document.querySelector('.side-modal');

if (sideModal) {
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

    const modalInner = document.querySelector('.side-modal__main');
    modalInner.addEventListener('scroll', (event) => {
        addHeaderClass(event.target);
    });

    function addHeaderClass(element) {
        const sideModalHeader = sideModal.querySelector('.side-modal__header');
        if (element.scrollTop > 0) {
            sideModalHeader.classList.add('is-scrolled');
        } else {
            sideModalHeader.classList.remove('is-scrolled');
        }
    }
}
