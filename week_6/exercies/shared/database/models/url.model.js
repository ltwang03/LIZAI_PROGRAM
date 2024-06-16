const sequelize = require("../database.connection");
const {DataTypes} = require("sequelize");

const Url = sequelize.define("url", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    taskId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT("long"),
        allowNull: true
    },
    text: {
        type: DataTypes.TEXT("long"),
        allowNull: true
    },
    html: {
        type: DataTypes.TEXT("long"),
        allowNull: true
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

})

module.exports = Url;
