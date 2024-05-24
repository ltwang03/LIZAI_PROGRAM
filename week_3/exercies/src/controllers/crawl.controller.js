const SuccessResponse = require("../core/success.response");
const LinkFactory = require("../services/factory/link.factory");

class CrawlController {
  async getDataFromLink(req, res, next) {
    new SuccessResponse({
      data: await LinkFactory.createClass("Crawl").crawlDataFromLink(
        req.body.url
      ),
    }).send(res);
  }
  async analysisLink(req, res, next) {
    new SuccessResponse({
      data: await LinkFactory.createClass("Analysis").AnalysisUrl(req.body.url),
    }).send(res);
  }
}

module.exports = new CrawlController();
