const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contactInfo: { type: String, trim: true }, // Renamed for consistency & trimmed
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    address: { type: String, trim: true },
    productsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true } // Automatically manages createdAt & updatedAt
);

module.exports = mongoose.model("Supplier", supplierSchema);
