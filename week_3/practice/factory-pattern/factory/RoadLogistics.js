const Logistics = require("./Logistics");
const Truck = require("../Truck");

module.exports = class RoadLogistics extends Logistics {
  createTransport(string) {
    switch (string) {
      case "Truck":
        return new Truck();
      default:
        return new Error("Not match Transport");
    }
  }
};
