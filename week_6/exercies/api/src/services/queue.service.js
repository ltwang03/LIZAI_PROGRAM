const Rabbitmq = require("../../../shared/rabbitmq/rabbitmq")
const ProcessRepository = require("../../../shared/database/repositories/process.repository")
const UrlRepository = require("../../../shared/database/repositories/url.repository")
const {NotFoundError} = require("../core/error.response");


class QueueService {
    async startNewTask(body) {
        const queueSites = 'sites'
        const connection = await Rabbitmq.connectRabbitMQ()
        const channel = await Rabbitmq.createQueue(queueSites, connection);
        await Rabbitmq.sendMessageToQueue(queueSites, body, channel);
        return `starting taskId: ${body.taskId}`
    }

    async stopTask(body) {
        const queuesControl = "control_task";
        const queueUrls = "urls";
        const connection = await Rabbitmq.connectRabbitMQ()
        const channel = await connection.createChannel();
        await channel.assertQueue(queuesControl, {durable: true});
        await channel.assertQueue(queueUrls, {durable: true});
        const task = await ProcessRepository.findProcessByTaskId(body.taskId);
        if (!task) {
            throw new NotFoundError("Task not found")
        }
        await channel.prefetch(1)
        const consumerTag = await channel.consume(queueUrls, async (message) => {
            if (message) {
                const data = JSON.parse(message.content.toString());
                if (data.taskId === body.taskId) {
                    await channel.sendToQueue(queuesControl, Buffer.from(JSON.stringify(data)))
                } else {
                    await channel.sendToQueue(queueUrls, Buffer.from(JSON.stringify(data)));
                }
                await channel.ack(message);
            }
        }, {noAck: false});

        // time out and cancel consumer
        await new Promise(resolve => setTimeout(resolve, 10000));
        await channel.cancel(consumerTag.consumerTag);
        await ProcessRepository.updateStatusProcess({taskId: task.taskId, status: false})
        return "Stopping task";
    }

    async restartTask(body) {
        const queuesControl = "control_task";
        const queueUrls = "urls";
        const connection = await Rabbitmq.connectRabbitMQ()
        const channel = await connection.createChannel();
        await channel.assertQueue(queuesControl, {durable: true});
        await channel.assertQueue(queueUrls, {durable: true});
        const task = await ProcessRepository.findProcessByTaskId(body.taskId);
        if (!task) {
            throw new NotFoundError("Task not found")
        }
        if (task.status === true) {
            throw new NotFoundError("Task is running")
        }
        await channel.prefetch(1)
        const consumerTag = await channel.consume(queuesControl, async (message) => {
            if (message) {
                const data = JSON.parse(message.content.toString());
                if (data.taskId === body.taskId) {
                    await channel.sendToQueue(queueUrls, Buffer.from(JSON.stringify(data)))
                } else {
                    await channel.sendToQueue(queuesControl, Buffer.from(JSON.stringify(data)));
                }
                await channel.ack(message);
            }
        }, {noAck: false});
        await new Promise(resolve => setTimeout(resolve, 10000));
        await channel.cancel(consumerTag.consumerTag);
        await ProcessRepository.updateStatusProcess({taskId: body.taskId, status: true})
        return "Restarted task";
    }

    async deleteTask(body) {
        const queuesControl = "control_task";
        const queueUrls = "urls";
        const connection = await Rabbitmq.connectRabbitMQ()
        const channel = await connection.createChannel();
        await channel.assertQueue(queuesControl, {durable: true});
        await channel.assertQueue(queueUrls, {durable: true});
        const task = await ProcessRepository.findProcessByTaskId(body.taskId);
        if (!task) {
            throw new NotFoundError("Task not found")
        }
        if (task.status === true) {
            throw new NotFoundError("Task is running, you can't delete it")
        }
        await channel.prefetch(1)
        const consumerTag = await channel.consume(queuesControl, async (message) => {
            if (message) {
                const data = JSON.parse(message.content.toString());
                if (data.taskId === body.taskId) {
                    await channel.ack(message);
                } else {
                    await channel.sendToQueue(queuesControl, Buffer.from(JSON.stringify(data)));
                    await channel.ack(message)
                }
            }
        }, {noAck: false});
        await new Promise(resolve => setTimeout(resolve, 10000));
        await channel.cancel(consumerTag.consumerTag);
        await ProcessRepository.deleteProcess(body.taskId)
        return "Deleted task";
    }

    async getDataFromTaskId(body) {
        const data = await UrlRepository.getDataFromTaskId(body.taskId, body.page = 1, body.pageSize = 10);
        if (!data) {
            throw new NotFoundError("data not found")
        }
        return data;
    }
}

module.exports = new QueueService()
