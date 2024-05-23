const Transport = require("./Transport");

module.exports = class Truck extends Transport {
  deliver() {
    super.deliver();
    console.log("Đang vận chuyển bằng xe tải!!!");
  }
};
