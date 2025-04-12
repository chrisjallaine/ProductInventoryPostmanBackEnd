const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");

// Create
exports.createProduct = async (req, res) => {
  try {
    const { name, sku, description, price, quantity, reorderLevel, category_id, supplier_id } = req.body;

    const category = await Category.findById(category_id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });

    const newProduct = await Product.create({
      name, sku, description, price, quantity, reorderLevel, category_id, supplier_id
    });

    await Category.findByIdAndUpdate(category_id, { $inc: { productCount: 1 } });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category_id", "name")
      .populate("supplier_id", "name contact_info email");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category_id")
      .populate("supplier_id");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    await Category.findByIdAndUpdate(deleted.category_id, { $inc: { productCount: -1 } });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Custom 🔍
exports.getProductBySKU = async (req, res) => {
  const { sku } = req.params;
  const product = await Product.findOne({ sku });
  if (!product) return res.status(404).json({ message: "SKU not found" });
  res.json(product);
};
