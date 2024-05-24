const CrawlService = require("../crawl.service");
const AnalysisService = require("../analysis.service");
const { NotFoundError } = require("../../core/error.response");

class LinkFactory {
  createClass(command) {
    switch (command) {
      case "Crawl":
        return new CrawlService();
      case "Analysis":
        return new AnalysisService();
      default:
        throw new NotFoundError("Command not found");
    }
  }
}

module.exports = new LinkFactory();
