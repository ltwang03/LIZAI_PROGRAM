const fs = require("fs");
require("dotenv").config();
process.chdir("..");
const RabbitMQ = require("../shared/RabbitMQ");

const runService = async () => {
  try {
    const queueName = "sites";

    const connection = await RabbitMQ.connectRabbitMQ();
    const channel = await RabbitMQ.createQueue(queueName, connection);
    const data = readFileData();
    data.map((item) => {
      console.log(item);
      RabbitMQ.sendMessageToQueue(queueName, JSON.stringify(item), channel);
    });
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 1000);
  } catch (e) {
    throw e;
  }
};
runService();

const readFileData = () => {
  console.log(__dirname);
  const path = __dirname + "/data.json";
  const data = fs.readFileSync(path, "utf8");
  return JSON.parse(data);
};
