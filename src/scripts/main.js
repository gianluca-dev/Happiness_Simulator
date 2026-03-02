import { updateWellbeingChart, globalComparisonChart, updateGlobalComparisonChart } from './chart.js';

// Enable EventListener for start on index.html
if (window.location.pathname.includes('index.html')) {
    document.getElementById('start-btn').addEventListener('click', () => {
        window.location.href = '../src/simulator.html';
    });
} else if (window.location.pathname.includes('simulator.html')) {
    document.getElementById('tutorial-app-container').addEventListener('click', () => {
        window.open('../src/tutorial.html', '_blank');
    });
}

// ---------- loading simulator data ---------- //

export async function loadSimulatorData() {
    try {
        const response = await fetch('../simulator-data.json');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

loadSimulatorData();

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

document.getElementById('aspect-menu-navigation').addEventListener('click', (event) => {
    const clickedAspect = event.target.closest('.aspect-container');
    if (clickedAspect) openAspectMenu(clickedAspect.id);
});

export function openAspectMenu(aspectId) {
    const aspectMenu = document.getElementById(`aspect-menu-${aspectId}`);
    const aspectContainer = document.getElementById(aspectId);

    aspectMenu.classList.toggle('aspect-menu-active');
    aspectContainer.classList.toggle('aspect-container-shifted');
}

let globalComparisonData = [];

async function loadGlobalComparisonData() {
    try {
        const response = await fetch('../simulator-data.json');
        globalComparisonData = await response.json();
        console.log(globalComparisonData);                                                              // console.log()
        updateGlobalComparisonChart(globalComparisonData.globalComparisonData);
        createNationBtn();
    } catch (error) {
        console.error(error);
    }
}

loadGlobalComparisonData();

document.getElementById('global-comparison-app-container').addEventListener('click', openGlobalComparisonWrapper);
document.getElementById('global-comparison-close-container').addEventListener('click', closeGlobalComparisonWrapper);

function openGlobalComparisonWrapper() {
    const globalComparisonWrapper = document.getElementById('global-comparison-wrapper');
    globalComparisonWrapper.classList.remove('global-comparison-wrapper-inactive');
}

function closeGlobalComparisonWrapper() {
    const globalComparisonWrapper = document.getElementById('global-comparison-wrapper');
    globalComparisonWrapper.classList.add('global-comparison-wrapper-inactive');
}

function createNationBtn() {
    const nationBtnWrapper = document.getElementById('nation-btn-wrapper');

    globalComparisonData.globalComparisonData.forEach(nation => {
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
        globalComparisonChart.data.datasets.forEach((_, i) => {
            globalComparisonChart.show(i);
        });
        selectedNationId = null;
    } else {
        globalComparisonChart.data.datasets.forEach((_, i) => {
            if (i === nationId) {
                globalComparisonChart.show(i);
            } else {
                globalComparisonChart.hide(i);
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
