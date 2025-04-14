const express = require("express");
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getTotalStockByCategory
} = require("../controllers/categoryController");

const router = express.Router();

// Basic CRUD
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// Analytics route
router.get("/:id/stock", getCategoryStock);

module.exports = router;
