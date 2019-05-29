//Módulo criado para acesso ao banco
const connection = require('../../config/connection');
//Tipos de dados da nossa tabela
const DataTypes = require('sequelize');

//Criação da ORM de nossa tabela
const Room = connection.define('room', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: false,
        tableName: 'room'
    });

//Método que sincroniza o Objeto no banco
Room.sync({ force: false });
//Exporta a nossa ORM para outros arquivos
module.exports = Room;