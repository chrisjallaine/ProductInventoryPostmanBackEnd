const express = require("express");
const { 
    getInventory, 
    getInventoryById, 
    createInventory, 
    updateInventory, 
    deleteInventory 
} = require("../controllers/inventoryController");

const router = express.Router();

// Routes
router.get("/", getInventory); // Get all inventory items
router.get("/:id", getInventoryById); // Get a single inventory item by ID
router.post("/", createInventory); // Add a new inventory item
router.put("/:id", updateInventory); // Update inventory item by ID
router.delete("/:id", deleteInventory); // Delete inventory item by ID

module.exports = router;