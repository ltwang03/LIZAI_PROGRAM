const app = require("./src/app");

const PORT = 3000;
// create server
const server = app.listen(PORT, () => {
  console.log(`server start with port ${PORT}`);
});
// exit server
process.on("SIGINT", () => {
  server.close(() => {
    console.log("server exited");
  });
});
