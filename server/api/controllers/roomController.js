/**
 * ORM de Room
 */
const Room = require('../models/room');
/**
 * Módulo de exceções
 */
const exceptions = require('../exceptions');
/**
 * Classe com os métodos a serem
 * exportados
 */
const roomController = {};

/**
 * Método de criar room com os 
 * parametros de requeisição do 
 * usuário e resposta do servidor
 */
roomController.createRoom = (req, resp, next) => {
    try {
        /**
        * Verifica se o corpo da requisição
        * está vázio
        */
        exceptions.empty(req.body);
        /**
         * Clone dos atributos da tabela
         */
        const tabelaObject = Room.tableAttributes
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
         * Método da ORM que cria um room
         */
        Room.create(req.body)
            .then(result => {
                /**
                 * Caso crie envie para o usuário
                 */
                const object = result.get();
                delete object.password;
                resp.status(200).json(object);
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
 * Método para achar todas as rooms 
 * com parametros de requisição do
 * usuário e resposta do servidor
 */
roomController.findAllRooms = (req, resp, next) => {
    try {
        /**
         * Método da ORM que busca
         * todas as rooms
         */
        Room.findAll().then(result => {
            /**
             * Envia todas as rooms para o usuário
             */
            resp.status(200).json(result);
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
module.exports = roomController;