const puppeteer = require("puppeteer");

async function interactions() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage(); // tạo một trang mới
  await page.goto("https://developer.chrome.com/"); // truy cập vào trang web
  await page.setViewport({ width: 1080, height: 1024 }); // set kích thước trang web
  await page.locator("button").wait(); // chờ cho đến khi button xuất hiện
  await page.locator("button").click();
  await page
    .locator("button") // tìm button
    .setEnsureElementIsInTheViewport(false) // đảm bảo rằng element không bị che khuất
    .setTimeout(0) // set thời gian chờ
    .setVisibility(null) // set trạng thái hiển thị
    .setWaitForEnabled(false) // set chờ cho đến khi element được kích hoạt
    .setWaitForStableBoundingBox(false) // set chờ cho đến khi element không thay đổi kích thước
    .click(); // click vào element

  let willClick = false;
  await page
    .locator("button")
    .on(LocatorEvent.Action, () => {
      willClick = true;
    })
    .click();

  await page
    .locator(() => {
      const observer = new MutationObserver((records) => {
        for (const record of records) {
          if (record.target instanceof HTMLCanvasElement) {
            resolve(record.target);
          }
        }
      });
      observer.observe(document);
      return promise;
    })
    .wait(); // chờ cho đến khi thực hiện function trên trang web
}

// interactions();

async function querySelector() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://developer.chrome.com/");
  // const element = await page.waitForSelector("button"); // chờ cho đến khi element xuất hiện
  // await element.click(); // click vào element
  // await element.dispose(); // xóa element
  const element1 = await page.waitForSelector("div ::-p-text(My name is Jun)");
  // You can also use escapes.
  const element2 = await page.waitForSelector(
    ':scope >>> ::-p-text(My name is Jun \\(pronounced like "June"\\))'
  );
  // or quotes
  const element3 = await page.waitForSelector(
    'div >>>> ::-p-text("My name is Jun (pronounced like \\"June\\")"):hover'
  );
}

querySelector();
