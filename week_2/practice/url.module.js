const url = require("url");

const urlString = "https://portal.huflit.edu.vn/path?name=quang";
// phân tích url thành các phần nhỏ
const parseUrl = url.parse(urlString, true);
console.log(parseUrl);
// format thành url
const urlObject = {
  protocol: "https",
  hostname: "portal.huflit.edu.vn",
  pathname: "/path",
  query: {
    name: "quang",
  },
};

let formattedUrl = url.format(urlObject);

console.log(formattedUrl);
// resolve url
const base = "https://portal.huflit.edu.vn/";
const relative = "one/two";

const resolvedUrl = url.resolve(base, relative);

console.log(resolvedUrl); // https://portal.huflit.edu.vn/one/two
