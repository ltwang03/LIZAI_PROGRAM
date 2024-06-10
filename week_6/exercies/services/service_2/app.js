const Rabbitmq = require("../../shared/rabbitmq/rabbitmq")
const SiteFactory = require("../../shared/factory/site.factory")
const url = require("url")

const runService2 = async () => {
    const queueSite = "sites"
    const connection = await Rabbitmq.connectRabbitMQ();
    const channel =  await Rabbitmq.createQueue(queueSite, connection);
    const messageStream = await  Rabbitmq.consumeMessage(queueSite, channel);
    await messageStream.on("data", async (message) => {
        const data = JSON.parse(message.content.toString());
        const siteName = url.parse(data.url).hostname.toString().split(".")[1];
        await SiteFactory.createClass(siteName, data);
        await Rabbitmq.ackMessage(channel, message)
    })
}

runService2()
