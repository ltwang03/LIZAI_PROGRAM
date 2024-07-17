const sequelize = require("../database.connect");
const {DataTypes} = require("sequelize");

const Site = sequelize.define("Site", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    element_input: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    element_submit: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    element_next: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    element_data: {
        type: DataTypes.JSON,
        allowNull: true,

    },

});
module.exports = Site;
