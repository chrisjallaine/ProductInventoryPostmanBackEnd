const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String},
    price: { type: Number, required: true},
    quantity: { type: Number, required: true, default: 0},
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
