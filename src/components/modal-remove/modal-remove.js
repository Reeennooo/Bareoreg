import { Complication, RepeatedIntervention } from '../../blocks/complications/complication';

const removeData = {
    'remove-work': {
        title: 'Удаление места работы',
        subtitle: 'Вы больше не сможете добавлять операции с этой клиникой,<br> вы уверены?',
    },
    'remove-assistant': {
        title: 'Удаление ассистента',
        subtitle: 'Это действие необратимо,<br> вы уверены?',
    },
    'remove-operation': {
        title: 'Удаление операции',
        subtitle: 'Это действие необратимо,<br> вы уверены?',
    },
    'remove-observation': {
        title: 'Удаление наблюдения',
        subtitle: 'Это действие необратимо,<br> вы уверены?',
    },
    'remove-file': {
        title: 'Удаление файла',
        subtitle: 'Это действие необратимо,<br> вы уверены?',
    },
    'remove-complication': {
        title: 'Удаление осложнения',
        subtitle: 'Это действие необратимо, вы уверены?',
    },
    'remove-intervention': {
        title: 'Удаление вмешательства',
        subtitle: 'Это действие необратимо, вы уверены?',
    },
};

document.addEventListener('DOMContentLoaded', () => {
    const removeModal = document.querySelector('.modal-remove');

    if (!removeModal) return;

    const btnRemove = removeModal.querySelector('.modal-remove__remove-btn');

    document.addEventListener('click', (event) => {
        const trashBtn = event.target.closest('[data-modal-name]');
        if (!trashBtn) return;

        const itemWrap = removeModal.querySelector('.modal-remove__item');

        switch (trashBtn.dataset.modalName) {
            case 'remove-work':
                const place = event.target.closest('.place-of-work');
                const placeClone = place.cloneNode(true);
                placeClone.querySelector('.place-of-work__remove')?.remove();
                placeClone.removeAttribute('data-number');
                itemWrap.innerHTML = '';
                removeModal.querySelector('.modal-remove__item').append(placeClone);
                btnRemove.dataset.removeWork = place.dataset.number;

                // btnRemove.addEventListener('click', removeWork)
                break;
            case 'remove-assistant':
                let assistant;
                let assistantClone;

                if (trashBtn.dataset.number) {
                    assistant = document.querySelector(`.assistant[data-number='${trashBtn.dataset.number}' ]`);
                    btnRemove.dataset.removeAssistant = trashBtn.dataset.number;
                } else {
                    assistant = event.target.closest('.assistant');
                    btnRemove.dataset.removeAssistant = assistant.dataset.number;
                }

                assistantClone = assistant.cloneNode(true);
                assistantClone.querySelector('.assistant__btns')?.remove();
                itemWrap.innerHTML = '';

                removeModal.querySelector('.modal-remove__item').append(assistantClone);

                break;
            case 'remove-observation':
                btnRemove.dataset.removeObservationId = trashBtn.dataset.observationId;
            case 'remove-operation':
                btnRemove.dataset.removeOperationId = trashBtn.dataset.operationId;
            case 'remove-file':
                btnRemove.dataset.removeFileId = trashBtn.dataset.fileId;
            case 'remove-complication':
                btnRemove.dataset.removeComplication = trashBtn.dataset.complicationId;
            case 'remove-intervention':
                btnRemove.dataset.removeIntervention = trashBtn.dataset.interventionId;
        }

        if (removeData[trashBtn.dataset.modalName]) {
            removeModal.querySelector('.modal-remove__title').innerText = removeData[trashBtn.dataset.modalName].title;
            removeModal.querySelector('.modal-remove__subtitle').innerHTML = removeData[trashBtn.dataset.modalName]?.subtitle;
        }
    });

    // Нажатие на кнопку "Удалить" внутри модального окна.
    btnRemove.addEventListener('click', removeItem);
    function removeItem() {
        let itemNumber;
        let deletedEl;
        let pageSection;

        if (btnRemove.dataset.removeWork) {
            itemNumber = btnRemove.dataset.removeWork;
            deletedEl = document.querySelector(`.place-of-work[data-number='${itemNumber}']`);
            pageSection = deletedEl.closest('.page-section');
            deletedEl?.remove();

            if (!pageSection.querySelectorAll('.place-of-work')?.length) {
                pageSection.classList.remove('not-empty');
            }
            changeItemNumbers('place-of-work');
            window.closeModal();
        } else if (btnRemove.dataset.removeAssistant) {
            itemNumber = btnRemove.dataset.removeAssistant;
            deletedEl = document.querySelector(`.assistant[data-number='${itemNumber}']`);
            pageSection = deletedEl.closest('.page-section');
            deletedEl?.remove();

            if (!pageSection.querySelectorAll('.assistant')?.length) {
                pageSection.classList.remove('not-empty');
            }
            changeItemNumbers('assistant');
            window.closeModal(true);
        } else if (btnRemove.dataset.removeObservationId) {
            deletedEl = document.querySelector(`.pill__observation[data-observation-id='${btnRemove.dataset.removeObservationId}']`);
            deletedEl?.remove();
            window.closeModal(true);
        } else if (btnRemove.dataset.removeOperationId) {
            deletedEls = document.querySelectorAll(`.pill[data-operation-id='${btnRemove.dataset.removeOperationId}']`);
            deletedEls.forEach((el) => el.remove());
            // console.log('УДАЛЯЮ');
            // deletedEl?.remove();
            window.closeModal(true);
        } else if (btnRemove.dataset.removeFileId) {
            deletedEl = document.querySelector(`.file[data-file-id='${btnRemove.dataset.removeFileId}']`);
            deletedEl?.remove();
            window.closeModal(true);
        } else if (btnRemove.hasAttribute('data-remove-complication')) {
            const complication = document.querySelector(`.complication[data-complication-id="${btnRemove.dataset.removeComplication}"]`);
            Complication.deleteComplication(complication);
            window.closeModal();
        } else if (btnRemove.hasAttribute('data-remove-intervention')) {
            const intervention = document.querySelector(`.intervention[data-intervention-id="${btnRemove.dataset.removeIntervention}"]`);
            console.log(intervention);
            RepeatedIntervention.deleteIntervention(intervention);
            window.closeModal();
        }

        clearBtnRemove();
    }

    const removeObserver = new MutationObserver((mutations) => {
        if (!mutations[0].target.classList.contains('is-active')) {
            clearBtnRemove();
        }
    });
    removeObserver.observe(removeModal, { attributeFilter: ['class'] });

    function clearBtnRemove() {
        btnRemove.removeAttribute('data-remove-work');
        btnRemove.removeAttribute('data-remove-assistant');
        btnRemove.removeAttribute('data-remove-observation-id');
        btnRemove.removeAttribute('data-remove-operation-id');
    }

    function changeItemNumbers(selector) {
        const items = document.querySelectorAll(`.${selector}`);
        items.forEach((item, i) => {
            item.dataset.number = i + 1;
            item.querySelector(`.${selector}__number`).innerText = `№${i + 1}`;
        });
    }
});
