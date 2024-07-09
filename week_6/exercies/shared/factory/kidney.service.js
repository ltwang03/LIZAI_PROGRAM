const puppeteer = require('puppeteer');
const processRepository = require("../database/repositories/process.repository");

class KidneyService {
    async crawlKidneySite(data) {
        let process = await processRepository.findProcessByTaskId(data.taskId);
        if (!process) {
            process = await processRepository.createProcess({taskId: data.taskId, page: 0, totalLength: 0});
        }
        await processRepository.updateStatusProcess({taskId: data.taskId, status: true})
        const results = await getDataFromKidneySite(data.taskId, data.url, data.keyword, process.page);
        const {paging, totalLength, taskId, loadMoreExists} = results.pop();
        if (!loadMoreExists) {
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

const getDataFromKidneySite = async (taskId, url, keyword, lastPage = 0) => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: "/usr/bin/google-chrome",
    });
    const page = await browser.newPage();
    await page.goto(`${url}search-results?solr-keywords=${keyword}&page=${lastPage}`);
    const startTime = Date.now();
    const twoMinutes = 1 * 1000;
    let statusCrawl = false
    let paging = 1;
    let results = [];
    while (Date.now() - startTime < twoMinutes) {
        const links = await page.$$(".search-result > div > h2 > a")
        for (const link of links) {
            const href = await (await link.getProperty("href")).jsonValue();
            results.push({url: href, taskId: taskId});
        }
        const nextPage = await page.$(".pager-next")
        if (nextPage) {
            await nextPage.click()
            await page.waitForNavigation()
            paging++
        } else {
            statusCrawl = true
            break;
        }
    }
    const totalLength = results.length;
    results.push({paging, totalLength, taskId: taskId, loadMoreExists: statusCrawl});
    await browser.close()
    return results;
}

module.exports = KidneyService;
