const ProductController = require("../controllers/product.controller");
const asyncHandler = require("../helpers/asyncHandler");
const express = require("express");
const router = express.Router();
router.get("/products", asyncHandler(ProductController.getAllProduct));
router.post("/products", asyncHandler(ProductController.createProduct));
router.delete("/products/:id", asyncHandler(ProductController.deleteProduct));
router.put("/products/:id", asyncHandler(ProductController.updateProduct));
module.exports = router;
