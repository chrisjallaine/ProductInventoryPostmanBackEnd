const Inventory = require('../models/Inventory');
const Warehouse = require('../models/Warehouse');

exports.createInventoryEntry = async (req, res) => {
  try {
    const { warehouse_id, stock } = req.body;

    // Optional: Validate warehouse capacity
    const totalInWarehouse = await Inventory.aggregate([
      { $match: { warehouse_id: require('mongoose').Types.ObjectId(warehouse_id) } },
      { $group: { _id: null, total: { $sum: "$stock" } } }
    ]);
    const currentTotal = totalInWarehouse[0]?.total || 0;
    const warehouse = await Warehouse.findById(warehouse_id);
    if (currentTotal + stock > warehouse.capacity) {
      return res.status(400).json({ message: "Exceeds warehouse capacity" });
    }

    const entry = await Inventory.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStockInWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const updated = await Inventory.findByIdAndUpdate(
      id,
      { stock, lastUpdated: Date.now() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getInventoryByProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Inventory.find({ product_id: id }).populate('warehouse_id');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLowStockItems = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold || '10');
    const result = await Inventory.aggregate([
      {
        $group: {
          _id: "$product_id",
          total: { $sum: "$stock" }
        }
      },
      { $match: { total: { $lt: threshold } } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
