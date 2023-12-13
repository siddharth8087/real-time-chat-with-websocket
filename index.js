// const io = require('socket.io')(8000);

// const { Socket } = require('socket.io');

// const users = {};

// io.on('connection', socket =>{
//     //event when new user joined
//     socket.on('new-user-joined',name=>{
//         users[socket.id] = name;
//         console.log("New user ", name);
//         // console.log(users);
//         socket.broadcast.emit('user-joined',name);
//     });
    
//     socket.on('send',message => {
//         socket.broadcast.emit('receive' , {message : message , name : users[socket.id]})
//     });

//     // console.log(name);
// })

// // console.log("name");




const io = require('socket.io')(8000);

const users = {};

//this is an event......
io.on('connection',socket => {
    socket.on('new-user-joined',name =>{
        console.log("new user" , name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('received', {message : message, name : users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id])
        delete users[socket.id]
    });

})