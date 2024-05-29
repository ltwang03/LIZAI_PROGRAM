const puppeteer = require("puppeteer");

async function createAPage() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com");
  await browser.close();
}
// ngắt kết nối và kết nối lại với browser
async function disconnectAndReconnect() {
  const browser = await puppeteer.launch(); // khởi chạy trình duyệt
  const browserWSEndpoint = browser.wsEndpoint(); // lấy ra địa chỉ endpoint của trình duyệt
  await browser.disconnect(); // ngắt kết nối với trình duyệt
  const browser2 = await puppeteer.connect({ browserWSEndpoint }); // kết nối lại với trình duyệt
  await browser2.close(); // đóng trình duyệt
  await browser2.userAgent(); // lấy ra user agent của trình duyệt
  await browser2.version(); // lấy ra version của trình duyệt
  browser2.isConnected(); // kiểm tra xem trình duyệt có kết nối không
  await page.evaluate(() => window.open("https://www.example.com/")); // mở một trang mới
  const newWindowTarget = await browser.waitForTarget(
    // chờ cho đến khi trang mới được mở
    (target) => target.url() === "https://www.example.com/" // kiểm tra url của trang mới
  );
}
