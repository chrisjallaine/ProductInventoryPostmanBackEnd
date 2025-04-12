const express = require("express");
const {
  createInventory,
  getLowStockItems
} = require("../controllers/inventoryController");

const router = express.Router();

router.post("/", createInventory);
router.get("/low-stock", getLowStockItems);

module.exports = router;
