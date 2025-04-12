const express = require("express");
const {
  recordSupplierDelivery
} = require("../controllers/supplierController");

const router = express.Router();

router.put("/:supplierId/delivery", recordSupplierDelivery);

module.exports = router;
