const Category = require('../models/Category');
const Product = require('../models/Product');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoryWithProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const products = await Product.find({ category_id: id });
    res.json({ category, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategorySummary = async (req, res) => {
  try {
    const summary = await Product.aggregate([
      { $group: { _id: "$category_id", count: { $sum: 1 } } },
      { $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: "$category" },
      { $project: { _id: 0, category: "$category.name", count: 1 } }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
