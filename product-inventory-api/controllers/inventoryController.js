const Inventory = require("../models/Inventory");

// @desc Get all inventory items
exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find()
            .populate("product_id")
            .populate("warehouse_id"); // Fixed population format
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving inventory", error: error.message });
    }
};


// @desc Get a single inventory item by ID
exports.getInventoryById = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id).populate("product_id warehouse_id");
        if (!item) return res.status(404).json({ message: "Inventory item not found" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving inventory item", error: error.message });
    }
};

// @desc Create a new inventory item
exports.createInventory = async (req, res) => {
    try {
        const { product_id, warehouse_id, stock_quantity } = req.body;
        if (!product_id || !warehouse_id || stock_quantity === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newItem = new Inventory({ product_id, warehouse_id, stock_quantity });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error creating inventory item", error: error.message });
    }
};
