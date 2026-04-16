let lifeEvalChart = null; 
let nationCompChart = null;

const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export function initLifeEvalChart(simState, currentYear) {
    const ctx = document.getElementById('life-eval-chart-canvas');

    if (!lifeEvalChart) {
        lifeEvalChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Lebenszufriedenheit',
                        data: [],
                        borderColor: '#36a2eb',
                        backgroundColor: 'rgba(54, 162, 235, 0.15)',
                        tension: 0.3,
                        fill: true,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Lebenszufriedenheit'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Monate 2019'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            title: (items) => `Deutschland (${monthNames[items[0].dataIndex]} ${currentYear})`,
                            label: (item) => `Lebenszufriedenheit: ${item.raw.toLocaleString('de-DE')}`
                        }
                    }
                }
            }
        });
    }

    lifeEvalChart.data.datasets[0].data = simState.lifeEvalScores[currentYear];
    lifeEvalChart.update();
}

export function initNationCompChart(nationCompState, currentYear) {
    const ctx = document.getElementById('nation-comp-chart-canvas');

    if (!nationCompChart) {
        nationCompChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                datasets: [],
                tension: 0.3,
                fill: true,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        title: {
                            display: true,
                            text: 'Lebenszufriedenheit'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Monate 2019'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            title: (items) => `${items[0].dataset.label} (${monthNames[items[0].dataIndex]} ${currentYear})`,
                            label: (item) => `Lebenszufriedenheit: ${item.raw.toLocaleString('de-DE')}`
                        }
                    }
                }
            }
        });
    }

    nationCompChart.data.datasets = [];

    nationCompState.forEach(nation => {
        nationCompChart.data.datasets.push({
            label: nation.nation,
            data: nation.lifeEvalScores[currentYear],
        });
    });

    nationCompChart.update();
}

export function updateChartYear(currentYear) {
    lifeEvalChart.options.scales.x.title.text = `Monate ${currentYear}`;
    lifeEvalChart.update();

    nationCompChart.options.scales.x.title.text = `Monate ${currentYear}`;
    nationCompChart.update();
}