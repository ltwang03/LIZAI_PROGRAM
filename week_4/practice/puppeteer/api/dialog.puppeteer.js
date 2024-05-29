const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("dialog", async (dialog) => {
    console.log(dialog.message());
    await dialog.dismiss();
    await browser.close();
  });
  await page.evaluate(() => alert("1"));
})();
