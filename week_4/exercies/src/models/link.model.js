const { DataTypes } = require("sequelize");
const sequelize = require("../dbs/connection.mysql");
const Task = require("./task.model");
const Link = sequelize.define("Link", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  task_id: {
    type: DataTypes.INTEGER,
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
  childUrls: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = Link;
