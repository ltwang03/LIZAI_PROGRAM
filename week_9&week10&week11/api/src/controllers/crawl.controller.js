const {SuccessResponse, OKResponse} = require("../core/success.response");
const CrawlService = require("../services/crawl.service");

class CrawlController {
    async createNewTask(req, res) {
        new SuccessResponse({status: true, message: await CrawlService.createNewTask(req.body)}).send(res);
    }

    async getDataFromUrlAndKeyword(req, res) {
        new OKResponse({status: true, data: await CrawlService.getDataFromUrlAndKeyword(req.body)}).send(res);
    }
}

module.exports = new CrawlController()
