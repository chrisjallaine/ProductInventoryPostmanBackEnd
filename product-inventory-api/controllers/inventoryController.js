const Inventory = require("../models/Inventory");

// Get all inventory items
exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find()
            .populate("product_id")
            .populate("warehouse_id");
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving inventory", error: error.message });
    }
};

// Get a single inventory item by ID
exports.getInventoryById = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id)
            .populate("product_id")
            .populate("warehouse_id");
        if (!item) return res.status(404).json({ message: "Inventory item not found" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving inventory item", error: error.message });
    }
};

// Get all inventory items in a specific warehouse
exports.getInventoryByWarehouse = async (req, res) => {
    try {
        const warehouseId = req.params.warehouse_id;

        // Fetch inventory items for this warehouse
        const inventory = await Inventory.find({ warehouse_id: warehouseId })
            .populate("product_id", "name price")
            .populate("warehouse_id", "location");

        if (inventory.length === 0) {
            return res.status(404).json({ message: "No inventory found for this warehouse" });
        }

        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving inventory for warehouse", error: error.message });
    }
};

// Create a new inventory item
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

// Update an inventory item
exports.updateInventory = async (req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: "Inventory item not found" });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating inventory item", error: error.message });
    }
};

// Update stock quantity for a specific warehouse and product
exports.updateStockInWarehouse = async (req, res) => {
    try {
        const { warehouse_id, product_id, stock_quantity } = req.body;

        if (!warehouse_id || !product_id || stock_quantity === undefined) {
            return res.status(400).json({ message: "Warehouse ID, Product ID, and stock quantity are required" });
        }

        const inventoryItem = await Inventory.findOne({ warehouse_id, product_id });

        if (!inventoryItem) {
            return res.status(404).json({ message: "Inventory item not found in this warehouse" });
        }

        inventoryItem.stock_quantity = stock_quantity;
        await inventoryItem.save();

        res.json({ message: "Stock updated successfully", inventoryItem });
    } catch (error) {
        res.status(500).json({ message: "Error updating stock", error: error.message });
    }
};

// Delete inventory item
exports.deleteInventory = async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: "Inventory item not found" });
        res.json({ message: "Inventory item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting inventory item", error: error.message });
    }
};
