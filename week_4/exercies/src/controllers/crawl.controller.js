const SuccessResponse = require("../core/success.response");
const CrawlService = require("../services/crawl.service");
class CrawlController {
  async crawlUrl(req, res, next) {
    new SuccessResponse({
      data: await CrawlService.crawlUrl(req.body),
    }).send(res);
  }
}

module.exports = new CrawlController();
