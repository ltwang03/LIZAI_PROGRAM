const url = require("url");
const path = require("path");
const { NotFoundError } = require("../core/error.response");
const fs = require("fs");

class AnalysisService {
  async AnalysisUrl(urlString) {
    if (!urlString || !new URL(urlString)) {
      throw new NotFoundError("Url is not found!");
    }
    const parsedUrl = url.parse(urlString);
    const extension = path.extname(parsedUrl.pathname);
    const filename = path.basename(parsedUrl.pathname);
    const result = {
      extension: extension || null,
      filename: filename || null,
      ...parsedUrl,
    };
    saveFile(result);
    const data = readFile();
    return JSON.parse(data);
  }
}
const saveFile = (infos) => {
  try {
    fs.writeFileSync("infos.json", JSON.stringify(infos, null, 2));
    console.log(`Saved!`);
  } catch (e) {
    throw e;
  }
};
const readFile = () => {
  try {
    const data = fs.readFileSync("infos.json", { encoding: "utf-8" });
    return data;
  } catch (e) {
    throw e;
  }
};

module.exports = AnalysisService;
