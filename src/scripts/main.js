import { showEventCards } from './event.js';
import { showAllMails, resetUnreadMails } from './mail.js';
import { nationCompChart, initLifeEvalChart, initNationCompChart, updateChartYear } from './chart.js';
import { showResults } from './results.js';

export const simState = {
    coins: 100000000,
    income: 1000000,
    shieldValue: 0,
    maxShieldValue: 2,
    happinessDelta: 0,
    happinessRewardClaimed: false,
    activeEffects: [],
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
    nextCrisis: null,
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
        let simData;
    
        try {
            simData = await loadSimData();
            loadSavedData();
            if (localStorage.getItem('Happiness-Simulator-Results')) {
                showResults(simData);
            } else {
                loadCrisis(simData);
                showEventCards(simData);
            }
        } catch (error) {
            console.error(error);
        }

        initEventListeners(simData);
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

function initEventListeners(simData) {
    // Loading tutorial as external site
    document.getElementById('app-icon-tips').addEventListener('click', () => window.open('tutorial.html', '_blank'));
    // Dev-Btn to skip to 2 months before end
    document.getElementById('dev-skip-btn').addEventListener('click', () => skipToNearEnd(simData));

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

    document.addEventListener('click', (event) => {
        const aspectMenuNav = document.getElementById('aspect-menu-nav');

        if (aspectMenuNav && !aspectMenuNav.contains(event.target)) {
            document.querySelectorAll('.aspect-menu-active').forEach(menu => {
                const menuId = menu.id.replace('aspect-menu-', '');
                const container = document.getElementById(menuId);

                menu.classList.remove('aspect-menu-active');

                if (container) container.classList.remove('aspect-container-shifted');
            });
        }
    });

    const nationInfoContainer = document.getElementById('nation-information-container');
    if (nationInfoContainer) nationInfoContainer.addEventListener('click', () => resetNationSelection());

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
    const vaccinationActive = simState.activeEffects.some(event => event.effect === 'vaccination_campaign');
    if (!vaccinationActive) simState.maxShieldValue = 2;

    let delta = currentCrisis.happinessDelta;
    if (simState.shieldValue > 0) {
        delta *= 0.5;
        simState.shieldValue--;
    }

    simState.happinessDelta += delta;
}

function applyHappinessDelta(simData) {
    const instabilityEffect = simState.activeEffects.find(event => event.effect === 'political_instability');

    if (instabilityEffect) {
        const monthsElapsed = Math.floor((crisisState.crisisCount - instabilityEffect.startCount) / 2);
        
        if (monthsElapsed === 0) {
            simState.happinessDelta -= 0.15;
        } else if (monthsElapsed === 1) {
            simState.happinessDelta += 0.1;
        } else if (monthsElapsed === 2) {
            simState.happinessDelta += 0.15;
        }
    }

    const currentScore = simState.lifeEvalScores[currentYear].at(-1);
    const newValue = Math.max(0, Math.min((currentScore + simState.happinessDelta), 10));

    simState.lifeEvalScores[currentYear].push(newValue);
    simState.happinessDelta = 0;

    if (newValue <= 1) {
        showResults(simData);
        return;
    }

    if (newValue >= 8.5) {
        if (!simState.happinessRewardClaimed) {
            simState.coins += 2500000;
            simState.shieldValue = Math.min(simState.shieldValue + 2, simState.maxShieldValue);
            simState.happinessRewardClaimed = true;

            showToastNotification('Meilenstein erreicht!', '#d0f5f0', '#14b8a6');
        } else {
            simState.coins += 500000;

            showToastNotification('Meilenstein gehalten!', '#d0f5f0', '#14b8a6');
        }
    }

    if (newValue < 3) {
        const protestCrisis = simData.crises.find(crisis => crisis.isProtest);

        if (protestCrisis) {
            applyCrisisDelta(protestCrisis);

            const protestMail = simData.mails[protestCrisis.mailSuggestion.id];
            showAllMails(protestMail, crisisState.currentDate);
        }

        const wasProtesting = currentScore < 3;
        const message = wasProtesting ? 'Landesweite Proteste dauern an!' : 'Landesweite Proteste sind ausgebrochen!';

        showToastNotification(message, '#fddede', '#ef4444');
    }

    initLifeEvalChart(simState, currentYear);
    initNationCompChart(nationCompState, currentYear);
    return false;
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
    simState.activeEffects.forEach(effect => {
        if (effect.effect === 'tax_reduction' && effect.endCount <= crisisState.crisisCount) {
            simState.income = 1000000;
        }
    });

    simState.activeEffects = simState.activeEffects.filter(effect => effect.endCount > crisisState.crisisCount);

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
    
    const currentCrisis = crisisState.nextCrisis ?? allCrises.find(crisis => crisis.id === generateCrisisIndex(allCrises));
    if (!currentCrisis) {
        crisisState.lastCrisisIndex = -1;
        crisisState.nextCrisis = null;
        loadCrisis(simData);
        return;
    }

    crisisState.currentCrisis = currentCrisis;
    crisisState.lastCrisisIndex = currentCrisis.id;

    crisisState.nextCrisis = allCrises.find(crisis => crisis.id === generateCrisisIndex(allCrises, false));

    crisisState.currentDate = calculateDate();
    showDate();

    applyCrisisDelta(currentCrisis);

    const suggestedMail = simData.mails[currentCrisis.mailSuggestion.id];
    showAllMails(suggestedMail, crisisState.currentDate);

    if (selectedNation) {
        const nation = nationCompState.find(nation => nation.nation === selectedNation);
        if (nation) showNationInformation(nation);
    }
}

function generateCrisisIndex(allCrises, updateLast = true) {
    const normalCrises = allCrises.filter(crisis => !crisis.isProtest);
    let index;
    let attempts = 0;
    
    do {
        index = Math.floor(Math.random() * normalCrises.length);
        attempts++;

        if (attempts > normalCrises.length * 2) break;
    } while (normalCrises[index].id === crisisState.lastCrisisIndex);

    if (updateLast) crisisState.lastCrisisIndex = normalCrises[index].id;
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

        const latestScore = simState.lifeEvalScores[currentYear].at(-1);
        if (latestScore >= 3) showToastNotification('Neuer Monat!', '#d0f5f0', '#14b8a6');

        saveSimData();

        if (crisisState.crisisCount % 24 === 0) {
            currentYear++;

            if (crisisState.crisisCount >= 120) {
                showResults(simData);
                return;
            }

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

                const selectedElement = document.getElementById(nation.nation.toLowerCase());
                if (selectedElement) {
                    selectedElement.classList.add('inactive');
                    showNationInformation(nation);
                }

                document.getElementById('nation-information-container').classList.remove('inactive');
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

        const scores = nation.nation === 'Deutschland' ? nation.lifeEvalScores[currentYear].filter(v => v !== undefined) : Object.values(nation.lifeEvalScores).flat().filter(v => v !== undefined);

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
            if (lastScore != null) {
                nationPreviewScoreElement.textContent = lastScore.toFixed(3).toLocaleString('de-DE');    
            }
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

function showNationInformation(nation) {
    const scores = nation.lifeEvalScores[currentYear];
    const trend = scores.at(-1) != null && scores.at(-2) != null ? scores.at(-1) - scores.at(-2) : null;

    document.getElementById('nation-information-score-name').textContent = nation.nation;
    document.getElementById('nation-information-score-description-name').textContent = nation.nation;
    document.getElementById('nation-information-score-date').textContent = getScoreDate(-1, nation.nation);
    document.getElementById('nation-information-score-current-score').textContent = scores.at(-1)?.toFixed(3) ?? '-';

    const trendElement = document.getElementById('nation-information-score-trend-value');
    trendElement.textContent = trend != null ? (trend > 0 ? '+' : '') + trend.toFixed(2) : '-';
    trendElement.style.color = trend > 0 ? '#2fa18e' : trend < 0 ? '#ef4444' : 'inherit';

    document.getElementById('nation-information-last-scores-current-score').textContent = scores.at(-1)?.toFixed(3) ?? '-';
    document.getElementById('nation-information-last-scores-last-score').textContent = scores.at(-2)?.toFixed(3) ?? '-';
    document.getElementById('nation-information-last-scores-previous-score').textContent = scores.at(-3)?.toFixed(3) ?? '-';

    document.getElementById('nation-information-last-scores-current-score-date').textContent = getScoreDate(-1, nation.nation);
    document.getElementById('nation-information-last-scores-last-score-date').textContent = getScoreDate(-2, nation.nation);
    document.getElementById('nation-information-last-scores-previous-score-date').textContent = getScoreDate(-3, nation.nation);

    const crisisType = crisisState.currentCrisis?.type;
    const crisisTypeMap = {
        mild:       {label: 'mild', icon: 'assets/simulator_icons/type-warning-mild.svg'},
        moderate:   {label: 'moderat', icon: 'assets/simulator_icons/type-warning-moderate.svg'},
        severe:     {label: 'schwerwiegend', icon: 'assets/simulator_icons/type-warning-severe.svg'}
    };

    const crisisInfo = crisisTypeMap[crisisType] ?? crisisTypeMap['moderate'];

    document.querySelector('.nation-information-crisis-type-icon-container img').src = crisisInfo.icon;
    document.querySelector('.nation-information-crisis-type-crisis-type').textContent = crisisInfo.label;

    const infoContainer = document.getElementById('nation-information-container');
    infoContainer.style.backgroundColor = nation.styles.backgroundColor;

    showActiveEffects(nation.nation === 'Deutschland');
}

function showActiveEffects(isGermany = false) {
    const container = document.getElementById('active-events-container');
    if (!container) return;

    container.innerHTML = '';
    container.scrollTop = 0;

    if (!isGermany) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'active-effect-empty';
        emptyMessage.textContent = 'Keine aktiven Ereignisse';
        container.appendChild(emptyMessage);
        return;
    }

    const effects = getActiveEffects();

    if (effects.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'active-effect-empty';
        emptyMessage.textContent = 'Keine aktiven Ereignisse';
        
        container.appendChild(emptyMessage);
        return;
    }

    effects.forEach(effect => {
        const activeEffectIcon = document.createElement('img');
        activeEffectIcon.className = 'active-effect-icon';
        activeEffectIcon.loading = 'eager';
        activeEffectIcon.src = effect.icon;
        activeEffectIcon.alt = 'active-event-icon';

        const activeEffectLabel = document.createElement('p');
        activeEffectLabel.className = 'active-effect-label';
        activeEffectLabel.textContent = effect.label;

        const activeEffectDuration = document.createElement('p');
        activeEffectDuration.className = 'active-effect-duration';
        activeEffectDuration.textContent = `· ${effect.monthsLeft} Monat${effect.monthsLeft !== 1 ? 'e' : ''}`;

        const activeEffectInfoContainer = document.createElement('div');
        activeEffectInfoContainer.className = 'active-effect-info-container';
        activeEffectInfoContainer.appendChild(activeEffectLabel);
        activeEffectInfoContainer.appendChild(activeEffectDuration);

        const activeEffectElement = document.createElement('div');
        activeEffectElement.className = 'active-effect-element';
        activeEffectElement.appendChild(activeEffectIcon);
        activeEffectElement.appendChild(activeEffectInfoContainer);

        container.appendChild(activeEffectElement);
    });
}

function getNationStats(nationName) {
    const nation = nationCompState.find(nation => nation.nation === nationName);
    if (!nation) return null;

    const scores = nation.lifeEvalScores[currentYear];

    return {
        name: nation.nation,
        currentScore: scores.at(-1) ?? null,
        lastScore: scores.at(-2) ?? null,
        previousScore: scores.at(-3) ?? null,
        trend: scores.at(-1) != null && scores.at(-2) != null ? scores.at(-1) - scores.at(-2) : null
    };
}

function getActiveEffects() {
    return simState.activeEffects.filter(effect => effect.endCount > crisisState.crisisCount).map(effect => ({
        label: effect.label,
        icon: effect.icon,
        monthsLeft: Math.ceil((effect.endCount - crisisState.crisisCount) / 2)
    }));
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
            if (lastScore != null) nationPreviewScoreElement.textContent = lastScore.toFixed(3).toLocaleString('de-DE');    
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

function getScoreDate(scoreIndex, nationName = 'Deutschland') {
    const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

    const nation = nationCompState.find(nation => nation.nation === nationName);
    const scores = nation?.lifeEvalScores[currentYear] ?? [];
    const absoluteIndex = scores.length + scoreIndex;

    if (absoluteIndex < 0) {
        const prevScores = nation?.lifeEvalScores[currentYear - 1];
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

function skipToNearEnd(simData) {
    const targetCrisisCount = 116;
    if (crisisState.crisisCount >= targetCrisisCount) return;

    const normalCrises = simData.crises.filter(crisis => !crisis.isProtest);

    while (crisisState.crisisCount < targetCrisisCount) {
        const randomCrisis = normalCrises[Math.floor(Math.random() * normalCrises.length)];

        crisisState.currentCrisis = randomCrisis;
        crisisState.crisisCount++;

        simState.coins += (simState.income * 0.25);

        if (crisisState.crisisCount % 2 === 0) {
            calculateNationCompScores(nationCompState, currentYear);

            const currentScore = simState.lifeEvalScores[currentYear].at(-1);
            const drift = -0.05 + (Math.random() * 1.0 - 0.5);
            const newValue = Math.max(1, Math.min((currentScore + drift), 10));

            simState.lifeEvalScores[currentYear].push(newValue);

            if (crisisState.crisisCount % 24 === 0) {
                currentYear++;

                const lastScore = simState.lifeEvalScores[currentYear - 1].at(-1);
                simState.lifeEvalScores[currentYear] = [lastScore];

                updateChartYear(currentYear);
            }
        }
    }

    saveSimData();
    showCoins();
    showNationElements();
    showNationPreview();
    showCurrentScore();
    showLastScores();
    initLifeEvalChart(simState, currentYear);
    initNationCompChart(nationCompState, currentYear);
    loadCrisis(simData);
    showToastNotification('Zum vorletzten Monat gesprungen!', '#d0f5f0', '#14b8a6');
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