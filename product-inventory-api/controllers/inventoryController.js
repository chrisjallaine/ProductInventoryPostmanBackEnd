const mongoose = require('mongoose');
const Inventory = require('../models/Inventory');
const Warehouse = require('../models/Warehouse');

exports.createInventoryEntry = async (req, res) => {
  try {
    const { warehouse_id, product_id, stock } = req.body;

    // Correct way to instantiate ObjectId
    const warehouseObjectId = new mongoose.Types.ObjectId(warehouse_id);

    // Optional: Validate warehouse capacity
    const totalInWarehouse = await Inventory.aggregate([
      { $match: { warehouse_id: warehouseObjectId } },
      { $group: { _id: null, total: { $sum: "$stock" } } }
    ]);

    const currentTotal = totalInWarehouse[0]?.total || 0;
    const warehouse = await Warehouse.findById(warehouse_id);

    if (!warehouse) {
      return res.status(404).json({ message: "Warehouse not found" });
    }

    if (currentTotal + stock > warehouse.capacity) {
      return res.status(400).json({ message: "Exceeds warehouse capacity" });
    }

    // Proceed to create
    const entry = await Inventory.create({
      product_id,
      warehouse_id,
      stock
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
