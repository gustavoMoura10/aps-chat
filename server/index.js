//Módulo de expr
//Módulo express utilizado para requisições HTTP
const app = require('express')();

//Módulos de configuração
require('./config/middlewares')(app);
//Módulo de conexão para acesso ao banco
require('./config/connection')
//Módulo da API REST
const server = app.listen(3000, '192.1.6.43', () => {
    console.log(`Connected with Server`);
})
require('./api/api')(app, server)
