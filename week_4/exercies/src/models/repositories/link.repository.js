const Link = require("../link.model");

async function createMultipleLinks(links) {
  try {
    const createdLinks = await Link.bulkCreate(links, {
      validate: true,
      ignoreDuplicates: true,
    });
    return createdLinks;
  } catch (error) {
    console.error("Error creating links:", error);
    throw error;
  }
}
async function updateLink(id, data) {
  try {
    const updatedLink = await Link.update(data, {
      where: { id },
    });
    return updatedLink;
  } catch (error) {
    console.error("Error updating link:", error);
    throw error;
  }
}
async function getLinkByTaskId(task_id, page, page_size, offset) {
  const list = await Link.findAll({
    where: {
      task_id,
    },
    limit: page_size,
    offset,
  });
  const totalCount = await Link.count({ where: { task_id } });
  return { list, totalCount: Math.ceil(totalCount / page_size - 1) };
}

module.exports = { createMultipleLinks, updateLink, getLinkByTaskId };
