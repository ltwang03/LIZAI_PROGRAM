const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.google.com/chrome/browser/canary.html"); // truy cập vào trang web
  dumpFrameTree(page.mainFrame(), ""); // dump frame tree
  const frame = page.frames().find((frame) => frame.name() === "myframe"); // tìm frame theo tên
  const text = await frame.$eval(".selector", (element) => element.textContent); // lấy ra text của element
  console.log(text);
  await browser.close();

  function dumpFrameTree(frame, indent) {
    console.log(indent + frame.url()); // in ra url của frame
    for (const child of frame.childFrames()) {
      // lấy ra các frame con
      dumpFrameTree(child, indent + "  ");
    }
  }
})();
