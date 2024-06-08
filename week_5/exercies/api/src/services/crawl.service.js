const { NotFoundError } = require("../core/error.response");

const {
  getDataFromTaskId,
} = require("../../../shared/models/repositories/url.repository");

class CrawlService {
  async getData(body) {
    const { taskId, page = 1, pageSize = 10 } = body;
    if (!taskId) {
      throw new NotFoundError("Task id is required");
    }

    const data = await getDataFromTaskId(taskId, page, pageSize);
    console.log(data);
    return data;
  }
}

module.exports = new CrawlService();
