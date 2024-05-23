const express = require("express");

const app = express();
// middleware tầng app
app.use((req, res, next) => {
  console.log("Application-level middleware");
  next();
});

//middleware tầng route
app.use((req, res, next) => {
  console.log("Router-level middleware");
  next();
});

// middleware để handle error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
// middleware để handle error
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  console.log(err.stack);
  return res.status(statusCode).json({
    status: "Error",
    code: statusCode,
    message: err.message || " Internal Server Error",
  });
});
