const Rabbitmq = require("../shared/rabbitmq/rabbitmq")
const UrlRepository = require("../shared/database/repositories/url.repository")
const puppeteer = require('puppeteer')

const {
    createIndex,
    CheckDataIsExistFromElasticSearch,
    postDocumentToIndex
} = require("../shared/elasticsearch/method.elasticsearch")

const runServiceCrawl = async () => {
    const nameIndex = "crawler"
    const mappings = {
        properties: {
            "url": {"type": "keyword"},
            "title": {"type": "text"},
        }
    }
    await createIndex(nameIndex, mappings)

    const queueUrls = 'urls'
    const connection = await Rabbitmq.connectRabbitMQ()
    const channel = await Rabbitmq.createQueue(queueUrls, connection)
    const {messageStream} = await Rabbitmq.consumeMessage(queueUrls, channel)
    await messageStream.on('data', async (message) => {
        const data = JSON.parse(message.content.toString())
        const checkExist = await CheckDataIsExistFromElasticSearch(nameIndex, data.url);
        if (checkExist) {
            console.log(`url: ${data.url} is exist`);
            return await Rabbitmq.ackMessage(channel, message)
        }
        const result = await getInfoFromLink(data.url, data.keyword, data.crawlStatusId)
        await UrlRepository.createUrl(result)
        await postDocumentToIndex(nameIndex, {url: result.url, title: result.title})
        await Rabbitmq.ackMessage(channel, message)
    })

    const getInfoFromLink = async (url, keyword, crawlStatusId) => {
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()
        try {
            await page.goto(String(url), {waitUntil: 'load', timeout: 0});
        } catch (e) {
        }
        let title = null;
        try {
            title = await page.title()
        } catch (e) {
        }
        let description = null;
        try {
            description = await page.$eval('meta[name="description"]', (meta) =>
                String(meta.content)
            );
        } catch (error) {
        }
        let text = await page.evaluate(() => document.body.innerText);
        if (!text) {
            text = null;
        }
        let html = await page.content();
        if (!html) {
            html = null;
        }
        await browser.close()
        return {url, keyword, title, description, text, html, CrawlStatusId: crawlStatusId}
    }
}
runServiceCrawl()
