import { showEventCards } from './event.js';
import { showAllMails, resetUnreadMails } from './mail.js';
import { nationCompChart, initLifeEvalChart, initNationCompChart, updateChartYear } from './chart.js';

export const simState = {
    coins: 100000000,
    income: 1000000,
    shieldValue: 0,
    maxShieldValue: 2,
    happinessDelta: 0,
    activeEffects: {
        taxReductionEnd: null,
        vaccinationCampaignEnd: null,
        politicalInstabilityStart: null
    },
    lifeEvalScores: {
        2019: [7.406],
        2020: [],
        2021: [],
        2022: [],
        2023: []
    }
}

export const crisisState = {
    crisisCount: 0,
    lastCrisisIndex: -1,
    currentCrisis: null,
    currentDate: null
}

const nationCompState = [
    { nation: 'Deutschland', styles: {borderColor: 'rgb(54, 162, 235)', backgroundColor: 'rgb(150, 204, 241)', color: 'rgb(9, 143, 213)'}, lifeEvalScores: simState.lifeEvalScores},
    { nation: 'Finnland', styles: {borderColor: 'rgb(255, 99, 132)', backgroundColor: 'rgb(251, 173, 189)', color: 'rgb(210, 80, 110)'}, lifeEvalScores: {
        2019: [7.809],
        2020: [7.842],
        2021: [7.821],
        2022: [7.804],
        2023: [7.741]
    }},
    { nation: 'Dänemark', styles: {borderColor: 'rgb(255, 159, 64)', backgroundColor: 'rgb(251, 203, 155)', color: 'rgb(206, 133, 32)'}, lifeEvalScores: {
        2019: [7.646],
        2020: [7.620],
        2021: [7.636],
        2022: [7.586],
        2023: [7.583]
    }},
    { nation: 'Norwegen', styles: {borderColor: 'rgb(255, 205, 86)', backgroundColor: 'rgb(251, 226, 166)', color: 'rgb(189, 162, 30)'}, lifeEvalScores: {
        2019: [7.488],
        2020: [7.392],
        2021: [7.365],
        2022: [7.315],
        2023: [7.302]
    }},
    { nation: 'Schweden', styles: {borderColor: 'rgb(115, 205, 205)', backgroundColor: 'rgb(161, 219, 219)', color: 'rgb(54, 179, 174)'}, lifeEvalScores: {
        2019: [7.353],
        2020: [7.363],
        2021: [7.384],
        2022: [7.395],
        2023: [7.344]
    }},
    { nation: 'Island', styles: {borderColor: 'rgb(171, 129, 253)', backgroundColor: 'rgb(200, 174, 251)', color: 'rgb(126, 110, 231)'}, lifeEvalScores: {
        2019: [7.504],
        2020: [7.554],
        2021: [7.557],
        2022: [7.530],
        2023: [7.525]
    }},
    { nation: 'Niederlande', styles: {borderColor: 'rgb(210, 211, 215)', backgroundColor: 'rgb(224, 225, 227)', color: 'rgb(152, 153, 156)'}, lifeEvalScores: {
        2019: [7.449],
        2020: [7.464],
        2021: [7.415],
        2022: [7.403],
        2023: [7.319]
    }},
];

let currentYear = 2019;

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

    document.getElementById('view-swap-container').addEventListener('click', () => {
        const mailsPreview = document.getElementById('mails-preview');
        const statsPreview = document.getElementById('stats-preview');
        const showMails = mailsPreview.classList.contains('inactive');

        mailsPreview.classList.toggle('inactive', !showMails);
        statsPreview.classList.toggle('inactive', showMails);
    });

    const aspectMenuNav = document.getElementById('aspect-menu-nav');
    if (aspectMenuNav) {
        aspectMenuNav.addEventListener('click', (event) => {
            const clickedAspect = event.target.closest('.aspect-container');
            if (clickedAspect) openAspectMenu(clickedAspect.id);
        });
    }

    initNationContainerListeners();
    initRedirectListeners('preview-');
    initRedirectListeners('marker-');
    showNationElements();
    showNationPreview();
    showCurrentScore();
    showLastScores();
    appControl();
}

