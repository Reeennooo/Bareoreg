import { TooltipActions } from '../tooltipActions/tooltipActions';

const userElement = document.querySelector('.user');

if (userElement) {
    const tooltipUserMenu = new TooltipActions({
        options: [
            { txt: 'Профиль', icon: 'user', href: '/personal/profile' },
            { txt: 'Выйти', icon: 'SignOut', addClass: '/logout' },
        ],
    }).tooltip;

    document.querySelector('.user').addEventListener('click', openUserMenu);
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user')) {
            userElement.classList.remove('is-open');
            tooltipUserMenu.classList.remove('is-active');
        }
    });

    document.querySelector('.user').append(tooltipUserMenu);

    function openUserMenu() {
        userElement.classList.add('is-open');
        tooltipUserMenu.classList.add('is-active');
    }
}
