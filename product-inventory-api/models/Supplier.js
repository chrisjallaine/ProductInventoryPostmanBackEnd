const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contact: { type: String, trim: true }, // Matches ERD naming
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    address: { type: String, trim: true },
  },
  { timestamps: true } // Auto-generates createdAt & updatedAt fields
);

module.exports = mongoose.model("Supplier", supplierSchema);
