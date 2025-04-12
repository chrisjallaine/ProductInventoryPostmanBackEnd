const express = require('express');
const router = express.Router();

const {
  createInventoryEntry,
  updateStockInWarehouse,
  getInventoryByProduct,
  getLowStockItems
} = require('../controllers/inventoryController');

// Add a new inventory entry
router.post('/', createInventoryEntry);

// Update stock by inventory ID
router.put('/:id', updateStockInWarehouse);

// Get inventory entries by product ID
router.get('/product/:id', getInventoryByProduct);

// Get low stock items (optional threshold param)
router.get('/low-stock', getLowStockItems);

module.exports = router;
