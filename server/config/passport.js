const passport = require('passport');
const passportJwt = require('passport-jwt');
const User = require('../api/models/user');
const env = require('./.env');
const Strategy = passportJwt.Strategy;


const strategy = new Strategy(
    {
        secretOrKey: env.jwtSecret,
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, (payload, done) => {
        if (!payload) {
            done(error, false, { message: 'No Payload Sent' });
        } else {
            let id = payload.id;
            if (new Date(payload.exp * 1000) > new Date()) {
                done(null, false, { message: "Expired Token" });
            } else {
                User.findByPk(id).then(result => {
                    done(null, result ? { ...payload } : false);
                }).error(error => {
                    done(error, false, { message: 'No User Found' });
                });
            }
        }
    });
passport.use(strategy);

module.exports = passport.authenticate('jwt', { session: false });
