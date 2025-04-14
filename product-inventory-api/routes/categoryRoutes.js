const express = require("express");
const {
  getCategories,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  getCategoryBySKU,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsInCategory,
  getCategoryStock,
} = require("../controllers/categoryController");

const router = express.Router();

// Basic CRUD
router.get("/", getCategories);
router.get("/all", getAllCategories);
router.get("/name/:name", getCategoryByName);
router.get("/sku/:sku", getCategoryBySKU);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id/products", getProductsInCategory);

// Analytics route
router.get("/:id/stock", getCategoryStock);

module.exports = router;
