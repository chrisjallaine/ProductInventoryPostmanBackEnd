const Warehouse = require("../models/Warehouse");

// Get all warehouses
const getWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.status(200).json(warehouses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single warehouse by ID
const getWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) return res.status(404).json({ message: "Warehouse not found" });
        res.status(200).json(warehouse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new warehouse (Fixed duplicate issue)
const createWarehouse = async (req, res) => {
    try {
        const { location, capacity } = req.body;

        if (!location || capacity === undefined) {
            return res.status(400).json({ message: "Location and capacity are required" });
        }

        const newWarehouse = new Warehouse({ location, capacity });
        await newWarehouse.save();

        res.status(201).json(newWarehouse);
    } catch (error) {
        res.status(500).json({ message: "Error creating warehouse", error: error.message });
    }
};

//  Update warehouse
const updateWarehouse = async (req, res) => {
    try {
        const updatedWarehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWarehouse) return res.status(404).json({ message: "Warehouse not found" });
        res.status(200).json(updatedWarehouse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Delete warehouse
const deleteWarehouse = async (req, res) => {
    try {
        const deletedWarehouse = await Warehouse.findByIdAndDelete(req.params.id);
        if (!deletedWarehouse) return res.status(404).json({ message: "Warehouse not found" });
        res.status(200).json({ message: "Warehouse deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Export all functions properly
module.exports = {
    getWarehouses,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse
};
