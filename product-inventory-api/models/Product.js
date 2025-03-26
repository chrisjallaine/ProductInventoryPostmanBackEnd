const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
  },
  { timestamps: true } // Auto-generates createdAt & updatedAt fields
);

module.exports = mongoose.model("Product", productSchema);
