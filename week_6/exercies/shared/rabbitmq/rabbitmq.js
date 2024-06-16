const amqp = require('amqplib')
const {rabbitmq} = require("../../configs/index")
const {Readable} = require("stream");


class Rabbitmq {

    async connectRabbitMQ() {
        if (!this.connection) {
            try {
                console.log(rabbitmq.host)
                this.connection = await amqp.connect(rabbitmq.host)
                console.log("Connected to RabbitMQ")
            } catch (e) {
                console.error("Error connecting to RabbitMQ:" + e);
                throw e;
            }
        }
        return this.connection
    }

    async createQueue(queueName, connection) {
        try {
            const channel = await connection.createChannel()
            await channel.assertQueue(queueName)
            return channel
        } catch (e) {
            throw e
        }
    }

    async sendMessageToQueue(queueName, message, channel) {
        try {
            await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
            console.log("Send Message Success")
            return true
        } catch (e) {
            throw e
        }
    }

    async consumeMessage(queueName, channel) {
        channel.prefetch(1);
        const stream = new Readable({
            objectMode: true,
            read() {
            },
        });

        const consumer = await channel.consume(
            queueName,
            (message) => {
                if (message !== null) {
                    stream.push(message);
                }
            },
            {noAck: false}
        );
        return {messageStream: stream, consumer};
    }

    async ackMessage(channel, message) {
        channel.ack(message);
    }

    async deleteQueue(queueName, channel) {
        await channel.deleteQueue(queueName)
    }

    async nackMessage(channel, message, requeue = false) {
        channel.nack(message, false, requeue);
    }

}

module.exports = new Rabbitmq()
