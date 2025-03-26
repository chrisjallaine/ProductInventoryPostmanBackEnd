const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true } // Auto-generates createdAt & updatedAt fields
);

module.exports = mongoose.model("Category", categorySchema);
