export class ItcCustomSelect {
    static EL = 'itc-select';
    static EL_SHOW = 'itc-select_show';
    static EL_OPTION = 'itc-select__option';
    static EL_OPTION_SELECTED = 'itc-select__option_selected';
    static TEXT_SELECTED_EL = 'itc-select__text-selected'
    static DATA = '[data-select]';
    static DATA_TOGGLE = '[data-select="toggle"]';

    // Если будешь использовать жтот метод, то обратись к документации.
    static template(params) {
        const { name, options, targetValue, placeholder = 'Выберите из списка' } = params;
        const items = [];
        let selectedIndex = -1;
        let selectedValue = '';
        // let selectedContent = 'Выберите из списка';
        let selectedContent = '';
        options.forEach((option, index) => {
            let selectedClass = '';
            if (option[0] === targetValue) {
                selectedClass = ` ${this.EL_OPTION_SELECTED}`;
                selectedIndex = index;
                selectedValue = option[0];
                selectedContent = option[1];
            }
            items.push(`<li class="itc-select__option${selectedClass}" data-select="option"
        data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);
        });
        return `<button type="button" class="itc-select__toggle" name="${name}"
      value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">
      <span class='itc-select__text-selected'>${selectedContent}</span>
      </button><div class="itc-select__placeholder">${placeholder}</div><div class="itc-select__dropdown">
      <ul class="itc-select__options">${items.join('')}</ul></div>`;
    }

    static hideOpenSelect() {
        document.addEventListener('click', (e) => {
            if (!e.target.closest(`.${this.EL}`)) {
                const elsActive = document.querySelectorAll(`.${this.EL_SHOW}`);
                elsActive.forEach((el) => {
                    el.classList.remove(this.EL_SHOW);
                });
            }
        });
    }
    static create(target, params) {
        this._el = typeof target === 'string' ? document.querySelector(target) : target;
        if (this._el) {
            return new this(target, params);
        }
        return null;
    }
    constructor(target, params) {
        this._el = typeof target === 'string' ? document.querySelector(target) : target;
        this._params = params || {};
        // добавлено мной
        this._multiple = this._el.dataset.multiple || this._params.multiple ? true : false;
        // - - -
        this._onClickFn = this._onClick.bind(this);
        if (this._params.options) {
            this._el.innerHTML = this.constructor.template(this._params);
            this._el.classList.add(this.constructor.EL);
        }
        this._elToggle = this._el.querySelector(this.constructor.DATA_TOGGLE);
        this._textSelectedEl = this._el.querySelector(`.${ItcCustomSelect.TEXT_SELECTED_EL}`);
        // this._textSelectedEl = document.createElement('span');
        // this._textSelectedEl.classList.add('itc-select__text-selected');
        // this._elToggle.append(this._textSelectedEl);
        this._el.addEventListener('click', this._onClickFn);
    }

    _onClick(e) {
        const { target } = e;
        const type = target.closest(this.constructor.DATA).dataset.select;
        if (type === 'toggle') {
            this.toggle();
        } else if (type === 'option') {
            // console.log(this);
            this._changeValue(target);
        }
    }

    _updateOption(el) {
        // !!!!!!! Разобраться с индексами
        const elOption = el.closest(`.${this.constructor.EL_OPTION}`);

        if (this._multiple) {
            const updateValue = (string, cutString) => {
                const filter = new RegExp(`${cutString}(\,\\s|\,)|${cutString}`, 'g');
                let resultString = string.replace(filter, '').trim();
                resultString = resultString.replace(/,$/, '');
                return resultString;
            };

            if (elOption.classList.contains(this.constructor.EL_OPTION_SELECTED)) {
                elOption.classList.remove(this.constructor.EL_OPTION_SELECTED);
                // this._elToggle.textContent = updateValue(this._elToggle.textContent, elOption.textContent);
                this._textSelectedEl.textContent = updateValue(this._elToggle.textContent, elOption.textContent);
                this._elToggle.value = updateValue(this._elToggle.value, elOption.dataset.value);
                const index = updateValue(this._elToggle.dataset.index, elOption.dataset.index);
                this._elToggle.dataset.index = index.length ? index : -1;
                return;
            } else {
                this._textSelectedEl.textContent = (this._elToggle.textContent + ', ' + elOption.textContent).trim().replace(/^\,|\,$/g, '');
                // this._elToggle.textContent = (this._elToggle.textContent + ', ' + elOption.textContent).trim().replace(/^\,|\,$/g, '');
                this._elToggle.value = this._elToggle.value ? this._elToggle.value + ', ' + elOption.dataset.value : elOption.dataset.value;
                this._elToggle.dataset.index = this._elToggle.dataset.index === '-1' ? elOption.dataset.index : this._elToggle.dataset.index + ', ' + elOption.dataset.index;
            }
            // console.log(this._elToggle.textContent);
        } else {
            const elOptionSel = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
            if (elOptionSel) {
                elOptionSel.classList.remove(this.constructor.EL_OPTION_SELECTED);
            }
            // this._elToggle.textContent = elOption.textContent;
            this._textSelectedEl.textContent = elOption.textContent;
            this._elToggle.value = elOption.dataset.value;
            this._elToggle.dataset.index = elOption.dataset.index;
        }
        // if (elOptionSel) {
        //     elOptionSel.classList.remove(this.constructor.EL_OPTION_SELECTED);
        // }
        elOption.classList.add(this.constructor.EL_OPTION_SELECTED);
        // this._elToggle.textContent = elOption.textContent;
        // this._elToggle.value = elOption.dataset.value;
        // this._elToggle.dataset.index = elOption.dataset.index;
        this._el.dispatchEvent(new CustomEvent('itc.select.change'));
        this._params.onSelected ? this._params.onSelected(this, elOption) : null;
        return elOption.dataset.value;
    }

    _reset() {
        const selected = this._el.querySelector(`.${this.constructor.EL_OPTION_SELECTED}`);
        if (selected) {
            selected.classList.remove(this.constructor.EL_OPTION_SELECTED);
        }
        this._elToggle.textContent = '';
        this._elToggle.value = '';
        this._elToggle.dataset.index = '-1';
        this._el.dispatchEvent(new CustomEvent('itc.select.change'));
        this._params.onSelected ? this._params.onSelected(this, null) : null;
        return '';
    }

    _changeValue(el) {
        // добавлено мной
        if (this._multiple) {
            this._updateOption(el);
            return;
        }
        // - - -
        if (el.classList.contains(this.constructor.EL_OPTION_SELECTED)) {
            return;
        }
        this._updateOption(el);
        this.hide();
    }

    show() {
        document.querySelectorAll(this.constructor.EL_SHOW).forEach((el) => {
            el.classList.remove(this.constructor.EL_SHOW);
        });
        this._el.classList.add(`${this.constructor.EL_SHOW}`);
    }

    hide() {
        this._el.classList.remove(this.constructor.EL_SHOW);
    }

    toggle() {
        this._el.classList.contains(this.constructor.EL_SHOW) ? this.hide() : this.show();
    }

    dispose() {
        this._el.removeEventListener('click', this._onClickFn);
    }

    get value() {
        return this._elToggle.value;
    }

    set value(value) {
        let isExists = false;
        this._el.querySelectorAll('.select__option').forEach((option) => {
            if (option.dataset.value === value) {
                isExists = true;
                this._updateOption(option);
            }
        });
        if (!isExists) {
            this._reset();
        }
    }

    get selectedIndex() {
        return this._elToggle.dataset.index;
    }

    set selectedIndex(index) {
        const option = this._el.querySelector(`.select__option[data-index="${index}"]`);
        if (option) {
            this._updateOption(option);
        }
        this._reset();
    }
}

ItcCustomSelect.hideOpenSelect();
