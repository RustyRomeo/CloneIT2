'use strict';

//***********************************************
// WEBSOCKET SERVICES
//***********************************************

(function () {

    var app = angular.module('boah');

    var socket = io();

    // We define the newpost event to inform all users about new added posts
    socket.on('newpost', function (msg) {
                    $('.websocket-msg').fadeIn('slow');
                });

    app.service('websocket', [function () {

        return {
            sendSocket: function () {
                socket.emit('newpost', 'A new post was added');
            }
    }}])
})();
