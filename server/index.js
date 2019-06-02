//Módulo de express
//Módulo express utilizado para requisições HTTP
const app = require('express')();

//Módulos de configuração
require('./config/middlewares')(app);
//Módulo de conexão para acesso ao banco
require('./config/connection')
const server = app.listen(3000, 'localhost', () => {
    console.log(`Connected with Server`);
})
//Módulo da API REST
require('./api/api')(app, server)
