const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category_id', 'name')
      .populate('supplier_id', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Show products with stock quantity aggregated
exports.getProductsWithQuantity = async (req, res) => {
  try {
    const stockAgg = await Inventory.aggregate([
      {
        $group: {
          _id: "$product_id",
          totalStock: { $sum: "$stock" }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: "$product._id",
          name: "$product.name",
          totalStock: 1,
          price: "$product.price",
          supplier_id: "$product.supplier_id",
          category_id: "$product.category_id"
        }
      }
    ]);
    res.json(stockAgg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
