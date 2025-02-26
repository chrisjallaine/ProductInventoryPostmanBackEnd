const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ["Women", "Men", "Kids"], required: true },
    subcategory: { type: String, required: true }, // e.g., "Dresses", "Shirts"
    size: { type: String, enum: ["S", "M", "L"], required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
