const sequelize = require("../database.connect");
const {DataTypes} = require("sequelize");
CrawlStatus = require("./crawlStatus.model");

const Url = sequelize.define("url", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: false
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

})

CrawlStatus.hasOne(Url);
Url.belongsTo(CrawlStatus);

module.exports = Url;
