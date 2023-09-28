import { LineChart } from 'chartist';

document.addEventListener('DOMContentLoaded', () => {
    new window.ItcCustomSelect(`#test-select2`);
    new window.ItcCustomSelect(`#test-select3`);
});

let chartOptions = {};

new LineChart(
    '#test-line-chart',
    {
        labels: ['1 мес.', '3 мес.', '7 мес.', '9 мес.', '15 мес.', '22 мес.', '28 мес.', '37 мес.', '36 мес.', '38 мес.'],
        series: [[-55, -42, -60, -65, -52, -100, -110, -55, -60, -50]],
    },
    {
        fullWidth: true,
        showArea: true,
        high: 0,
        low: -120,
        height: 300,
    }
);
