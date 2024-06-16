const Rabbitmq = require("../../shared/rabbitmq/rabbitmq")
const SiteFactory = require("../../shared/factory/site.factory")
const url = require("url")

const runService2 = async () => {
    const queueSite = "sites"
    const queueUrls = "urls"
    const connection = await Rabbitmq.connectRabbitMQ();
    const channel = await Rabbitmq.createQueue(queueSite, connection);
    const channel2 = await Rabbitmq.createQueue(queueUrls, connection);
    const {messageStream} = await Rabbitmq.consumeMessage(queueSite, channel);
    await messageStream.on("data", async (message) => {
        const data = JSON.parse(message.content.toString());
        const siteCommand = url.parse(data.url).hostname.toString().split(".")[1];
        const results = await SiteFactory.createClass(siteCommand, data);
        results.map(async (item) => {
            await Rabbitmq.sendMessageToQueue(queueUrls, {...item, level: 1}, channel2)
        })
        await Rabbitmq.ackMessage(channel, message)
    })
}

runService2()
