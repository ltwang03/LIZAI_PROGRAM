const url = require("url");
const fs = require("fs");

const urlTarget = "https://portal.huflit.edu.vn/path?name=Quang";
// get thông tin từ url
const getInfoUrl = (urlTarget) => {
  const infos = url.parse(urlTarget, true);
  return { ...infos };
};
// lưu file thành dạng file json
const saveFile = (infos) => {
  try {
    fs.writeFileSync("infos.json", JSON.stringify(infos, null, 2));
    console.log(`Saved!`);
  } catch (e) {
    throw e;
  }
};

const infos = getInfoUrl(urlTarget);
saveFile(infos);

// đọc file và hiển thị ra console
const readFile = (file) => {
  try {
    const data = fs.readFileSync(file, "utf-8");
    console.log(data);
  } catch (e) {
    throw e;
  }
};
const fileName = "infos.json";
readFile(fileName);