//---------- Delta ----------//

export function applyEventDelta(event, isMainEvent, isAccepted) {
    if (isMainEvent && isAccepted) {
        simState.happinessDelta += event.happinessDelta;
    } else if (isMainEvent && !isAccepted) {
        simState.happinessDelta -= event.happinessDelta;
    } else {
        simState.shieldValue = Math.min((simState.shieldValue + event.shieldValue), simState.maxShieldValue);
        simState.happinessDelta += (event.happinessDelta * 0.5);
    }
}

function applyCrisisDelta(currentCrisis) {
    if (simState.activeEffects.vaccinationCampaignEnd && crisisState.crisisCount >= simState.activeEffects.vaccinationCampaignEnd) {
        simState.maxShieldValue = 2;
        simState.activeEffects.vaccinationCampaignEnd = null;
    }

    let delta = currentCrisis.happinessDelta;
    if (simState.shieldValue > 0) {
        delta /= 2;
        simState.shieldValue--;
    }

    simState.happinessDelta += delta;
}

function applyHappinessDelta(simData) {
    if (simState.activeEffects.politicalInstabilityStart !== null) {
        const monthsElapsed = Math.floor((crisisState.crisisCount - simState.activeEffects.politicalInstabilityStart) / 2);

        if (monthsElapsed === 0) {
            simState.happinessDelta -= 0.15;
        } else if (monthsElapsed === 1) {
            simState.happinessDelta += 0.1;
        } else if (monthsElapsed === 2) {
            simState.happinessDelta += 0.15;
            simState.activeEffects.politicalInstabilityStart = null;
        }
    }
    // Stores the last value from simState.lifeEvalScores
    const currentScore = simState.lifeEvalScores[currentYear].at(-1);
    const newValue = Math.max(0, Math.min((currentScore + simState.happinessDelta), 10));

    simState.lifeEvalScores[currentYear].push(newValue);
    simState.happinessDelta = 0;

    if (newValue < 3) {
        const protestCrisis = simData.crises.find(crisis => crisis.isProtest);

        if (protestCrisis) {
            applyCrisisDelta(protestCrisis);
            const protestMail = simData.mails[protestCrisis.mailSuggestion.id];
            showAllMails(protestMail, crisisState.currentDate);
        }
        showToastNotification('Landesweite Proteste sind ausgebrochen!', '#fddede', '#ef4444');

    }

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
    if (simState.activeEffects.taxReductionEnd && crisisState.crisisCount >= simState.activeEffects.taxReductionEnd) {
        simState.income = 1000000;
        simState.activeEffects.taxReductionEnd = null;
    }

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
    const currentCrisis = allCrises.find(crisis => crisis.id === crisisIndex);
    crisisState.currentCrisis = currentCrisis;

    crisisState.currentDate = calculateDate();
    showDate();

    applyCrisisDelta(currentCrisis);

    const suggestedMail = simData.mails[currentCrisis.mailSuggestion.id];
    showAllMails(suggestedMail, crisisState.currentDate);
}

function generateCrisisIndex(allCrises) {
    const normalCrises = allCrises.filter(crisis => !crisis.isProtest);
    let index;
    
    do {
        index = Math.floor(Math.random() * normalCrises.length);
    } while (normalCrises[index].id === crisisState.lastCrisisIndex);

    crisisState.lastCrisisIndex = normalCrises[index].id;
    return normalCrises[index].id;
}

