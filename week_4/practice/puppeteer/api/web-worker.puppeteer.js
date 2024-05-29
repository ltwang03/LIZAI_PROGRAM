const puppeteer = require("puppeteer");

async function webWorker() {
  const browser = await puppeteer.launch(); // khởi chạy trình duyệt
  const context = browser.defaultBrowserContext(); // lấy ra context mặc định
  const page = await context.newPage();
  // set quyền cho trang web
  await context.overridePermissions("https://html5demos.com", ["geolocation"]);

  page.on("workercreated", (worker) =>
    console.log("Worker created: " + worker.url())
  );
  page.on("workerdestroyed", (worker) =>
    console.log("Worker destroyed: " + worker.url())
  );
}
