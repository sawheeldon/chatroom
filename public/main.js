$(document).ready(function() {
    var socket = io();
    var chatUsername = document.querySelector('#chat-username');
    var chatMessage = document.querySelector('#chat-message');
    // var input = $('#chat-message');
    // var messages = $('#messages');
    // var messageContainer = $('#message-container');
    // var chatUserName = $('#chat-username');
    // var submitButton = $('#chat-submit');
    
  socket.on('connect', function() {
    var chatForm = document.forms.chatForm;

     if (chatForm) {
        
        chatForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          socket.emit('postMessage', {
              username: chatUsername.value,
              message: chatMessage.value,
          });
          chatMessage.value='';
          chatMessage.focus();
        }); //chatform event
        socket.on('updateMessages', function(data) {
          showMessage(data);
        }); //updateMessages
  } //chatform
}); //socket

function showMessage(data) {
  var chatDisplay = document.querySelector('.chat-display');
  var newMessage = document.createElement('p');

  if (chatUsername.value == data.username) {
    newMessage.className = 'bg-success chat-text';
  } else {
    newMessage.className = 'bg-info text-warning chat-text';
  }

  newMessage.innerHTML = '<strong>' + data.username + '</strong>: ' + data.message;
  chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);
}


});

//socket.on('updateMessages', showMessage);
    
//     var addMessage = function(message) {
//         var newMessage = document.createElement('p');
//         newMessage.innerHTML = '<strong>' + message.chatUserName + '</strong>: ' + message.input;
        
//         messageContainer.append('<div>' + message + '</div>');
//     };

//     input.on('keydown', function(event) {
//         if (event.keyCode != 13) {
//             console.log("Pressed Enter");
//             return;
//         }
//         // else if ($(submitButton).click){
//         //     console.log("Clicked");
//         //     return;
//         // };  
    
//         var message = input.val();
//         addMessage(message);
//         socket.emit('message',{
//          username:chatUserName.value, 
//          message:input.value,
//         });
//         input.val('');
//     });
    
//     socket.on('message', addMessage);

// });