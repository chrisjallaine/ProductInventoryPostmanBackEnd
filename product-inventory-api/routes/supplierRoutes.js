const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  logDelivery,
  getSuppliersByProduct,
  getSuppliersByWarehouse
} = require("../controllers/supplierController");

// CRUD operations
router.post("/", createSupplier);
router.get("/", getAllSuppliers);
router.get("/:id", getSupplierById);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

// Delivery logging
router.post("/:supplierId/delivery", logDelivery);

// Queries
router.get("/product/:productId", getSuppliersByProduct);
router.get("/warehouse/:warehouseId", getSuppliersByWarehouse);

module.exports = router;
