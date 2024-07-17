const sequelize = require("../database.connect");
const {DataTypes} = require("sequelize");
const Site = require("./sites.model");

const CrawlStatus = sequelize.define("CrawlStatus", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    page: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

// Define association (relationship)
Site.hasOne(CrawlStatus);
CrawlStatus.belongsTo(Site);

module.exports = CrawlStatus;
