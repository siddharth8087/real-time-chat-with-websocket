
//set socket as transport
// const io = require('socket.io-client');
const socket = io('http://localhost:8000', { transports: ['websocket'], upgrade: false });


    
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')



const append = (message,position ) =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    // messageElement.style.float = position;
    if (position === 'left') {
        messageElement.classList.add('left');
    } else if (position === 'right') {
        messageElement.classList.add('right');
    }
    messageContainer.append(messageElement);
    
    };

   


// this is an event where we prevent reoload of the page when we submit it..
form.addEventListener('submit' , (f)=>{
    f.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send' , message);
    messageInput.value = '';
})

const name = prompt('Enter your name to join... ');
socket.emit('new-user-joined' , name);
//event for new user joined...
socket.on('user-joined',name=>{
    append(`${name} joined the chat` ,'right')
})

// socket.on('send')
socket.on('received' , data=>{
    append(`${name} :${data.message}  `, 'left' , );
});
// event fired when one of the user leave the chat...
socket.on('leave' , name => {
    append(`${name} left the chat` , 'right');
})
 
