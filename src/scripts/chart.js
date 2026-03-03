let wellbeingChart = null;
export let nationComparisonChart = null;

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

export function updateNationComparisonChart(nationComparisonData) {
    const canvas = document.getElementById('nation-comparison-chart');
    if (!canvas) {
        console.error('Canvas Element was not found!');
        return;
    }

    const ctx = canvas.getContext('2d');

    if (!nationComparisonChart) {
        nationComparisonChart = new Chart(ctx, {
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

    for (let i = 0; i < nationComparisonData.length; i++) {
        nationComparisonChart.data.datasets.push({
            label: nationComparisonData[i].nation,
            data: nationComparisonData[i].lifeEvaluation,
            borderColor: nationComparisonData[i].border,
            backgroundColor: nationComparisonData[i].background,
            tension: 0.3,
        });
    }

    nationComparisonChart.update();
}