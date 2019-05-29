//Módulo criado para acesso ao banco
const connection = require('../../config/connection');
//Tipos de dados da nossa tabela
const DataTypes = require('sequelize');

//Criação da ORM de nossa tabela
const User = connection.define('user', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
    {
        timestamps: false,
        tableName: 'user'
    })
//Método que sincroniza o Objeto no banco
User.sync({ force: false });
//Exporta a nossa ORM para outros arquivos
module.exports = User;