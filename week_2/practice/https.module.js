const https = require("https");
const fs = require("fs");

// const options = {
//   keys: fs.readFileSync("rootCA.key"),
//   cert: fs.readFileSync("rootCA.pem"),
// };
//
// https
//   .createServer(options, (req, res) => {
//     res.writeHead(200);
//     res.write("OK OK HTTPS");
//     res.end("HELLO");
//   })
//   .listen(3001, "127.0.0.1", () => {
//     console.log("server https is running on port 3001");
//   });

// định nghĩa options để thực hiện gửi request
const options = {
  hostname: "www.huflit.edu.vn",
  port: 443,
  method: "GET",
};
// gọi request
const req = https.request(options, (res) => {
  res.on("data", (chunk) => {
    process.stdout.write(chunk);
  });
});
req.end();
