const Process = require("../models/process.model");

class ProcessRepository {
    async createProcess({taskId, page, totalLength}) {
        try {
            return await Process.create({taskId, page, totalLength})
        } catch (e) {
            throw e
        }
    }

    async findProcessByTaskId(taskId) {
        try {
            return await Process.findOne({where: {taskId}})
        } catch (e) {
            throw e
        }
    }

    async updateProcess({taskId, page, totalLength, status}) {
        try {
            return await Process.update({page, totalLength, status}, {where: {taskId}})
        } catch (e) {
            throw e
        }
    }

    async updateStatusProcess({taskId, status}) {
        try {
            return await Process.update({status}, {where: {taskId}})
        } catch (e) {
            throw e
        }
    }

    async deleteProcess(taskId) {
        try {
            return await Process.destroy({where: {taskId}})
        } catch (e) {
            throw e
        }
    }
}

module.exports = new ProcessRepository();
