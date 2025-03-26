const express = require("express");
const { 
    getSuppliers, 
    getSupplierById, 
    getSupplierByProduct, 
    createSupplier, 
    updateSupplier, 
    deleteSupplier 
} = require("../controllers/supplierController");

const router = express.Router();

// Routes
router.get("/", getSuppliers); // Get all suppliers
router.get("/:id", getSupplierById); // Get a single supplier by ID
router.get("/product/:product_id", getSupplierByProduct); // Get supplier by product ID
router.post("/", createSupplier); // Add a new supplier
router.put("/:id", updateSupplier); // Update supplier by ID
router.delete("/:id", deleteSupplier); // Delete supplier by ID

module.exports = router;
