const jsdom = require("jsdom");
const URL = "https://huflit.edu.vn/";

const getHTML = async () => {
  const res = await fetch(URL);
  if (res.ok) {
    return await res.text();
  } else {
    throw new Error("data not found");
  }
};

const processHTML = async () => {
  const html = await getHTML();
  const dom = new jsdom.JSDOM(html);
  const document = dom.window.document;
  const links = [];
  document.querySelectorAll("a").forEach((value) => {
    links.push(value.getAttribute("href"));
  });
  const text = document.text;
  const result = {
    link: links,
    text,
    html: document.body.outerHTML,
  };
  console.log(result);
};

processHTML();
