const Url = require("../url.model");

const createLink = async (data) => {
  try {
    return await Url.create(data);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createLink,
};
