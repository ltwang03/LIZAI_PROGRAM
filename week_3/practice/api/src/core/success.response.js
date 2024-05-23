const { StatusCode, ReasonStatusCode } = require("../utils/httpStatus");

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }
  send(res, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

module.exports = SuccessResponse;
