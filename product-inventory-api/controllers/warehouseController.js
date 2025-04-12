const Warehouse = require('../models/Warehouse');
const Inventory = require('../models/Inventory');

exports.createWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.create(req.body);
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWarehouseStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Inventory.find({ warehouse_id: id }).populate('product_id');
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
