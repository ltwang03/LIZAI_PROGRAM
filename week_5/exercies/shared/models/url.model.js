const sequelize = require("../database.connection");
const { DataTypes } = require("sequelize");

const Url = sequelize.define("url", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  taskId: {
    type: DataTypes.INTEGER,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  text: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  html: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
module.exports = Url;
