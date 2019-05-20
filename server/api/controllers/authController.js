const User = require('../models/user');
const jwtSimple = require('jwt-simple')
const Op = require('sequelize').Op;
const exceptions = require('../exceptions');
const env = require('../../config/.env')
const bcrypt = require('bcrypt');
const authController = {};

authController.signIn = async (req, resp, next) => {
    try {
        exceptions.empty(req.body);
        const tabelaObject = User.tableAttributes
        delete tabelaObject.id;
        delete tabelaObject.username;
        delete tabelaObject.confirmPassword
        exceptions.equalBody(req.body, tabelaObject);
        Object.entries(req.body).forEach(el => {
            exceptions.empty(req.body);
        });
        User.findOne({
            where: {
                email: {
                    [Op.eq]: req.body.email
                }
            }
        }).then(result => {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                const now = Math.floor(Date.now() / 1000);
                const payload = {
                    id: result.id,
                    email: result.email,
                    iat: now,
                    exp: now + 60 * 60 * 24
                }
                resp.status(200).send({
                    ...payload,
                    jwt: jwtSimple.encode(payload, env.jwtSecret)
                  });
            } else {
                console.log('ERROR:', error);
                resp.status(404).send({
                    exception: true,
                    message: 'Wrong Password'
                });
            }
        }).error(error => {
            console.log('ERROR:', error);
            resp.status(500).send({
                exception: true,
                message: 'Error on Server'
            });
        })
    } catch (error) {
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