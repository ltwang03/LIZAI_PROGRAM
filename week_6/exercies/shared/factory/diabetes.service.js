const puppeteer = require("puppeteer");
const processRepository = require("../database/repositories/process.repository");

class DiabetesService {
    async crawlDiabetesSite(data) {
        let process = await processRepository.findProcessByTaskId(data.taskId);
        if (!process) {
            process = await processRepository.createProcess({
                taskId: data.taskId,
                page: 0,
                totalLength: 0,
            });
        }
        await processRepository.updateStatusProcess({taskId: data.taskId, status: true})
        const results = await CrawlData(data.taskId, data.url, data.keyword, process.page);
        const {paging, totalLength, taskId, loadMoreExists} = results.pop();
        if (loadMoreExists) {
            const updatePage = paging + process.page;
            const updatedTotalLength = process.totalLength + totalLength;
            await processRepository.updateProcess({
                taskId,
                page: updatePage,
                totalLength: updatedTotalLength,
                status: true
            });
        } else {
            await processRepository.updateProcess({taskId, page: 0, totalLength: 0, status: false});
        }
        return results
    }
}

const CrawlData = async (taskId, url, keyword, lastPage) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(`${url}search?keywords=${keyword}&page=${lastPage}`, {waitUntil: "load", timeout: 0});
    await page.setViewport({width: 1200, height: 600});
    const popup = await page.$("#custom-pop");
    if (popup) {
        await page.click(".close-btn");
    }
    let results = [];
    let loadMoreExists = true;
    const startTime = Date.now();
    const twoMinutes = 1 * 1000;
    while (Date.now() - startTime < twoMinutes && loadMoreExists) {
        loadMoreExists = await page.evaluate(() => {
            const buttonLoadMore = document.querySelector("body > div.dialog-off-canvas-main-canvas.flex.flex-col.flex-1 > main > div.views-element-container > div > ul > li > a");
            if (buttonLoadMore !== null) {
                buttonLoadMore.click();
                return true
            }
            return false
        })
        if (!loadMoreExists) {
            break;
        }
    }
    const links = await page.$$("div.search-result__url > a");
    for (const link of links) {
        const href = await (await link.getProperty("href")).jsonValue();
        results.push({url: href, taskId: taskId});
    }
    await browser.close();
    const paging = Math.ceil(results.length / 10) + 1
    const totalLength = results.length;
    results.push({paging, totalLength, taskId: taskId, loadMoreExists});
    return results
}


module.exports = DiabetesService;
