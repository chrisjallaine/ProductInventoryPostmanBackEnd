const express = require("express");
const { 
    getCategories, 
    getCategoryById, 
    getProductsByCategory, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} = require("../controllers/categoryController");

const router = express.Router();

// Routes
router.get("/", getCategories); // Get all categories
router.get("/:id", getCategoryById); // Get a single category by ID
router.get("/:id/products", getProductsByCategory); //Get all products in a certain category
router.post("/", createCategory); // Add a new category
router.put("/:id", updateCategory); // Update category by ID
router.delete("/:id", deleteCategory); // Delete category by ID

module.exports = router;
