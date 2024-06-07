require("dotenv").config();

const config = {
  rabbitmq: {
    host: process.env.RABBITMQ_HOST,
  },
  database: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port_db: process.env.MYSQL_PORT,
  },
  elastic: {
    cloud_id: process.env.ELASTIC_CLOUD_ID,
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
};
module.exports = config;
