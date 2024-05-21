const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const mw = require("./my.middleware");

app.use(mw({ option: 1, option2: 2 }));
app.use(morgan("dev"));
app.use(cors());

// set template engine
app.set("views", "./views");
app.set("view engine", "pug");
//
app.use("/", require("./example.errors"));
app.use(express.static("public")); // Để phục vụ các tệp tĩnh
app.use(express.json()); // Để phân tích cú pháp các yêu cầu JSON
app.use(express.urlencoded({ extended: true })); // Để phân tích cú pháp các yêu cầu URL-encoded

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log(`Server is exited`);
  });
});
