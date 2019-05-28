const User = require('../models/user');
const Op = require('sequelize').Op;
const exceptions = require('../exceptions');
const bcrypt = require('bcrypt');
const userController = {};

userController.createUser = async (req, resp, next) => {
    try {
        exceptions.empty(req.body);
        const tabelaObject = User.tableAttributes
        delete tabelaObject.id;
        tabelaObject.confirmPassword = undefined;
        exceptions.equalBody(req.body, tabelaObject);
        Object.entries(req.body).forEach(el => {
            exceptions.empty(el[1]);
        });
        exceptions.equals(req.body.password, req.body.confirmPassword);
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        delete req.body.confirmPassword;
        User.create(req.body).then(result => {
            const object = result.get();
            delete object.password;
            resp.status(200).send(object);
        }
        ).error(error => {
            console.log('ERROR:', error);
            resp.status(500).send({
                exception: true,
                message: 'Error on Server'
            });
        });
    } catch (error) {
        console.log('ERROR:', error);
        resp.status(400).send({
            exception: true,
            message: error
        });
    }
}



module.exports = userController;