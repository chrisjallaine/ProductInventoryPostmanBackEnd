const express = require("express");
const Supplier = require("../models/Supplier");

const router = express.Router();

// Get all suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate("productsSupplied");
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new supplier
router.post("/", async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: "Error adding supplier" });
  }
});

// Update a supplier
router.put("/:id", async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: "Error updating supplier" });
  }
});

// Delete a supplier
router.delete("/:id", async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: "Supplier deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;