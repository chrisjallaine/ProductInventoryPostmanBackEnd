const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact_info: { type: String }, // Updated field name for consistency
    email: { type: String, unique: true, required: true },
    address: { type: String },
    productsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Supplier", supplierSchema);
