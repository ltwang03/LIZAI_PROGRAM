const asyncHandler = require("../helpers/asyncHandler");
const express = require("express");
const CrawlController = require("../controllers/crawl.controller");
const router = express.Router();

router.post("/crawls/url", asyncHandler(CrawlController.crawlUrl));
router.post(
  "/crawls/analytics",
  asyncHandler(CrawlController.crawlInfoFromUrlInTask)
);
module.exports = router;
