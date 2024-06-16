const {Sequelize} = require("sequelize");
const {database} = require("../../configs/index");

const sequelize = new Sequelize(
    database.database,
    database.user,
    database.password,
    {
        host: database.host,
        port: database.port_db,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });
sequelize.sync({force: false}).then(() => {
    console.log("Database & tables created!");
});

module.exports = sequelize;
