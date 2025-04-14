const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.post('/', supplierController.createSupplier);
router.get('/', supplierController.getAllSuppliers);
router.get('/:id', supplierController.getSupplierById);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

router.put('/:id/delivery', supplierController.logDelivery);

// 🔍 Advanced Queries
router.get('/product/:productId', supplierController.getSuppliersByProduct);
router.get('/warehouse/:warehouseId', supplierController.getSuppliersByWarehouse);

module.exports = router;
