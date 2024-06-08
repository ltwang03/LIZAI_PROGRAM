const puppeteer = require("puppeteer");
process.chdir("..");
const RabbitMQ = require("../shared/RabbitMQ");
const {
  searchDataFromElasticSearch,
} = require("../shared/elasticsearch/elasticSearch");
const runService3 = async () => {
  try {
    const queueUrls = "urls";
    const queueData = "data";
    const connection = await RabbitMQ.connectRabbitMQ();
    const channel = await RabbitMQ.createQueue(queueUrls, connection);
    const channel2 = await RabbitMQ.createQueue(queueData, connection);
    const messagesStream = await RabbitMQ.consumeMessage(queueUrls, channel);
    await messagesStream.on("data", async (message) => {
      const data = JSON.parse(message.content.toString());
      const checkExist = await searchDataFromElasticSearch(data.url);
      if (checkExist) {
        await RabbitMQ.ackMessage(channel, message);
        console.log(`url: ${data.url} is exist`);
      } else {
        const crawlUrls = await crawlDataFromLinks(data);
        await RabbitMQ.sendMessageToQueue(queueData, crawlUrls, channel2);
        await RabbitMQ.ackMessage(channel, message);
      }
    });
  } catch (e) {
    throw e;
  }
};
const crawlDataFromLinks = async (data) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: "/usr/bin/google-chrome",
  });
  const page = await browser.newPage();
  await page.goto(String(data.url), { waitUntil: "load", timeout: 0 });
  let title = await page.title();
  if (!title) {
    title = null;
  }
  let description = null;
  try {
    description = await page.$eval('meta[name="description"]', (meta) =>
      String(meta.content)
    );
  } catch (error) {}
  let text = await page.evaluate(() => document.body.innerText);
  if (!text) {
    text = null;
  }
  let html = await page.content();
  if (!html) {
    html = null;
  }
  await browser.close();
  return { taskId: data.taskId, url: data.url, title, description, text, html };
};

runService3();
