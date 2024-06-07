require("../shared/database.connection");
const RabbitMQ = require("../shared/RabbitMQ");
const {
  postDataToElasticSearch,
} = require("../shared/elasticsearch/elasticSearch");
const { createLink } = require("../shared/models/repositories/url.repository");

const runService4 = async () => {
  const queueData = "data";
  const connection = await RabbitMQ.connectRabbitMQ();
  const channel = await RabbitMQ.createQueue(queueData, connection);
  const messagesStream = await RabbitMQ.consumeMessage(queueData, channel);
  await messagesStream.on("data", async (message) => {
    const data = JSON.parse(message.content.toString());
    await saveDataToDatabase(data);
    await postDataToElasticSearch(data);
    await RabbitMQ.ackMessage(channel, message);
  });
};

const saveDataToDatabase = async (data) => {
  try {
    return await createLink({ ...data, date: new Date() });
  } catch (e) {
    throw e;
  }
};
runService4();
