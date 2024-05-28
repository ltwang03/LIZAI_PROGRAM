const puppeteer = require("puppeteer");

async function initPuppeteer() {
  const browser = await puppeteer.launch({ headless: false }); // khởi chạy puppetter với chế độ headless: false
  await browser.close(); // đóng trình duyệt
}

async function initPuppeteerWithContext() {
  const browser = await puppeteer.launch({ headless: false }); // khởi chạy puppetter với chế độ headless: false
  const context = await browser.createBrowserContext(); // tạo một context mới
  const page1 = await context.newPage(); // tạo một trang mới trong context
  const page2 = await context.newPage(); // tạo một trang mới tiếp theo trong context
  await context.close(); // đóng context
}

async function initPuppeteerWithOverridePermission() {
  const browser = await puppeteer.launch();
  const context = browser.defaultBrowserContext();
  const page = await context.newPage();
  await context.overridePermissions("https://html5demos.com", ["geolocation"]);
}

// initPuppeteer();
// initPuppeteerWithContext();
initPuppeteerWithOverridePermission();
