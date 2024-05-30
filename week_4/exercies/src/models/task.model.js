const sequelize = require("../dbs/connection.mysql");
const { DataTypes } = require("sequelize");
const Link = require("./link.model");
const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  page: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

const Task_Link = sequelize.define("Task_Link", {
  selfGranted: DataTypes.BOOLEAN,
});
Task.belongsToMany(Link, { through: "Task_Link" });
Link.belongsToMany(Task, { through: "Task_Link" });

module.exports = Task;
