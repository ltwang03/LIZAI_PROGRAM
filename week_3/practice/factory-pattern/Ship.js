const Transport = require("./Transport");

module.exports = class Ship extends Transport {
  deliver() {
    super.deliver();
    console.log("Đang vân chuyển bằng tàu thủy!!");
  }
};
