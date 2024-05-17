const jsdom = require("jsdom");
const Url = "https://stackoverflow.com/";

const getHTML = async () => {
  const res = await fetch(Url);
  if (res.ok) {
    return await res.text();
  } else {
    throw new Error("data not found");
  }
};
const isValidUrl = (string) => {
  try {
    new URL(string);
    return !string.startsWith("javascript:");
  } catch (_) {
    return false;
  }
};
const processHTML = async () => {
  const html = await getHTML();
  const dom = new jsdom.JSDOM(html);
  const document = dom.window.document;
  let links = [];
  const listData = document.querySelectorAll("a, img, video");
  for (let data of listData) {
    const linkHref = data.getAttribute("href");
    const linkSrc = data.getAttribute("src");
    const link = linkHref || linkSrc;
    if (isValidUrl(link)) {
      links.push(link);
    }
  }
  const text = document.body.textContent;
  const HTML = document.body.outerHTML;
  const result = {
    link: links,
    text,
    html: HTML,
  };
  console.log(result);
};

processHTML();
