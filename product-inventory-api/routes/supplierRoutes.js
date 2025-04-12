const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.post('/', supplierController.createSupplier);
router.get('/', supplierController.getAllSuppliers);
router.get('/:id/products', supplierController.getSupplierWithProducts);

module.exports = router;
