const mongoose = require("mongoose");
const Inventory = require("../models/Inventory");
const Warehouse = require("../models/Warehouse");

// ✅ Create multiple inventory entries
exports.createInventoryEntry = async (req, res) => {
  try {
    const entries = req.body;

    if (!Array.isArray(entries)) {
      return res.status(400).json({ message: "Payload must be an array of inventory items" });
    }

    const results = [];

    for (const entry of entries) {
      const { product_id, warehouse_id, stock } = entry;

      if (!mongoose.Types.ObjectId.isValid(product_id) || !mongoose.Types.ObjectId.isValid(warehouse_id)) {
        return res.status(400).json({ message: "Invalid product_id or warehouse_id" });
      }

      const totalInWarehouse = await Inventory.aggregate([
        {
          $match: {
            warehouse_id: new mongoose.Types.ObjectId(warehouse_id)
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$stock" }
          }
        }
      ]);

      const currentTotal = totalInWarehouse[0]?.total || 0;
      const warehouse = await Warehouse.findById(warehouse_id);

      if (!warehouse) {
        return res.status(404).json({ message: `Warehouse ${warehouse_id} not found` });
      }

      if (currentTotal + stock > warehouse.capacity) {
        return res.status(400).json({ message: `Exceeds capacity for warehouse ${warehouse.location}` });
      }

      const created = await Inventory.create({ product_id, warehouse_id, stock });
      results.push(created);
    }

    res.status(201).json({ message: "Entries created", data: results });
  } catch (err) {
    res.status(500).json({ message: "Error creating inventory", error: err.message });
  }
};

// ✅ Update stock for an inventory record
exports.updateStockInWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid inventory ID" });
    }

    const updated = await Inventory.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Inventory entry not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating stock", error: error.message });
  }
};

// ✅ Get all inventory records for a specific product
exports.getInventoryByProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const inventory = await Inventory.find({ product_id: id })
      .populate("warehouse_id");

    if (!inventory || inventory.length === 0) {
      return res.status(404).json({ message: "No inventory found for this product" });
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error: error.message });
  }
};

// ✅ Get all low-stock items
exports.getLowStockItems = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 100;

    const lowStock = await Inventory.find({ stock: { $lt: threshold } })
      .populate("product_id")
      .populate("warehouse_id");

    res.status(200).json(lowStock);
  } catch (error) {
    res.status(500).json({ message: "Error fetching low stock items", error: error.message });
  }
};
