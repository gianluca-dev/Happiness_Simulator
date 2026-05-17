import { openAspectMenu } from './main.js';
import { setAsMainEvent } from './event.js';

const mailState = {
    allMails: [],
    unreadMails: 0
}

export function showAllMails(suggestedMail, date) {
    if (!suggestedMail) return;

    suggestedMail.date = date;
    mailState.allMails.unshift(suggestedMail);
    showMailNotification();
    showMailPreview(suggestedMail, date);

    const allMailsContainer = document.getElementById('mails-collection-container');
    allMailsContainer.innerHTML = '';

    mailState.allMails.forEach(mail => {
        const mailCheck = document.createElement('input');
        mailCheck.className = 'mail-check';
        mailCheck.type = 'checkbox';

        const mailSenderImage = document.createElement('img');
        mailSenderImage.className = 'mail-sender-image';
        mailSenderImage.loading = 'eager';
        mailSenderImage.src = mail.senderInformation.profileImage.src;
        mailSenderImage.alt = mail.senderInformation.profileImage.alt;
    
        const mailSender = document.createElement('p');
        mailSender.clasName = 'mail-sender';
        mailSender.textContent = mail.senderInformation.sender;

        const  mailSenderContainer = document.createElement('div');
        mailSenderContainer.className = 'mail-sender-container';
        mailSenderContainer.appendChild(mailSenderImage);
        mailSenderContainer.appendChild(mailSender);

        const mailStart = document.createElement('div');
        mailStart.className = 'mail-start';
        mailStart.appendChild(mailCheck);
        mailStart.appendChild(mailSenderContainer);

        const mailSubject = document.createElement('p');
        mailSubject.className = 'mails-subject';
        mailSubject.textContent = mail.subject;

        const mailDate = document.createElement('p');
        mailDate.className = 'mail-date';
        mailDate.textContent = mail.date;

        const mailStar = document.createElement('img');
        mailStar.className = 'mail-star';
        mailStar.loading = 'eager';
        mailStar.src = 'assets/simulator_icons/star.svg';
        mailStar.alt = 'star-icon';

        const mailEnd = document.createElement('div');
        mailEnd.className = 'mail-end';
        mailEnd.appendChild(mailDate);
        mailEnd.appendChild(mailStar);

        const mailElement = document.createElement('div');
        mailElement.className = 'mail-element';
        mailElement.addEventListener('click', () => showMail(mail, mail.date));
        mailElement.appendChild(mailStart);
        mailElement.appendChild(mailSubject);
        mailElement.appendChild(mailEnd);

        allMailsContainer.appendChild(mailElement);
    });
}

