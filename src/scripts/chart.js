let wellbeingChart = null;
export let globalComparisonChart = null;

export function updateWellbeingChart(wellbeingHistory) {
    const canvas = document.getElementById('wellbeing-chart');
    if (!canvas) {
        console.error('Canvas Element was not found!');
        return;
    }

    const ctx = canvas.getContext('2d');

    if (!wellbeingChart) {
        wellbeingChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                datasets: [{
                    label: 'Life Evaluation',
                    data: [],
                    borderColor: '#36a2eb',
                    backgroundColor: 'rgba(54, 162, 235, 0.15)',
                    tension: 0.3,
                    fill: true,
                }]
            }, 
            options: {
                responsive: true,
                maintainAspectRation: false,
                scales: {
                    y: {
                        main: 0,
                        max: 10,
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Monate'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }

    wellbeingChart.data.datasets[0].data = wellbeingHistory;

    wellbeingChart.update();
}

export function updateGlobalComparisonChart(globalComparisonData) {
    const canvas = document.getElementById('global-comparison-chart');
    if (!canvas) {
        console.error('Canvas Element was not found!');
        return;
    }

    const ctx = canvas.getContext('2d');

    if (!globalComparisonChart) {
        globalComparisonChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRation: false,
                scales: {
                    y: {
                        min: 5,
                        max: 10,
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Monate'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }

    for (let i = 0; i < globalComparisonData.length; i++) {
        globalComparisonChart.data.datasets.push({
            label: globalComparisonData[i].nation,
            data: globalComparisonData[i].lifeEvaluation,
            borderColor: globalComparisonData[i].border,
            backgroundColor: globalComparisonData[i].background,
            tension: 0.3,
        });
    }

    globalComparisonChart.update();
}