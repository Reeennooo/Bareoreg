// Требуется разделить код. И подключить нужный код к нужным страницам.

import { createInput, createSelect } from '../../blocks/form-creating-operation/form-creating-operation';

const avatarLoader = document.querySelector('.avatar-loader');

if (avatarLoader) {
    const avatar = avatarLoader.querySelector('.avatar-loader__avatar');
    const inputFile = avatarLoader.querySelector('input');

    inputFile.addEventListener('change', (event) => {
        if (event.target.files[0]) {
            let imageSrc = URL.createObjectURL(event.target.files[0]);
            avatar.style.backgroundImage = `url(${imageSrc})`;
        }
    });
}

const sideModalData = {
    'new-work-place': {
        title: 'Новое место работы',
        content: [
            {
                type: 'SELECT',
                data: {
                    name: 'work-place-name-institution',
                    placeholder: 'Название учреждения',
                    options: [
                        ['Европейский медицинский центр (ЕМС)', 'Европейский медицинский центр (ЕМС)'],
                        ['Нижневартовская городская поликлиника', 'Нижневартовская городская поликлиника'],
                        ['Клиническая больница №85 ФМБА Российской Федерации', 'Клиническая больница №85 ФМБА Российской Федерации'],
                    ],
                    required: false,
                },
            },
            {
                type: 'SELECT',
                data: {
                    name: 'work-place-city',
                    placeholder: 'Город',
                    options: [
                        ['Санкт-Петербург', 'Санкт-Петербург'],
                        ['Москва', 'Москва'],
                        ['Верхненовокутлумбетьево', 'Верхненовокутлумбетьево'],
                    ],
                    required: false,
                },
            },
        ],
        btnText: 'Добавить',
    },
    'new-assistant': {
        title: 'Новый ассистент',
        content: [
            {
                type: 'INPUT',
                data: {
                    name: 'surname',
                    type: 'text',
                    placeholder: 'Фамилия',
                    required: false,
                },
            },
            {
                type: 'INPUT',
                data: {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Имя',
                    required: false,
                },
            },
            {
                type: 'INPUT',
                data: {
                    name: 'middle-name',
                    type: 'text',
                    placeholder: 'Отчество',
                    required: false,
                },
            },
        ],
        btnText: 'Добавить',
    },
    'editing-assistant': {
        title: 'Ассистент №',
        btnText: 'Сохранить',
    },
};

