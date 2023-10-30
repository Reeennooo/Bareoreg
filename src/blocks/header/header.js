function makeGetScroll() {
    // let lastScrollValue = 0;
    const header = document.querySelector('.header');

    function openHeader() {
        header.classList.remove('is-close');
    }
    header.addEventListener('click', openHeader);

    function checkHeaderScroll() {
        if (window.scrollY > header.clientHeight && !header.classList.contains('is-close')) {
            header.classList.add('is-close');
        }

        if (window.scrollY < header.clientHeight) {
            openHeader();
        }

        if (document.documentElement.classList.contains('noScroll')) {
            header.classList.add('is-close');
            header.classList.add('is-blocked');
        } else if (header.classList.contains('is-blocked')) {
            header.classList.remove('is-blocked');
        }

        // if (window.scrollY > lastScrollValue) {
        //     // console.log('ВНИЗ');
        // }

        // if (window.scrollY < lastScrollValue) {
        //     header.classList.remove('is-close');
        // }

        // lastScrollValue = window.scrollY;
    }

    return checkHeaderScroll;
}

const checkHeaderScroll = makeGetScroll();

document.addEventListener('scroll', checkHeaderScroll);
