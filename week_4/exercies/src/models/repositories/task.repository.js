const Task = require("../task.model");

async function createTask({ url, page, task_id }) {
  return await Task.create({ url, page, task_id });
}
async function createMultipleTasks(tasks) {
  return await Task.bulkCreate(tasks);
}

module.exports = {
  createTask,
};
