export class TooltipActions {
    static _createTooltip(options) {
        const tooltip = document.createElement('ul');
        tooltip.classList.add('tooltip-menu');
        options.forEach((opt) => {
            const classes = opt.addClass || '';
            if (opt.href) {
                tooltip.insertAdjacentHTML('beforeend', `<a href='${opt.href}'><li class='tooltip-menu__option ${classes}'><svg><use href='img/sprite.svg#${opt.icon}'></use></svg><span>${opt.txt}</span></li></a>`);
            } else {
                tooltip.insertAdjacentHTML('beforeend', `<li class='tooltip-menu__option ${classes}'><svg><use href='img/sprite.svg#${opt.icon}'></use></svg><span>${opt.txt}</span></li>`);
            }
        });
        return tooltip;
    }

    constructor(data) {
        this.tooltip = TooltipActions._createTooltip(data.options);
    }
}
