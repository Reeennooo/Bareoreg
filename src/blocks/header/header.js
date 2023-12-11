const header = document.querySelector('.header');
const menuBtn = header.querySelector('.burger');

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    header.classList.toggle('menu-is-open');
    menuBtn.classList.toggle('is-active');
}
