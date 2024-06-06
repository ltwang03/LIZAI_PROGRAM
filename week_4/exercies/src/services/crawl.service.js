const {
  createMultipleTasks,
  getUrlByTaskId,
} = require("../models/repositories/task.repository");
const puppeteer = require("puppeteer");
const { NotFoundError } = require("../core/error.response");
const {
  createMultipleLinks,
  updateLink,
  getLinkByTaskId,
} = require("../models/repositories/link.repository");

class CrawlService {
  async crawlUrl({ url, task_id }) {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: "/usr/bin/google-chrome",
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.click("#btn-search");
    await page.type(".search-input", "obesity");
    await page.click(".search-btn");
    await page.waitForSelector(".view-content");
    const startTime = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
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
    await createMultipleTasks(tasks);
    await createMultipleLinks(tasks);
    return "Successfully craw6led!";
  }

  async crawlDataFromUrl({ task_id, page, page_size = 10 }) {
    const offset = (page - 1) * page_size;
    const tasks = await getUrlByTaskId(task_id, page, page_size, offset);
    if (!tasks) {
      throw new NotFoundError("Task not found");
    }

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: "/usr/bin/google-chrome",
    });

    for (const task of tasks.list) {
      const page = await browser.newPage();
      await page.goto(task.url);
      let title = await page.title();
      if (!title) {
        title = null;
      }
      let description = null;

      try {
        description = await page.$eval(
          'meta[name="description"]',
          (meta) => meta.content
        );
      } catch (error) {}
      const timeElement = await page.$(".cell-2_1 > time");
      let date = null;

      if (timeElement) {
        date = await timeElement.evaluate((timeEl) =>
          timeEl.getAttribute("datetime")
        );
      } else {
      }
      let text = await page.evaluate(() => document.body.innerText);
      if (!text) {
        text = null;
      }
      let html = await page.content();
      if (!html) {
        html = null;
      }
      let childUrlResult = await page.evaluate((baseUrl) => {
        const uniqueLinks = new Set();

        Array.from(document.querySelectorAll("a"))
          .filter((a) => a.href && a.href.trim() !== "") // Kiểm tra href không rỗng
          .forEach((a) => {
            try {
              const absoluteUrl = new URL(a.getAttribute("href"), baseUrl);
              if (
                absoluteUrl.protocol === "http:" ||
                absoluteUrl.protocol === "https:"
              ) {
                uniqueLinks.add(absoluteUrl.toString()); // Lưu URL dưới dạng chuỗi
              }
            } catch (err) {}
          });

        return Array.from(uniqueLinks);
      }, new URL(task.url)); // Truyền đối tượng URL vào page.evaluate

      await updateLink(task.id, {
        title,
        description,
        text,
        html,
        date,
        childUrls: childUrlResult,
      });
    }
    await browser.close();
    return await getLinkByTaskId(task_id, page, page_size, offset);
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
