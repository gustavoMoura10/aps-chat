const cors = require('cors');
const bodyParser = require('body-parser');
module.exports = app => {
    //Módulo para receber JSON das requisições
    app.use(bodyParser.json());
    //Módulo para aceitar as requisições HTTP
    app.use(cors({ origin: 'http://localhost:4200' }));
}