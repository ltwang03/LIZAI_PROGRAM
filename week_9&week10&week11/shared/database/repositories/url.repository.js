const Url = require("../models/url.model");

class UrlRepository {
    async createUrl({url, keyword, title, description, text, html, CrawlStatusId}) {
        try {
            return await Url.create({url, keyword, title, description, text, html, CrawlStatusId})
        } catch (e) {
            throw e
        }
    }

    async getDataFromCrawlStatusId(crawlStatusId, page, pageSize) {
        const offset = (page - 1) * pageSize;
        const list = await Url.findAll({
            where: {
                CrawlStatusId: crawlStatusId,
            },
            limit: pageSize,
            offset,
        });
        const totalCount = await Url.count({where: {CrawlStatusId: crawlStatusId,}});
        return {list, totalPage: Math.ceil(totalCount / pageSize - 1), totalCount};
    };
}

module.exports = new UrlRepository();
