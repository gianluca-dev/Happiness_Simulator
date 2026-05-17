import { subtractCosts, applyEventDelta, nextCrisis, showToastNotification, simState, crisisState } from './main.js';

const eventState = {
    sideEventCount: 0
}

export function showEventCards(simData) {
    const allEvents = simData.events;
    
    allEvents.forEach(event => {
        //---------- Event-Header ----------//
        const eventTitle = document.createElement('p');
        eventTitle.className = 'event-title';
        eventTitle.textContent = event.title;

        const eventInfo = document.createElement('img');
        eventInfo.className = 'event-info';
        eventInfo.loading = 'eager';
        eventInfo.src = 'assets/simulator_icons/info.svg';
        eventInfo.alt = 'info-icon';

        const eventExtend = document.createElement('img');
        eventExtend.className = 'event-extend';
        eventExtend.loading = 'eager';
        eventExtend.src = 'assets/simulator_icons/caret-circle-right.svg';
        eventExtend.alt = 'caret-right-icon';

        const eventHeaderIconContainer = document.createElement('div');
        eventHeaderIconContainer.className = 'event-header-icon-container';
        eventHeaderIconContainer.appendChild(eventInfo);
        eventHeaderIconContainer.appendChild(eventExtend);

        const eventCardHeader = document.createElement('div');
        eventCardHeader.className = 'event-card-header';
        eventCardHeader.appendChild(eventTitle);
        eventCardHeader.appendChild(eventHeaderIconContainer);
        eventCardHeader.addEventListener('click', () => {
            eventCardMain.classList.toggle('inactive');
            eventCard.classList.toggle('extended');
        });

        //---------- Event-Btns ----------//
        const acceptBtn = document.createElement('button');
        acceptBtn.className = 'accept-btn';
        acceptBtn.textContent = 'Akzeptieren';
        acceptBtn.addEventListener('click', () => {
            const isMainEvent = !rejectBtn.classList.contains('inactive');
            identifyEvents(event);
            handleAccept(simData, event, isMainEvent, event.costs);
        });

        const rejectBtn = document.createElement('button');
        rejectBtn.className = 'reject-btn inactive';
        rejectBtn.textContent = 'Ablehnen';
        rejectBtn.addEventListener('click', () => {
            applyEventDelta(event, true, false);
            nextCrisis(simData);
        });

        const eventCardBtns = document.createElement('div');
        eventCardBtns.className = 'event-card-btns';
        eventCardBtns.appendChild(acceptBtn);
        eventCardBtns.appendChild(rejectBtn);

        //---------- Event-Main ----------//
        const happinessDeltaTitle = document.createElement('p');
        happinessDeltaTitle.className = 'happiness-delta-title';
        happinessDeltaTitle.textContent = 'Zufriedenheit';

        const happinessDeltaIcon = document.createElement('img');
        happinessDeltaIcon.className = 'happiness-delta-icon';
        happinessDeltaIcon.loading = 'eager';
        happinessDeltaIcon.src = 'assets/simulator_icons/smiley.svg';
        happinessDeltaIcon.alt = 'smiley-icon';

        const happinessDelta = document.createElement('p');
        happinessDelta.className = 'happiness-delta';
        happinessDelta.textContent = event.happinessDelta;

        const happinessDeltaHeader = document.createElement('div');
        happinessDeltaHeader.className = 'happiness-delta-header';
        happinessDeltaHeader.appendChild(happinessDeltaIcon);
        happinessDeltaHeader.appendChild(happinessDeltaTitle);

        const happinessDeltaContainer = document.createElement('div');
        happinessDeltaContainer.className = 'happiness-delta-container';
        happinessDeltaContainer.appendChild(happinessDeltaHeader);
        happinessDeltaContainer.appendChild(happinessDelta);

        const shieldValueTitle = document.createElement('p');
        shieldValueTitle.className = 'shield-value-title';
        shieldValueTitle.textContent = 'Schutzpunkte';

        const shieldValueIcon = document.createElement('img');
        shieldValueIcon.className = 'shield-value-icon';
        shieldValueIcon.loading = 'eager';
        shieldValueIcon.src = 'assets/simulator_icons/shield.svg';
        shieldValueIcon.alt = 'shield-icon';

        const shieldValue = document.createElement('p');
        shieldValue.className = 'shield-value';
        shieldValue.textContent = event.shieldValue;

        const shieldValueHeader = document.createElement('div');
        shieldValueHeader.className = 'shield-value-header';
        shieldValueHeader.appendChild(shieldValueIcon);
        shieldValueHeader.appendChild(shieldValueTitle);

        const shieldValueContainer = document.createElement('div');
        shieldValueContainer.className = 'shield-value-container';
        shieldValueContainer.appendChild(shieldValueHeader);
        shieldValueContainer.appendChild(shieldValue);

        const eventCosts = document.createElement('p');
        eventCosts.className = 'event-costs';
        eventCosts.textContent = `${event.costs.toLocaleString('de-DE')} €`;

        const eventCostsContainer = document.createElement('div');
        eventCostsContainer.className = 'event-costs-container';
        eventCostsContainer.appendChild(eventCosts);

        const eventCardDetailsWrapper = document.createElement('div');
        eventCardDetailsWrapper.className = 'event-card-details-wrapper';
        eventCardDetailsWrapper.appendChild(happinessDeltaContainer);
        eventCardDetailsWrapper.appendChild(shieldValueContainer);

        const eventCardDetails = document.createElement('div');
        eventCardDetails.className = 'event-card-details';
        eventCardDetails.appendChild(eventCardDetailsWrapper);
        eventCardDetails.appendChild(eventCostsContainer);

        const eventCardMain = document.createElement('div');
        eventCardMain.className = 'event-card-main inactive';
        eventCardMain.appendChild(eventCardDetails)
        eventCardMain.appendChild(eventCardBtns);

        //---------- Event-Card ----------//
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.id = event.id;
        eventCard.dataset.eventType = event.type;
        eventCard.appendChild(eventCardHeader);
        eventCard.appendChild(eventCardMain);

        const eventContainer = document.getElementById(`event-container-${event.type}`);
        
        if (eventContainer) {
            eventContainer.appendChild(eventCard);
        } else {
            console.error(`No container for type '${event.type}' found!`);
        }
    });
}

