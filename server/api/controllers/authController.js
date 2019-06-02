/**
 * ORM de user
 */
const User = require('../models/user');
/**
 * Módulo JWT para gerar token
 */
const jwtSimple = require('jwt-simple');
/**
 * Operadores para busca na tabela
 */
const Op = require('sequelize').Op;
/**
 * Módulo para exceções
 */
const exceptions = require('../exceptions');
/**
 * Configurações de ambiente
 */
const env = require('../../config/.env');
/**
 * Módulo para encriptar senha
 */
const bcrypt = require('bcrypt');
/**
 * Classe com os métodos a serem
 * exportados
 */
const authController = {};

/**
 * Método de login com os parametros
 * de requeisição do usuário e 
 * resposta do servidor
 */
authController.signIn = async (req, resp, next) => {
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
        delete tabelaObject.id;
        delete tabelaObject.userName;
        delete tabelaObject.confirmPassword
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
         * Método da ORM que busca um usuário
         */
        User.findOne({
            where: {
                email: {
                    /**
                     * Caso o email do corpo da requisição
                     * seja igual ao da tabela
                     */
                    [Op.eq]: req.body.email
                }
            }
        }).then(result => {
            /**
             * Compara a senha enviada pelo corpo
             * da requisição e a do banco para ver se
             * são iguais
             */
            if (bcrypt.compareSync(req.body.password, result.password)) {
                const now = Math.floor(Date.now() / 1000);
                /**
                 * Payload que será enviado ao usuário
                 * e será codificado pelo token
                 */
                const payload = {
                    id: result.id,
                    userName:result.userName,
                    email: result.email,
                    iat: now,
                    exp: now + 60 * 60 * 24
                }
                /**
                 * Envia o payload e o token
                 * para o usuário
                 */
                resp.status(200).send({
                    ...payload,
                    jwt: jwtSimple.encode(payload, env.jwtSecret)
                });
            } else {
                /**
                 * Caso as senhas não sejam iguais
                 */
                console.log('ERROR:Wrong Password');
                resp.status(401).send({
                    exception: true,
                    message: 'Wrong Password'
                });
            }
        }).error(error => {
            /**
             * Caso ocorra um erro no servidor
             */
            console.log('ERROR:', error);
            resp.status(500).send({
                exception: true,
                message: 'Error on Server'
            });
        })
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
module.exports = authController