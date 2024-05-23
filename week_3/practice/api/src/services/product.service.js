const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../dbs/repositories/product.repository");
const { NotFoundError } = require("../core/error.response");

class ProductService {
  async getAllProduct() {
    return await getAllProducts();
  }
  async createProduct(body) {
    const { name, description, price } = body;
    if (!name || typeof name != "string") {
      throw new NotFoundError("name not found");
    }
    if (!description || typeof description != "string") {
      throw new NotFoundError(" description not found");
    }
    if (!price || typeof price != "number") {
      throw new NotFoundError("price not found");
    }
    return await createProduct(body);
  }
  async deleteProduct(id) {
    if (!id) {
      throw new NotFoundError("ID not found");
    }
    return await deleteProduct(id);
  }
  async updateProduct(id, body) {
    if (!id) {
      throw new NotFoundError("Id Not found");
    }
    return await updateProduct(id, body);
  }
}

module.exports = new ProductService();
