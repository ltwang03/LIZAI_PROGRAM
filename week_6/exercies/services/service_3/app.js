const Rabbitmq = require('../../shared/rabbitmq/rabbitmq')
const UrlRepository = require('../../shared/database/repositories/url.repository')
const puppeteer = require('puppeteer')
const {
    createIndex,
    CheckDataIsExistFromElasticSearch,
    postDocumentToIndex
} = require("../../shared/elasticsearch/method.elasticSearch")
const runService3 = async () => {
    const nameIndex = "crawler-index";
    const mappings = {
        properties: {
            "taskId": {"type": "keyword"},
            "url": {"type": "keyword"},
            "title": {"type": "text"},
            "description": {"type": "text"},
            "text": {"type": "text"},
            "html": {"type": "text"},
            "level": {"type": "integer"}
        }
    }
    await createIndex(nameIndex, mappings);

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
        const result = await getInfoFromAnyLink(data.taskId, data.url, data.level);
        switch (data.level) {
            case 1:
                // save to db
                await UrlRepository.createUrl({
                    taskId: result.taskId,
                    url: result.url,
                    title: result.title,
                    description: result.description,
                    text: result.text,
                    html: result.html,
                    level: result.level
                })
                // save to elastic search
                await postDocumentToIndex(nameIndex, {
                    taskId: result.taskId,
                    url: result.url,
                    title: result.title,
                    description: result.description,
                    text: result.text,
                    html: result.html,
                    level: result.level
                })
                result?.childLinks?.map(async (item) => {

                    await Rabbitmq.sendMessageToQueue(queueUrls, {taskId: result.taskId, url: item, level: 2}, channel)
                })
                await Rabbitmq.ackMessage(channel, message)
                break;
            case 2:
                // save to db
                await UrlRepository.createUrl({
                    taskId: result.taskId,
                    url: result.url,
                    title: result.title,
                    description: result.description,
                    text: result.text,
                    html: result.html,
                    level: result.level
                })
                // save to elastic search
                await postDocumentToIndex(nameIndex, {
                    taskId: result.taskId,
                    url: result.url,
                    title: result.title,
                    description: result.description,
                    text: result.text,
                    html: result.html,
                    level: result.level
                })
                result?.childLinks?.map(async (item) => {
                    await Rabbitmq.sendMessageToQueue(queueUrls, {taskId: result.taskId, url: item, level: 2}, channel)
                })

                await Rabbitmq.ackMessage(channel, message)
                break;
            case 3:
                await UrlRepository.createUrl({
                    taskId: result.taskId,
                    url: result.url,
                    title: result.title,
                    description: result.description,
                    text: result.text,
                    html: result.html,
                    level: result.level
                })
                // save to elastic search
                await postDocumentToIndex(nameIndex, {
                    taskId: result.taskId,
                    url: result.url,
                    title: result.title,
                    description: result.description,
                    text: result.text,
                    html: result.html,
                    level: result.level
                })
                await Rabbitmq.ackMessage(channel, message)
                break;
            default:
                throw new Error("Level not found")
        }
    })
}
runService3()

const getInfoFromAnyLink = async (taskId, url, level) => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: "/usr/bin/google-chrome",
    });
    const page = await browser.newPage();
    try {
        await page.goto(String(url), {waitUntil: "load", timeout: 0});
    } catch (e) {
        const result = {taskId, url, title: null, description: null, text: null, html: null, level: 3, childLinks: []}
    }
    let title = null
    try {
        title = await page.title();
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
    const levelEndGetChildLinks = 3
    if (level === levelEndGetChildLinks) {
        const result = {taskId, url, title, description, text, html, level}
        await browser.close()
        return result
    } else if (level < levelEndGetChildLinks) {
        const result = {
            taskId,
            url,
            title,
            description,
            text,
            html,
            level,
            childLinks: await getChildLinksFromPage(page, url)
        }
        await browser.close()
        return result
    }
}

const getChildLinksFromPage = async (page, url) => {
    let childUrlResult = await page.evaluate((baseUrl) => {
        const uniqueLinks = new Set();

        Array.from(document.querySelectorAll("a"))
            .filter((a) => a.href && a.href.trim() !== "")
            .forEach((a) => {
                try {
                    const absoluteUrl = new URL(a.getAttribute("href"), baseUrl);
                    if (
                        absoluteUrl.protocol === "http:" ||
                        absoluteUrl.protocol === "https:"
                    ) {
                        uniqueLinks.add(absoluteUrl.toString());
                    }
                } catch (err) {
                }
            });

        return Array.from(uniqueLinks);
    }, new URL(url));
    return childUrlResult
}

// lấy ra level của url từ message nếu level 1 thì vào:
// case 1: lấy truy cập vào link lấy title, description, text, html lưu xuống db và các link con của trang đó tiếp tục đẩy  vào queue lại và tăng lên level 2
// case 1: lấy truy cập vào link lấy title, description, text, html lưu xuống db và các link con của trang đó tiếp tục đẩy  vào queue lại và tăng lên level 3
// case 3: lấy truy cập vào link lấy title, description, text, html và lưu xuống db và cập nhật lên elastic search
// những lần tiếp theo check elastic search trước nếu đã tồn tại url đó rồi thì sẽ ack message đó
