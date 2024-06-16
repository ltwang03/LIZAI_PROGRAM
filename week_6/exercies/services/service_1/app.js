const fs = require("fs")
const Rabbitmq = require("../../shared/rabbitmq/rabbitmq")


const runService1 = async () => {
    try {
        const queueSite = "sites"
        const connection = await Rabbitmq.connectRabbitMQ();
        const channel =  await Rabbitmq.createQueue(queueSite, connection);
        const data = await readFileMessage();
        data.map(async(item) => {
            await Rabbitmq.sendMessageToQueue(queueSite, item, channel)
        });
        setTimeout(() => {
            connection.close()
            process.exit()
        },1000)
    }catch (e) {
    throw e
    }
}

const readFileMessage = async () => {
    const path = __dirname + "/data.json";
    const data = fs.readFileSync(path, "utf8");
    return JSON.parse(data);
}

runService1();
