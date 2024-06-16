const {SuccessResponse, OKResponse} = require("../core/success.response");
const QueueService = require("../services/queue.service");

class QueueController {
    async startNewTask(req, res) {
        new SuccessResponse({status: true, message: await QueueService.startNewTask(req.body)}).send(res);
    }

    async stopTask(req, res) {
        new SuccessResponse({status: true, message: await QueueService.stopTask(req.body)}).send(res);
    }

    async restartTask(req, res) {
        new SuccessResponse({status: true, message: await QueueService.restartTask(req.body)}).send(res);
    }

    async deleteTask(req, res) {
        new SuccessResponse({status: true, message: await QueueService.deleteTask(req.body)}).send(res);
    }

    async getDataFromTaskId(req, res) {
        new OKResponse({status: true, data: await QueueService.getDataFromTaskId(req.body)}).send(res);
    }

}

module.exports = new QueueController();
