var socket_io = require('socket.io');
var http = require('http');
var express = require('express');
// bootstrap = require('bootstrap')

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

// io.attach(server);
// io.on('connection', function(socket) {
//   socket.on('postMessage', function(data) {
//     io.emit('updateMessages', data);
//   });
// });

io.on('connection', function (socket) {
    console.log('Client connected');
    
    socket.on ('disconnect', function (){
        console.log('Client Disconnected');
    });

    socket.on('postMessage', function(data) {
        console.log('Received message:', data);
        socket.broadcast.emit('updateMessages', data);
    });
});
server.listen(8080);