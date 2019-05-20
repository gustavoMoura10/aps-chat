//Módulo de expr
//Módulo express utilizado para requisições HTTP
const app = require('express')();

//Módulos de configuração
require('./config/middlewares')(app);
//Módulo de conexão para acesso ao banco
require('./config/connection')
//Módulo da API REST
require('./api/api')(app)

app.listen(3000, () => {
    console.log(`Connected with Server`);
})