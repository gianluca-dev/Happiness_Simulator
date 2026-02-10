if (window.location.pathname.includes('index.html')) {
    document.getElementById('start-btn').addEventListener('click', () => {
        window.location.href = '../src/simulator.html';
    });
}