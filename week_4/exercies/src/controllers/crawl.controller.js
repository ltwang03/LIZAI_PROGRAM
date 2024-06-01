const { SuccessResponse, OKResponse } = require("../core/success.response");
const CrawlService = require("../services/crawl.service");
class CrawlController {
  async crawlUrl(req, res) {
    new SuccessResponse({
      status: true,
      message: await CrawlService.crawlUrl(req.body),
    }).send(res);
  }
  async crawlInfoFromUrlInTask(req, res) {
    new OKResponse({
      status: true,
      data: await CrawlService.crawlDataFromUrl(req.body),
    }).send(res);
  }
}

module.exports = new CrawlController();
