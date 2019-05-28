const passport = require('../config/passport');
<<<<<<< HEAD
const jwtSimple = require('jwt-simple');
const env = require('../config/.env')
=======
>>>>>>> bd5917ac3b8e75818183b37e056695f1f153c61d
module.exports = (app, server) => {

    app.use('', require('./routes/authRoute'))
    app.use('/api/', passport);
<<<<<<< HEAD

    const io = require('socket.io')(server,{path:'/chat'});
    const documents = {};
    
    io.on('connection', socket => {
        let previousId;
        const safeJoin = currentId => {
            socket.leave(previousId);
            socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
            previousId = currentId;
        }
    
        socket.on('getDoc', docId => {
            safeJoin(docId);
            socket.emit('document', documents[docId]);
        });
        socket.on('teste', docId => {
            console.log(docId)
            // safeJoin(docId);
            // socket.emit('document', documents[docId]);
        });
    
        socket.on('addDoc', doc => {
            documents[doc.id] = doc;
            safeJoin(doc.id);
            console.log(doc)
            io.emit('documents', Object.keys(documents));
            socket.emit('document', doc);
        });
    
        socket.on('editDoc', doc => {
            documents[doc.id] = doc;
            console.log(doc)
            socket.to(doc.id).emit('document', doc);
        });
    
        io.emit('documents', Object.keys(documents));
    
        console.log(`Socket ${socket.id} has connected`);
    });
    
=======
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
>>>>>>> bd5917ac3b8e75818183b37e056695f1f153c61d

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