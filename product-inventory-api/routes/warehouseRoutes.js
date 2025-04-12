const express = require("express");
const {
  getWarehouseById,
  getUtilization
} = require("../controllers/warehouseController");

const router = express.Router();

router.get("/:id", getWarehouseById);
router.get("/:id/utilization", getUtilization);

module.exports = router;
