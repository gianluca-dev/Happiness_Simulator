import { openAspectMenu } from './main.js';

export function showMail(suggestedMail) {
    const mailContainer = document.getElementById('mail-container');
    mailContainer.innerHTML = '';

    const mailEl = document.createElement('div');
    mailEl.className = 'mail-element';
        
    const mailSubject = document.createElement('p');
    mailSubject.className = 'mail-subject';
    mailSubject.textContent = `Betreff: ${suggestedMail.subject}`;

    const mailSender = document.createElement('p');
    mailSender.className = 'mail-sender';
    mailSender.textContent = `von: ${suggestedMail.sender}`;

    const mailInformation = document.createElement('p');
    mailInformation.className = 'mail-information';
    mailInformation.textContent = suggestedMail.information;

    const eventSuggestion = document.createElement('span');
    eventSuggestion.className = 'event-suggestion';
    eventSuggestion.textContent = suggestedMail.eventSuggestion.title;
    eventSuggestion.addEventListener('click', () => {
        openAspectMenu(suggestedMail.eventSuggestion.type);
        setTimeout(() => {
            const targetEvent = document.getElementById(suggestedMail.eventSuggestion.id);
            if (targetEvent) {
                const targetEventRejectBtn = targetEvent.querySelector('.reject-btn');
                
                targetEvent.scrollIntoView({behavior: 'smooth', block: 'start'});
                targetEvent.classList.add('event-card-highlighted');
                // Reveals the reject-btn for the highlighted event
                targetEventRejectBtn.classList.remove('hide-reject-btn');
            } 
        }, 50);
    });

    const mailHeader = document.createElement('div');
    mailHeader.className = 'mail-header';
    mailHeader.appendChild(mailSubject);
    mailHeader.appendChild(mailSender);

    const mailContent = document.createElement('div');
    mailContent.className = 'mail-content';
    mailContent.appendChild(mailInformation);
    mailContent.appendChild(eventSuggestion);

    mailEl.appendChild(mailHeader);
    mailEl.appendChild(mailContent);
    mailContainer.appendChild(mailEl);
}