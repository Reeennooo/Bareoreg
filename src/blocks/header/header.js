function makeGetScroll() {
    // let lastScrollValue = 0;
    const header = document.querySelector('.header');

    function openHeader() {
        header.classList.remove('is-scrolled');
    }
    header.addEventListener('click', openHeader);

    function checkHeaderScroll() {
        if (window.scrollY > header.clientHeight && !header.classList.contains('is-scrolled')) {
            header.classList.add('is-scrolled');
        }

        if (window.scrollY < header.clientHeight) {
            openHeader();
        }

        // if (window.scrollY > lastScrollValue) {
        //     // console.log('ВНИЗ');
        // }

        // if (window.scrollY < lastScrollValue) {
        //     header.classList.remove('is-scrolled');
        // }

        // lastScrollValue = window.scrollY;
    }

    return checkHeaderScroll;
}

const checkHeaderScroll = makeGetScroll();

document.addEventListener('scroll', checkHeaderScroll);
