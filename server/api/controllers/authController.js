//Modulo do User
const User = require('../models/user');
//Pacote para geração de token em JWT
const jwtSimple = require('jwt-simple')
//Métodos para consulta do banco
const Op = require('sequelize').Op;
//Classe criada para jogar exceções
const exceptions = require('../exceptions');
//Configurações de ambiente
const env = require('../../config/.env')
//Pacote para encriptar a senha
const bcrypt = require('bcrypt');
//Classe a ser exportada
const authController = {};

//Método para login do usuário
authController.signIn = async (req, resp, next) => {
    try {
        //Case que o corpo da requisição seja vazio
        exceptions.empty(req.body);
        //Copia os atributos da ORM
        const tabelaObject = User.tableAttributes
        //Deleta informações para comparar ao corpo da requisição
        delete tabelaObject.id;
        delete tabelaObject.userName;
        delete tabelaObject.confirmPassword
        /**
         * Método quer verifica se o corpo da requisição
         * é igual ao corpo da ORM 
         */
        exceptions.equalBody(req.body, tabelaObject);
        /**
         * Verifica se os atributos do corpo da requisição
         * estão vazios
         */
        Object.entries(req.body).forEach(el => {
            exceptions.empty(req.body);
        });
        /**
         * Método para achar no banco se há algum usuário
         * que tenha o email enviado do corpo da requisição
         */
        User.findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email
                }
            }
        }).then(result => {
            /**
             * Se há um resultado será comparada a senha do
             * corpo da requisição com a senha salva no banco
             * (já que ao salvar um novo usuário sua senha está
             * em um código hash)
             */
            if (bcrypt.compareSync(req.body.password, result.password)) {
                /**
                 * Método para pegar o horário atual(Full)
                 */
                const now = Math.floor(Date.now() / 1000);
                /**
                 * Payload que será enviado ao usuário
                 */
                const payload = {
                    id: result.id,
                    userName: result.userName,
                    email: result.email,
                    iat: now,
                    exp: now + 60 * 60 * 24
                }
                /**
                 * Informações que vão ser enviadas ao usuário
                 * para que ele possa autenticar as solicitações
                 * pelo token (JWT)
                 */
                resp.status(200).send({
                    ...payload,
                    jwt: jwtSimple.encode(payload, env.jwtSecret)
                });
            } else {
                /**
                 * Caso ocorra um erro na requisição
                 */
                console.log('ERROR:Wrong Password');
                resp.status(400).send({
                    exception: true,
                    message: 'Wrong Password'
                });
            }
        }).error(error => {
            /**
             * Caso haja algum erro no servidor
             */
            console.log('ERROR:', error);
            resp.status(500).send({
                exception: true,
                message: 'Error on Server'
            });
        })
    } catch (error) {
        /**
        * Caso ocorra um erro na requisição
        */
        console.log('ERROR:', error);
        resp.status(400).send({
            exception: true,
            message: error
        });
    }
}
authController.validate = async (req, resp, next) => {
    try {
        exceptions.empty(req.body)
        const token = jwtSimple.decode(req.body.jwt, env.jwtSecret);
        if (new Date(token.exp * 1000) > new Date()) {
            resp.status(200).json({
                exception: false,
                message: true
            });
        } else {
            resp.status(400).send({ exception: true, message: "Expired" });
        }
    } catch (msg) {
        resp.send(403).send({ exception: true, message: msg });
    }
}

module.exports = authController