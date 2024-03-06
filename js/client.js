const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageip');
const messageContainer = document.querySelector('.container');
const audio = new Audio('tone.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);

    messageContainer.append(messageElement);
    if(position=='left')
        audio.play();
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append (`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// when any one join the chat
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
});
 
// when any one sending the message
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

// when any user left the chat
socket.on('left', name=>{
    append(`${name} left the chat`, 'left')
})
