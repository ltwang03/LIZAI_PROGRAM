const asyncHandler = require("../helpers/asyncHandler");
const express = require("express");
const CrawlController = require("../controllers/crawl.controller");
const router = express.Router();

router.post("/crawls", asyncHandler(CrawlController.crawlUrl));
module.exports = router;