export function setAsMainEvent(eventId) {
    const eventCard = document.getElementById(eventId);
    const rejectBtn = eventCard.querySelector('.reject-btn');
    const eventContainer = document.getElementById(`event-container-${eventCard.dataset.eventType}`);

    if (rejectBtn) {
        rejectBtn.classList.remove('inactive');

        eventCard.classList.add('event-card-highlighted');
        eventContainer.scrollTo({top: eventCard.offsetTop - eventContainer.offsetTop, behavior: 'smooth'});

        if (eventState.sideEventCount > 1) document.getElementById(eventId).querySelector('.accept-btn').disabled = false;
    }
}

function handleAccept(simData, event, isMainEvent, costs) {
    if (isMainEvent) {
        eventState.sideEventCount = 0;
        disableSideEvents(false);
    } else {
        eventState.sideEventCount++;
        if (eventState.sideEventCount > 1) {
            disableSideEvents(true);
            enableMainEvents();
            // Show notification that max side events have been reached
            showToastNotification('Maximale Anzahl an Nebenereignissen erreicht!', '#fddede', '#ef4444');
        }
    }
    applyEventDelta(event, isMainEvent, true);
    subtractCosts(simData, isMainEvent, costs);
}

function disableSideEvents(disabled) {
    document.querySelectorAll('.accept-btn').forEach(btn => {btn.disabled = disabled;});
}

function enableMainEvents() {
    document.querySelectorAll('.event-card').forEach(card => {
        const rejectBtn = card.querySelector('.reject-btn');
        if (rejectBtn && !rejectBtn.classList.contains('inactive')) card.querySelector('.accept-btn').disabled = false;
    });
}

function identifyEvents(event) {
    switch (event.effect) {
        case 'tax_reduction': 
            taxReduction();
        break;
        case 'political_instability':
            politicalInstability();        
        break;
        case 'vaccination_campaign':
            vaccinationCampaign();
        break;
        default:
            console.error('No effect identified for : ', event.effect);
    }
}

function taxReduction() {
    const monthlyIncomeReduction = simState.income * 0.88;
    simState.income = monthlyIncomeReduction;

    simState.activeEffects.taxReductionEnd = crisisState.crisisCount + 6;
}

function politicalInstability() {
    simState.activeEffects.politicalInstabilityStart = crisisState.crisisCount;
}

function vaccinationCampaign() {
    simState.maxShieldValue = 3;
    simState.shieldValue = Math.min((simState.shieldValue + 1), 3);

    simState.activeEffects.vaccinationCampaignEnd = crisisState.crisisCount + 6;
}
