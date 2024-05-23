const express = require("express");

const router = express.Router();

const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};
router.use(requestTime);

// tạo 1 route với http method là get
// router.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//tạo 1 route với http method là post trên root route
router.post("/", (req, res) => {
  res.render("index", { title: "Baden", message: "Hello LIZAI" });
  // throw new Error("BROKEN"); // Express will catch this on its own.
});
// tạo 1 route với http method là put trên route /user
router.put("/user", (req, res) => {
  res.send("Got a Put request at route /user");
});
// tạo 1 route với http method là delete trên route /user
router.delete("/user", (req, res) => {
  res.send("Got a Delete request at route /user");
});

router.all("/error", (req, res, next) => {
  console.log(`Error:::`);
  res.send("Route not found");
  next();
});

// route path
// path này sẽ trùng với root route
router.get("/", (req, res) => {
  res.send("root");
});
// path này sẽ khớp với yêu cầu route /about
router.get("/about", (req, res) => {
  res.send("about");
});

//path này sẽ khớp với yêu cầu route /random.text
router.get("/random.text", (req, res) => {
  res.send("random.text");
});
//  với ? thì b sẽ là tùy chọn
router.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});
// với + thì b sẽ được cộng lên ví dụ như abbbbcd
router.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});
// với * thì ab và cd sẽ được giữ nguyên và * thì sẽ được gán vào chuỗi bất kỳ ví dụ như abRANDOMcd, ab1234cd
router.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});
// với (cd)? thì chuỗi cd là 1 tùy chọn có thể có hoặc không và sẽ nhận vào các path abe hoặc abcde
router.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e");
});

// ngoài ra có thể sử dụng regex để làm path như ví dụ dưới thì nhận tất cả các path có ký tự a ở đầu
// router.get(/a/, (req, res) => {
//   res.send("/a/");
// });
// sử dụng params
router.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});
// ngoài ra có thể dùng - để phân biệt giữa các params
router.get("/flights/:LAX-:SFO", (req, res) => {
  res.send(req.params);
});
// chỉ nhận vào là số
router.get("/users/:userId(\\d+)", (req, res) => {
  res.send(req.params);
});

// Router handler
// single callback function mọi logic xử lý route sẽ nằm trong hàm callback này
router.get("/example/single", function (req, res) {
  res.send("Hello from A!");
});
// multiple callback function xử dụng nhiều hàm để xử lý các hàm sẽ gọi lần lượt mỗi hàm cần phải gọi next để chuyển sang hàm tiếp theo
router.get(
  "/example/multiple",
  function (req, res, next) {
    console.log("First callback function");
    next();
  },
  function (req, res) {
    res.send("Hello, this is the second callback function!");
  }
);

//Array of Callback Functions có thể sử dụng một mảng các hàm để xử lý một tuyến. Cách này tương tự như việc sử dụng nhiều hàm:
const handler1 = function (req, res, next) {
  console.log("First callback function in array");
  next();
};

const handler2 = function (req, res, next) {
  // res.send("Hello, this is the second callback function in array!");
  console.log("Hello, this is the second callback function in array!");
  next();
};

router.get("/example/array", [handler1, handler2]);

//Combination of Single and Array Callback Functions có thể kết hợp cả 2 loại với nhau
const handler3 = function (req, res) {
  res.send("Hello, this is the third callback function in combination!");
};

router.get("/example/combination", [handler1, handler2], handler3);

router.get(
  "/example/route",
  function (req, res, next) {
    console.log("Checking pre-conditions");
    next("route");
  },
  function (req, res) {
    res.send("This will not be reached if someCondition is true");
  }
);

router.get("/example/route", function (req, res) {
  res.send("This will be reached if someCondition is true");
});
// xử lý theo dạng chuỗi
router
  .route("/book")
  .get((req, res) => {
    res.send("Get a random book");
  })
  .post((req, res) => {
    res.send("Add a book");
  })
  .put((req, res) => {
    res.send("Update the book");
  });

module.exports = router;
