const Url = require("../url.model");

const createLink = async (data) => {
  try {
    return await Url.create(data);
  } catch (e) {
    throw e;
  }
};
const getDataFromTaskId = async (taskId, page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const list = await Url.findAll({
    where: {
      taskId,
    },
    limit: pageSize,
    offset,
  });
  const totalCount = await Url.count({ where: { taskId } });
  return { list, totalCount: Math.ceil(totalCount / pageSize - 1) };
};

module.exports = {
  createLink,
  getDataFromTaskId,
};
