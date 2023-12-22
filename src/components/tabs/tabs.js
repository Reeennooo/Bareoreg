document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelector('.tabs-wrapper');
    if (!tabs) return;

    document.addEventListener('click', (event) => {
        const tab = event.target.closest('.tab');
        if (tab) tabClick(tab);
    });

    function tabClick(tab) {
        if (tab.classList.contains('is-active')) return;
        const tabsWrapper = tab.closest('.tabs-wrapper');
        tabsWrapper.querySelector('.tab.is-active').classList.remove('is-active');
        tab.classList.add('is-active');
    }
});
