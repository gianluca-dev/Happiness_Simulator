import { resetUnreadMails } from './mail.js';
import { applyEventDelta, deductCoins, paySideEvent, nextCrisis, disableSideEvents } from './main.js';

let sideEventCount = 0;

export function showEventCards(simulatorData) {
    const events = simulatorData.events;

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.id = event.id;
        
        const eventTitle = document.createElement('p');
        eventTitle.className = 'event-title';
        eventTitle.textContent = event.title;

        const infoIcon = document.createElement('img');
        infoIcon.className = 'info-icon';
        infoIcon.loading = 'lazy';
        infoIcon.src = 'assets/icons/info.svg';
        infoIcon.alt = 'info-icon';
        infoIcon.addEventListener('click', () => toggleInfoStats(infoStatsContainer));  // Mobile-Version
        infoIcon.addEventListener('mouseover', () => toggleInfoStats(infoStatsContainer));  // Desktop-Version
        infoIcon.addEventListener('mouseout', () => toggleInfoStats(infoStatsContainer));  // Desktop-Version

        const infoStatsIcon = document.createElement('img');
        infoStatsIcon.className = 'info-stats-icon';
        infoStatsIcon.src = 'assets/icons/trend-up.svg';
        infoStatsIcon.alt = 'info-stats-icon';

        const infoStatsDelta = document.createElement('p');
        infoStatsDelta.className = 'info-stats-delta';
        infoStatsDelta.textContent = event.happinessDelta;

        const infoStatsContainer = document.createElement('div');
        infoStatsContainer.className = 'info-stats-container inactive';
        infoStatsContainer.appendChild(infoStatsIcon);
        infoStatsContainer.appendChild(infoStatsDelta);

        const eventImage = document.createElement('img');
        eventImage.className = 'event-image';
        eventImage.loading = 'lazy';
        eventImage.src = event.image.src;
        eventImage.alt = event.image.alt;

        const eventDescription = document.createElement('p');
        eventDescription.className = 'event-description';
        eventDescription.textContent = event.description;

        const eventCosts = document.createElement('span');
        eventCosts.className = 'event-costs';
        eventCosts.textContent = `${event.cost.toLocaleString('de-DE')} €`;

        const acceptBtn = document.createElement('button');
        acceptBtn.className = 'accept-btn';
        acceptBtn.textContent = 'Akzeptieren';
        acceptBtn.addEventListener('click', () => {
            const isSuggested = !rejectBtn.classList.contains('hide-reject-btn');

            if (isSuggested) {
                applyEventDelta(event, isSuggested);
                deductCoins(simulatorData, event.cost);
            } else {
                sideEventCount++;

                if (sideEventCount > 1) disableSideEvents();

                applyEventDelta(event, isSuggested);
                paySideEvent(event.cost);
            }
        });

        const rejectBtn = document.createElement('button');
        rejectBtn.className = 'reject-btn hide-reject-btn';
        rejectBtn.textContent = 'Ablehnen';
        rejectBtn.addEventListener('click', () => {
            applyEventDelta(event, true, true);
            nextCrisis(simulatorData);
        });

        const eventCardHeader = document.createElement('div');
        eventCardHeader.className = 'event-card-header';
        eventCardHeader.appendChild(eventTitle);
        eventCardHeader.appendChild(infoIcon);

        const eventCardContent = document.createElement('div');
        eventCardContent.className = 'event-card-content';

        const eventCardStart = document.createElement('div');
        eventCardStart.className = 'event-card-start';
        eventCardStart.appendChild(eventImage);

        const eventCardEnd = document.createElement('div');
        eventCardEnd.className = 'event-card-end';
        eventCardEnd.appendChild(eventDescription);
        eventCardEnd.appendChild(eventCosts);

        const eventBtns = document.createElement('div');
        eventBtns.className = 'event-btns';
        eventBtns.appendChild(acceptBtn);
        eventBtns.appendChild(rejectBtn);

        eventCardContent.appendChild(eventCardStart);
        eventCardContent.appendChild(eventCardEnd);

        eventCard.appendChild(eventCardHeader);
        eventCard.appendChild(eventCardContent);
        eventCard.appendChild(eventBtns);
        eventCard.appendChild(infoStatsContainer);

        const eventContainer = document.getElementById(`event-container-${event.type}`);
        if (eventContainer) {
            eventContainer.appendChild(eventCard);
        } else {
            console.error(`No container for type '${event.type}' found!`);
        }
    });
}

export function resetSideEventCount() {
    sideEventCount = 0;
}

function toggleInfoStats(container) {
    container.classList.toggle('inactive');
}