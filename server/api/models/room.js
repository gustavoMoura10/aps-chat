const connection = require('../../config/connection');
const DataTypes = require('sequelize');

const Room = connection.define('room',{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    timestamps: false,
    tableName: 'room'
});
Room.sync({ force: false });
module.exports = Room;