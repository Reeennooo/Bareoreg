document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const clickedBtn = event.target.closest('.file__carret');
        if (clickedBtn) {
            const openFiles = document.querySelectorAll('.file.is-active');
            openFiles.forEach((fileMenu) => {
                fileMenu.classList.remove('is-active');
            });
            openfileMenu(clickedBtn.closest('.file'));
        } else {
            const openFiles = document.querySelectorAll('.file.is-active');
            openFiles.forEach((fileMenu) => {
                fileMenu.classList.remove('is-active');
            });
        }
    });

    function openfileMenu(file) {
        file.classList.add('is-active');
    }
});
