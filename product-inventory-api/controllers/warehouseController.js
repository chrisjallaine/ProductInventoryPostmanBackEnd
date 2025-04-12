const Warehouse = require("../models/Warehouse");

exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔧 Utilization %
exports.getUtilization = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });

    const utilization = (warehouse.currentUsage / warehouse.capacity) * 100;
    res.json({ utilization: `${utilization.toFixed(2)}%` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
