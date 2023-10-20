export class FileLoader {
    constructor() {
        this.fileList = new DataTransfer();
        this.fileLoader = this.createObservationFileloader();
        this.loaderInput = this.fileLoader.querySelector(`input`);
        this.currentFile;
        this.fileEl;
        this.loaderInput.addEventListener('change', (event) => {
            this.uploadFile(event.target.files[0]);
            event.target.value = '';
        });
        this.modalUpload = document.querySelector('.modal-upload');

        this.modalUpload.querySelector('.modal-upload__save').addEventListener('click', () => this.addFile());
    }

    createObservationFileloader() {
        const fileLoader = document.createElement('div');
        fileLoader.classList.add('observation-file-loader');
        fileLoader.innerHTML = `
        <div class='observation-file-loader__content'></div>
        <label for='observation-fileloader' class='observation-file-loader__add-file'>
        <input type="file" name='observation-fileloader' id='observation-fileloader' >
        <svg><use href='img/sprite.svg#plus-icon'></use></svg>
        </label>`;

        console.log(fileLoader);
        return fileLoader;
    }

    createFileElement(file) {
        let currentFile;
        console.log(file);
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
            console.log('Это Картинка!!!');
            console.log(file);
            imageLink = URL.createObjectURL(file);
            image = `<img class='file__img' src='${imageLink}'></img>`;
        }

        currentFile = document.createElement('div');
        currentFile.dataset.index = this.fileList.files.length - 1;
        currentFile.classList.add('file');
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
          <div class='file__uploaded'><svg><use href='img/sprite.svg#check-bold'></use></svg></div>`;

        currentFile.querySelector('[data-delete-file]').addEventListener('click', (event) => {
            let deletedFile = event.target.closest('.file');
            // Удаление file из FileList
            // Фильруем FileList и создаём новый из тех файлов которые нам нужны
            const DT = new DataTransfer();
            for (let i = 0; i < this.fileList.files.length; i++) {
                const file = this.fileList.files[i];
                if (Number(deletedFile.dataset.index) !== i) {
                    // console.log(`index: ${deletedFile.dataset.index}`);
                    // console.log(`i: ${i}`);
                    // console.log(filesData);
                    // console.log(file);
                    DT.items.add(file);
                }
            }

            // Заполняем окно удаления
            const modalRemove = document.querySelector('.modal-remove');
            const removeBtn = modalRemove.querySelector('.modal-remove__remove-btn');
            modalRemove.querySelector('.modal-remove__title').innerText = 'Удаление файла';
            modalRemove.querySelector('.modal-remove__subtitle').innerText = 'Это действие безвозвратно, вы уверены?';
            window.openModal('modal-remove', true);

            console.log('Добавляем EVEN LISTENER');
            removeBtn.addEventListener('click', removeFile);

            function removeFile() {
                console.log('УДАЛЯЮ');
                this.fileList = DT;
                deletedFile.remove();
                URL.revokeObjectURL(imageLink);
                modalRemove.querySelector('.modal-remove__remove-btn').removeEventListener('click', removeFile);
                window.closeModal();
                removeObserver.disconnect();
            }

            const removeObserver = new MutationObserver((mutations) => {
                if (!mutations[0].target.classList.contains('is-active')) {
                    console.log('Удаляю обработчик');
                    removeBtn.removeEventListener('click', removeFile);
                    removeObserver.disconnect();
                }
            });
            removeObserver.observe(modalRemove, { attributeFilter: ['class'] });

            // console.log(mainFileList.files);
        });

        // if (modalUpload) {
        //     filesWrapper.append(currentFile);
        //     // input
        //     modalUpload.querySelector('input').dataset.for = mainFileList.files.length - 1;
        // }

        return currentFile;
    }

    addFile(file) {
        const filesWrapper = this.fileLoader.querySelector('.observation-file-loader__content');
        console.log(this);

        // if (file) {
        //     filesWrapper.append(this.createFileElement(file));
        //     return;
        // }

        // добавление файлов в список
        this.fileList.items.add(this.currentFile);
        this.modalUpload.querySelector('input').dataset.for = this.fileList.files.length - 1;
        this.changeFileName();
        this.fileEl.classList.add('file--advanced');
        filesWrapper.append(this.fileEl);
        window.closeModal();
    }

    removeFile() {
        let deletedFile = event.target.closest('.file');
        // Удаление file из FileList
        // Фильруем FileList и создаём новый из тех файлов которые нам нужны
        const DT = new DataTransfer();
        for (let i = 0; i < this.fileList.files.length; i++) {
            const file = this.fileList.files[i];
            if (Number(deletedFile.dataset.index) !== i) {
                DT.items.add(file);
            }
        }
        this.fileList = DT;
        deletedFile.remove();
        URL.revokeObjectURL(imageLink);
    }

    uploadFile(file) {
        this.currentFile = file;
        this.fileEl = this.createFileElement(file);
        this.modalUpload.querySelector('.modal-upload__files').innerHTML = '';
        this.modalUpload.querySelector('.modal-upload__files').append(this.fileEl);
        window.openModal('modal-upload', true);
    }

    changeFileName() {
        const inputFileName = this.modalUpload?.querySelector('input');
        if (inputFileName.value) {
            // console.log(file)
            let fileName = this.fileEl.querySelector('.file__name');
            Object.defineProperty(this.fileList.files[inputFileName.dataset.for], 'name', { value: inputFileName.value, writable: true });
            fileName.innerHTML = inputFileName.value;
        }
    }
}
