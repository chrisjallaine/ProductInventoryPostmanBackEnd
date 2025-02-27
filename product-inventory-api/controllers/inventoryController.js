const Inventory = require("../models/Inventory");

// @desc Get all inventory items
exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find().populate("product_id warehouse_id");
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Get a single inventory item by ID
exports.getInventoryById = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id).populate("product_id warehouse_id");
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Create a new inventory item
exports.createInventory = async (req, res) => {
    try {
        const { product_id, warehouse_id, stock } = req.body;
        const newItem = new Inventory({ product_id, warehouse_id, stock });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Update an inventory item
exports.updateInventory = async (req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: "Item not found" });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc Delete an inventory item
exports.deleteInventory = async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
