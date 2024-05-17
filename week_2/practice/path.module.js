const path = require("path");
const baseUrl = "/usr/local/bin/node";
// trả về tên tệp cuối cùng ở đường dẫn
const baseName = path.basename(baseUrl);

console.log(baseName);

const filePath = "/usr/local/bin/node.js";
// trả về thư mục chứa tệp
const dirName = path.dirname(filePath);
//trả về phần đuôi của tệp
const extName = path.extname(filePath);
// phân tích đường dẫn và trả về object
const parsePath = path.parse(filePath);
console.log(dirName);
console.log(extName);
console.log(parsePath);
// chuyển đổi chuỗi string thành đường dẫn
const parts = ["user", "local", "bin", "node.js"];

const joinedPath = path.join(...parts);
console.log(joinedPath);

//đường dẫn tương đối
const relativePath = "path.module.js";
// convert thành đường dẫn tuyệt đối
const absolutePath = path.resolve(relativePath);
console.log(absolutePath);
// kiểm tra đường dẫn tuyệt đối hay tương đối
const isAbsolute1 = path.isAbsolute(relativePath);
const isAbsolute2 = path.isAbsolute(absolutePath);
console.log(isAbsolute1);
console.log(isAbsolute2);
