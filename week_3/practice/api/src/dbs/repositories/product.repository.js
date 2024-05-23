const fs = require("fs");
const path = require("path");
const { NotFoundError } = require("../../core/error.response");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../product.json"), "utf-8")
);

async function getAllProducts() {
  return data.products;
}
async function createProduct(product) {
  const newId =
    data.products.length > 0
      ? data.products[data.products.length - 1].id + 1
      : 1;
  product.id = newId;
  data.products.push(product);
  fs.writeFileSync(
    path.join(__dirname, "../product.json"),
    JSON.stringify(data, null, 2)
  );
  return product;
}
async function deleteProduct(id) {
  const index = data.products.findIndex((product) => product.id == id);
  if (index === -1) {
    throw new NotFoundError("Product not found");
  }
  data.products.splice(index, 1);
  fs.writeFileSync(
    path.join(__dirname, "../product.json"),
    JSON.stringify(data, null, 2)
  );
}
async function updateProduct(id, body) {
  const index = data.products.findIndex((product) => product.id == id);
  if (index === -1) {
    throw new NotFoundError("Product not found");
  }
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
