const passport = require('../config/passport');
/* const WebSocketServer = require('ws').Server; */
const jwtSimple = require('jwt-simple');
const env = require('../config/.env')
module.exports = (app, server) => {

    app.use('', require('./routes/authRoute'))
    app.get((req, resp, next) => {
        resp.send("Ola")
    })
    app.use('/api/', passport);
    app.get('/api/teste', (res, resp) => {
        resp.status(200).json({
            message: 'Ola'
        })
    });

    const socket = require('socket.io')(server, { path: '/chat' });
    socket.on('connection', (user) => {
        console.log(user)
    })

    /*     const wss = new WebSocketServer({
            port: 3001,
            path: "/chat",
            verifyClient: function (info, cb) {
                const sec = info.req.headers['sec-websocket-protocol'];
                let token = sec.slice(sec.indexOf('$') + 1, sec.length);
    
                if (!token) {
                    cb(false, 401, 'Unauthorized');
                } else {
                    let decode = jwtSimple.decode(token, env.jwtSecret);
                    if (decode) {
                        cb(true)
                    } else {
                        cb(false, 401, 'Unauthorized')
                    }
                }
            }
        });
        wss.on('connection', (c) => {
            wss.on('userName', (userName) => {
                wss.emit(userName);
            })
        }) */


}