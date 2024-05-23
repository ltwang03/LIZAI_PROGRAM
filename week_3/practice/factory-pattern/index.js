const RoadLogistics = require("./factory/RoadLogistics");
const SeaLogistics = require("./factory/SeaLogistics");

const roadLogistics = new RoadLogistics();
const truck = roadLogistics.createTransport("Truck");
truck.deliver();

const seaLogistics = new SeaLogistics();
const ship = seaLogistics.createTransport("Ship");
ship.deliver();
