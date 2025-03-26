const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    location: { type: String, required: true, trim: true, unique: true },
    capacity: { type: Number, required: true, min: 0 },
  },
  { timestamps: true } // Auto-generates createdAt & updatedAt fields
);

module.exports = mongoose.model("Warehouse", warehouseSchema);
