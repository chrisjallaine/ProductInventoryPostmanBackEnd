const express = require("express");
const {
    getWarehouses,
    getWarehouseById,
    createWarehouse, // Fixed function name
    updateWarehouse,
    deleteWarehouse
} = require("../controllers/warehouseController");

const router = express.Router();

// Routes
router.get("/", getWarehouses);
router.get("/:id", getWarehouseById);
router.post("/", createWarehouse); // Fixed function call
router.put("/:id", updateWarehouse);
router.delete("/:id", deleteWarehouse);

module.exports = router;
