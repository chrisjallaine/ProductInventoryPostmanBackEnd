const Product = require("../models/Product");

// @desc Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category supplier");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
};

// @desc Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category supplier");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product", error: error.message });
    }
};

// @desc Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, supplier } = req.body;
        if (!name || !price || !category || !supplier) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newProduct = new Product({ name, description, price, category, supplier });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};
