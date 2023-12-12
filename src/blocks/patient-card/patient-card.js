import { Chart, registerables } from 'chart.js';
import { FileLoader } from '../../components/file-loader/file-loader';
Chart.register(...registerables);

document.addEventListener('DOMContentLoaded', () => {
    new window.ItcCustomSelect(`#test-select2`);
    new window.ItcCustomSelect(`#test-select3`);
    const patientCardLoader = new FileLoader({ name: 'main-card-files', type: 'loader' });
    const addFileBtn = document.querySelector('.patient-card__add-file');
    const triggerLoader = patientCardLoader.triggerLoader.bind(patientCardLoader);
    addFileBtn?.addEventListener('click', triggerLoader);
});

Chart.defaults.font.family = 'TTNormsPro';
Chart.defaults.color = '#49454f';

let operations = {
    vzhb: {
        weight: 80,
    },
    mgb: {
        weight: 64,
    },
};
const myChartCanvas = document.querySelector('#myChart');

if (myChartCanvas) {
    // https://stackoverflow.com/questions/28159595/chartjs-different-color-per-data-point
    const myChart = new Chart(myChartCanvas, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Показатель веса',
                    data: [
                        { x: '1 мес.', y: 60 },
                        { x: '6 мес.', y: operations.vzhb.weight },
                        { x: '12 мес.', y: 55 },
                        { x: '24 мес.', y: 70 },
                        { x: '36 мес.', y: operations.mgb.weight },
                        { x: '48 мес.', y: 65 },
                        { x: '60 мес.', y: 55 },
                    ],
                    fill: {
                        target: 'origin',
                        // 'linear-gradient(180deg, rgb(54, 240, 151) 0%, rgba(54, 240, 151, 0.20) 100%)'

                        above: 'rgba(54, 240, 151, 0.3)', // Area will be green above the origin
                        // below: 'rgb(0, 0, 255)', // And blue below the origin
                    },
                    pointBorderWidth: 6,
                    pointRadius: 3,
                    pointBackgroundColor: '#36F097',
                    pointBorderColor: 'rgba(54, 240, 151, 0.3)',

                    // fill: '#00000',
                    // borderDash: 0.4,
                    borderWidth: 2,
                    borderColor: '#36F097',
                },
                // операции
                {
                    label: '2015 (ВЖБ)',
                    data: [
                        { x: '6 мес.', y: 0 },
                        { x: '6 мес.', y: operations.vzhb.weight },
                        { x: '6 мес.', y: 120 },
                    ],
                    borderWidth: 2,
                    borderDash: [2],
                    borderColor: 'rgba(0, 0, 0, 0.40)',
                    // Отключить видимость точки, но отсавить тултип
                    pointStyle: false,

                    // Отключение тултипа и видимости точек
                    pointRadius: function (context) {
                        let index = context.dataIndex;
                        let value = context.dataset.data[index];
                        // console.log(value.y);
                        if (value.y !== operations.vzhb.weight) {
                            return 0;
                        } else {
                            return 3;
                        }
                    },
                    pointHitRadius: function (context) {
                        let index = context.dataIndex;
                        let value = context.dataset.data[index];
                        if (value.y !== operations.vzhb.weight) {
                            return 0;
                        } else {
                            return 1;
                        }
                    },
                    // pointRadius: 0,
                    // pointHitRadius: 0,
                },
                {
                    label: '2019 (MGB)',
                    data: [
                        { x: '36 мес.', y: 0 },
                        { x: '36 мес.', y: operations.mgb.weight },
                        { x: '36 мес.', y: 120 },
                    ],
                    borderWidth: 2,
                    borderDash: [2],
                    borderColor: 'rgba(0, 0, 0, 0.40)',
                    pointStyle: false,
                    pointRadius: function (context) {
                        let index = context.dataIndex;
                        let value = context.dataset.data[index];
                        // console.log(value.y);
                        if (value.y !== operations.mgb.weight) {
                            return 0;
                        } else {
                            return 3;
                        }
                    },
                    pointHitRadius: function (context) {
                        let index = context.dataIndex;
                        let value = context.dataset.data[index];
                        if (value.y !== operations.mgb.weight) {
                            return 0;
                        } else {
                            return 1;
                        }
                    },
                },
            ],
        },
        options: {
            scales: {
                y: {
                    max: 120,
                    beginAtZero: true,
                },
            },
            // animation: false,
            plugins: {
                // legend: {
                //     display: false,
                // },
                tooltip: {
                    // enabled: false,
                    backgroundColor: 'rgba(103, 80, 164, 1)',
                    padding: 10,
                    bodySpacing: 4,
                    boxPadding: 4,
                    titleFont: {
                        family: 'TTNormsPro',
                    },
                    bodyFont: {
                        family: 'TTNormsPro',
                    },
                },
            },
            maintainAspectRatio: false,
            responsive: true,
            // aspectRatio: 3.3,
        },
    });
}
