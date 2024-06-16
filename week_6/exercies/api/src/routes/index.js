const asyncHandler = require("../helpers/asyncHandler");
const express = require("express");
const router = express.Router();
const QueueController = require("../controllers/queue.controller");

router.post("/start", asyncHandler(QueueController.startNewTask));
router.post("/stop", asyncHandler(QueueController.stopTask));
router.post("/restart", asyncHandler(QueueController.restartTask));
router.post("/delete", asyncHandler(QueueController.deleteTask));
router.post("/data", asyncHandler(QueueController.getDataFromTaskId));
module.exports = router;
