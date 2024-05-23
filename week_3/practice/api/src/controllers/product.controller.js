const SuccessResponse = require("../core/success.response");
const ProductService = require("../services/product.service");

class ProductController {
  getAllProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Get All Product Success",
      metadata: await ProductService.getAllProduct(),
    }).send(res);
  };
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: " Create Product Success",
      metadata: await ProductService.createProduct({ ...req.body }),
    }).send(res);
  };
  deleteProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Delete Successful",
      metadata: await ProductService.deleteProduct(req.params.id),
    }).send(res);
  };
  updateProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Update Successful",
      metadata: await ProductService.updateProduct(req.params.id, {
        ...req.body,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
