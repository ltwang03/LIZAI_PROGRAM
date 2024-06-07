const elasticClient = require("./init.elasticSearch");
const indexName = "crawl-index";
async function postDataToElasticSearch(data) {
  try {
    await elasticClient.index({ index: indexName, body: data });
  } catch (e) {
    throw e;
  }
}

async function searchDataFromElasticSearch(url) {
  try {
    const result = await elasticClient.search({
      index: indexName,
      body: {
        query: {
          term: {
            url: url,
          },
        },
      },
    });
    return result.hits.total.value !== 0;
  } catch (e) {
    throw e;
  }
}

module.exports = { postDataToElasticSearch, searchDataFromElasticSearch };
