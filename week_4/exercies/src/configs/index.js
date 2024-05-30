require("dotenv").config();

const config = {
  database: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  api: {
    port: process.env.APP_PORT,
  },
};

module.exports = config;
