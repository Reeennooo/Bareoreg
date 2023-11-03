import { ItcCustomSelect } from '../itc-custom-select/itc-custom-select';

// params
// {
//     static: true/false
// }

class Calendar {
    static EL = 'calendar';
    static DATES_EL = 'calendar__dates';
    static TOGGLER = 'calendar-toggler';
    static WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    static MONTHS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    // monthSelect;
    // yearsSelect;
    static createGenerator() {
        const allIds = [];

        function generator() {
            let uniqueId = Math.ceil(Math.random() * 100);

            if (!allIds.length) {
                allIds.push(uniqueId);
                return uniqueId;
            }

            let haveInArr = allIds.indexOf(uniqueId);

            for (haveInArr; haveInArr !== -1; ) {
                uniqueId = Math.ceil(Math.random() * 100);
                haveInArr = allIds.indexOf(uniqueId);
            }

            allIds.push(uniqueId);

            return uniqueId;
        }

        return generator;
    }
    static generatorId = this.createGenerator();

    static createCalendar(params) {
        const calendar = document.createElement('div');
        calendar.classList.add('calendar');
        calendar.innerHTML = `
            <header class='calendar__header'>
                <div class='calendar__months'>
                    <button class='btn btn--only-icon calendar__switcher prev-month' type='button'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icons/navigate_before">
                        <path id="icon" d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z"/>
                        </g>
                        </svg>
                    </button>
                    <button class='btn btn--only-icon calendar__switcher next-month' type='button'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icons/navigate_next">
                        <path id="icon" d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"/>
                        </g>
                        </svg>
                    </button>
                </div>
                <div class='calendar__years'>
                    <button class='btn btn--only-icon calendar__switcher prev-year' type='button'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icons/navigate_before">
                        <path id="icon" d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z"/>
                        </g>
                        </svg>
                    </button>
                    <button class='btn btn--only-icon calendar__switcher next-year' type='button'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icons/navigate_next">
                        <path id="icon" d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"/>
                        </g>
                        </svg>
                    </button>
                </div>
            </header>
            <div class='calendar__body'>
                <ul class='calendar__weekdays'>
                </ul>
                <ul class='calendar__dates'>
                </ul>
            </div>
        `;

        // week-days
        const weekDaysEl = calendar.querySelector('.calendar__weekdays');
        this.WEEK_DAYS.map((el) => weekDaysEl.insertAdjacentHTML('beforeend', `<li>${el}</li>`));

        return calendar;
    }

    static createMonthSelect() {
        const monthSelectEl = document.createElement('div');
        monthSelectEl.classList.add('itc-select--classic');
        monthSelectEl.setAttribute('id', `calendar-month${this.generatorId()}`);
        // console.log(monthSelectEl.getAttribute('id'));
        return new ItcCustomSelect(monthSelectEl, {
            name: monthSelectEl.getAttribute('id'),
            options: [
                ['Янв', 'Янв'],
                ['Фев', 'Фев'],
                ['Мар', 'Мар'],
                ['Апр', 'Апр'],
                ['Май', 'Май'],
                ['Июн', 'Июн'],
                ['Июл', 'Июл'],
                ['Авг', 'Авг'],
                ['Сен', 'Сен'],
                ['Окт', 'Окт'],
                ['Ноя', 'Ноя'],
                ['Дек', 'Дек'],
            ],
            targetValue: this.MONTHS[new Date().getMonth()],
        });
    }

    static createYearsSelect(years, currentYear) {
        const yearSelectEl = document.createElement('div');
        yearSelectEl.classList.add('itc-select--classic');
        yearSelectEl.setAttribute('id', `calendar-years${this.generatorId()}`);
        return new ItcCustomSelect(yearSelectEl, {
            name: yearSelectEl.getAttribute('id'),
            options: years.map((el) => [el, el]),
            targetValue: currentYear,
        });
    }

    static hideOpenCalendar() {
        document.addEventListener('click', (event) => {
            if (event.target.closest('.inactive.calendar__day')) return;

            if (!event.target.closest(`.${this.EL}`) && !event.target.closest('.calendar-toggler')) {
                const activeCalendars = document.querySelectorAll(`.${this.EL}`);
                activeCalendars.forEach((el) => {
                    el.classList.remove('is-active');
                });
            }
        });
    }

