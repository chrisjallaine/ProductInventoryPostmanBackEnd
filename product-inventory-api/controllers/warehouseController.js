const Warehouse = require("../models/Warehouse");
const Inventory = require("../models/Inventory");

// Create warehouse
exports.createWarehouse = async (req, res) => {
  try {
    const { location, capacity } = req.body;
    const warehouse = await Warehouse.create({ location, capacity });
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get warehouse by ID
exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get warehouse utilization
exports.getWarehouseUtilization = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });

    const inventories = await Inventory.find({ warehouse_id: req.params.id });
    const totalStock = inventories.reduce((sum, inv) => sum + inv.stock, 0);
    const utilization = ((totalStock / warehouse.capacity) * 100).toFixed(2) + "%";

    res.json({ utilization });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
