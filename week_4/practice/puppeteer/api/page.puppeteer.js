const puppeteer = require("puppeteer");
const { KnowDevices } = require("puppeteer");
const iphone = KnowDevices["iPhone 6"];

async function initPuppeteer() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(iphone); // emulate iPhone 6
  await page.goto("https://example.com"); // truy cập vào trang web
  await page.screenshot({ path: "screenshot.png" }); // chụp ảnh màn hình
  await page.once("load", () => console.log("Page loaded!")); // chờ cho đến khi trang web được load
  const divCount = await page.$$eval("div", (divs) => divs.length); // đếm số lượng div
  console.log(`Number of divs: ${divCount}`);
  const options = await page.$$eval("div > span.options", (options) => {
    return options.map((option) => option.textContent);
  });
  const searchValue = await page.$eval("#search", (el) => el.value); // lấy ra giá trị của input có id là search
  console.log(searchValue);
  const preloadHref = await page.$eval("link[rel=preload]", (el) => el.href); // lấy ra href của link có rel là preload
  console.log(preloadHref);
  const html = await page.$eval(".main-container", (el) => el.outerHTML); // lấy ra html của element có class là main-container
  console.log(html);

  const addScriptTag = await page.addScriptTag({
    url: "https://code.jquery.com/jquery-3.6.0.min.js",
  });
  const [response] = await Promise.all([
    page.waitForNavigation(waitOptions),
    page.click(selector, clickOptions),
  ]);
  console.log(await page.cookies());
  await page.deleteCookie({ name: "name" }); // xóa cookie có tên là name
  await page.goBack(); // quay lại trang trước
  await page.goForward(); // đi đến trang tiếp theo
  await page.hover("button"); // hover vào button
  await page.reload(); // tải lại trang
  await page.screenshot(); // chụp ảnh màn hình
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
  ); // set user agent
  await page.setBypassCSP(true); // bỏ qua Content Security Policy
  await page.setViewport({ width: 1920, height: 1080 }); // set kích thước trang web
  await page.waitForSelector("button"); // chờ cho đến khi button xuất hiện
  await page.title(); // lấy ra title của trang web
  page.url(); // lấy ra url của trang web
  await page.type("input", "Hello World!"); // gõ Hello World vào input
  await page.close();
}
