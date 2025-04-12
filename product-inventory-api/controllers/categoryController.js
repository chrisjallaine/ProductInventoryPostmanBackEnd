const Category = require("../models/Category");
const Product = require("../models/Product");

// Custom: Total stock by category
exports.getTotalStockByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const products = await Product.find({ category_id: categoryId });
    const total = products.reduce((sum, p) => sum + p.quantity, 0);
    res.json({ totalStock: total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
