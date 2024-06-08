const SuccessResponse = require("../core/success.response");
const crawlService = require("../services/crawl.service");

class CrawlController {
  async crawlData(req, res) {
    new SuccessResponse({
      data: await crawlService.getData(req.body),
    }).send(res);
  }
}

module.exports = new CrawlController();
