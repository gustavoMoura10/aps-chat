const Room = require('../models/room');
const exceptions = require('../exceptions');
const roomController = {};

roomController.createRoom = (req, resp, next) => {
    try {
        exceptions.empty(req.body);
        console.log(req.body)
        const tabelaObject = Room.tableAttributes
        delete tabelaObject.id;
        exceptions.equalBody(req.body, tabelaObject);
        Object.entries(req.body).forEach(el => {
            exceptions.empty(el[1]);
        });
        Room.create(req.body).then(result => {
            const object = result.get();
            delete object.password;
            resp.status(200).json(object);
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

roomController.findAllRooms = (req, resp, next) => {
    try {
        Room.findAll().then(result => {
            resp.status(200).json(result);
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

module.exports = roomController;