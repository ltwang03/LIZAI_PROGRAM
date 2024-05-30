const { createTask } = require("../models/repositories/task.repository");
const puppeteer = require("puppeteer");
const { NotFoundError } = require("../core/error.response");

class CrawlService {
  async crawlUrl({ url, task_id }) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${url}/search?s=obesity`);
    let numberPage = 0;
    let links = [];

    while (true) {
      numberPage += 1;

      const nextPageLink = `${url}/search?s=obesity&page=${numberPage}`;

      const navigationResult = await page.goto(nextPageLink);

      if (navigationResult.status() !== 200) {
        break;
      }
      return links;
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        browser.close();
        resolve("Successfully completed after 5 minutes");
      }, 5); // 5 minutes
    });
  }
}

module.exports = new CrawlService();
