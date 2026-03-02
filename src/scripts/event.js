async function loadEventData() {
    try {
        const response = await fetch('../simulator-data.json');
        const eventData = await response.json();

        showEventCards(eventData);
    } catch (error) {
        console.error(error);
    }
}

loadEventData();

function showEventCards(eventData) {
    const events = eventData.events;

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
        infoIcon.src = '../src/assets/icons/info.svg';
        infoIcon.alt = 'info-icon';
        infoIcon.addEventListener('click', () => {console.log('Is working!');});

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
        eventCosts.textContent = `${event.cost} €`;

        const acceptBtn = document.createElement('button');
        acceptBtn.className = 'accept-btn';
        acceptBtn.textContent = 'Akzeptieren';
        acceptBtn.addEventListener('click', () => {console.log('Accepted');});

        const rejectBtn = document.createElement('button');
        rejectBtn.className = 'reject-btn hide-reject-btn';
        rejectBtn.textContent = 'Ablehnen';
        rejectBtn.addEventListener('click', () => {console.log('Rejected');});

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

        const eventContainer = document.getElementById(`event-container-${event.type}`);
        if (eventContainer) {
            eventContainer.appendChild(eventCard);
        } else {
            console.error(`No container for type '${event.type}' found!`);
        }
    });
}