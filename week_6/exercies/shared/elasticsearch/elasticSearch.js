const { Client } = require("@elastic/elasticsearch");
const { elastic } = require("../../configs/index");

const elasticClient = new Client({
    cloud: {
        id: elastic.cloud_id,
    },
    auth: {
        username: elastic.username,
        password: elastic.password,
    },
});
elasticClient.info().then(console.log).catch(console.error);

module.exports = elasticClient;
