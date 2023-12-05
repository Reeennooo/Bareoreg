// const options = {
//     target: '',
//     type: 'loader' | 'dropzone',
//     name: '',
//     id: '',
// };
export class FileLoader {
    constructor(options) {
        if (options.type === 'loader') {
            this.fileLoader = this.createFileloader({ name: options.name });
        }
        if (options.type === 'dropzone' && options.target) {
            this.createDropZone({ name: options.name, target: options.target });
            // console.log(document.querySelector(`${options.target}`));
            // if (document.querySelector(`${options.target}`)) {
            //     this.createDropZone({ name: options.name, target: options.target });
            // }
        }
        this.dropZone;
        this.fileList = new DataTransfer();
        this.currentFile;
        this.fileEl;
        this.fileElDropzone;
        this.modalUpload = document.querySelector('.modal-upload');

        if (this.fileLoader) {
            this.loaderInput = this.fileLoader.querySelector(`input`);
            this.loaderInput.addEventListener('change', (event) => {
                this.uploadFile(event.target.files[0]);
                event.target.value = '';
            });
            this.modalUpload.querySelector('.modal-upload__save').addEventListener('click', () => this.addFile());
            return;
        } else if (this.dropZone) {
            this.modalUpload.querySelector('.modal-upload__save').addEventListener('click', () => this.addFile());
        } else {
            return;
        }
    }

    createFileloader(args) {
        let fileLoader = document.querySelector(`#${args.name}`)?.closest('.file-loader');

        if (document.querySelector(`#${args.name}`)) {
            return fileLoader;
        }

        fileLoader = document.createElement('div');
        fileLoader.classList.add('file-loader');
        fileLoader.innerHTML = `
        <div class='file-loader__content'></div>
        <label for='${args.name}' class='file-loader__add-file'>
        <input type="file" name='${args.name}' id='${args.name}' >
        <svg><use href='img/sprite.svg#plus-icon'></use></svg>
        </label>`;

        // const paperclipBtn = document.querySelector('.side-modal__add-file');
        // if (paperclipBtn) {
        //     paperclipBtn.addEventListener('click', triggerLoader.bind(this));
        // }
        // function triggerLoader() {
        //     console.log('TRIGGER LOADER');
        //     this.loaderInput.click();
        // }

        return fileLoader;
    }

    triggerLoader() {
        this.loaderInput.click();
    }

    createDropZone(options) {
        let dropZone;
        if (!options.target) {
            dropZone = document.createElement('div');
            dropZone.classList.add('drop-zone');
            dropZone.innerHTML = `
                <input type='file' name='${options.name}' id='${options.name}'>
                <label for='${options.name}'>
                    <span class='drop-zone__title'>
                        <svg>
                            <use href='img/sprite.svg#paperclip'></use>
                        </svg>
                        Перетащите файл или нажмите для загрузки
                    </span>
                    <span class='drop-zone__subtitle'>
                        Максимальный размер одного файла: 10Мб. Максимальное количество файлов 20.
                    </span>
                </label>
                <div class='drop-zone__uploaded-files'></div>`;
        } else {
            dropZone = document.querySelector(options.target)?.closest('.drop-zone');
        }

        if (!dropZone) return;

        dropZone.querySelector('input').addEventListener('change', (event) => {
            this.uploadFile(event.target.files[0]);
            event.target.value = '';
        });

        dropZone.addEventListener('dragover', (event) => {
            event.preventDefault();
            this.dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', (event) => {
            event.preventDefault();
            this.dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (event) => {
            event.preventDefault();
            this.dropZone.classList.remove('dragover');
            this.uploadFile(event.dataTransfer.files[0]);
        });

        this.dropZone = dropZone;
        // return dropZone;
    }

    createFileElement(file) {
        let currentFile;
        let fileName = file.name;
        let fileType = file.type;

        let image = null;
        let imageLink;

        // file.template - служиит лишь как пример.
        // - - - Этот код можно удалить при работе с настоящими файлами
        // if (file.template && fileType.match(/png|jpeg|jpg/i)) {
        //     image = `<img class='file__img' src='${file.src}'></img>`;
        // }
        // - - - Этот код можно удалить при работе с настоящими файлами(оставить тольо код ниже этой строки)
        // else
        if (fileType.match(/png|jpeg|jpg/i)) {
            imageLink = URL.createObjectURL(file);
            image = `<img class='file__img' src='${imageLink}'></img>`;
        }

        currentFile = document.createElement('div');
        currentFile.dataset.index = this.fileList.files.length;
        currentFile.classList.add('file', 'uploaded');
        currentFile.innerHTML = `
          <div class='file__name-wrapper'>
              ${
                  image
                      ? image
                      : `<div class='file__icon'>
                          <svg><use href='img/sprite.svg#file'></use></svg>
                          </div>`
              }
              <div class='file__info'>
                  <div class='file__name'>
                      ${fileName}
                  </div>
                  <div class='file__type'>
                      ${fileType}
                  </div>
              </div>
          </div>
          <div class='file__carret'>
              <svg class='file__carret-arrow'><use href='img/sprite.svg#caret-up'></use></svg>
              <ul class='file__menu'>
                <li class='file__menu-item'>
                    <svg><use href='img/sprite.svg#download'></use></svg>
                    <span>Скачать</span>
                </li>
                <li class='file__menu-item' data-delete-file>
                    <svg><use href='img/sprite.svg#trash'></use></svg>
                    <span>Удалить</span>
                </li>
              </ul>
          </div>
          <div class='loader'></div>
          <div class='file__uploaded'><svg><use href='img/sprite.svg#check-bold'></use></svg></div>
          <div class='file__delete' data-delete-file><svg><use href='img/sprite.svg#close-X'></use></svg></div>`;

        const deleteFileFunc = deleteFile.bind(this);
        currentFile.querySelectorAll('[data-delete-file]').forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', (event) => deleteFileFunc(event));
        });

