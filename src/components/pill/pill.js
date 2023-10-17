document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const clickedPill = event.target.closest('.pill');
        if (clickedPill) {
            const openPills = document.querySelectorAll('.pill.is-active');
            openPills.forEach((pill) => {
                pill.classList.remove('is-active');
            });
            openPill(clickedPill);
        } else {
            const openPills = document.querySelectorAll('.pill.is-active');
            openPills.forEach((pill) => {
                pill.classList.remove('is-active');
            });
        }
    });

    function openPill(pill) {
        pill.classList.add('is-active');
    }
});
