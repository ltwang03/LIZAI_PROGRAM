const Logistics = require("./Logistics");
const Ship = require("../Ship");

module.exports = class SeaLogistics extends Logistics {
  createTransport(string) {
    switch (string) {
      case "Ship":
        return new Ship();
      default:
        return new Error("Not match Transport");
    }
  }
};
