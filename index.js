const messagesContent = $('.msgs-content');
const messageInput = $('.msg-input');
const messageSubmit = $('.msg-submit');
const avatarImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZMclBoDwTA7XXE6WTNKwke-hZgHGW0UxLhg&usqp=CAU';
const fakeMessages = [
    'Olá eu sou o Juninho, uma IA(Inteligência Artificial) desenvolvida pelo Isaac.',
    'A inteligência artificial (IA) é um campo da ciência da computação que se concentra no desenvolvimento de sistemas e programas de computador capazes de realizar tarefas que normalmente requerem inteligência humana. Essas tarefas incluem o aprendizado, o raciocínio, o reconhecimento de padrões, a resolução de problemas, a compreensão da linguagem natural e a tomada de decisões.',
    'Sou um chatbot de IA, ou simplesmente chatbot, é um programa de computador projetado para interagir com seres humanos por meio de conversas naturais, seja por texto, voz ou outros meios de comunicação. Os chatbots utilizam técnicas de inteligência artificial, como processamento de linguagem natural (NLP) e aprendizado de máquina, para compreender e responder às perguntas e comandos dos usuários.',
    'A  minha principal função atualmente é apenas responder perguntas inicialmente pensadas pelo Isaac e sua equipe, apenas isso, por enquanto.',
    'A equipe do Isaac atualmente é composta por: Henrique(criador dos slides), Gabriel(ajudou o Henrique), Ryan(Ajudou o Isaac no desenvolvimento do código Html, CSS e JavaScript).',
    'Juninho Team foi o nome escolhido pelo Ryan, na casa dele em uma Sexta-Feira ás 17:55 enquanto ele comia, assistindo Paulinho o Louco',
    'Sim, a IA atualmente não está 100% pronta, continua em estado de criação, porém, obrigado pela atenção!',
    'Why do you think that?',
    'Can you explain?',
    'Anyway I\'ve gotta go now',
    'It was a pleasure chat with you',
    'Time to make a new video',
    'Bye',
    ':)'
];

let minutes = 0;

// Initialize scrollbar and display fake message on window load
$(window).on('load', function () {
    messagesContent.mCustomScrollbar();
    setTimeout(fakeMessage, 100);
});

// Update scrollbar to bottom and add timestamp
function updateScrollbar() {
    messagesContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
};

function addTimestamp() {
    const date = new Date();
    const minutesNow = date.getMinutes();

    if (minutes !== minutesNow) {
        minutes = minutesNow;
        const timeStamp = $('<div class="timestamp"></div>').text(`${date.getHours()}:${minutes}`);
        $('.msg:last').append(timeStamp);
    };
};

function addMessageToPage(msg, isPersonal = false) {
    const message = $('<div class="msg"></div>').text(msg);
    if (isPersonal) {
        message.addClass('msg-personal');
    } else {
        const figure = $('<figure class="avatar"></figure>');
        const image = $('<img>').attr('src', avatarImage);
        figure.append(image);
        message.addClass('new').prepend(figure);
    };
    $('.mCSB_container').append(message);
    addTimestamp();
    updateScrollbar();
};

// Function to insert user message and trigger fake message after 1 second
function insertMessage() {
    const messageText = messageInput.val().trim();
    if (messageText === '') {
        return false;
    };
    addMessageToPage(messageText, true);
    messageInput.val(null);
    setTimeout(fakeMessage, 1000 + (Math.random() * 20) * 100);
};

// Message input and submit button event listener
messageInput.on('keydown', function (e) {
    // if user press enter, send message
    if (e.which === 13) {
        insertMessage();
        return false;
    };
});

messageSubmit.on('click', insertMessage);

// function to display loading message and replace with fake message after 1 - 2 second
function fakeMessage() {
    if (messageInput.val() !== '') {
        return false;
    };

    const loadingMessage = $('<div class="msg loading new"></div>');
    const figure = $('<figure class="avatar"></figure>');
    const image = $('<img>').attr('src', avatarImage);
    figure.append(image);
    loadingMessage.append(figure).append($('<span></span>'));
    $('.mCSB_container').append(loadingMessage);
    updateScrollbar();

    setTimeout(function () {
        loadingMessage.remove();
        addMessageToPage(fakeMessages.shift());
    }, 1000 + (Math.random() * 20) * 100);
}