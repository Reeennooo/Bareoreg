import { createAditionalGroup, createGroup, checkConnectionValue, CONNECTED_RULES } from '../form-creating-operation/form-creating-operation';
import { PATIENT_RULES } from '../form-new-patient/form-new-patient';
import { OPERATIONS_RULES } from '../../js/operation-data';
import { FileLoader } from '../../components/file-loader/file-loader';
import { Complication } from '../complications/complication';
import { assignInputRules } from '../../js/input-validate';
import { initGroupObserve } from '../../js/validate';
import { sideModalData, fields } from './data';

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

    function rerenderPaperclip(modaName) {
        const paperClone = paperclipBtn.cloneNode(true);
        switch (modaName) {
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
        let modalName = element.dataset.modalName;
        setGeneralInfo(modalName, event.target);
        disabledEditMode(modalName);

        if (sideModalData[modalName]) {
            fillSideModal(modalName);
            if (modalName === 'observation') {
                main.prepend(obsLoader.fileLoader);
            }
        }
        if (modalName === 'patient') {
            enableEditMode(modalName);
        }
        // else if (fields[modalName]) {
        //     enableEditMode(modalName);
        // }
    });

    function setGeneralInfo(modalName, element) {
        if (!modalName) return;
        const title = sideModal.querySelector('.side-modal__title');
        const operationName = sideModal.querySelector('.side-modal__add-txt');
        rerenderPaperclip(modalName);
        switch (modalName) {
            case 'operation':
                title.innerText = 'RYGB (Гастрошунтирование)';
                trashBtn.setAttribute('data-modal-name', 'remove-operation');
                sideModal.dataset.sideModalName = modalName;
                const pill = element.closest('.pill');
                trashBtn.setAttribute('data-operation-id', pill.dataset.operationId);
                break;
            case 'observation':
                trashBtn.setAttribute('data-modal-name', 'remove-observation');
                operationName.querySelector('span').innerText = 'RYGB (Гастрошунтирование)';
                operationName.dataset.modal = 'side-modal';
                operationName.dataset.modalName = 'operation';
                sideModal.dataset.sideModalName = modalName;

                // paperclipBtn.addEventListener('click', obsLoaderTrigger);
                const pillObservation = element.closest('.pill__observation');
                trashBtn.setAttribute('data-observation-id', pillObservation.dataset.observationId);
                title.innerText = `Наблюдение: ${pillObservation.innerText} после операции`;
                break;
            case 'patient':
                title.innerText = 'Редактирование карты пациента';
                sideModal.dataset.sideModalName = modalName;
                // patientLoader = new FileLoader({ type: 'loader', name: 'patient-files' });
                // main.append(patientLoader.fileLoader);

                break;
            // default:
            //     title.innerText = 'Просмотр данных';
        }
    }

    const editBtn = sideModal.querySelector('.side-modal__edit');
    const cancelBtn = sideModal.querySelector('.cancel-button');
    editBtn.addEventListener('click', () => enableEditMode(sideModal.dataset.sideModalName));
    cancelBtn.addEventListener('click', () => disabledEditMode(sideModal.dataset.sideModalName));

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

    function fillSideModal(modalName) {
        if (!sideModalData[modalName]) return;

        main.innerHTML = '';
        sideModal.classList.add('view-mode');

        if (sideModalData[modalName].observations) {
            renderObservations(sideModalData[modalName].observations);
        }

        sideModalData[modalName].groups.forEach((item) => {
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

    function disabledEditMode(modalName) {
        if (modalName === 'patient') return;
        // main.innerHTML = '';
        sideModal.classList.add('view-mode');
        sideModal.classList.remove('is-editable');
        fillSideModal(modalName);
        if (modalName === 'obsrevation') {
            main.append(obsLoader.fileLoader);
            paperclipBtn.addEventListener('click', obsLoader.triggerLoader);
        }
    }

    function renderFields(modalName) {
        createComplication.count = 0;
        fields[modalName].forEach((el) => {
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
                        console.log(complicationInstance);
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
            const complication = new Complication({ number: ++createComplication.count, addClass: ['group--parent', 'group--simple'], interventionClass: 'group--simple', fieldsValue: data });
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

    const createComplication = makeCreateComplication();
});
