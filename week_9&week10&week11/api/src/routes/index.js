const asyncHandler = require("../helpers/asyncHandler");
const express = require("express");
const router = express.Router();
const crawlController = require("../controllers/crawl.controller");

router.post("/crawls", asyncHandler(crawlController.createNewTask));
router.get("/crawls", asyncHandler(crawlController.getDataFromUrlAndKeyword));

module.exports = router;
