const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    warehouse_id: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    stock_quantity: { type: Number, required: true, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inventory", inventorySchema);
