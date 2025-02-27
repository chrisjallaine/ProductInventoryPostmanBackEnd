const Warehouse = require('../models/Warehouse');

exports.getWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving warehouses", error: error.message });
  }
};

exports.addWarehouse = async (req, res) => {
  try {
    const { location, capacity } = req.body;
    if (!location || !capacity) return res.status(400).json({ message: "All fields are required" });

    const warehouse = new Warehouse({ location, capacity });
    await warehouse.save();
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(400).json({ message: "Error adding warehouse", error: error.message });
  }
};
