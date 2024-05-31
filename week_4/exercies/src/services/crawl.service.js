const {
  createTask,
  createMultipleTasks,
} = require("../models/repositories/task.repository");
const puppeteer = require("puppeteer");
const { NotFoundError } = require("../core/error.response");

class CrawlService {
  async crawlUrl({ url, task_id }) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    await page.click("#btn-search");
    await page.type(".search-input", "obesity");
    await page.click(".search-btn");
    await page.waitForSelector(".view-content");
    const startTime = Date.now();
    const fiveMinutes = 1 * 60 * 1000;
    let links = [];
    let numberPage;
    while (Date.now() - startTime < fiveMinutes) {
      numberPage = await page.$eval(
        "#main-content > div > div > div > nav > ul > li.pager__item.is-active.active>a",
        (el) => {
          const textContent = el.textContent;
          const match = textContent.match(/\d+/); // match digits
          return match ? Number(match[0]) : null;
        }
      );
      const articleUrls = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll(".view-content>div>div:nth-child(2)>a")
        ).map((a) => a.href);
      });
      for (const url of articleUrls) {
        links.push({ url, task_id, page: numberPage });
      }
      const nextPageButton = await page.$(
        "#main-content > div > div > div > nav > ul > li.pager__item.pager__item--next > a"
      );
      if (nextPageButton) {
        await nextPageButton.click();
        await page.waitForNavigation();
      } else {
        break;
        throw new NotFoundError("Button next page not found");
      }
    }
    await browser.close();
    const tasks = removeDuplicateUrls(links);
    return await createMultipleTasks(tasks);
  }
}
function removeDuplicateUrls(arr) {
  const uniqueUrls = new Set();
  return arr.filter((item) => {
    if (!uniqueUrls.has(item.url)) {
      uniqueUrls.add(item.url);
      return true;
    }
    return false;
  });
}

module.exports = new CrawlService();
