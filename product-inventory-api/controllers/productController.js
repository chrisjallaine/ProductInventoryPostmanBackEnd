const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, category, subcategory, size, price, quantity } = req.body;
        const newProduct = new Product({ name, description, category, subcategory, size, price, quantity });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
