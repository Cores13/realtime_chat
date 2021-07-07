var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server,{
        cors: {
            origin: 'http://localhost:3000',
            methods: ["GET", "POST"],
            credentials: true,
            allowEIO3: true
        },
        transport: ['websocket']
    });

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user)=> user,userId === userId) &&
        users.push({userId, socketId});
}
const removeUser = (socketId) =>{
    users = users.filter((user) => user.socketId !== socketId);
}
const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

io.on('connection', (socket) => {
    //when connected
    console.log('a user connected');

    //take userId and socketId from user
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    //send and get messages
    socket.on('sendMessage', (senderId, recieverId, text) => {
        const user = getUser(senderId);
        io.to(user?.socketId).emit('getMessage', {
            senderId, 
            text,
        });
    });

    //when disconnected
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
})

server.listen(8900, function() {
    console.log('listening on *:8900');
    });