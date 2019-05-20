const passport = require('../config/passport');
module.exports = app => {

    app.use('',require('./routes/authRoute'))
    app.use('/api/',passport);
    app.get('/api/teste',(res,resp)=>{
        resp.send('ola')
    })
    const http = require('http').createServer(app);
    const io = require('socket.io')(http);

}