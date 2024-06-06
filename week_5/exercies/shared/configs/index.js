require("dotenv").config();

const config = {
  rabbitmq: {
    host: process.env.RABBITMQ_HOST,
  },
};
module.exports = config;
