module.exports = function( server ) {
    let io = require('socket.io')(server);
    io.on('connection',function(socket){
        socket.on('login:room', function(data) {
            console.log('name: ' + data.name);
            console.log('userid: ' + data.userid);
            socket.join('room'+data.roomId);
            socket.name = data.name;
            socket.userid = data.userid;
    })

    socket.on('fromclient',function(data){
        let msg = {
        from: {
            name : socket.name,
            userid : socket.userid
        },
        msg: data.msg
        };
        //socket.broadcast.to('room'+data.roomId).emit('toclient',msg);
        io.sockets.in('room'+data.roomId).emit('toclient',msg);
        console.log('Message from client : '+ msg.msg);
    })
    });
}