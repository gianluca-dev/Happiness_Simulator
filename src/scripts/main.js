import { updateLifeEvaluationChart, nationComparisonChart, updateNationComparisonChart, updateChartYear } from './chart.js';
import { showEventCards } from './event.js';
import { showMailCollection } from './mail.js';

const path = window.location.pathname;
// Enabling EventListener for start on index.html
if (path.includes('index.html') || path.endsWith('/')) {
    document.getElementById('start-btn').addEventListener('click', () => {
        window.location.href = 'simulator.html';
    });
} else if (path.includes('simulator.html')) {
        // Managing clicks & data for nation-comparison
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const nationComparisonData = await loadSimulatorData();
            updateNationComparisonChart(nationComparisonData.nationComparisonData);
            createNationBtn(nationComparisonData);
        } catch (error) {
            console.error(error);
        }

        initEventListeners();
        updateLifeEvaluationChart(lifeEvalScores);
    });
}

let lifeEvalScores = [7.406];
let monthlyHappinessDelta = 0;
let shieldPoints = 0;
const maxShieldPoints = 2;

export function applyEventDelta(event, isSuggested, isRejected = false) {
    if (isSuggested && !isRejected) {
        monthlyHappinessDelta += event.happinessDelta;
    } else if (isSuggested && isRejected) {
        monthlyHappinessDelta -= event.happinessDelta;
    } else {
        shieldPoints = Math.min(shieldPoints + event.shieldValue, maxShieldPoints);
        monthlyHappinessDelta += event.happinessDelta * 0.5;
    }
}

export function applyCrisisDelta(crisis) {
    let delta = crisis.happinessDelta;
    if (shieldPoints > 0) {
        delta = delta / 2;
        shieldPoints--;
    }

    monthlyHappinessDelta += delta;
}

function applyMonthlyHappiness() {
    const current = lifeEvalScores[lifeEvalScores.length - 1];
    const newValue = Math.max(0, Math.min(current + monthlyHappinessDelta, 10));

    lifeEvalScores.push(newValue);
    monthlyHappinessDelta = 0;
    updateLifeEvaluationChart(lifeEvalScores);
}

// ---------- Loading simulator data ---------- //

export async function loadSimulatorData() {
    try {
        const response = await fetch('simulator-data.json');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

let coins = 10000000;
const monthlyIncome = 1000000;

export function deductCoins(simulatorData, cost) {
    if (coins - cost < 0) {
        alert('Nicht genug Coins vorhanden!');
        return;
    }

    coins -= cost;
    showCoins(coins);
    nextCrisis(simulatorData);
}

export function addMonthlyIncome() {
    coins += monthlyIncome;
    showCoins(coins);
}

function showCoins(coins) {
    const coinEl = document.getElementById('coin-element');
    coinEl.innerText = `${coins.toLocaleString('de-DE')} €`;
}

showCoins(10000000);

// ---------- Processing crises ---------- //

document.addEventListener('DOMContentLoaded', async () => {
    const simulatorData = await loadSimulatorData();
    loadCrises(simulatorData);
    showEventCards(simulatorData);
});

function loadCrises(simulatorData) {
    document.querySelectorAll('.event-card-highlighted').forEach(card => {
        card.classList.remove('event-card-highlighted');
        card.querySelector('.reject-btn').classList.add('hide-reject-btn');
    });

    const crises = simulatorData.crises;
    const randomIndex = getRandomCrisisIndex(crises);

    let currentCrisis = crises[randomIndex];
    
    applyCrisisDelta(currentCrisis);

    const suggestedMail = simulatorData.mails[currentCrisis.mailSuggestion.id];
    showMailCollection(suggestedMail);
}

let lastCrisisIndex = null;

function getRandomCrisisIndex(crises) {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * crises.length);
    } while (randomIndex === lastCrisisIndex);

    lastCrisisIndex = randomIndex;
    return randomIndex;
}

let crisisCount = 0;
let currentYear = 2019;

export function nextCrisis(simulatorData) {
    if (simulatorData) {
        crisisCount++;
        if (crisisCount % 2 === 0) {
            addMonthlyIncome();
            applyMonthlyHappiness();
        }
        if (crisisCount % 24 === 0) {
            currentYear++;
            updateChartYear(currentYear);
        }
        loadCrises(simulatorData);
    }
}

