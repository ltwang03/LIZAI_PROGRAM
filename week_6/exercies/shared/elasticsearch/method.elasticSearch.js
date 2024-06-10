const elasticClient = require("./elasticSearch");

const createIndex = async (index, mappings) => {
    try {
        if(await elasticClient.indices.exists({index})) {
            console.log(`Index: ${index} already exists`)
        }
        else {
            await elasticClient.indices.create({index: index, mappings: mappings})
            console.log("Index created")
        }
    } catch (e) {
        throw e
    }

}
const postDocumentToIndex = async (index, data) => {
    try {
        await elasticClient.index({index: index, body: data})
    } catch (e) {
        throw e
    }
}
async function CheckDataIsExistFromElasticSearch(index,url) {
    try {
        const result = await elasticClient.search({
            index: index,
            body: {
                query: {
                    term: {
                        url: url,
                    },
                },
            },
        });
        return result.hits.total.value === 0;
    } catch (e) {
        throw e;
    }
}


module.exports = {
    createIndex,
    postDocumentToIndex,
    CheckDataIsExistFromElasticSearch
}
