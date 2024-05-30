const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

// use third patty middleware
app.use(morgan("dev")); // ghi logs
app.use(bodyParser.json()); // parse body

// init db
require("./dbs/connection.mysql");

// init route
app.use("/", require("./routes/index"));

// handle error
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
