const express = require("express");
const app = express();
const router = express.Router();
const fs = require("fs");
// handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

router.get("/", (req, res) => {
  res.send("Thanh Quang");
});

router.get("/", (req, res, next) => {
  fs.readFile("/file-does-not-exist", (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

router.get("/test", [
  function (req, res, next) {
    fs.writeFile("/inaccessible-path", "data", next);
  },
  function (req, res) {
    res.send("OK");
  },
]);

router.get("/test2", (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error("BROKEN");
    } catch (err) {
      next(err);
    }
  }, 100);
});

router.get("/test3", (req, res, next) => {
  Promise.resolve()
    .then(() => {
      throw new Error("BROKEN");
    })
    .catch(next); // Errors will be passed to Express.
});
router.get("/test4", [
  function (req, res, next) {
    fs.readFile("/maybe-valid-file", "utf-8", (err, data) => {
      res.locals.data = data;
      next(err);
    });
  },
  function (req, res) {
    res.locals.data = res.locals.data.split(",")[1];
    res.send(res.locals.data);
  },
]);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const bodyParser = require("body-parser");
const methodOverride = require("method-override");
// function errorHandler(err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
// //   }
//   res.status(500);
//   res.render("error", { error: err });
// }
// hàm log ra lỗi
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
// hàm xử lý lỗi
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
}
// triển khai hàm errorHandler và catch tất cả lỗi như sau:
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
}
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

module.exports = router;
