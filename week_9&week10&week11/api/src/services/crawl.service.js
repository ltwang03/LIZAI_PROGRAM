const rabbitmq = require("../../../shared/rabbitmq/rabbitmq")

class CrawlService {
    async createNewTask(body) {
        const queueSites = "sites"
        const {message, channel} = await initRabbitmq(queueSites, body)
        await rabbitmq.sendMessageToQueue(queueSites, message, channel)
    }
}

const initRabbitmq = async (queue, message) => {
    const connection = await rabbitmq.connectRabbitMQ()
    const channel = await rabbitmq.createQueue(queue, connection)
    return {message, channel}
}

module.exports = new CrawlService()
