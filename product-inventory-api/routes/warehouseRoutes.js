const express = require('express');
const { getWarehouses, addWarehouse } = require('../controllers/warehouseController');

const router = express.Router();

router.get('/warehouses', getWarehouses);
router.post('/warehouses', addWarehouse);

module.exports = router;
