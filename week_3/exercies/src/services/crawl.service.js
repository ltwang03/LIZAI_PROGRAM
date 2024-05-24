const { NotFoundError } = require("../core/error.response");
const jsdom = require("jsdom");
const url = require("url");

class CrawlService {
  async crawlDataFromLink(urlString) {
    console.log(urlString);
    const checkUrl = new URL(urlString);
    if (!urlString || !checkUrl || typeof urlString !== "string") {
      throw new NotFoundError("Url Not Found");
    }
    const text = await getHTML(urlString);
    const links = [];
    const document = await convertTextToHtml(text);
    const getLinks = document.querySelectorAll(
      "img, a, video source, audio source, script, video"
    );
    for (let data of getLinks) {
      const linkHref = data.getAttribute("href");
      const linkSrc = data.getAttribute("src");
      const link = linkHref || linkSrc;
      if (validateUrl(link)) {
        const formatLink = toAbsoluteUrl(checkUrl.origin, link);
        links.push(formatLink);
      }
    }
    return {
      links,
      text: document.body.textContent,
      html: document.body.outerHTML,
    };
  }
}

const validateUrl = (urlString) => {
  if (urlString && !urlString.startsWith("javascript")) {
    return true;
  }
  return false;
};

const toAbsoluteUrl = (base, relative) => {
  return url.resolve(base, relative);
};
const getHTML = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    return await res.text();
  } else {
    throw new NotFoundError("Data not Found");
  }
};
const convertTextToHtml = async (text) => {
  const dom = new jsdom.JSDOM(text);
  return (document = dom.window.document);
};

module.exports = CrawlService;
