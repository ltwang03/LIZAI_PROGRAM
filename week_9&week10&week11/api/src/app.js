const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

const Rabbitmq = require("../../shared/rabbitmq/rabbitmq")
const Sequelize = require("../../shared/database/database.connect")

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/", require("./routes/index"));

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    console.log(err.stack);
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
