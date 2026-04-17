import { showEventCards } from './event.js';
import { showAllMails, resetUnreadMails } from './mail.js';
import { initLifeEvalChart, initNationCompChart, updateChartYear } from './chart.js';

const path = window.location.pathname;
// Enabling EventListener for start on index.html
if (path.includes('index.html') || path.endsWith('/')) {
    document.getElementById('start-btn-navbar').addEventListener('click', () => {
        window.location.href = 'simulator.html';
    });

    document.getElementById('start-btn').addEventListener('click', () => {
        window.location.href = 'simulator.html';
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
        deleteSimData();
        window.location.href = 'simulator.html';
    });
} else if (path.includes('simulator.html')) {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const simData = await loadSimData();
            loadSavedData();
            loadCrisis(simData);
            showEventCards(simData);
        } catch (error) {
            console.error(error);
        }
        initEventListeners();
        showCoins();

        initLifeEvalChart(simState, currentYear);
        initNationCompChart(nationCompState, currentYear);
    });
}

const simState = {
    coins: 10000000,
    shieldValue: 0,
    happinessDelta: 0,
    lifeEvalScores: {
        2019: [7.406],
        2020: [],
        2021: [],
        2022: [],
        2023: []
    }
}

const crisisState = {
    crisisCount: 0,
    lastCrisisIndex: -1,
    currentCrisis: null,
    currentDate: null
}

const nationCompState = [
    { nation: 'Deutschland', lifeEvalScores: simState.lifeEvalScores},
    { nation: 'Finnland', lifeEvalScores: {
        2019: [7.809],
        2020: [7.842],
        2021: [7.821],
        2022: [7.804],
        2023: [7.741]
    }},
    { nation: 'Dänemark', lifeEvalScores: {
        2019: [7.646],
        2020: [7.620],
        2021: [7.636],
        2022: [7.586],
        2023: [7.583]
    }},
    { nation: 'Norwegen', lifeEvalScores: {
        2019: [7.488],
        2020: [7.392],
        2021: [7.365],
        2022: [7.315],
        2023: [7.302]
    }},
    { nation: 'Schweden', lifeEvalScores: {
        2019: [7.353],
        2020: [7.363],
        2021: [7.384],
        2022: [7.395],
        2023: [7.344]
    }},
    { nation: 'Island', lifeEvalScores: {
        2019: [7.504],
        2020: [7.554],
        2021: [7.557],
        2022: [7.530],
        2023: [7.525]
    }},
    { nation: 'Niederlande', lifeEvalScores: {
        2019: [7.449],
        2020: [7.464],
        2021: [7.415],
        2022: [7.403],
        2023: [7.319]
    }},
];

let currentYear = 2019;

