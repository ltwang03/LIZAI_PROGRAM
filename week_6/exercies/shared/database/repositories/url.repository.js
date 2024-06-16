const Url = require("../models/url.model");

class UrlRepository {
    async createUrl({taskId, url, title, description, text, html, level}) {
        try {
            return await Url.create({taskId, url, title, description, text, html, level})
        } catch (e) {
            throw e
        }
    }

    async getDataFromTaskId(taskId, page, pageSize) {
        const offset = (page - 1) * pageSize;
        const list = await Url.findAll({
            where: {
                taskId,
            },
            limit: pageSize,
            offset,
        });
        const totalCount = await Url.count({where: {taskId}});
        return {list, totalPage: Math.ceil(totalCount / pageSize - 1), totalCount};
    };
}

module.exports = new UrlRepository();
