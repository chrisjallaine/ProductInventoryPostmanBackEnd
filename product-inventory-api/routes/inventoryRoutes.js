const express = require("express");
const { 
    getInventory, 
    getInventoryById, 
    getInventoryByWarehouse, 
    createInventory, 
    updateInventory, 
    updateStockInWarehouse, 
    deleteInventory 
} = require("../controllers/inventoryController");

const router = express.Router();

// Routes
router.get("/", getInventory); // Get all inventory items
router.get("/:id", getInventoryById); // Get a single inventory item by ID
router.get("/warehouse/:warehouse_id", getInventoryByWarehouse); // Get inventory by warehouse ID
router.post("/", createInventory); // Add a new inventory item
router.put("/:id", updateInventory); // Update an inventory item by ID
router.put("/update-stock", updateStockInWarehouse); // Update stock for a specific product in a warehouse
router.delete("/:id", deleteInventory); // Delete an inventory item by ID

module.exports = router;
