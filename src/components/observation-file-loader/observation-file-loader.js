export function createObservationFileloader() {
    const fileLoader = document.createElement('div');
    fileLoader.classList.add('observation-file-loader');
    fileLoader.innerHTML = `
  <div class='observation-file-loader__content'></div>
  <label for='observation-fileloader' class='observation-file-loader__add-file'>
  <input type="file" name='observation-fileloader' id='observation-fileloader' >
  <svg><use href='img/sprite.svg#plus-icon'></use></svg>
  </label>`;

    return fileLoader;
}

export function createFileElement(file) {
    let currentFile;
    console.log(file);
    let fileName = file.name;
    let fileType = file.type;

    let image = null;
    // let imageLink;
    // if (fileType.match(/png|jpeg|jpg/i)) {
    //     console.log('Это Картинка!!!');
    //     console.log(file);
    //     imageLink = URL.createObjectURL(file);
    //     console.log(imageLink);
    //     image = `<img class='file__img' src='${imageLink}'></img>`;
    // }

    // Для работы с реальнымы файлами используй код выше.
    if (fileType.match(/png|jpeg|jpg/i)) {
        image = `<img class='file__img' src='${file.src}'></img>`;
    }

    currentFile = document.createElement('div');
    // currentFile.dataset.index = mainFileList.files.length - 1;
    currentFile.classList.add('file', 'file--advanced');
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
            <li class='file__menu-item'>
                <svg><use href='img/sprite.svg#trash'></use></svg>
                <span>Удалить</span>
            </li>
          </ul>
      </div>
      <div class='loader'></div>
      <div class='file__uploaded'><svg><use href='img/sprite.svg#check-bold'></use></svg></div>
      <div class='file__delete'><svg><use href='img/sprite.svg#close'></use></svg></div>`;

    return currentFile;

    // currentFile.querySelector('.file__delete').addEventListener('click', (event) => {
    //     let deletedFile = event.target.closest('.file');
    //     // Удаление file из FileList
    //     // Фильруем FileList и создаём новый из тех файлов которые нам нужны
    //     const DT = new DataTransfer();
    //     for (let i = 0; i < mainFileList.files.length; i++) {
    //         const file = mainFileList.files[i];
    //         if (Number(deletedFile.dataset.index) !== i) {
    //             // console.log(`index: ${deletedFile.dataset.index}`);
    //             // console.log(`i: ${i}`);
    //             // console.log(filesData);
    //             // console.log(file);
    //             DT.items.add(file);
    //         }
    //     }
    //     mainFileList = DT;
    //     deletedFile.remove();
    //     URL.createObjectURL(imageLink);
    //     console.log(mainFileList.files);
    // });

    // if (modalUpload) {
    //     filesWrapper.append(currentFile);
    //     // input
    //     modalUpload.querySelector('input').dataset.for = mainFileList.files.length - 1;
    // }
}
