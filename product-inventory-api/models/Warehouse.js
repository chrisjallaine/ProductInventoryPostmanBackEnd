const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
    location: { type: String, required: true },
    capacity: { type: Number, required: true, min: 0 } // ✅ Ensures positive numbers
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