function showMail(mail, date) {
    document.getElementById('mails-collection-section').classList.add('inactive');
    document.getElementById('mails-section').classList.remove('inactive');

    const mailUtilityExit = document.createElement('img');
    mailUtilityExit.className = 'mail-utility-exit';
    mailUtilityExit.loading = 'eager';
    mailUtilityExit.src = 'assets/simulator_icons/arrow.svg';
    mailUtilityExit.alt = 'exit-icon';
    mailUtilityExit.addEventListener('click', () => {
        document.getElementById('mails-section').classList.add('inactive');
        document.getElementById('mails-collection-section').classList.remove('inactive');
    });

    const mailUtilityArchive = document.createElement('img');
    mailUtilityArchive.className = 'mail-utility-archive';
    mailUtilityArchive.loading = 'eager';
    mailUtilityArchive.src = 'assets/simulator_icons/archive.svg';
    mailUtilityArchive.alt = 'archive-icon';

    const mailUtilityWarning = document.createElement('img');
    mailUtilityWarning.className = 'mail-utility-warning';
    mailUtilityWarning.loading = 'eager';
    mailUtilityWarning.src = 'assets/simulator_icons/warning.svg';
    mailUtilityWarning.alt = 'warning-icon';

    const mailUtilityTrash = document.createElement('img');
    mailUtilityTrash.className = 'mail-utility-trash';
    mailUtilityTrash.loading = 'eager';
    mailUtilityTrash.src = 'assets/simulator_icons/trash.svg';
    mailUtilityTrash.alt = 'trash-icon';

    const mailUtilityMenu = document.createElement('img');
    mailUtilityMenu.className = 'mail-utility-menu';
    mailUtilityMenu.loading = 'eager';
    mailUtilityMenu.src = 'assets/simulator_icons/menu.svg';
    mailUtilityMenu.alt = 'menu-icon';

    const mailUtilityContainerStart = document.createElement('div');
    mailUtilityContainerStart.className = 'mail-utility-container-start';
    mailUtilityContainerStart.appendChild(mailUtilityExit);
    mailUtilityContainerStart.appendChild(mailUtilityArchive);
    mailUtilityContainerStart.appendChild(mailUtilityWarning);
    mailUtilityContainerStart.appendChild(mailUtilityTrash);
    mailUtilityContainerStart.appendChild(mailUtilityMenu);

    const mailUtilityPrevious = document.createElement('img');
    mailUtilityPrevious.className = 'mail-utility-previous';
    mailUtilityPrevious.loading = 'eager';
    mailUtilityPrevious.src = 'assets/simulator_icons/caret-left.svg';
    mailUtilityPrevious.alt = 'caret-left-icon';
    
    const mailUtilityNext = document.createElement('img');
    mailUtilityNext.className = 'mail-utility-next';
    mailUtilityNext.loading = 'eager';
    mailUtilityNext.src = 'assets/simulator_icons/caret-right.svg';
    mailUtilityNext.alt = 'caret-right-icon';

    const mailUtilityContainerEnd = document.createElement('div');
    mailUtilityContainerEnd.className = 'mail-utility-container-end';
    mailUtilityContainerEnd.appendChild(mailUtilityPrevious);
    mailUtilityContainerEnd.appendChild(mailUtilityNext);

    const mailUtilityContainer = document.createElement('div');
    mailUtilityContainer.className = 'mail-utility-nav';
    mailUtilityContainer.appendChild(mailUtilityContainerStart);
    mailUtilityContainer.appendChild(mailUtilityContainerEnd);

    const mailSenderImage = document.createElement('img');
    mailSenderImage.className = 'mail-sender-image';
    mailSenderImage.loading = 'eager';
    mailSenderImage.src = mail.senderInformation.profileImage.src;
    mailSenderImage.alt = mail.senderInformation.profileImage.alt;

    const mailSender = document.createElement('p');
    mailSender.className = 'mail-sender';
    mailSender.textContent = mail.senderInformation.sender;

    const mailRecipient = document.createElement('p');
    mailRecipient.className = 'mail-recipient';
    mailRecipient.textContent = 'an Happinessmanager';

    const mailSenderText = document.createElement('div');
    mailSenderText.className = 'mail-sender-text';
    mailSenderText.appendChild(mailSender);
    mailSenderText.appendChild(mailRecipient);

    const mailSenderInformation = document.createElement('div');
    mailSenderInformation.className = 'mail-sender-information';
    mailSenderInformation.appendChild(mailSenderImage);
    mailSenderInformation.appendChild(mailSenderText);

    const mailHeaderDate = document.createElement('div');
    mailHeaderDate.className = 'mail-header-date';
    mailHeaderDate.textContent = date;

    const mailHeader = document.createElement('div');
    mailHeader.className = 'mail-header';
    mailHeader.appendChild(mailSenderInformation);
    mailHeader.appendChild(mailHeaderDate);

    const mailSubject = document.createElement('p');
    mailSubject.className = 'mail-subject';
    mailSubject.textContent = `Warnung! Rückgang der Zufriedenheit durch ${mail.subject}`;

    const mailText = document.createElement('p');
    mailText.className = 'mail-text';
    mailText.textContent = mail.information;

    const mailContentContainer = document.createElement('div');
    mailContentContainer.className = 'mail-content-container';
    mailContentContainer.appendChild(mailSubject);
    mailContentContainer.appendChild(mailText);

    const mailElement = document.createElement('div');
    mailElement.className = 'mail-element';
    mailElement.appendChild(mailUtilityContainer);
    mailElement.appendChild(mailHeader);
    mailElement.appendChild(mailContentContainer);

    if (mail.eventSuggestion) {
        const mailEventSuggestion = document.createElement('span');
        mailEventSuggestion.className = 'mail-event-suggestion';
        mailEventSuggestion.textContent = `Handlungsempfehlung: ${mail.eventSuggestion.title}`;
        mailEventSuggestion.addEventListener('click', () => {
            openAspectMenu(mail.eventSuggestion.type);
            setAsMainEvent(mail.eventSuggestion.id);
        });

        mailElement.appendChild(mailEventSuggestion);
    }

    const mailContainer = document.getElementById('mails-container');
    mailContainer.innerHTML = '';

    mailContainer.appendChild(mailElement);
}   

