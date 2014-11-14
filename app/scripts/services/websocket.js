'use strict';

//***********************************************
// WEBSOCKET SERVICES
//***********************************************

(function () {

    var app = angular.module('boah');

    var socket = io();

    socket.on('newpost', function (msg) {
                    $('.websocket-msg').fadeIn('slow');
                });

    app.service('websocket', [function () {

        return {
            sendSocket: function () {
                socket.emit('newpost', 'HalliHelloSocketIschcool');
            }
    }}])
})();
