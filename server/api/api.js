const passport = require('../config/passport');
module.exports = app => {

    app.use('', require('./routes/authRoute'))
    app.get((req, resp, next) => {
        resp.send("Ola")
    })
    app.use('/api/', passport);
    app.get('/api/teste', (res, resp) => {
        resp.status(200).json({
            message:'Ola'
        })
    })
    const http = require('http').createServer(app);
    const io = require('socket.io')(http);

}