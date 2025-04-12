const Inventory = require("../models/Inventory");
const Warehouse = require("../models/Warehouse");
const Product = require("../models/Product");

// Create
exports.createInventory = async (req, res) => {
  try {
    const { product_id, warehouse_id, stock, unitPrice, expiryDate } = req.body;

    const warehouse = await Warehouse.findById(warehouse_id);
    if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });

    const currentTotal = await Inventory.aggregate([
      { $match: { warehouse_id } },
      { $group: { _id: null, total: { $sum: "$stock" } } }
    ]);

    const currentStock = currentTotal[0]?.total || 0;
    const newTotal = currentStock + stock;

    if (newTotal > warehouse.capacity) {
      return res.status(400).json({ message: "Warehouse overcapacity" });
    }

    const record = await Inventory.create({
      product_id, warehouse_id, stock, unitPrice, expiryDate,
      auditLog: [{ action: "Create", amount: stock }]
    });

    warehouse.currentUsage = newTotal;
    await warehouse.save();

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Low Stock 
exports.getLowStockItems = async (req, res) => {
  try {
    const threshold = parseInt(req.query.threshold) || 5;
    const items = await Inventory.find({ stock: { $lt: threshold } })
      .populate("product_id")
      .populate("warehouse_id");

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
