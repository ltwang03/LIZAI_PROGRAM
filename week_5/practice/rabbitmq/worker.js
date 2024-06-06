const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost:5672", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    const queue = "task_queue";
    channel.consume(
      queue,
      (msg) => {
        const secs = msg.content.toString().split(".").length - 1;
        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function () {
          console.log(" [x] Done");
        }, secs * 1000);
      },
      { noAck: false }
    );
  });
});
