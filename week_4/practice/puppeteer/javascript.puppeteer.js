const puppeteer = require("puppeteer");
const { ElementHandle } = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://developer.chrome.com/");
  const three = await page.evaluate(() => {
    return 1 + 2;
  });
  console.log(three);
  const three1 = await page.evaluate(`
    1 + 2
`);
  console.log(three1);

  const body = await page.evaluate(() => {
    return document.body;
  });
  console.log(body); // {}, unexpected!

  const body1 = await page.evaluateHandle(() => {
    return document.body;
  });
  console.log(body instanceof ElementHandle); // true
})();