export function nextCrisis(simData) {
    crisisState.crisisCount++;
    if (crisisState.crisisCount % 2 === 0) {
        calculateNationCompScores(nationCompState, currentYear);
        applyHappinessDelta(simData);
        showNationElements();
        showNationPreview();
        showCurrentScore();
        showLastScores();
        earnMonthlyIncome(simState.income);
        showToastNotification('Neuer Monat!', '#d0f5f0', '#14b8a6');
        saveSimData();
        if (crisisState.crisisCount % 24 === 0) {
            currentYear++;

            const lastScore = simState.lifeEvalScores[currentYear - 1].at(-1);
            simState.lifeEvalScores[currentYear].push(lastScore);
            
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

let selectedNation = null;

function initNationContainerListeners() {
    nationCompState.forEach((nation, index) => {
        const container = document.getElementById(nation.nation.toLowerCase());
        if (!container) return;

        container.addEventListener('click', () => {
            if (selectedNation === nation.nation) {
                selectedNation = null;
                nationCompState.forEach((_, i) => {
                    nationCompChart.setDatasetVisibility(i, true);
                    const nationElement = document.getElementById(nationCompState[i].nation.toLowerCase());

                    if (nationElement) {
                        document.getElementById('nation-information-container').classList.add('inactive');
                        nationElement.classList.remove('inactive');
                    }
                });
            } else {
                selectedNation = nation.nation;
                nationCompState.forEach((n, i) => {
                    nationCompChart.setDatasetVisibility(i, n.nation === nation.nation);

                    const nationElement = document.getElementById(n.nation.toLowerCase());
                    if (n.nation !== nation.nation) {
                        if (nationElement) nationElement.classList.add('inactive');
                    }
                });
                document.getElementById('nation-information-container').classList.remove('inactive');

                const selectedElement = document.getElementById(nation.nation.toLowerCase());
                if (selectedElement) showNationInfo(selectedElement);
            }
            updateChartScale();
            nationCompChart.update();
        });
    });
}

const scaleRange = 1.5;

function updateChartScale() {
    if (selectedNation === null) {
        nationCompChart.options.scales.y.min = 0;
        nationCompChart.options.scales.y.max = 10;
        nationCompChart.options.scales.y.ticks.stepSize = 1;

        nationCompChart.options.scales.y.ticks.callback = (value) => value.toFixed(1);
    } else {
        const nation = nationCompState.find(n => n.nation === selectedNation);
        const scores = Object.values(nation.lifeEvalScores).flat().filter(v => v !== undefined);

        const min = Math.min(...scores);
        const max = Math.max(...scores);
        const mid = (min + max) / 2;

        nationCompChart.options.scales.y.ticks.callback = (value) => value.toFixed(1);

        nationCompChart.options.scales.y.min = Math.max(0, parseFloat((mid - (scaleRange / 2)).toFixed(2)));
        nationCompChart.options.scales.y.max = Math.min(10, parseFloat((mid + (scaleRange / 2)).toFixed(2)));
        nationCompChart.options.scales.y.ticks.stepSize = 0.1;
    }
}

function showNationElements() {
    nationCompState.forEach(nation => {
        const nationName = nation.nation;

        const nationPreviewScoreElement = document.getElementById(`${nationName.toLowerCase()}-score`);     
        
        if (nationPreviewScoreElement) {
            const lastScore = nation.lifeEvalScores[currentYear].at(-1);
            nationPreviewScoreElement.textContent = lastScore.toFixed(3).toLocaleString('de-DE');    
        }   

        const nationPreviewElement = document.getElementById(`${nationName.toLowerCase()}`);
        if (nationPreviewElement) {
            nationPreviewElement.style.backgroundColor = nation.styles.backgroundColor;
            nationPreviewElement.style.borderColor = nation.styles.borderColor;
            nationPreviewElement.style.color = nation.styles.color;
        }

        const colorDot = document.getElementById(`${nationName.toLowerCase()}-color-dot`);
        if (colorDot) colorDot.style.backgroundColor = nation.styles.color;
    });
}

function showNationInfo(selectedElement, nationName) {
    const infoContainer = document.getElementById('nation-information-container');

    const elementColor = selectedElement.style.backgroundColor;
    infoContainer.style.backgroundColor = elementColor;
}

function resetNationSelection() {
    selectedNation = null;

    nationCompState.forEach((_, i) => {
        nationCompChart.setDatasetVisibility(i, true);
        const nationElement = document.getElementById(nationCompState[i].nation.toLowerCase());
        
        if (nationElement) nationElement.classList.remove('inactive');
    });

    document.getElementById('nation-information-container').classList.add('inactive');

    updateChartScale();
    nationCompChart.update();
}

//---------- App-Control ----------//

function appControl() {
    const nationCompApp = document.getElementById('app-icon-nation-comp');
    const nationCompExit = document.getElementById('app-nation-comp-exit');

    if (nationCompApp) nationCompApp.addEventListener('click', () => controlApp('app-nation-comp-section', false));
    if (nationCompExit) nationCompExit.addEventListener('click', () => {
        controlApp('app-nation-comp-section', true);
        resetNationSelection();
    });

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

//---------- Preview Window ----------//

function initRedirectListeners(idPrefix) {
    nationCompState.forEach(nation => {
        const nationName = nation.nation.toLowerCase();
        const element = document.getElementById(`${idPrefix}${nationName}`);
        if (!element) return;

        element.addEventListener('click', () => {
            controlApp('app-nation-comp-section', false);
            document.getElementById(nationName)?.click();
        });
    });
}

function showNationPreview() {
    nationCompState.forEach(nation => {
        const nationName = nation.nation;

        if (nationName === 'Deutschland') return;
        const nationPreviewScoreElement = document.getElementById(`preview-${nationName.toLowerCase()}-score`);     
        
        if (nationPreviewScoreElement) {
            const lastScore = nation.lifeEvalScores[currentYear].at(-1);
            nationPreviewScoreElement.textContent = lastScore.toFixed(3).toLocaleString('de-DE');    
        }   

        const nationPreviewElement = document.getElementById(`preview-${nationName.toLowerCase()}`);

        const colorDot = document.getElementById(`preview-${nationName.toLowerCase()}-color-dot`);
        if (colorDot) colorDot.style.backgroundColor = nation.styles.color;
    });
}

function getScore(index) {
    const score = simState.lifeEvalScores[currentYear]?.at(index);
    return score != null ? score.toFixed(3) : '-';
}

function showCurrentScore() {
    document.getElementById('current-score').innerText = getScore(-1);
    document.getElementById('score-date').innerText = getScoreDate(-1);

    const trend = getTrend();
    const trendElement = document.getElementById('trend-value');
    trendElement.innerText = (trend > 0 ? '+' : '') + trend.toFixed(2);
    trendElement.style.color = trend > 0 ? '#2fa18e' : trend < 0 ? '#ef4444' : 'inherit';
}

function showLastScores() {
    document.getElementById('last-scores-current-score').innerText = getScore(-1);
    document.getElementById('last-scores-last-score').innerText = getScore(-2);
    document.getElementById('last-scores-previous-score').innerText = getScore(-3);

    document.getElementById('current-score-date').innerText = getScoreDate(-1);
    document.getElementById('last-score-date').innerText = getScoreDate(-2);
    document.getElementById('previous-score-date').innerText = getScoreDate(-3);
}

function getScoreDate(scoreIndex) {
    const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    const scores = simState.lifeEvalScores[currentYear];
    const absoluteIndex = scores.length + scoreIndex;

    if (absoluteIndex < 0) {
        const prevScores = simState.lifeEvalScores[currentYear - 1];

        if (!prevScores) return '-';

        const prevAbsoluteIndex = prevScores.length + absoluteIndex;
        const month = prevAbsoluteIndex % 12;

        return `${monthNames[month]}. ${currentYear - 1}`;
    }

    const month = absoluteIndex % 12;
    return `${monthNames[month]}. ${currentYear}`;
}

function getTrend() {
    const current = simState.lifeEvalScores[currentYear]?.at(-1) ?? 0;
    const scores = simState.lifeEvalScores[currentYear];

    if (scores.length >= 2) {
        return current - scores.at(-2);
    }

    const prevScores = simState.lifeEvalScores[currentYear - 1];
    const last = prevScores?.at(-1) ?? current;
    return current - last;
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