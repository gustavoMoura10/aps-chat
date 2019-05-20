const passport = require('passport');
const passportJwt = require('passport-jwt');
const User = require('../api/models/user');
const env = require('./.env');
const Strategy = passportJwt.Strategy;

const strategy = new Strategy(
    {
        secretOrKey: env.jwtSecret,
        jwtFromRequest:passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, (payload, done) => {
        if (!payload) {
            console.log('ERROR:NO PAYLOAD SENT');
        } else {
            let id = payload.id;
            User.findByPk(id).then(result =>{
                done(null,result?{...payload}:false);
            }).error(error =>{
                done(error,false);
            })
        }
    });
    passport.use(strategy);

module.exports = passport.authenticate('jwt',{session:false});
