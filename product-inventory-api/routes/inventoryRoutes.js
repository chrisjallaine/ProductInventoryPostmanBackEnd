const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/', inventoryController.createInventoryEntry);
router.put('/:id', inventoryController.updateStockInWarehouse);
router.get('/product/:id', inventoryController.getInventoryByProduct);
router.get('/low-stock', inventoryController.getLowStockItems);

module.exports = router;
