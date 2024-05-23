const fs = require("fs");
const path = require("path");
const { NotFoundError } = require("../../core/error.response");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../product.json"), "utf-8")
);
// doc file json va tra ve data
async function getAllProducts() {
  return data.products;
}

async function createProduct(product) {
  // Kiểm tra data product có length là bao nhiêu và nếu > 0 thì sẽ trả về id mới của data bằng data.products.length -1 + 1
  const newId =
    data.products.length > 0
      ? data.products[data.products.length - 1].id + 1
      : 1;
  // gán id cho product muốn tạo
  product.id = newId;
  //push product mới
  data.products.push(product);
  //ghi data mới vào file
  fs.writeFileSync(
    path.join(__dirname, "../product.json"),
    JSON.stringify(data, null, 2)
  );
  return product;
}
async function deleteProduct(id) {
  // kiểm tra id nếu id tồn tại thì trả về id và nếu id không tồn tại thì sẽ trả về -1
  //sử dungj phương thức findIndex để tìm ra index
  const index = data.products.findIndex((product) => product.id == id);
  if (index === -1) {
    throw new NotFoundError("Product not found");
  }
  // sử dụng phưương thức splice để xóa phần tử với index là vị trí của phần tử và 1 là số lượng phần tử
  data.products.splice(index, 1);
  // ghi file
  fs.writeFileSync(
    path.join(__dirname, "../product.json"),
    JSON.stringify(data, null, 2)
  );
}
async function updateProduct(id, body) {
  // kiểm tra id
  const index = data.products.findIndex((product) => product.id == id);
  // nếu id không tồn tại trả vể error
  if (index === -1) {
    throw new NotFoundError("Product not found");
  }
  // lấy ra được product cần update sữ dụng toán tử spread để gôp các thuộc tính của 2 object với nhau,
  // khi 2 object được gộp lại, nếu cả 2 đều có cùng 1 thuộc tính, thuộc tính từ body sẽ được sử dụng
  // vì nó xuất hiện sau
  data.products[index] = { ...data.products[index], ...body };

  fs.writeFileSync(
    path.join(__dirname, "../product.json"),
    JSON.stringify(data, null, 2)
  );
  return data.products[index];
}
module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
