const app = require("./src/app");
const {app: {port}} = require("../configs/index")
// create server
const server = app.listen(port || 3000, () => {
    console.log(`server start with port ${port}`);
});
// exit server
process.on("SIGINT", () => {
    server.close(() => {
        console.log("server exited");
    });
});