/*let mailQuestions = [];
let wellbeingHistory = [7.076];
// Loading Questions from JSON file
async function loadQuestions() {
    try {
        const response = await fetch('../questions.json');
        mailQuestions = await response.json();
        updateWellbeingChart(wellbeingHistory);
        showNextQuestion();
    } catch (error) {
        console.error(error);
    }
}

loadQuestions();

let currentIndex = 0;

function showNextQuestion() {
    if (currentIndex > mailQuestions.length - 1) {
        console.log('No more questions available!');                                                           // console.log
        return;
    }

    const questionElement = document.createElement('p');
    questionElement.textContent = mailQuestions[currentIndex].question;
    
    const mailContainer = document.getElementById('mail-container');
    mailContainer.innerHTML = '';
    mailContainer.appendChild(questionElement);

    mailQuestions[currentIndex].options.forEach(option => {
        createOptionBtn(option.text, option.value);
    });
}

function createOptionBtn(text, optionValue) {
    const optionElement = document.createElement('button');
    optionElement.className = 'option-btn';
    optionElement.textContent = text;
    optionElement.addEventListener('click', () => {
        chooseOption(optionValue);
        currentIndex++;
        showNextQuestion();
    });
    const mailContainer = document.getElementById('mail-container');
    mailContainer.appendChild(optionElement);
}

function chooseOption(option) {
    let delta;
    let message;
    switch(option) {
        case 1: 
            message = 'Not at all';
            delta = mailQuestions[currentIndex].options[0].wellbeingDelta;
        break;
        case 2: 
            message = 'Somewhat satisfied';
            delta = mailQuestions[currentIndex].options[1].wellbeingDelta;
        break;
        case 3: 
            message = 'Very satisfied';
            delta = mailQuestions[currentIndex].options[2].wellbeingDelta;
        break;
        default:
            console.error('Invalid option selected');
        break;
    }

    console.log(message);                                                                                   // console.log()
    applyWellbeingDelta(delta);
}

let deltaSum = 0;

function applyWellbeingDelta(delta) {
    if (!wellbeingHistory.length) return;

    const current = wellbeingHistory[wellbeingHistory.length - 1];
    const newValue = current + (deltaSum += delta);

    if ((currentIndex + 1) % 3 === 0) {
        console.log('Chart updated!');                                                                     // console.log()
        wellbeingHistory.push(Math.max(0, Math.min(newValue, 10)));
        deltaSum = 0;

        updateWellbeingChart(wellbeingHistory);
    }
}*/

function initEventListeners() {
    // Loading tutorial.html as an external site
    document.getElementById('tips-app-container').addEventListener('click', () => {
        window.open('tutorial.html', '_blank');
    });
    // Opening the clicked aspect-menu
    const aspectMenuNavigation = document.getElementById('aspect-menu-navigation');
    if (aspectMenuNavigation) {
        aspectMenuNavigation.addEventListener('click', (event) => {
            const clickedAspect = event.target.closest('.aspect-container');
            if (clickedAspect) openAspectMenu(clickedAspect.id);
        });
    }
    // Controlling enter & exit in nation-comparison
    appIconControl();
    mailIconControl();
}

export function openAspectMenu(aspectId) {
    const aspectMenu = document.getElementById(`aspect-menu-${aspectId}`);
    const aspectContainer = document.getElementById(aspectId);

    aspectMenu.classList.toggle('aspect-menu-active');
    aspectContainer.classList.toggle('aspect-container-shifted');
}

function appIconControl() {
    const nationComparisonApp = document.getElementById('nation-comparison-app-container');
    const nationComparisonExit = document.getElementById('nation-comparison-exit-container');

    if (nationComparisonApp) {
        nationComparisonApp.addEventListener('click', () => controlNationComparison(false));
    }
    if (nationComparisonExit) {
        nationComparisonExit.addEventListener('click', () => controlNationComparison(true));
    }
}

function controlNationComparison(state) {
    const nationComparisonWrapper = document.getElementById('nation-comparison-wrapper');
    nationComparisonWrapper.classList.toggle('nation-comparison-wrapper-inactive', state);
}

function mailIconControl() {
    const mailApp = document.getElementById('mails-app-container');
    const mailExit = document.getElementById('mail-exit-container');

    if (mailApp) {
        mailApp.addEventListener('click', () => controlMail(false));
    }
    if (mailExit) {
        mailExit.addEventListener('click', () => controlMail(true));
    }
}

function controlMail(state) {
    const mailWrapper = document.getElementById('mail-wrapper');
    mailWrapper.classList.toggle('mail-wrapper-inactive', state);
}

function createNationBtn(nationComparisonData) {
    const nationBtnWrapper = document.getElementById('nation-btn-wrapper');

    nationComparisonData.nationComparisonData.forEach(nation => {
        const nationBtnContainer = document.createElement('div');
        nationBtnContainer.className = 'nation-btn-container';
        nationBtnContainer.id = `nation-btn-container-${nation.id}`;

        const nationBtnElement = document.createElement('button');
        nationBtnElement.className = 'nation-btn-element';
        nationBtnElement.textContent = nation.nation;
        nationBtnElement.addEventListener('click', () => {
            console.log(`Selected Nation: ${nation.nation}`);                                           // console.log()
            showOnlyNation(nation.id);
        });
        
        nationBtnContainer.appendChild(nationBtnElement);
        nationBtnWrapper.appendChild(nationBtnContainer);

        showLifeEvaluation(nationBtnContainer, nation);
    });
} 

let selectedNationId = null;

function showOnlyNation(nationId) {
    if (selectedNationId === nationId) {
        nationComparisonChart.data.datasets.forEach((_, i) => {
            nationComparisonChart.show(i);
        });
        selectedNationId = null;
    } else {
        nationComparisonChart.data.datasets.forEach((_, i) => {
            if (i === nationId) {
                nationComparisonChart.show(i);
            } else {
                nationComparisonChart.hide(i);
            }
        });
        selectedNationId = nationId;
    }
}

function showLifeEvaluation(nationBtnContainer, nation, year = 1) {
    if (!nation || !nation.lifeEvaluation || nation.lifeEvaluation.length === 0) {
        console.warn('No Life Evaluation data found!');
        return;
    }

    const nationLifeEvaluationElement = document.createElement('p');
    nationLifeEvaluationElement.className = 'nation-life-evaluation-element';
    nationLifeEvaluationElement.textContent = nation.lifeEvaluation[year].toFixed(3);

    nationBtnContainer.appendChild(nationLifeEvaluationElement);
}
