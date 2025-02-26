const express = require("express");
const { getProducts, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts); // Get all products
router.get("/:category", getProductsByCategory); // Get products by category
router.post("/", createProduct); // Add a new product
router.put("/:id", updateProduct); // Update product by ID
router.delete("/:id", deleteProduct); // Delete product by ID

module.exports = router;
