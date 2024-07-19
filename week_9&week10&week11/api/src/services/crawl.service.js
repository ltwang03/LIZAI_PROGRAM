const rabbitmq = require("../../../shared/rabbitmq/rabbitmq")
const SitesRepository = require("../../../shared/database/repositories/sites.repository")
const CrawlStatusRepository = require("../../../shared/database/repositories/crawlStatus.repository")
const UrlRepository = require("../../../shared/database/repositories/url.repository")

class CrawlService {
    async createNewTask(body) {
        const queueSites = "sites"
        const {message, channel} = await initRabbitmq(queueSites, body)
        await rabbitmq.sendMessageToQueue(queueSites, message, channel)
    }

    async getDataFromUrlAndKeyword(body) {
        const getSite = await SitesRepository.getSites(body.url)
        const getCrawlStatus = await CrawlStatusRepository.getCrawlStatus(getSite.id, body.keyword)
        const result = await UrlRepository.getDataFromCrawlStatusId(getCrawlStatus.id, body.page, body.pageSize);
        return result
    }
}

const initRabbitmq = async (queue, message) => {
    const connection = await rabbitmq.connectRabbitMQ()
    const channel = await rabbitmq.createQueue(queue, connection)
    return {message, channel}
}

module.exports = new CrawlService()
