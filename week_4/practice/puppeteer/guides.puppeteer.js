const puppeteer = require("puppeteer");

async function initGuides() {
  const browser = await puppeteer.launch({
    headless: false, // open browser
    slowMo: 250, // slow down by 250ms
    devtools: true, // open dev tools
    dumpio: true, // dump IO
  });
  const page = await browser.newPage();
  await page.goto("https://developer.chrome.com/");
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  await page.evaluate(() => console.log(`url is ${location.href}`));
  await page.evaluate(() => {
    debugger;
  });
}

async function HeadlessMode() {
  const browser = await puppeteer.launch({ headless: "shell" });
  const browser1 = await puppeteer.launch({ headless: true });
  const browser2 = await puppeteer.launch({ headless: false });
}

// HeadlessMode();

async function captureScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com", {
    waitUntil: "networkidle2",
  });
  await page.screenshot({
    path: "hn.png",
  });

  await browser.close();
}

// captureScreenshot();

async function pdfGeneration() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com", {
    waitUntil: "networkidle2",
  });
  // Saves the PDF to hn.pdf.
  await page.pdf({
    path: "hn.pdf",
  });

  await browser.close();
}
pdfGeneration();
