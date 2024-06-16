const sequelize = require("../database.connection");
const {DataTypes} = require("sequelize");

const Process = sequelize.define("process", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    page: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    totalLength: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

module.exports = Process;
