const Task = require("../task.model");
const Link = require("../link.model");

async function createTask({ url, page, task_id }) {
  return await Task.create({ url, page, task_id });
}
async function createMultipleTasks(tasks) {
  try {
    const createdTasks = await Task.bulkCreate(tasks, {
      validate: true,
      ignoreDuplicates: true,
    });
    return createdTasks;
  } catch (error) {
    console.error("Error creating tasks:", error);
    throw error;
  }
}

async function getUrlByTaskId(task_id, page, page_size, offset) {
  const list = await Task.findAll({
    where: {
      task_id,
    },
    include: [{ model: Link, attributes: ["id", "url", "task_id"] }],
    limit: page_size,
    offset,
  });
  const totalCount = (await Link.count({ where: { task_id } })) / page_size + 1;
  return { list, totalCount };
}

module.exports = {
  getUrlByTaskId,
  createMultipleTasks,
};
