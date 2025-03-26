const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    warehouse_id: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
    stock: { type: Number, required: true, min: 0 },
  },
  { timestamps: { createdAt: false, updatedAt: "lastUpdated" } } // Only stores lastUpdated timestamp
);

module.exports = mongoose.model("Inventory", inventorySchema);
