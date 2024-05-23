const express = require("express");

const app = express();
// ghi đè phương thức sendStatus
app.prototype.sendStatus = function (statusCode, type, message) {
  return this.contentType(type).status(statusCode).send(message);
};
// ghi đè properties ip get IP từ headers
Object.defineProperty(app.request, "ip", {
  configurable: true,
  enumerable: true,
  get() {
    return this.get("Client-IP");
  },
});

// Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
// thay đổi protype request và response thành FakeResponse và FakeRequest
Object.setPrototypeOf(
  Object.getPrototypeOf(app.request),
  FakeRequest.prototype
);
Object.setPrototypeOf(
  Object.getPrototypeOf(app.response),
  FakeResponse.prototype
);
