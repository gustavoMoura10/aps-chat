const passport = require('../config/passport');
module.exports = (app, server) => {

    app.use('', require('./routes/authRoute'))
    app.use('/api/', passport);
    app.use('/api/user', require('./routes/roomRoute'));
    const io = require('socket.io')(server);
    io.on("connection", socket => {
        let previousId;
        const safeJoin = currentId => {
            socket.leave(previousId);
            socket.join(currentId);
            previousId = currentId;
        };

        socket.on("join", data => {
            socket.join(data.room);
            console.log(`USER:${data.userName} joined ROOM:${data.room}`);
            socket.broadcast.to(data.room)
            .emit('newUserJoined',{user:data.userName,message:'Has Joined'});
        });
        socket.on("leave", data => {
            console.log(`USER:${data.userName} joined ROOM:${data.room}`);
            socket.broadcast.to(data.room)
            .emit('userLeft',{user:data.userName,message:'Has Left'});
            socket.leave(data.room);
        });
        socket.on("newRoom",data =>{
            this.socket.emit('roomCreated',data)
        })
    });

}