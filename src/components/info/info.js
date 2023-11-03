import tippy from 'tippy.js';

// tippy('#city-info', {
//     content: 'Если игнорировать это поле, пациента не будет на географической карте',
//     theme: 'violet',
// });

function initTippy() {
    const infoCirles = document.querySelectorAll('.info');
    infoCirles.forEach((circle) => {
        let circleId = circle.getAttribute('id');
        if (circleId && circle.dataset.info) {
            const infoObj = JSON.parse(circle.dataset.info);
            tippy(`#${circleId}`, infoObj);
        }
    });
}

document.addEventListener('DOMContentLoaded', initTippy);