function showMailPreview(mail, date) {
    const previewMailSenderImage = document.createElement('img');
    previewMailSenderImage.className = 'preview-mail-sender-image';
    previewMailSenderImage.loading = 'eager';
    previewMailSenderImage.src = mail.senderInformation.profileImage.src;
    previewMailSenderImage.alt = mail.senderInformation.profileImage.alt;

    const previewMailSender = document.createElement('p');
    previewMailSender.className = 'preview-mail-sender';
    previewMailSender.textContent = mail.senderInformation.sender;

    const previewMailRecipient = document.createElement('p');
    previewMailRecipient.className = 'preview-mail-recipient';
    previewMailRecipient.textContent = 'an Happinessmanager';

    const previewMailSenderText = document.createElement('div');
    previewMailSenderText.className = 'preview-mail-sender-text';
    previewMailSenderText.appendChild(previewMailSender);
    previewMailSenderText.appendChild(previewMailRecipient);

    const previewMailSenderInformation = document.createElement('div');
    previewMailSenderInformation.className = 'preview-mail-sender-information';
    previewMailSenderInformation.appendChild(previewMailSenderImage);
    previewMailSenderInformation.appendChild(previewMailSenderText);

    const previewMailHeaderDate = document.createElement('div');
    previewMailHeaderDate.className = 'preview-mail-header-date';
    previewMailHeaderDate.textContent = date;

    const previewMailHeader = document.createElement('div');
    previewMailHeader.className = 'preview-mail-header';
    previewMailHeader.appendChild(previewMailSenderInformation);
    previewMailHeader.appendChild(previewMailHeaderDate);

    const previewMailSubject = document.createElement('p');
    previewMailSubject.className = 'preview-mail-subject';
    previewMailSubject.textContent = `Warnung! Rückgang der Zufriedenheit durch ${mail.subject}`;

    const previewMailText = document.createElement('p');
    previewMailText.className = 'preview-mail-text';
    previewMailText.textContent = mail.information;

    const previewMailContentContainer = document.createElement('div');
    previewMailContentContainer.className = 'preview-mail-content-container';
    previewMailContentContainer.appendChild(previewMailSubject);
    previewMailContentContainer.appendChild(previewMailText);

    const previewMailElement = document.createElement('div');
    previewMailElement.className = 'preview-mail-element';
    previewMailElement.appendChild(previewMailHeader);
    previewMailElement.appendChild(previewMailContentContainer);

    if (mail.eventSuggestion) {
        const previewMailEventSuggestion = document.createElement('span');
        previewMailEventSuggestion.className = 'preview-mail-event-suggestion';
        previewMailEventSuggestion.textContent = `Handlungsempfehlung: ${mail.eventSuggestion.title}`;
        previewMailEventSuggestion.addEventListener('click', () => {
            openAspectMenu(mail.eventSuggestion.type);
            setAsMainEvent(mail.eventSuggestion.id);
        });

        previewMailElement.appendChild(previewMailEventSuggestion);
    }

    const mailPreviewContainer = document.getElementById('mails-preview-container');
    mailPreviewContainer.innerHTML = '';

    mailPreviewContainer.appendChild(previewMailElement);
}   

function showMailNotification() {
    mailState.unreadMails++;
    const mailNotification = document.getElementById('mail-notification');
    mailNotification.textContent = mailState.unreadMails;

    mailNotification.classList.remove('inactive');
}

export function resetUnreadMails() {
    mailState.unreadMails = 0;
    document.getElementById('mail-notification').classList.add('inactive');
}