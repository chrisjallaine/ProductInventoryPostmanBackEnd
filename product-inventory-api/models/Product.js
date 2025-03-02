const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true }, // ✅ Changed to String
    supplier: { type: String, required: true }, // ✅ Changed to String
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