    constructor(target, params) {
        this._el = Calendar.createCalendar({
            date: this._date,
        });
        this._params = params || {};
        this._parrent;

        // дата
        this._date = new Date();
        this._year = this._date.getFullYear();
        this._month = this._date.getMonth();

        // доступные года
        this._years = [];
        let futureYears = this._year + 100;
        let pastYears = this._year - 100;
        for (let i = pastYears; i <= this._year; i++) {
            this._years.push(i);
        }
        for (let i = this._year; i < futureYears; i++) {
            if (i === this._year) continue;
            this._years.push(i);
        }

        // Список месяцев
        this._monthsSelect = Calendar.createMonthSelect();

        // Список годов
        this._yearsSelect = Calendar.createYearsSelect(this._years, this._year);
        this._yearsSelect._elToggle.addEventListener('click', () => {
            let wrapper = this._yearsSelect._el.querySelector('.itc-select__options');
            wrapper.scrollTop = wrapper.scrollHeight / 2;
        });

        this._parrentTag = typeof target === 'string' ? document.querySelector(target) : target;
        if (!this._parrentTag) return;

        if (this._parrentTag.tagName === 'DIV') {
            this._parrent = typeof target === 'string' ? document.querySelector(target) : target;
        } else if (this._parrentTag.tagName === 'INPUT') {
            this._parrent = typeof target === 'string' ? document.querySelector(target).closest('.input-custom') : target.closest('.input-custom');
            const input = this._parrent.querySelector('input');
            const calendarBtn = this._parrent.querySelector('.calendar-toggler');
            if (calendarBtn) {
                calendarBtn.addEventListener('click', handleCalendar.bind(this));
            }

            function handleCalendar() {
                const activeCalendar = document.querySelector(`.${Calendar.EL}.is-active`);
                activeCalendar?.classList.remove('is-active');
                this._el.classList.toggle('is-active');
                input.focus();
            }

            this._el.addEventListener('click', (event) => {
                input.focus();
            });
        }

        if (this._params.position !== 'static') {
            this._el.classList.add('absolute');
        }
        if (this._params.side === 'right') {
            this._el.classList.add('right-side');
        }

        // Переключатели даты
        const calendarSwitchers = this._el.querySelectorAll('.calendar__switcher');
        calendarSwitchers.forEach((switcher) => {
            switcher.addEventListener('click', (event) => this._switchDate(event.target));
        });

        // Отслеживаем изменения
        const monthObserver = new MutationObserver(() => this._selectSwitchMonth());
        monthObserver.observe(this._monthsSelect._elToggle, { attributeFilter: ['data-index'] });

        const yearsObserver = new MutationObserver(() => this._selectSwitchYear());
        yearsObserver.observe(this._yearsSelect._elToggle, { attributeFilter: ['value'] });

        this._el.addEventListener('click', this._calendarClick.bind(this));

        // Добавляем созданные элементы в документ
        this._el.querySelector('.prev-month')?.after(this._monthsSelect._el);
        this._el.querySelector('.prev-year')?.after(this._yearsSelect._el);
        this._renderCalendar();
        // document.body.append(this._el);

        this._parrent.prepend(this._el);
        // this._parrent.append(createCalendar(this._params))
    }

