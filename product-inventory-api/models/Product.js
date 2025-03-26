const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: "No description provided.", trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

module.exports = mongoose.model("Product", productSchema);
