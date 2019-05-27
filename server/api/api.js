const passport = require('../config/passport');
module.exports = (app, server) => {

    app.use('', require('./routes/authRoute'))
    app.use('/api/', passport);
    const documents = {};
    const io = require('socket.io')(server);
    io.on("connection", socket => {
        let previousId;
        const safeJoin = currentId => {
            socket.leave(previousId);
            socket.join(currentId);
            previousId = currentId;
        };

        socket.on("getDoc", docId => {
            safeJoin(docId);
            socket.emit("document", documents[docId]);
        });

        socket.on("join", data => {

            console.log(data)

        });

        socket.on("editDoc", doc => {
            documents[doc.id] = doc;
            socket.to(doc.id).emit("document", doc);
        });

        io.emit("documents", Object.keys(documents));
    });
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