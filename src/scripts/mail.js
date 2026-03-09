import { openAspectMenu } from './main.js';

let allMails = [];

export function showMailCollection(suggestedMail) {
    allMails.unshift(suggestedMail);

    const mailCollectionContainer = document.getElementById('mail-collection-container');
    mailCollectionContainer.innerHTML = '';

    allMails.forEach(mail => {
        const mailCollectionEl = document.createElement('div');
        mailCollectionEl.className = 'mail-collection-element';
        mailCollectionEl.addEventListener('click', () => showMail(suggestedMail));

        const mailCollectionSenderContainer = document.createElement('div');
        mailCollectionSenderContainer.className = 'mail-collection-sender-container';

        const mailCollectionProfileImage = document.createElement('img');
        mailCollectionProfileImage.className = 'mail-collection-profile-image';
        mailCollectionProfileImage.src = mail.senderInformation.profileImage.src;
        mailCollectionProfileImage.alt = mail.senderInformation.profileImage.alt;

        const mailCollectionSender = document.createElement('p');
        mailCollectionSender.className = 'mail-collection-sender';
        mailCollectionSender.textContent = mail.senderInformation.sender;

        const mailCollectionContentContainer = document.createElement('div');
        mailCollectionContentContainer.className = 'mail-collection-content-container';

        const mailCollectionContent = document.createElement('p');
        mailCollectionContent.className = 'mail-collection-content';
        mailCollectionContent.textContent = mail.information;

        const mailCollectionDate = document.createElement('p');
        mailCollectionDate.className = 'mail-collection-date';
        mailCollectionDate.textContent = '05.01';

        mailCollectionSenderContainer.appendChild(mailCollectionProfileImage);
        mailCollectionSenderContainer.appendChild(mailCollectionSender);

        mailCollectionEl.appendChild(mailCollectionSenderContainer);
        mailCollectionContentContainer.appendChild(mailCollectionContent);
        mailCollectionEl.appendChild(mailCollectionContentContainer);
        mailCollectionEl.appendChild(mailCollectionDate);
        mailCollectionContainer.appendChild(mailCollectionEl);
    });
}

function showMail(suggestedMail) {
    const mailCollectionContainer = document.getElementById('mail-collection-container');
    mailCollectionContainer.classList.add('inactive');

    const mailContainer = document.getElementById('mail-container');
    mailContainer.classList.remove('inactive');
    mailContainer.innerHTML = '';

    const mailEl = document.createElement('div');
    mailEl.className = 'mail-element';
        
    const mailReturn = document.createElement('img');
    mailReturn.className = 'mail-return';
    mailReturn.src = 'assets/icons/arrow-left.svg';
    mailReturn.alt = 'return-icon';
    mailReturn.addEventListener('click', () => {
        mailContainer.classList.add('inactive');
        mailCollectionContainer.classList.remove('inactive');
    });

    const mailTrash = document.createElement('img');
    mailTrash.src = 'assets/icons/trash.svg';
    mailTrash.alt = 'trash-icon';

    const utilityContainer = document.createElement('div');
    utilityContainer.className = 'utility-container';
    utilityContainer.appendChild(mailReturn);
    utilityContainer.appendChild(mailTrash);

    const mailSubject = document.createElement('p');
    mailSubject.className = 'mail-subject';
    mailSubject.textContent = `Betreff: ${suggestedMail.subject}`;

    const mailSender = document.createElement('p');
    mailSender.className = 'mail-sender';
    mailSender.textContent = `Absender: ${suggestedMail.senderInformation.sender}`;

    const mailInformation = document.createElement('p');
    mailInformation.className = 'mail-information';
    mailInformation.textContent = suggestedMail.information;

    const eventSuggestion = document.createElement('span');
    eventSuggestion.className = 'event-suggestion';
    eventSuggestion.textContent = `Ich rate ihnen: ${suggestedMail.eventSuggestion.title}`;
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
    mailHeader.appendChild(utilityContainer);
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