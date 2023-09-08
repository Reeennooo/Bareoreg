document.addEventListener('DOMContentLoaded', () => {
    let mainFileList = new DataTransfer();
    let currentFile = null;
    const dropZones = document.querySelectorAll('.file-loader');
    const modalUpload = document.querySelector('.modal-upload');
    const filesWrapper = modalUpload?.querySelector('.modal-upload__files');
    const btnSave = modalUpload?.querySelector('.modal-upload__save');
    const btnCancel = modalUpload?.querySelector('.modal-upload__cancel');

    if (dropZones) {
        dropZones.forEach((zone) => {
            let inputFile = zone.querySelector("input[type='file']");

            zone.addEventListener('dragover', (event) => {
                event.preventDefault();
                zone.classList.add('dragover');
            });

            zone.addEventListener('dragleave', (event) => {
                event.preventDefault();
                zone.classList.remove('dragover');
            });

            zone.addEventListener('drop', (event) => {
                event.preventDefault();
                zone.classList.remove('dragover');
                uploadFile(event.dataTransfer.files[0]);
            });

            inputFile.addEventListener('change', (event) => {
                console.log(event);
                uploadFile(event.target.files[0]);
                event.target.value = '';
            });
        });
    }

    btnSave?.addEventListener('click', () => {
        changeFileName();
        window.closeModal();
        attachFile();
    });

    btnCancel?.addEventListener('click', clearUploadedFiles);

    function uploadFile(file) {
        if (file) {
            mainFileList.items.add(file);
            window.openModal('modal-upload');
            createFileElement(file);
        }
        // filesData = fileList;
        // filesData = Object.create(fileList);
        console.log(mainFileList.files);
    }

    function createFileElement(file) {
        console.log(file);
        let fileName = file.name;
        let fileType = file.type;

        let image = null;
        let imageLink;
        if (fileType.match(/png|jpeg|jpg/i)) {
            console.log('Это Картинка!!!');
            console.log(file);
            imageLink = URL.createObjectURL(file);
            console.log(imageLink);
            image = `<img class='file__img' src='${imageLink}'></img>`;
        }

        currentFile = document.createElement('div');
        currentFile.dataset.index = mainFileList.files.length - 1;
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
            <div class='loader'></div>
            <div class='file__uploaded'><svg><use href='img/sprite.svg#check-bold'></use></svg></div>
            <div class='file__delete'><svg><use href='img/sprite.svg#close'></use></svg></div>`;

        currentFile.querySelector('.file__delete').addEventListener('click', (event) => {
            let deletedFile = event.target.closest('.file');
            // Удаление file из FileList
            // Фильруем FileList и создаём новый из тех файлов которые нам нужны
            const DT = new DataTransfer();
            for (let i = 0; i < mainFileList.files.length; i++) {
                const file = mainFileList.files[i];
                if (Number(deletedFile.dataset.index) !== i) {
                    // console.log(`index: ${deletedFile.dataset.index}`);
                    // console.log(`i: ${i}`);
                    // console.log(filesData);
                    // console.log(file);
                    DT.items.add(file);
                }
            }
            mainFileList = DT;
            deletedFile.remove();
            URL.createObjectURL(imageLink);
            console.log(mainFileList.files);
        });

        if (modalUpload) {
            filesWrapper.append(currentFile);
            // input
            modalUpload.querySelector('input').dataset.for = mainFileList.files.length - 1;
        }
    }

    function changeFileName() {
        const inputFileName = modalUpload?.querySelector('input');
        if (inputFileName.value) {
            // console.log(file)
            let fileName = currentFile.querySelector('.file__name');
            Object.defineProperty(mainFileList.files[inputFileName.dataset.for], 'name', { value: inputFileName.value, writable: true });
            fileName.innerHTML = inputFileName.value;
        }
    }

    function attachFile() {
        const uploadedFilesBlock = document.querySelector('.file-loader__uploaded-files');
        currentFile.classList.remove('uploaded');
        currentFile.classList.add('attached');
        uploadedFilesBlock.append(currentFile);
        correctGroupHeight(uploadedFilesBlock);
    }

    function clearUploadedFiles() {
        const DT = new DataTransfer();
        for (let i = 0; i < mainFileList.files.length; i++) {
            const file = mainFileList.files[i];
            if (mainFileList.files.length - 1 !== i) {
                // console.log(`index: ${deletedFile.dataset.index}`);
                // console.log(`i: ${i}`);
                // console.log(filesData);
                // console.log(file);
                DT.items.add(file);
            }
        }
        mainFileList = DT;
        window.closeModal();
        currentFile.remove();
        console.log(mainFileList.files);
    }

    function correctGroupHeight(childElement) {
        let innerWrapper = childElement.closest('.group__inner-wrapper');
        if (innerWrapper) {
            let innerContent = innerWrapper.querySelector('.group__inner');
            console.log(innerContent.offsetHeight);
            innerWrapper.style.height = 'auto';
            // innerContent.offsetHeight + 'px';
        }
    }
});
