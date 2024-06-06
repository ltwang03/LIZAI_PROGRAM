const amqp = require("amqplib");

async function emitLog() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const exchange = "logs";
    const msg = process.argv.slice(2).join(" ") || "Hello World!";
    await channel.assertExchange(exchange, "fanout", { durable: false });
    channel.publish(exchange, "", Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (e) {
    throw e;
  }
}

emitLog();
