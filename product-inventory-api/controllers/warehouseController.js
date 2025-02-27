const Warehouse = require('../models/Warehouse');

exports.getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addWarehouse = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;
    const warehouse = new Warehouse({ name, location, capacity });
    await warehouse.save();
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};
