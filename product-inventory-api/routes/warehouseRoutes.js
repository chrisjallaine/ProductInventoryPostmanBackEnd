const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

router.post('/', warehouseController.createWarehouse);
router.get('/', warehouseController.getAllWarehouses);
router.get('/:id/stock', warehouseController.getWarehouseStock);

module.exports = router;
