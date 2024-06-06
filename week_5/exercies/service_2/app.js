const puppeteer = require("puppeteer");
process.chdir("..");
const RabbitMQ = require("../shared/RabbitMQ");

const runService2 = async () => {
  try {
    const queueSites = "sites";
    const queueUrls = "urls";
    const connection = await RabbitMQ.connectRabbitMQ();
    const channel = await RabbitMQ.createQueue(queueSites, connection);
    const messagesStream = await RabbitMQ.consumeMessage(queueSites, channel);
    const channel2 = await RabbitMQ.createQueue(queueUrls, connection);
    await messagesStream.on("data", async (message) => {
      const data = JSON.parse(message.content.toString());
      console.log(data);
      const crawlUrls = await crawlData(data);
      crawlUrls.map((url) => {
        RabbitMQ.sendMessageToQueue(queueUrls, url, channel2);
      });
      await RabbitMQ.ackMessage(channel, message);
    });
  } catch (e) {
    throw e;
  }
};

const crawlData = async (data) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(data.url, { waitUntil: "load", timeout: 0 });
  await page.click(".nav-link");
  await page.type("#cdc-mobile-search-form > input", data.keyword);
  await page.click("#cdc-mobile-search-form > button:nth-child(2)");
  const results = [];
  for (let pageNumber = 0; pageNumber < 5; pageNumber++) {
    await page.waitForNavigation({ waitUntil: "load", timeout: 0 });
    await page.waitForSelector(
      "#results-web > div> div > div > div.result-url-container > div > a"
    );

    const links = await page.$$(
      "#results-web > div > div > div > div.result-url-container > div > a"
    );
    if (!links) {
      console.log("No links found");
      return;
    }
    for (let link of links) {
      const href = await (await link.getProperty("href")).jsonValue();
      results.push(href);
    }
    await page.click(
      "#results-web > div > div:nth-child(2) > nav > ul > li:nth-child(12) > a"
    );
  }
  await browser.close();
  return results;
};
runService2();