//var socket_io = require('socket.io');
var io = require('socket.io') ();
var http = require('http');
var express = require('express');
// bootstrap = require('bootstrap')

var app = express();
app.use(express.static('public'));

var server = http.Server(app);

io.attach(server);
//var io = socket_io(server);

io.on('connection', function(socket) {
        console.log('Client connected');
    
    socket.on ('disconnect', function (){
        console.log('Client Disconnected');
    });
    
    socket.on('postMessage', function(data) {
        console.log('Received message:', data);
    io.emit('updateMessages', data);
  });
});
//     socket.on('typing', function () {
//     socket.broadcast.emit('typing', {
//       username: socket.username
//     });
//   });

  // when the client emits 'stop typing', we broadcast it to others
//     socket.on('stop typing', function () {
//     socket.broadcast.emit('stop typing', {
//       username: socket.username
//     });
//   });
// io.on('connection', function (socket) {
//     console.log('Client connected');
    
//     socket.on ('disconnect', function (){
//         console.log('Client Disconnected');
//     });

//     socket.on('postMessage', function(data) {
//         console.log('Received message:', data);
//         socket.broadcast.emit('updateMessages', data);
//     });
// });
server.listen(8080);