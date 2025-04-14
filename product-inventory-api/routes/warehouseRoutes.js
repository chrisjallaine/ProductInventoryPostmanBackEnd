const express = require("express");
const {
  createWarehouse,
  getWarehouseById,
  getWarehouseUtilization
} = require("../controllers/warehouseController");

const router = express.Router();

router.post("/", createWarehouse);
router.get("/:id", getWarehouseById);
router.get("/:id/utilization", getWarehouseUtilization);

module.exports = router;
