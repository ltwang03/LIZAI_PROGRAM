const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/", require("./routes/index"));

// handle error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  if (err) {
    console.log(err.stack);
    return res.status(statusCode).json({
      status: "error",
      code: statusCode,
      message: err.message || "Internal Server Error",
    });
  }
});

module.exports = app;
