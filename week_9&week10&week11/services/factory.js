const {autoSearch} = require("./autoSearch.service")
const rabbitmq = require("../shared/rabbitmq/rabbitmq")
const googleSearch = require("./sites/google.site")

class FactorySearch {
    async SearchFactory() {
        const queueSites = "sites"
        const connection = await rabbitmq.connectRabbitMQ()
        const channel = await rabbitmq.createQueue(queueSites, connection)
        const {messageStream, consumer} = await rabbitmq.consumeMessage(queueSites, channel)
        messageStream.on("data", async (message) => {
            const {url, keyword} = JSON.parse(message.content.toString())
            switch (url) {
                case "https://google.com/":
                    await googleSearch(keyword)
                    return await rabbitmq.ackMessage(channel, message)
                default:
                    await autoSearch(url, keyword)
                    return await rabbitmq.ackMessage(channel, message)
            }

        })

    }
}

module.exports = new FactorySearch().SearchFactory()
