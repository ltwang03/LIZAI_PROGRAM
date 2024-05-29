const puppeteer = require("puppeteer");

async function keyboard() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.tracing.start({ path: "trace.json" }); // bắt đầu ghi lại trace
  await page.goto("https://example.com");
  await page.tracing.stop(); // dừng việc ghi lại trace

  await page.keyboard.down("Shift"); // nhấn phím Shift
  await page.keyboard.press("KeyA"); // nhấn phím A
  await page.keyboard.up("Shift"); // nhả phím Shift
  await page.keyboard.sendCharacter("Hello World!"); // gửi ký tự

  await page.mouse.move(0, 0); // di chuyển chuột đến vị trí (0, 0)
  await page.mouse.down(); // nhấn chuột
  await page.mouse.move(0, 100);
  await page.mouse.move(100, 100);
  await page.mouse.move(100, 0);
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await page.mouse.reset();
  await page.mouse.drag(0, 0); // kéo chuột
  await page.mouse.dragAndDrop(0, 0, 100, 100); // kéo và thả chuột
  await page.mouse.click(100, 100); // click chuột
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("#upload-file-button"), // some button that triggers file selection
  ]);
  await fileChooser.accept(["/tmp/myfile.pdf"]);

  await browser.close();
}
