import { updateChart } from './chart.js';

// Enable EventListener for start on index.html
if (window.location.pathname.includes('index.html')) {
    document.getElementById('start-btn').addEventListener('click', () => {
        window.location.href = '../src/simulator.html';
    });
}

let mailQuestions = [];
let wellbeingHistory = [7.076];
// Loading Questions from JSON file
async function loadQuestions() {
    try {
        const response = await fetch('../questions.json');
        mailQuestions = await response.json();
        updateChart(wellbeingHistory);
        showNextQuestion();
    } catch (error) {
        console.error(error);
    }
}

loadQuestions();

let currentIndex = 0;

function showNextQuestion() {
    if (currentIndex > mailQuestions.length - 1) {
        console.log('No more questions available!');
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

    console.log(message);
    applyWellbeingDelta(delta);
}

function applyWellbeingDelta(delta) {
    const current = wellbeingHistory[wellbeingHistory.length - 1];
    const newValue = current + delta;

    wellbeingHistory.push(Math.max(0, Math.min(newValue, 10)));
    updateChart(wellbeingHistory);
}
