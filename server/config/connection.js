//Sequelize é a ORM que faz acesso ao banco
const Sequelize = require('sequelize').Sequelize;
//Arquivo que trará as informações de acesso
const env = require('./.env');
//Módulo do Node que faz leitura e escrita de arquivos
const fs = require('fs');
//Módulo do Node que verifica diretórios
const path = require('path');
//Instância de acesso ao banco
const connection = new Sequelize({
    database: env.databaseName,
    host: env.databaseHost,
    username: env.databaseUser,
    password: env.databasePassword,
    dialect: 'mysql'
}); 
//Método para autenticar o acesso
connection.authenticate().then(error => {
    if (error) {
        console.log('ERROR:', error);
    } else {
        console.log('CONNECTED')
    }
});
//Diretórios onde há as classes de modelo
const dir = path.join(__dirname, '../api/models');
//Método de leitura dos arquivos do diretório
fs.readdir(dir, (error, data) => {
    if (error) {
        //Caso ocorrar algum erro
        console.log('ERROR:', error);
    } else if (data.length === 0) {
        //Caso não haja nenhum dado
        console.log('ERROR:NO DATA');
    } else {
        //Caso haja dados
        //Método funcional que reduz um array
        //Ele será usado para criar um Objeto
        //Que terá todas as classes de modelo
        //Para serem salvas no banco de dados
        const models = data.reduce((el, next) => {
            //Método para capitalizar as classes
            const capitalize = next.charAt(0).toUpperCase()
                + next.slice(1, next.indexOf('.js'));
            //Aqui será sincronizada as classes de modelo
            //Para serem criadas no Banco de Dados
            el[capitalize] = require(`${dir}/${next}`);
            return el;
        }, {});
        //Método para verificar os valores que há
        //Nas classes de modelo para fazer assim
        //Mapeamentos (associations) de tabelas
        Object.values(models)
            .filter(el =>
                el.associate === 'function'
            )
            .forEach(el => {
                el.associate(models);
            })
    }
});
//Envio da conexão
module.exports = connection;