document.addEventListener('DOMContentLoaded', () => {
    // Редактирование прфоиля
    const profile = document.querySelector('.profile');
    const editBtn = document.querySelector('.profile__edit-btn');
    const btnCancelChanges = profile.querySelector('.profile__cancel-changes');
    const btnSaveChanges = profile.querySelector('.profile__save-changes');
    const profileForm = document.querySelector('.profile__personal-data');

    profileForm.querySelectorAll('input').forEach((input) => {
        if (input.hasAttribute('data-required')) {
            input.addEventListener('input', checkFilled);
        }
    });

    // Аналогичная функция уже существует в файле validate.
    // Правила проверки этих инпут полей установлены в файле form-new-patient.
    function checkFilled() {
        console.log('INPUT');
        let result = [...profileForm.querySelectorAll('input[data-required]')].map((input) => {
            if (input.value && !input.classList.contains('is-invalid')) {
                return true;
            } else {
                return false;
            }
        });
        console.log(result);
        if (result.indexOf(false) === -1) {
            btnSaveChanges.removeAttribute('disabled');
        } else {
            btnSaveChanges.setAttribute('disabled', 'disabled');
        }
    }

    editBtn.addEventListener('click', enableEditProfile);
    btnCancelChanges.addEventListener('click', disableEditProfile);

    function enableEditProfile() {
        profile.classList.add('is-editable');
    }

    function disableEditProfile() {
        profile.classList.remove('is-editable');
    }

    function cancelChanges() {}

    function savelChanges() {}

    // Открытие боковой модалки
    const sideModal = document.querySelector('.side-modal');
    if (!sideModal) return;

    const mainBlock = sideModal.querySelector('.side-modal__main');
    const submitBtn = sideModal.querySelector('.side-modal__submit');

    const content = {
        'new-work-place': undefined,
        'new-assistant': undefined,

        createElements(data, name) {
            this[name] = data[name].content?.map((item) => {
                switch (item.type) {
                    case 'SELECT':
                        return createSelect(item.data);
                    case 'INPUT':
                        return createInput(item.data);
                }
            });
        },
    };

    content.createElements(sideModalData, 'new-work-place');
    content.createElements(sideModalData, 'new-assistant');

    document.addEventListener('click', (event) => {
        const element = event.target.closest('[data-modal-name]');
        if (!element) return;
        if (sideModalData[element.dataset.modalName]) {
            fillSideModal(element);
        }
    });

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const form = submitBtn.closest('form');

        switch (form.dataset.name) {
            case 'new-assistant':
                console.log('new-assistant');
                let assistantData = {};
                let assistantsBlock = document.querySelector('.profile__assistants');
                assistantData.surname = form.querySelector(`input[name='surname']`).value;
                assistantData.name = form.querySelector(`input[name='name']`).value;
                assistantData['middle-name'] = form.querySelector(`input[name='middle-name']`).value;
                assistantData.number = assistantsBlock.querySelectorAll('.assistant').length + 1;
                let assistant = createAssistant(assistantData);
                assistantsBlock.append(assistant);
                break;
            case 'new-work-place':
                const placesWrapper = document.querySelector('.profile__places-of-work');
                const placeData = {};
                placeData.name = form.querySelector(`input[name='work-place-name-institution']`).value;
                placeData.place = form.querySelector(`input[name='work-place-city']`).value;
                placeData.number = placesWrapper.querySelectorAll('.place-of-work').length + 1;
                let placeEl = createWorkPlace(placeData);
                placesWrapper.append(placeEl);
                break;
        }

        window.closeModal();
    });

    function fillSideModal(element) {
        let modalName = element.dataset.modalName;
        let currentEl = sideModalData[modalName];
        console.log(currentEl);
        sideModal.querySelector('.side-modal__title').innerText = currentEl.title;
        sideModal.querySelector('form').dataset.name = modalName;

        // columns-style
        if (modalName === 'new-assistant' || modalName === 'editing-assistant') {
            mainBlock.classList.add('three-columns');
        } else if (mainBlock.classList.contains('three-columns')) {
            mainBlock.classList.remove('three-columns');
        }

        mainBlock.innerHTML = '';

        if (modalName === 'editing-assistant') {
            content['new-assistant']?.map((item) => {
                mainBlock.append(item);
            });
            setAssistantData(element);
        } else {
            sideModal.classList.remove('editing-assistant');
            content[modalName]?.map((item) => {
                mainBlock.append(item);
            });
        }

        submitBtn.querySelector('span').innerText = currentEl.btnText;
    }

    function setAssistantData(element) {
        sideModal.classList.add('editing-assistant');
        let assistant = element.closest('.assistant');
        let assistantNumber = assistant.dataset.number;
        let modalTitle = sideModal.querySelector('.side-modal__title');
        let trashBtn = sideModal.querySelector('.side-modal__remove');

        modalTitle.innerText = `Ассистент № ${assistantNumber}`;

        trashBtn.dataset.number = assistantNumber;
        trashBtn.dataset.modalName = 'remove-assistant';

        // set input data
        sideModal.querySelector('input[name="surname"]').value = assistant.querySelector('.assistant__surname').innerText.trim();
        sideModal.querySelector('input[name="name"]').value = assistant.querySelector('.assistant__name').innerText.trim();
        sideModal.querySelector('input[name="middle-name"]').value = assistant.querySelector('.assistant__middle-name').innerText.trim();
    }
});

function createWorkPlace(data) {
    const element = document.createElement('div');
    element.classList.add('place-of-work');
    element.dataset.number = data.number;
    element.innerHTML = `
      <div class='place-of-work__content'>
        <div class='place-of-work__number'>№${data.number}</div>
        <div class='place-of-work__text'>
          <span class='place-of-work__name'>${data.name}</span>
          <span class='place-of-work__place'>${data.place}</span>
        </div>
      </div>
      <button class='btn btn--only-icon place-of-work__remove' data-modal='modal-remove' data-modal-name='remove-work'>
        <svg>
          <use href='img/sprite.svg#trash'></use>
        </svg>
      </button>
    `;

    return element;
}

function createAssistant(data) {
    const assistant = document.createElement('div');
    assistant.classList.add('assistant');
    assistant.dataset.number = data.number;
    assistant.innerHTML = `
        <div class='assistant__content'>
            <div class='assistant__number'>№${data.number}</div>
            <div class='assistant__person'>
                <span class='assistant__surname'>${data.surname}</span>
                <span class='assistant__name'>${data.name}</span>
                <span class='assistant__middle-name'>${data['middle-name']}</span>
            </div>
        </div>
        <div class='assistant__btns'>
            <button class='btn btn--only-icon assistant__edit' data-modal="side-modal" data-modal-name="editing-assistant">
                <svg>
                    <use href='img/sprite.svg#pencil'></use>
                </svg>
            </button>
            <button class='btn btn--only-icon assistant__remove' data-modal="modal-remove" data-modal-name="remove-assistant">
                <svg>
                    <use href='img/sprite.svg#trash'></use>
                </svg>
            </button>
        </div>
    `;

    return assistant;
}
