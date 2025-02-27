const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 }, // Added min constraint
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Renamed category_id to category
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true }, // Renamed supplier_id to supplier
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
