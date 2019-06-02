/**
 * Módulo da ORM do user
 */
const User = require('../models/user');
/**
 * Operadores para busca na tabela
 */
const Op = require('sequelize').Op;
/**
 * Módulo de exceções 
 */
const exceptions = require('../exceptions');
/**
 * Módulo de encriptação de senhas
 */
const bcrypt = require('bcrypt');
/**
 * Classe a ser exportada
 */
const userController = {};

/**
 * Método que cria um usuário 
 * com a requisição do usuário
 * e resposta do servidor
 */
userController.createUser = async (req, resp, next) => {
    try {
        /**
        * Verifica se o corpo da requisição
        * está vázio
        */
        exceptions.empty(req.body);
        /**
         * Clone dos atributos da tabela
         */
        const tabelaObject = User.tableAttributes
        tabelaObject.confirmPassword = undefined;
        delete tabelaObject.id;
        /**
         * Método que verifica se o corpo
         * da requisição tem os mesmos atributos
         * que os da tabela
         */
        exceptions.equalBody(req.body, tabelaObject);
        /**
         * Método que verifica se cada valor
         * do corpo da requisição é vazio
         */
        Object.values(req.body).forEach(el => {
            exceptions.empty(el);
        });
        /**
         * Verifica se a senha original e a de
         * confirmação são iguais
         */
        exceptions.equals(req.body.password, req.body.confirmPassword);
        const salt = bcrypt.genSaltSync(10);
        /**
         * Encripta a senha
         */
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        delete req.body.confirmPassword;
        /**
         * Método da ORM que cria um usuário
         */
        User.create(req.body).then(result => {
            /**
            * Caso crie envie para o usuário
            */
            const object = result.get();
            delete object.password;
            resp.status(200).send(object);
        }
        ).error(error => {
            /**
             * Caso ocorra um erro no servidor
             */
            console.log('ERROR:', error);
            resp.status(500).send({
                exception: true,
                message: 'Error on Server'
            });
        });
    } catch (error) {
        /**
         * Caso ocorra um erro do usuário
         */
        console.log('ERROR:', error);
        resp.status(400).send({
            exception: true,
            message: error
        });
    }
}

/**
 * Exporta a classe com os métodos
 */
module.exports = userController;