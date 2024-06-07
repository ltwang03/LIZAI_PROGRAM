const amqp = require("amqplib");
const { rabbitmq } = require("../shared/configs");
const { Readable } = require("stream");

class RabbitMQ {
  constructor() {
    this.connection = null;
  }
  async connectRabbitMQ() {
    if (!this.connection) {
      try {
        this.connection = await amqp.connect(rabbitmq.host);
        console.log("Connected to RabbitMQ");
      } catch (e) {
        console.error("Error connecting to RabbitMQ:" + e);
        throw e;
      }
    }
    return this.connection;
  }
  async createQueue(queueName, connection) {
    try {
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName);
      return channel;
    } catch (e) {
      throw e;
    }
  }
  async sendMessageToQueue(queueName, message, channel) {
    try {
      await channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(message))
      );
      console.log("Send Message Success");
      return true;
    } catch (e) {
      throw e;
    }
  }
  async consumeMessage(queueName, channel) {
    channel.prefetch(1);
    const stream = new Readable({
      objectMode: true, // Cho phép truyền các đối tượng qua stream
      read() {}, // Hàm rỗng vì chúng ta sẽ đẩy dữ liệu thủ công
    });

    channel.consume(
      queueName,
      (message) => {
        if (message !== null) {
          stream.push(message);
        }
      },
      { noAck: false }
    );

    return stream;
  }
  async ackMessage(channel, message) {
    channel.ack(message);
  }
}

module.exports = new RabbitMQ();
