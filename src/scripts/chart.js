let wellbeingChart = null;

export function updateChart(wellbeingHistory) {
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
