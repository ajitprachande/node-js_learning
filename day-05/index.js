// const { log } = require('console')
const ChatRoom = require('./chatRoom.js')

const chat = new ChatRoom();

chat.on( 'join' , (user) => {
    console.log(`${user} joined the chat.`);
})

chat.on('message', (user, message) => {
        console.log(`NEW Message: ${user} : ${message}`);
})

chat.on('leave', (user) => {
    console.log(`${user} left the chat.`);
})


chat.join('ajit');
chat.join('Omraj');

chat.SendMessage('ajit', 'Hii Raj...')
chat.SendMessage('Omraj', 'bol...')

chat.leave('ajit');
chat.SendMessage('ajit', 'Hii Raj...')


