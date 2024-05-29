const puppeteer = require("puppeteer");

async function browserContext() {
  const browser = await puppeteer.launch(); // khởi chạy trình duyệt
  const context = await browser.createBrowserContext(); // tạo một context mới
  await context.overridePermissions("https://example.com", ["clipboard-read"]);
  await context.clearPermissionOverrides(); // xóa tất cả các quyền
  await context.isIncognito(); // kiểm tra xem context có ở chế độ ẩn danh không
  const page = await context.newPage(); // tạo một trang mới trong context
  await page.goto("https://example.com"); // truy cập vào trang web
  await context.close(); // đóng context
}
