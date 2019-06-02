/**
 * Módulo de segurança de autenticação
 */
const passport = require('../config/passport');
module.exports = (app, server) => {
    /**
     * O Express usa a rota de autenticação
     */
    app.use('', require('./routes/authRoute'))
    /**
     * Autenticação para todas as URLS que tiverem
     * após API
     */
    app.use('/api/', passport);
    /**
     * Rota com os métodos HTTP de room
     */
    app.use('/api/room', require('./routes/roomRoute'));
    /**
     * Criação do servidor de socket
     */
    const io = require('socket.io')(server);
    /**
     * Caso haja uma conexão
     */
    io.on("connection", socket => {
        /**
         * Caso um usuário queira se juntar
         * a uma sala em específico
         */
        socket.on("join", data => {
            socket.join(data.room);
            console.log(`USER:${data.userName} joined ROOM:${data.room}`);
            /**
             * Envie para todos na sala que o suário entrou
             */
            io.to(data.room)
                .emit('newUserJoined', { user: data.userName, message: 'Has Joined',archive:false });
        });
        /**
         * Caso o usuário saia de uma sala
         * em especifico
         */
        socket.on("leave", data => {
            console.log(`USER:${data.userName} leaved ROOM:${data.room}`);
            /**
             * Envie a todos na sala que o suário saiu
             */
            io.to(data.room)
                .emit('userLeft', { user: data.userName, message: 'Has Left',archive:false });
            socket.leave(data.room);
        });
        /**
         * Caso o usuário crie uma nova sala
         */
        socket.on("newRoom", data => {
            /**
             * Envie para todos que o usuário
             */
            io.emit('roomCreated', data)
        })
        /**
         * Caso o usuário mande uma mensagem
         */
        socket.on("message", data => {
            console.log(data)
            /**
             * Mande para todos na sala a mensagem
             */
            io.in(data.room).emit('newMessage', { user: data.userName, message: data.message,archive:data.archive })
        })
    });

}