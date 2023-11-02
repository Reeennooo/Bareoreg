// export class CustomTooltip {
//     static TOOLTIP = 'tooltip-menu';
//     static EL_SHOW = 'is-active';

//     static _createTooltip(options) {
//         const tooltip = document.createElement('ul');
//         tooltip.classList.add('tooltip-menu');
//         options.forEach((opt) => {
//             tooltip.insertAdjacentHTML('beforeend', `<li class='tooltip-menu__option'><svg><use href='img/sprite.svg#${opt.icon}'></use></svg><span>${opt.txt}</span></li>`);
//         });
//         return tooltip;
//     }

//     static hideOpenTooltip() {
//         document.addEventListener('click', (e) => {
//             if (!e.target.closest(`.${this.TOOLTIP}`)) {
//                 console.log('close');
//                 const elsActive = document.querySelectorAll(`.${this.TOOLTIP}`);
//                 elsActive.forEach((el) => {
//                     el.classList.remove(this.EL_SHOW);
//                 });
//             }
//         });
//     }

//     constructor(data) {
//         this.target = typeof data.target === 'string' ? document.querySelector(data.target) : data.target;
//         this.tooltip = CustomTooltip._createTooltip(data.options);
//         this.target.append(this.tooltip);

//         this.target.addEventListener('click', this.show.bind(this));
//     }

//     show() {
//         document.querySelectorAll(`.${this.constructor.TOOLTIP}.${this.constructor.EL_SHOW}`).forEach((el) => {
//             el.classList.remove(this.constructor.EL_SHOW);
//         });
//         this.tooltip.classList.add(`${this.constructor.EL_SHOW}`);
//         console.log(this.constructor.EL_SHOW);
//     }
// }

// CustomTooltip.hideOpenTooltip();
