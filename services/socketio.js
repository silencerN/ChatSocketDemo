/*
 封装socket.io,为了获取server以便监听.
 */
var socketio = {};
var socket_io = require('socket.io');
var io={};
//获取io
var socketio = function(server){

    io = socket_io(server);

    io.on('connection', function (socket) {
        console.log('connection successful!');
        var user;
        socket.on('NewJoin', function(msg){
            console.log('NewJoin: '+ msg);
            user=msg;
            socket.broadcast.emit('NewPlayerJoin','Welcome New Plyaer : '+msg);
        });
        socket.on('chat message', function(msg){
            console.log('chat message: '+ msg);
            io.emit('chat message', msg);
        });
        socket.on('disconnect', function(){
            console.log('receive disconnect event, user : ' +user);
            socket.broadcast.emit('PlayerLeave',user + ' has disconnect! ');
        })
    })
};

module.exports = socketio;