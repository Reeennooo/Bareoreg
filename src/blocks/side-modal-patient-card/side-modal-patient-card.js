import { createAditionalGroup, createGroup, checkConnectionValue, CONNECTED_RULES } from '../form-creating-operation/form-creating-operation';
import { PATIENT_RULES } from '../form-new-patient/form-new-patient';
import { OPERATIONS_RULES } from '../../js/operation-data';
import { FileLoader } from '../../components/file-loader/file-loader';
import { Complication } from '../complications/complication';
import { assignInputRules } from '../../js/input-validate';
import { initGroupObserve } from '../../js/validate';
import { OPERATIONS, PATIENT } from './modal-template-data';

document.addEventListener('DOMContentLoaded', () => {
    if (!location.pathname.includes('patient-card')) return;
    let initObservers = [];

    const sideModal = document.querySelector('.side-modal');
    const trashBtn = sideModal.querySelector('.side-modal__remove');
    const main = sideModal.querySelector('.side-modal__main');
    const obsLoader = new FileLoader({ name: 'observation-fileloader', type: 'loader' });
    const patientLoader = new FileLoader({ name: 'patient-files', type: 'loader' });
    patientLoader.createDropZone({ name: 'patient-file-zone' });
    patientLoader.dropZone.classList.add('long');
    let paperclipBtn = document.querySelector('.side-modal__add-file');

    const obsLoaderTrigger = obsLoader.triggerLoader.bind(obsLoader);
    const patientLoaderTrigger = patientLoader.triggerLoader.bind(patientLoader);

    function rerenderPaperclip(modalName) {
        const paperClone = paperclipBtn.cloneNode(true);
        switch (modalName) {
            case 'observation':
                paperClone.addEventListener('click', obsLoaderTrigger);
                break;
            case 'patient':
                paperClone.addEventListener('click', patientLoaderTrigger);
                break;
        }
        sideModal.querySelector('.side-modal__header-buttons').replaceChild(paperClone, paperclipBtn);
        paperclipBtn = paperClone;
    }

    document.addEventListener('click', (event) => {
        const element = event.target.closest('[data-modal-name]');
        if (!element) return;
        const modalName = element.dataset.modalName;

        if (modalName !== 'observation' && modalName !== 'operation' && modalName !== 'patient') return;

        resetModalStyles();
        setGeneralInfo(element, modalName);
    });

    function setGeneralInfo(element, modalName) {
        if (!modalName) return;
        sideModal.removeAttribute('data-observation-id');
        sideModal.dataset.sideModalName = modalName;
        const modalTitle = sideModal.querySelector('.side-modal__title');

        if (modalName === 'operation' || modalName === 'observation') {
            sideModal.classList.add('view-mode');

            const operationId = Number(element.closest('[data-operation-id]').dataset.operationId);
            const operation = OPERATIONS.find((item) => item.id === operationId);
            const blockOperationName = sideModal.querySelector('.side-modal__add-txt');

            // Добавляем id операции на модальное окно
            sideModal.dataset.operationId = operationId;

            rerenderPaperclip(modalName);

            switch (modalName) {
                case 'operation':
                    // Настройки модального окна
                    modalTitle.innerText = operation.name;
                    trashBtn.setAttribute('data-modal-name', 'remove-operation');
                    trashBtn.setAttribute('data-operation-id', operationId);

                    fillSideModal(modalName, operation);
                    break;
                case 'observation':
                    const observationId = Number(element.closest('.pill__observation').dataset.observationId);
                    const observation = operation.observations.find((item) => item.id === observationId);

                    // Настройки модального окна
                    trashBtn.setAttribute('data-modal-name', 'remove-observation');
                    blockOperationName.querySelector('span').innerText = operation.name;
                    blockOperationName.dataset.modal = 'side-modal';
                    blockOperationName.dataset.modalName = 'operation';
                    blockOperationName.dataset.operationId = operationId;
                    trashBtn.setAttribute('data-observation-id', observationId);
                    modalTitle.innerText = `Наблюдение: ${observation.txt} после операции`;
                    sideModal.dataset.observationId = observationId;

                    fillSideModal(modalName, observation);
                    break;
            }
        } else if (modalName === 'patient') {
            // patient
            sideModal.removeAttribute('data-operation-id');
            modalTitle.innerText = 'Редактирование карты пациента';
            enableEditMode(modalName);

            // renderFields(modalName);
            // console.log('patient');
        }
    }

    const editBtn = sideModal.querySelector('.side-modal__edit');
    const cancelBtn = sideModal.querySelector('.cancel-button');
    editBtn.addEventListener('click', () => enableEditMode(sideModal.dataset.sideModalName));
    cancelBtn.addEventListener('click', disabledEditMode);

    function createDataBlock(data) {
        const element = document.createElement('div');
        element.classList.add('data-block');
        element.classList.add('data-block--invert');
        element.innerHTML = `
          <div class='data-block__title'>${data.name}</div>
          <div class='data-block__value'>${data.value}</div>
        `;

        return element;
    }

    function renderObservations(observationsArr) {
        const observationsBlock = document.createElement('div');
        observationsBlock.classList.add('observations');
        observationsBlock.innerHTML = `
            <div class='observations__title'>Наблюдения ${observationsArr.length}:</div>
            <div class='observations__wrapper'></div>
            `;
        const wrapper = observationsBlock.querySelector('.observations__wrapper');

        const addBtn = document.createElement('a');
        addBtn.setAttribute('href', 'creating-observation.html');
        addBtn.classList.add('observations__add');
        addBtn.setAttribute('type', 'button');
        addBtn.innerHTML = `<svg><use href='img/sprite.svg#plus-icon'></use></svg>`;
        wrapper.append(addBtn);

        function createObservationPill(data) {
            const observationPill = document.createElement('div');
            observationPill.dataset.modalName = 'observation';
            observationPill.dataset.observationId = data.id;
            // observationPill.dataset.operationId = data.id;
            observationPill.classList.add('pill__observation', 'pill__observation--transparent');
            observationPill.dataset.modalName;
            observationPill.innerText = data.txt;

            return observationPill;
        }

        observationsArr.forEach((item) => {
            wrapper.append(createObservationPill(item));
        });

        sideModal.querySelector('.side-modal__main').prepend(observationsBlock);
    }

    function fillSideModal(modalName, data) {
        // if (!sideModalData[modalName]) return;

        main.innerHTML = '';
        // sideModal.classList.add('view-mode');
        let content;

        if (modalName === 'operation') {
            data.observations && renderObservations(data.observations);
            content = data.operation.info;
        } else if (modalName === 'observation') {
            content = data.info;
        }

        content.forEach((item) => {
            let dataBlocks;
            let group;

            if (item.dataBlocks) {
                dataBlocks = item.dataBlocks.map((block) => createDataBlock(block));
                group = createGroup({ title: item.name, addClass: item.addClass, dataBlocks: dataBlocks });
            } else {
                group = createGroup({ title: item.name, addClass: item.addClass, subtitle: item.subtitle });
            }

            if (item.additionalGroup) {
                const additionalGroups = item.additionalGroup.map((data) => {
                    let dataBlocks;
                    if (data.dataBlocks) {
                        dataBlocks = data.dataBlocks.map((block) => createDataBlock(block));
                    }
                    return createAditionalGroup({ ...data, dataBlocks: dataBlocks });
                });

                additionalGroups.forEach((el) => {
                    group.querySelector('.group__form').after(el);
                });
            }

            main.append(group);
        });
    }

    function enableEditMode(modalName) {
        main.innerHTML = '';
        sideModal.classList.remove('view-mode');
        sideModal.classList.add('is-editable');
        renderFields(modalName);
        if (modalName === 'patient') {
            main.prepend(patientLoader.fileLoader);
            main.querySelector('.group__form .textarea').after(patientLoader.dropZone);
        }

        if (modalName === 'observation') {
            main.prepend(obsLoader.fileLoader);
        }
    }

    function disabledEditMode() {
        const modalName = sideModal.dataset.sideModalName;
        if (modalName === 'patient') return;
        const operationId = Number(sideModal.dataset.operationId);
        const observationId = Number(sideModal.dataset.observationId);
        const operation = OPERATIONS.find((item) => item.id === operationId);

        // main.innerHTML = '';
        sideModal.classList.add('view-mode');
        sideModal.classList.remove('is-editable');

        if (modalName === 'observation') {
            main.append(obsLoader.fileLoader);
            const observation = operation.observations.find((item) => item.id === observationId);
            fillSideModal(sideModal.dataset.sideModalName, observation);
            paperclipBtn.addEventListener('click', obsLoader.triggerLoader);
        } else {
            fillSideModal(sideModal.dataset.sideModalName, operation);
        }
    }

    function renderFields(modalName) {
        createComplication.count = 0;

        const operation = OPERATIONS.find((item) => item.id === Number(sideModal.dataset.operationId));
        let content;

        if (modalName === 'operation') {
            content = operation.operation.fields;
        } else if (modalName === 'observation') {
            const observationId = sideModal.dataset.observationId;
            content = operation.observations.find((item) => item.id === Number(observationId)).fields;
        } else if (modalName === 'patient') {
            content = PATIENT;
        }

        content.forEach((el) => {
            if (el.complication) {
                const complicationInstance = createComplication(el.data);
                const complicationBlock = complicationInstance.el;
                main.append(complicationBlock);
                let connectedEls = complicationBlock.querySelectorAll('[data-connected]');
                connectedEls.forEach((el) => {
                    checkConnectionValue(el, CONNECTED_RULES);
                });

                if (el.interventions && el.interventions.length) {
                    el.interventions.forEach((repeatedInt) => {
                        // console.log(complicationInstance);
                        complicationInstance.addIntervention(repeatedInt);
                    });
                }
                return;
            }

            let group = createGroup(el);

            if (el.additionalGroups) {
                let additionalGroups = [];
                let groupInner = group.querySelector('.group__inner');
                el.additionalGroups.forEach((addGroup) => {
                    additionalGroups.push(createAditionalGroup(addGroup));
                });
                additionalGroups.forEach((item) => groupInner.append(item));
            }

            main.append(group);
            let connectedEls = group.querySelectorAll('[data-connected]');
            connectedEls.forEach((el) => {
                checkConnectionValue(el, CONNECTED_RULES);
            });
        });
        initGroupObserve();

        if (modalName === 'operation') {
            assignInputRules(OPERATIONS_RULES);
        }
        if (modalName === 'patient') {
            assignInputRules(PATIENT_RULES);
        }
    }

    function makeCreateComplication() {
        function createComplication(data) {
            const complication = new Complication({ number: ++createComplication.count, addClass: ['group--parent', 'group--simple'], interventionClass: 'group--simple', fieldsValue: data, type: 'inside-the-modal' });
            // Добавляем правила к общим правилам.
            complication.connectionRules.forEach((item) => {
                CONNECTED_RULES[item.name] = item.rules;
            });
            assignInputRules(complication.fieldsRules);
            initGroupObserve(initObservers);
            initObservers = [];

            return complication;
        }
        createComplication.count = 0;
        return createComplication;
    }

    function resetModalStyles() {
        sideModal.classList.remove('view-mode', 'is-editable');
    }

    const createComplication = makeCreateComplication();
});
