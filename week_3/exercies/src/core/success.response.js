const { StatusCode } = require("../utils/httpStatus");

class SuccessResponse {
  constructor({ status = true, data = {} }) {
    this.status = status;
    this.data = data;
  }
  send(res) {
    res.status(StatusCode.OK).json(this);
  }
}

module.exports = SuccessResponse;
