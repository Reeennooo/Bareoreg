document.addEventListener('DOMContentLoaded', () => {
    const viewingModal = document.querySelector('.viewing-modal');
    if (!viewingModal) return;

    // remove
    document.addEventListener('click', (e) => {
        const openModalBtn = e.target.closest("[data-modal='viewing-modal']");
        if (openModalBtn) {
            const file = openModalBtn.closest('.file');
            viewingModal.querySelector("[data-modal-name='remove-file']").dataset.fileId = file.dataset.fileId;
        }
    });

    // zoom
    let scale = 1;
    const zoom = 0.1;
    let zoomPercents = 100;

    const closeBtn = viewingModal.querySelector('[data-modal-close]');
    const zoomToggler = viewingModal.querySelector('.viewing-zoom');
    const zoomPercentsBlock = zoomToggler.querySelector('.viewing-zoom__value');

    closeBtn.addEventListener('click', reset);
    zoomToggler.addEventListener('click', (e) => zoomTrigger(e.target));
    const image = viewingModal.querySelector('.viewing-modal__file img');

    function reset() {
        scale = 1;
        zoomPercents = 100;
        zoomPercentsBlock.innerText = zoomPercents;
        image.style.transform = `scale(${scale})`;
    }

    function zoomTrigger(element) {
        if (element.closest('.viewing-zoom__minus')) {
            reduceImage();
        } else if ('.viewing-zoom__plus') {
            increaseImage();
        }
    }

    function reduceImage() {
        if (scale - zoom < 0.1) return;

        scale = scale - zoom;
        image.style.transform = `scale(${scale})`;
        zoomPercents = zoomPercents - 10;
        zoomPercentsBlock.innerText = zoomPercents;
    }

    function increaseImage() {
        if (scale + zoom > 2.1) return;

        scale = scale + zoom;
        image.style.transform = `scale(${scale})`;

        zoomPercents = zoomPercents + 10;
        zoomPercentsBlock.innerText = zoomPercents;
    }
});
