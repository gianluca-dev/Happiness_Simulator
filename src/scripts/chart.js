let lifeEvalChart = null;
export let nationComparisonChart = null;

export function updateLifeEvaluationChart(lifeEvalScores) {
    const canvas = document.getElementById('life-evaluation-chart');
    if (!canvas) {
        console.error('Canvas Element was not found!');
        return;
    }

    const ctx = canvas.getContext('2d');

    if (!lifeEvalChart) {
        lifeEvalChart = new Chart(ctx, {
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
                            text: 'Monate 2019'
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

    lifeEvalChart.data.datasets[0].data = lifeEvalScores;
    lifeEvalChart.update();
}

export function updateChartYear(year) {
    lifeEvalChart.options.scales.x.title.text = `Monate ${year}`;
    lifeEvalChart.update();
}

export function updateNationComparisonChart(nationCompData) {
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

    for (let i = 0; i < nationCompData.length; i++) {
        nationComparisonChart.data.datasets.push({
            label: nationCompData[i].nation,
            data: nationCompData[i].lifeEvaluation,
            borderColor: nationCompData[i].border,
            backgroundColor: nationCompData[i].background,
            tension: 0.3,
        });
    }

    nationComparisonChart.update();
}