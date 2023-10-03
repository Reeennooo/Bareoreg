import { createInput, createSelect } from '../../blocks/form-creating-operation/form-creating-operation';

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
        btnText: 'Сохранить',
    },
};

document.addEventListener('DOMContentLoaded', () => {
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
        const inputs = form.querySelectorAll('input');

        switch (form.dataset.name) {
            case 'new-assistant':
                console.log('new-assistant');
                break;
            case 'new-work-place':
                const placesWrapper = document.querySelector('.profile__places-of-work');
                const placeData = {};
                placeData.name = form.querySelector(`input[name='work-place-name-institution']`).value;
                placeData.place = form.querySelector(`input[name='work-place-city']`).value;
                placeData.number = placesWrapper.querySelectorAll('.place-of-work').length + 1;
                // console.log(placeData);
                let placeEl = createWorkPlace(placeData);
                placesWrapper.append(placeEl);
                break;
        }

        window.closeModal();
    });

    function fillSideModal(openerElement) {
        let currentEl = sideModalData[openerElement.dataset.modalName];
        sideModal.querySelector('.side-modal__title').innerText = currentEl.title;
        sideModal.querySelector('form').dataset.name = openerElement.dataset.modalName;

        if (openerElement.dataset.modalName === 'new-assistant') {
            mainBlock.classList.add('three-columns');
        } else if (mainBlock.classList.contains('three-columns')) {
            mainBlock.classList.remove('three-columns');
        }

        mainBlock.innerHTML = '';
        content[openerElement.dataset.modalName]?.map((item) => {
            mainBlock.append(item);
        });

        submitBtn.querySelector('span').innerText = currentEl.btnText;
    }
});

function createWorkPlace(data) {
    const element = document.createElement('div');
    element.classList.add('place-of-work');
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