    _renderCalendar() {
        // Get the first day of the month
        let dayone = new Date(this._year, this._month, 1).getDay();

        // Get the last date of the month
        let lastdate = new Date(this._year, this._month + 1, 0).getDate();

        // Get the day of the last date of the month
        let dayend = new Date(this._year, this._month, lastdate).getDay();

        // Get the last date of the previous month
        let monthlastdate = new Date(this._year, this._month, 0).getDate();

        // Variable to store the generated calendar HTML
        let lit = '';

        // Loop to add the last dates of the previous month
        if (dayone === 0) {
            for (let i = dayone; i < 6; i++) {
                lit += `<li class="inactive calendar__day" data-month='prev'>${monthlastdate - (5 - i)}</li>`;
            }
        }

        for (let i = dayone; i > 1; i--) {
            lit += `<li class="inactive calendar__day" data-month='prev'>${monthlastdate + 1 - (i - 1)}</li>`;
            // lit += `<li class="inactive">${monthlastdate - i}</li>`;
        }

        // Loop to add the dates of the current month
        for (let i = 1; i <= lastdate; i++) {
            // Check if the current date is today
            let isToday = i === this._date.getDate() && this._month === this._date.getMonth() && this._year === this._date.getFullYear() ? 'active' : '';
            lit += `<li class="${isToday} calendar__day">${i}</li>`;
        }

        // Loop to add the first dates of the next month
        for (let i = dayend; i <= 6; i++) {
            lit += `<li class="inactive calendar__day" data-month='next'>${i - dayend + 1}</li>`;
        }

        // update the HTML of the dates element
        // with the generated calendar
        // console.log(this);
        this._el.querySelector(`.${Calendar.DATES_EL}`).innerHTML = lit;
    }

    _switchDate(switchEl) {
        // console.log(switchEl.classList.contains('prev-month'));
        const classes = switchEl.getAttribute('class');
        // console.log(classes);

        if (classes.includes('prev-month')) {
            this._changeMonthIndex('prev');
        } else if (classes.includes('next-month')) {
            this._changeMonthIndex('next');
        } else if (classes.includes('prev-year')) {
            if (this._years.indexOf(this._year - 1) !== -1) {
                console.log('click');
                let yearIndex = this._years.indexOf(this._year - 1);
                this._changeYear(yearIndex);
            }
        } else if (classes.includes('next-year')) {
            if (this._years.indexOf(this._year + 1) !== -1) {
                let yearIndex = this._years.indexOf(this._year + 1);
                this._changeYear(yearIndex);
            }
        }
    }

    _changeMonthIndex(direction) {
        let monthIndex;
        // console.log(direction);
        if (direction === 'prev') {
            monthIndex = this._month - 1;
            if (monthIndex === -1) monthIndex = 11;
            if (monthIndex === 12) monthIndex = 0;
        }
        if (direction === 'next') {
            monthIndex = this._month + 1;
            if (monthIndex === -1) monthIndex = 11;
            if (monthIndex === 12) monthIndex = 0;
        }
        this._monthsSelect.selectedIndex = monthIndex;
    }

    _changeYear(yearIndex) {
        this._yearsSelect.selectedIndex = yearIndex;
        // console.log(date);
    }

    _selectSwitchMonth() {
        this._month = Number(this._monthsSelect.selectedIndex);
        this._renderCalendar();
    }

    _selectSwitchYear() {
        // console.log('change-year');
        this._year = Number(this._yearsSelect.value);
        // След.строка устанавливает в дату, текущую дату.
        // date = new Date(year, month, new Date().getDate());
        this._renderCalendar();
    }

    _calendarClick(event) {
        const { target } = event;

        if (target.classList.contains('calendar__day')) {
            // console.log(event.target);
            this._userSetDate(event.target);
            if (this._parrentTag.tagName === 'INPUT') {
                this._setInputValue();
            }
        }
    }

    _userSetDate(chosenDay) {
        this._el.querySelectorAll('.calendar__day').forEach((item) => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
        chosenDay.classList.add('active');

        if (chosenDay.dataset.month === 'prev') {
            this._date = new Date(this._year, this._month - 1, Number(chosenDay.innerText));
            this._changeMonthIndex('prev');
            this._renderCalendar();
        } else if (chosenDay.dataset.month === 'next') {
            this._date = new Date(this._year, this._month + 1, Number(chosenDay.innerText));
            this._changeMonthIndex('next');
            this._renderCalendar();
        } else {
            this._date = new Date(this._year, this._month, Number(chosenDay.innerText));
        }
    }

    _setInputValue() {
        let day = String(this._date.getDate());
        let month = String(this._date.getMonth() + 1);

        if (day.length !== 2) {
            day = '0' + day;
        }

        if (month.length !== 2) {
            month = '0' + month;
        }
        // console.log(`${day}.${month}.${this._date.getFullYear()}`)
        this._parrentTag.value = `${day}.${month}.${this._date.getFullYear()}`;
    }
}
Calendar.hideOpenCalendar();
window.Calendar = Calendar;
