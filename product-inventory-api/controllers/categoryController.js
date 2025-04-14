const Category = require('../models/Category');

// Create single or multiple categories
exports.createCategory = async (req, res) => {
  try {
    const isArray = Array.isArray(req.body);

    if (isArray && req.body.length === 0) {
      return res.status(400).json({ message: "Empty array is not allowed" });
    }

    const result = isArray
      ? await Category.insertMany(req.body)
      : await Category.create(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single category
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Category stock
exports.getCategoryStock = async (req, res) => {
  try {
    const products = await Product.find({ category_id: req.params.id });
    const total = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
    res.json({ category: req.params.id, totalStock: total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};