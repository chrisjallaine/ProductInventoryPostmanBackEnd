const express = require("express");
const { 
    getWarehouses, 
    getWarehouseById, 
    addWarehouse, 
    updateWarehouse, 
    deleteWarehouse 
} = require("../controllers/warehouseController");

const router = express.Router();

// Routes
router.get("/", getWarehouses); // Get all warehouses
router.get("/:id", getWarehouseById); // Get warehouse by ID
router.post("/", addWarehouse); // Add a new warehouse
router.put("/:id", updateWarehouse); // Update warehouse by ID
router.delete("/:id", deleteWarehouse); // Delete warehouse by ID

module.exports = router;
