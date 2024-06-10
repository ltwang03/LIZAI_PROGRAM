const fs = require("fs")
const Rabbitmq = require("../../shared/rabbitmq/rabbitmq")
const {createIndex, postDocumentToIndex, CheckDataIsExistFromElasticSearch} = require("../../shared/elasticsearch/method.elasticSearch")


const index = "process-crawl"
const mappings = {properties: {
        "taskId": {type: "keyword"},
        "url": {type: "keyword"},
        "page": {type: "integer"}
    }}

const runService1 = async () => {
    try {
        await createIndex(index, mappings)
        const queueSite = "sites"
        const connection = await Rabbitmq.connectRabbitMQ();
        const channel =  await Rabbitmq.createQueue(queueSite, connection);
        const data = await readFileMessage();
        data.map(async(item) => {
            await Rabbitmq.sendMessageToQueue(queueSite, item, channel)
             const checkExist = await CheckDataIsExistFromElasticSearch(index, item.url)
            if (checkExist) {
                await postDocumentToIndex(index, {...item, page: 1})
            }
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
