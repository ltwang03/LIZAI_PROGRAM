const SuccessResponse = require("../core/success.response");
const OkResponse = require("../core/success.response");
const CrawlService = require("../services/crawl.service");
class CrawlController {
  async crawlUrl(req, res, next) {
    new SuccessResponse({
      status: true,
      message: await CrawlService.crawlUrl(req.body),
    }).send(res);
  }
  async crawlInfoFromUrlInTask(req, res, next) {
    new OkResponse({
      status: true,
      data: await CrawlService.crawlDataFromUrl(req.body),
    }).send(res);
  }
}

module.exports = new CrawlController();
