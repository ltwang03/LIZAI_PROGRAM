const http = require("http");

// const createServer = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.headers = {
//     "content-type": "text/plain",
//   };
//   res.write("OK OK");
//   res.end();
// });
//
// createServer.listen(3000, "127.0.0.1", () => {
//   console.log("Server is running on port 3000");
// });
// định nghĩa options để thực hiển gửi request
const options = {
  hostname: "www.example.com",
  port: 80,
  path: "/path",
  method: "GET",
};
// gọi request
const req = http.request(options, (res) => {
  res.on("data", (chunk) => {
    process.stdout.write(chunk);
  });
});
req.end();
