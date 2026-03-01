import { loadSimulatorData, openAspectMenu } from './main.js';

document.addEventListener('DOMContentLoaded', async () => {
    const simulatorData = await loadSimulatorData();
    showMail(simulatorData);
});

function showMail(simulatorData) {
    const mailContainer = document.getElementById('mail-container');

    simulatorData.mails.forEach(mail => {
        console.log(mail);
        const mailEl = document.createElement('div');
        mailEl.className = 'mail-element';
        
        const mailSubject = document.createElement('p');
        mailSubject.className = 'mail-subject';
        mailSubject.textContent = `Betreff: ${mail.subject}`;

        const mailSender = document.createElement('p');
        mailSender.className = 'mail-sender';
        mailSender.textContent = `von: ${mail.sender}`;

        const mailInformation = document.createElement('p');
        mailInformation.className = 'mail-information';
        mailInformation.textContent = mail.information;

        const eventSuggestion = document.createElement('span');
        eventSuggestion.className = 'event-suggestion';
        eventSuggestion.textContent = mail.eventSuggestion.title;
        eventSuggestion.addEventListener('click', () => {
            openAspectMenu(mail.eventSuggestion.type);
            setTimeout(() => {
                const targetEvent = document.getElementById(mail.eventSuggestion.id);
                const targetEventRejectBtn = targetEvent.querySelector('.reject-btn');
                if (targetEvent) {
                    targetEvent.scrollIntoView({behaviour: 'smooth', block: 'start'});
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
    });
}