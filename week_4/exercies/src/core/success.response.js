const { StatusCode, ReasonStatusCode } = require("../utils/httpStatus");

class SuccessResponse {
  constructor({ status = true, message = "" }) {
    this.status = status;
    this.message = message;
  }
  send(res) {
    res.status(StatusCode.OK).json(this);
  }
}

class OKResponse {
  constructor({ status = true, data }) {
    this.status = status;
    this.data = data;
  }
  send(res) {
    res.status(StatusCode.OK).json(this);
  }
}

module.exports = SuccessResponse;
module.exports = OKResponse;
