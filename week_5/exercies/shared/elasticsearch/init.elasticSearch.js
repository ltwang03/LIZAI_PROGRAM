const { Client } = require("@elastic/elasticsearch");
const { elastic } = require("../configs");

const elasticClient = new Client({
  cloud: {
    id: elastic.cloud_id,
  },
  auth: {
    username: elastic.username,
    password: elastic.password,
  },
});
// async function recreateIndex() {
//   const indexName = "crawl-index";
//   try {
//     const exists = await elasticClient.indices.exists({ index: indexName });
//     if (exists) {
//       await elasticClient.indices.delete({ index: indexName });
//       console.log("Deleting index");
//     }
//     await elasticClient.indices.create({ index: indexName });
//     console.log("Create index success");
//     await elasticClient.indices.refresh({ index: indexName });
//   } catch (error) {
//     console.error(`Error recreating index '${indexName}':`, error);
//   }
// }
// recreateIndex();
elasticClient.info().then(console.log).catch(console.error);
module.exports = elasticClient;
