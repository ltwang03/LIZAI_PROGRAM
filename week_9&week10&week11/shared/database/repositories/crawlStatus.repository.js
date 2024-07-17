const CrawlStatus = require("../models/crawlStatus.model");

class CrawlStatusRepository {
    async createCrawlStatus(siteId, keyword) {
        try {
            return await CrawlStatus.create({SiteId: siteId, keyword});
        } catch (e) {
        }
    }

    async getCrawlStatus(siteId, keyword) {
        try {
            return await CrawlStatus.findOne({where: {SiteId: siteId, keyword}});
        } catch (e) {
            throw e;
        }
    }

    async updateCrawlStatus(siteId, keyword, body) {
        try {
            return await CrawlStatus.update(body, {where: {SiteId: siteId, keyword}});
        } catch (e) {
            throw e;
        }
    }

    async updateStatusCrawlStatus(siteId, keyword, status) {
        try {
            return await CrawlStatus.update({status}, {where: {SiteId: siteId, keyword}});
        } catch (e) {
        }
    }
}

module.exports = new CrawlStatusRepository()
