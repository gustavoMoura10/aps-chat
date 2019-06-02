/**
 * Módulo do passport
 */
const passport = require('passport');
/**
 * Módulo da estratégia que será usado
 */
const passportJwt = require('passport-jwt');
/**
 * Módulo da ORM de user
 */
const User = require('../api/models/user');
/**
 * Módulo com as configurações de ambiente
 */
const env = require('./.env');
/**
 * Tipo de estratégia
 */
const Strategy = passportJwt.Strategy;

/**
 * Cria-se a nova estratégia de autenticação
 */
const strategy = new Strategy(
    {
        /**
         * Usa a chave nossa chave JWT
         */
        secretOrKey: env.jwtSecret,
        /**
         * Extrai as informações de autenticação pelo header 
         * com o modo beares
         */
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, (payload, done) => {
        if (!payload) {
            /**
             * Caso não haja nenhum payload
             */
            done(error, false, { message: 'No Payload Sent' });
        } else {
            /**
             * Caso haja pegue o id
             */
            let id = payload.id;
            /**
             * Se experiou a validade do token
             */
            if (new Date(payload.exp * 1000) > new Date()) {
                /**
                 * Procura o usuário pela chave primaria
                 */
                User.findByPk(id).then(result => {
                    /**
                     * Caso haja um resultado
                     */
                    done(null, result ? { ...payload } : false);
                }).error(error => {
                    /** Caso não haja um resultado */
                    done(error, false, { message: 'No User Found' });
                });
            } else {
                /**
                 * Erro caso o token tenha expirado
                 */
                done(null, false, { message: "Expired Token" });
            }
        }
    });
passport.use(strategy);

module.exports = passport.authenticate('jwt', { session: false });
