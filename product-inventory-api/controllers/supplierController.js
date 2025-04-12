const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

exports.createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSupplierWithProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });

    const products = await Product.find({ supplier_id: id });
    res.json({ supplier, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
