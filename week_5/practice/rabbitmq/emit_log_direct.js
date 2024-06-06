const amqp = require("amqplib");

async function run() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const exchange = "direct_logs";
    const args = process.argv.slice(2);
    const severity = args.length > 0 ? args[0] : "info";
    const message = args.slice(1).join(" ") || "Hello World!";
    await channel.assertExchange(exchange, "direct", { durable: false });
    await channel.publish(exchange, severity, Buffer.from(message));
    console.log(" [x] Sent %s: '%s'", severity, message);
    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (e) {
    throw e;
  }
}
run();
