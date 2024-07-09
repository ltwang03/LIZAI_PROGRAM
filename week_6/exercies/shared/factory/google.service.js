const puppeteer = require("puppeteer");
const processRepository = require("../database/repositories/process.repository");

class GoogleService {
    async crawlGoogleSite(data) {
        let process = await processRepository.findProcessByTaskId(data.taskId);
        if (!process) {
            process = await processRepository.createProcess({taskId: data.taskId, page: 0, totalLength: 0});
        }
        await processRepository.updateStatusProcess({taskId: data.taskId, status: true})
        const results = await getGoogleData(data.taskId, data.url, data.keyword, process.page);
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

const getGoogleData = async (taskId, url, keyword, lastPage) => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: "/usr/bin/google-chrome",
    });
    const page = await browser.newPage();
    await page.goto(url)
    const boxSearch = await page.$("#APjFqb")
    if (boxSearch) {
        await boxSearch.type(keyword)
    }
    const submitSearch = await page.$("body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b")
    if (submitSearch) {
        await submitSearch.click()
    }
    // scroll first time (auto load 6 time to get more data from google)
    await page.waitForNavigation()
    for (let i = 0; i <= 5; i++) {
        await page.evaluate(async () => {
            window.scrollTo(0, document.body.scrollHeight);
        })
        await delay(page, 1000)
    }
    const startTime = Date.now();
    const twoMinutes = 1 * 1000;
    let elementEnd = false
    const results = []
    while (Date.now() - startTime < twoMinutes) {
        await page.evaluate(async () => {
            const loadMore = document.querySelector(".kQdGHd");
            if (loadMore) {
                loadMore.click()
            }
            window.scrollTo(0, document.body.scrollHeight);
        })
        await delay(page, 1000)
        elementEnd = await page.evaluate(() => {
            const notifyEnd = document.querySelector(".ClPXac")
            if (!notifyEnd) {
                return false
            }
            return true
        })
        if (elementEnd) {
            break
        }
    }

    const paging = await page.$$(".WtZO4e>div");
    const links = await page.$$(".MjjYud > div > div > div:nth-child(1) > div > div > span > a");
    for (const link of links) {
        const href = await (await link.getProperty("href")).jsonValue();
        results.push({url: href, taskId: taskId});
    }
    await browser.close()
    const totalLength = results.length;
    results.push({paging: paging.length, totalLength, taskId: taskId, loadMoreExists: elementEnd});
    return results
}

async function delay(page, time) {
    await page.evaluate(async (time) => {
        await new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }, time)
}

module.exports = GoogleService;