        function deleteFile(event) {
            let deletedFile = event.target.closest('.file');
            let deletedFilesArr = document.querySelectorAll(`.file[data-index='${deletedFile.dataset.index}']`);
            // Удаление file из FileList
            // Фильруем FileList и создаём новый из тех файлов которые нам нужны
            const DT = new DataTransfer();
            for (let i = 0; i < this.fileList.files.length; i++) {
                const file = this.fileList.files[i];
                if (Number(deletedFile.dataset.index) !== i) {
                    DT.items.add(file);
                }
            }

            // Заполняем окно удаления
            const modalRemove = document.querySelector('.modal-remove');
            const removeBtn = modalRemove.querySelector('.modal-remove__remove-btn');
            modalRemove.querySelector('.modal-remove__title').innerText = 'Удаление файла';
            modalRemove.querySelector('.modal-remove__subtitle').innerText = 'Это действие необратимо, вы уверены?';
            let openModals = document.querySelectorAll('.i-modal.is-active');
            if (openModals.length) {
                window.openModal('modal-remove', true);
            } else {
                window.openModal('modal-remove');
            }

            function removeFile() {
                this.fileList = DT;
                deletedFilesArr.forEach((el) => {
                    el.remove();
                });
                URL.revokeObjectURL(imageLink);
                modalRemove.querySelector('.modal-remove__remove-btn').removeEventListener('click', removeFileWithContext);
                window.closeModal();
                removeObserver.disconnect();
                this._correctIndex();
            }

            const removeFileWithContext = removeFile.bind(this);

            removeBtn.addEventListener('click', removeFileWithContext);

            const removeObserver = new MutationObserver((mutations) => {
                if (!mutations[0].target.classList.contains('is-active')) {
                    removeBtn.removeEventListener('click', removeFileWithContext);
                    removeObserver.disconnect();
                }
            });
            removeObserver.observe(modalRemove, { attributeFilter: ['class'] });
        }

        if (this.dropZone) {
            this.fileElDropzone = currentFile.cloneNode(true);
            this.fileElDropzone.querySelector('.file__carret').remove();
            this.fileElDropzone.querySelectorAll('[data-delete-file]').forEach((deleteBtn) => {
                deleteBtn.addEventListener('click', (event) => deleteFileFunc(event));
            });
        }

        return currentFile;
    }

    _correctIndex() {
        if (this.fileLoader) {
            const files = this.fileLoader.querySelectorAll('.file');
            files.forEach((el, i) => {
                el.dataset.index = i;
            });
        }
        if (this.dropZone) {
            const dropzoneFiles = this.dropZone.querySelectorAll('.file');
            dropzoneFiles.forEach((el, i) => {
                el.dataset.index = i;
            });
        }
    }

    addFile(file) {
        const filesWrapper = this.fileLoader?.querySelector('.file-loader__content');
        // if (file) {
        //     filesWrapper.append(this.createFileElement(file));
        //     return;
        // }

        if (!this.currentFile) return;

        this.fileList.items.add(this.currentFile);
        this.modalUpload.querySelector('input').dataset.for = this.fileList.files.length - 1;
        this.changeFileName();

        // добавление файлов в обычный fileLoader.
        if (filesWrapper) {
            this.fileEl.classList.add('file--advanced');
            this.fileEl.classList.remove('uploaded');
            filesWrapper.append(this.fileEl);
        }

        // добавление файлов в dropzone
        if (this.dropZone) {
            const dropZoneWrapper = this.dropZone.querySelector('.drop-zone__uploaded-files');
            this.fileElDropzone.classList.add('attached');
            this.fileElDropzone.classList.remove('uploaded');
            dropZoneWrapper.append(this.fileElDropzone);
        }

        window.closeModal();
        this.modalUpload.querySelector(`input[name='file-name']`).value = '';
    }

    uploadFile(file) {
        console.log('upload file');
        this.currentFile = file;
        this.fileEl = this.createFileElement(file);
        this.modalUpload.querySelector('.modal-upload__files').innerHTML = '';
        this.modalUpload.querySelector('.modal-upload__files').append(this.fileEl);

        let openModals = document.querySelectorAll('.i-modal.is-active');
        if (openModals.length) {
            window.openModal('modal-upload', true);
        } else {
            window.openModal('modal-upload');
        }
    }

    changeFileName() {
        const inputFileName = this.modalUpload?.querySelector('input');
        if (inputFileName.value) {
            // обычный файл
            let fileName = this.fileEl.querySelector('.file__name');
            fileName.innerHTML = inputFileName.value;
            // файл для dropZone
            if (this.fileElDropzone) {
                this.fileElDropzone.querySelector('.file__name').innerHTML = inputFileName.value;
            }
            // изменяем имя внутри fileList
            Object.defineProperty(this.fileList.files[inputFileName.dataset.for], 'name', { value: inputFileName.value, writable: true });
        }
    }
}
