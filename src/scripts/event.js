import { subtractCosts, applyEventDelta, nextCrisis, showToastNotification } from './main.js';

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
        eventExtend.addEventListener('click', () => {
            eventCardMain.classList.toggle('inactive');
            eventCard.classList.toggle('extended');
        });

        const eventHeaderIconContainer = document.createElement('div');
        eventHeaderIconContainer.className = 'event-header-icon-container';
        eventHeaderIconContainer.appendChild(eventInfo);
        eventHeaderIconContainer.appendChild(eventExtend);

        const eventCardHeader = document.createElement('div');
        eventCardHeader.className = 'event-card-header';
        eventCardHeader.appendChild(eventTitle);
        eventCardHeader.appendChild(eventHeaderIconContainer);

        //---------- Event-Btns ----------//
        const acceptBtn = document.createElement('button');
        acceptBtn.className = 'accept-btn';
        acceptBtn.textContent = 'Akzeptieren';
        acceptBtn.addEventListener('click', () => {
            const isMainEvent = !rejectBtn.classList.contains('inactive');
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
        const happinessDeltaIcon = document.createElement('img');
        happinessDeltaIcon.className = 'happiness-delta-icon';
        happinessDeltaIcon.loading = 'eager';
        happinessDeltaIcon.src = 'assets/simulator_icons/shield.svg';
        happinessDeltaIcon.alt = 'smiley-icon';

        const happinessDelta = document.createElement('p');
        happinessDelta.className = 'happiness-delta';
        happinessDelta.textContent = event.happinessDelta;

        const happinessDeltaContainer = document.createElement('div');
        happinessDeltaContainer.className = 'happiness-delta-container';
        happinessDeltaContainer.appendChild(happinessDeltaIcon);
        happinessDeltaContainer.appendChild(happinessDelta);

        const shieldValueIcon = document.createElement('img');
        shieldValueIcon.className = 'shield-value-icon';
        shieldValueIcon.loading = 'eager';
        shieldValueIcon.src = 'assets/simulator_icons/shield.svg';
        shieldValueIcon.alt = 'shield-icon';

        const shieldValue = document.createElement('p');
        shieldValue.className = 'shield-value';
        shieldValue.textContent = event.shieldValue;

        const shieldValueContainer = document.createElement('div');
        shieldValueContainer.className = 'shield-value-container';
        shieldValueContainer.appendChild(shieldValueIcon);
        shieldValueContainer.appendChild(shieldValue);

        const eventCosts = document.createElement('p');
        eventCosts.className = 'event-costs';
        eventCosts.textContent = `${event.costs.toLocaleString('de-DE')} €`;

        const eventCardDetails = document.createElement('div');
        eventCardDetails.className = 'event-card-details';
        //eventCardDetails.appendChild(happinessDeltaContainer);
        //eventCardDetails.appendChild(shieldValueContainer);
        eventCardDetails.appendChild(eventCosts);

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