const express = require("express");
const asyncHandler = require("../helpers/asyncHandler");
const CrawlController = require("../controllers/crawl.controller");
const router = express.Router();

router.post("/crawls", asyncHandler(CrawlController.getDataFromLink));
router.post("/analysis", asyncHandler(CrawlController.analysisLink));

module.exports = router;
