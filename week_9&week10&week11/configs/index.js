require("dotenv").config();

module.exports = {
    app: {
        port: process.env.APP_PORT || 3000,
    },
    database: {
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        host: process.env.MYSQL_HOST,
        port_db: process.env.MYSQL_PORT,
    },
    rabbitmq: {
        host: process.env.RABBITMQ_HOST
    }

}