export async function loadSimData() {
    try {
        const response = await fetch('simData.json');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

function saveSimData() {
    const saveDataState = {
        simState,
        crisisState,
        nationCompState,
        currentYear
    };

    localStorage.setItem('Happiness-Simulator', JSON.stringify(saveDataState));
}

function loadSavedData() {
    const savedData = localStorage.getItem('Happiness-Simulator');
    if (!savedData) return;

    try {
        const parsedData = JSON.parse(savedData);

        Object.assign(simState, parsedData.simState);
        Object.assign(crisisState, parsedData.crisisState);

        nationCompState.splice(0, nationCompState.length, ...parsedData.nationCompState);
        nationCompState[0].lifeEvalScores = simState.lifeEvalScores;

        currentYear = parsedData.currentYear;
    } catch (error) {
        console.error(error);
    }
}

function deleteSimData() {
    localStorage.removeItem('Happiness-Simulator');
}

function initEventListeners() {
    // Loading tutorial as external site
    document.getElementById('app-icon-tips').addEventListener('click', () => window.open('tutorial.html', '_blank'));

    const aspectMenuNav = document.getElementById('aspect-menu-nav');
    if (aspectMenuNav) {
        aspectMenuNav.addEventListener('click', (event) => {
            const clickedAspect = event.target.closest('.aspect-container');
            if (clickedAspect) openAspectMenu(clickedAspect.id);
        });
    }

    appControl();
}

//---------- Delta ----------//

export function applyEventDelta(event, isMainEvent, isAccepted) {
    if (isMainEvent && isAccepted) {
        simState.happinessDelta += event.happinessDelta;
    } else if (isMainEvent && !isAccepted) {
        simState.happinessDelta -= event.happinessDelta;
    } else {
        simState.shieldValue = Math.min((simState.shieldValue + event.shieldValue), 2);
        simState.happinessDelta += (event.happinessDelta * 0.5);
    }
}

function applyCrisisDelta(currentCrisis) {
    let delta = currentCrisis.happinessDelta;
    if (simState.shieldValue > 0) {
        delta /= 2;
        simState.shieldValue--;
    }

    simState.happinessDelta += delta;
}

function applyHappinessDelta() {
    // Stores the last value from simState.lifeEvalScores
    const currentScore = simState.lifeEvalScores[currentYear].at(-1);
    const newValue = Math.max(0, Math.min((currentScore + simState.happinessDelta), 10));

    simState.lifeEvalScores[currentYear].push(newValue);
    simState.happinessDelta = 0;

    initLifeEvalChart(simState, currentYear);
    initNationCompChart(nationCompState, currentYear);
}

//---------- Events ----------//

export function openAspectMenu(aspectId) {
    const aspectMenu = document.getElementById(`aspect-menu-${aspectId}`);
    const aspectContainer = document.getElementById(aspectId);

    if (!aspectMenu) {
        console.error(`Element nicht gefunden: 'aspect-menu-${aspectId}'`);
        return;
    }
    if (!aspectContainer) {
        console.error(`Element nicht gefunden: '${aspectId}'`);
        return;
    }

    aspectMenu.classList.toggle('aspect-menu-active');
    aspectContainer.classList.toggle('aspect-container-shifted');
}

function showCoins() {
    const coinElement = document.getElementById('coin-element');
    if (coinElement) {
        coinElement.textContent = `${simState.coins.toLocaleString('de-DE')} €`;
    }
}

function earnMonthlyIncome(monthlyIncome) {
    simState.coins += monthlyIncome;
    showCoins();
}

export function subtractCosts(simData, isMainEvent, costs) {
    if ((simState.coins - costs) < 0) {
        showToastNotification('Nicht genug Coins!', '#fddede', '#ef4444');
        return;
    }

    simState.coins -= costs;

    showCoins();
    
    if (isMainEvent) nextCrisis(simData);
}

//---------- Crises ----------//

function loadCrisis(simData) {
    document.querySelectorAll('.reject-btn').forEach(btn => btn.classList.add('inactive'));
    document.querySelectorAll('.event-card-highlighted').forEach(eventCard => eventCard.classList.remove('event-card-highlighted'));

    const allCrises = simData.crises;
    
    const crisisIndex = generateCrisisIndex(allCrises);
    const currentCrisis = allCrises[crisisIndex];
    crisisState.currentCrisis = currentCrisis;

    crisisState.currentDate = calculateDate();
    showDate();

    applyCrisisDelta(currentCrisis);

    const suggestedMail = simData.mails[currentCrisis.mailSuggestion.id];
    showAllMails(suggestedMail, crisisState.currentDate);
}

function generateCrisisIndex(allCrises) {
    let index;
    
    do {
        index = Math.floor(Math.random() * allCrises.length);
    } while (index === crisisState.lastCrisisIndex);

    crisisState.lastCrisisIndex = index;
    return index;
}

export function nextCrisis(simData) {
    crisisState.crisisCount++;
    if (crisisState.crisisCount % 2 === 0) {
        calculateNationCompScores(nationCompState, currentYear);
        applyHappinessDelta();
        earnMonthlyIncome(1000000);
        showToastNotification('Neuer Monat!', '#d0f5f0', '#14b8a6');
        saveSimData();
        if (crisisState.crisisCount % 24 === 0) {
            currentYear++;
            updateChartYear(currentYear);
        }
    }
    loadCrisis(simData);
}

//---------- Nation-Comparison ----------//

function calculateNationCompScores(nationCompState, currentYear) {
    nationCompState.forEach(nation => {
        if (nation.nation === 'Deutschland') return;

        const lastValue = nation.lifeEvalScores[currentYear].at(-1);
        let newValue;

        if (nation.lifeEvalScores[currentYear].length > 11) return;

        if (crisisState.currentCrisis.type === 'severe') {
            newValue = Math.max(0, Math.min((lastValue + (crisisState.currentCrisis.happinessDelta * 0.5)), 10));
        } else if (crisisState.currentCrisis.type === 'moderate') {
            const isNegative = Math.random() < 0.5;

            if (isNegative) {
                newValue = Math.max(0, Math.min((lastValue + (crisisState.currentCrisis.happinessDelta * 0.25)), 10));
            } else {
                newValue = Math.max(0, Math.min((lastValue + (Math.random() * 0.2)), 10));
            }
        } else if (crisisState.currentCrisis.type === 'mild') {
            newValue = Math.max(0, Math.min((lastValue + (Math.random() * 0.2)), 10));
        }

        if (nation.lifeEvalScores[currentYear].length == 11) {
            const nextYearStartValue = nation.lifeEvalScores[currentYear + 1]?.[0];
            
            if (nextYearStartValue) {
                const difference = nextYearStartValue - newValue;
                newValue = Math.max(0, Math.min((newValue + (difference * 0.5)), 10));
            }
        }

        nation.lifeEvalScores[currentYear].push(newValue);
    });
}

//---------- App-Control ----------//

function appControl() {
    const nationCompApp = document.getElementById('app-icon-nation-comp');
    const nationCompExit = document.getElementById('app-nation-comp-exit');

    if (nationCompApp) nationCompApp.addEventListener('click', () => controlApp('app-nation-comp-section', false));
    if (nationCompExit) nationCompExit.addEventListener('click', () => controlApp('app-nation-comp-section', true));

    const mailsApp = document.getElementById('app-icon-mails');
    const mailsExit = document.getElementById('app-mails-exit');

    if (mailsApp) mailsApp.addEventListener('click', () => {
        controlApp('app-mails-section', false);
        resetUnreadMails();
    });
    if (mailsExit) mailsExit.addEventListener('click', () => controlApp('app-mails-section', true));
}

function controlApp(appId, state) {
    document.getElementById(appId).classList.toggle('inactive', state);
}

//---------- Date ----------//

export function calculateDate() {
    const month = (Math.floor(crisisState.crisisCount / 2) % 12) + 1;
    let day;

    if (crisisState.crisisCount % 2 === 1) {
        day = Math.floor(Math.random() * 15) + 16;
    } else {
        day = Math.floor(Math.random() * 15) + 1;
    }

    const dayString = String(day).padStart(2, '0');
    const monthString = String(month).padStart(2, '0');

    return `${dayString}.${monthString}`;
}

function showDate() {
    const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const [day, month] = crisisState.currentDate.split('.');

    document.getElementById('date-element').innerText = `${day}. ${monthNames[parseInt(month) - 1]} ${currentYear}`;
}

//---------- Toast Notification ----------//

export function showToastNotification(message, bgColor, bColor) {
    const toastNotification = document.getElementById('toast-container');
    if (!toastNotification) return;

    toastNotification.textContent = message; 
    toastNotification.style.backgroundColor = bgColor;
    toastNotification.style.borderColor = bColor;
    toastNotification.style.color = bColor;

    toastNotification.classList.add('toast-notification-active');
    setTimeout(() => toastNotification.classList.remove('toast-notification-active'), 2500);
}