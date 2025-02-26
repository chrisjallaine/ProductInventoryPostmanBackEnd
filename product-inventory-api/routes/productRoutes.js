const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { getProducts, getProductsByCategory, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts); // Anyone can view products
router.get("/:category", getProductsByCategory); // Anyone can view products by category
router.post("/", authMiddleware, adminMiddleware, createProduct); // Only Admins
router.put("/:id", authMiddleware, adminMiddleware, updateProduct); // Only Admins
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct); // Only Admins

module.exports = router;
