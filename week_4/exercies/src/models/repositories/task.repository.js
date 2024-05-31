const Task = require("../task.model");

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

module.exports = {
  createTask,
  createMultipleTasks,
};
