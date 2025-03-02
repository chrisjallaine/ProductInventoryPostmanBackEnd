const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category supplier");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category supplier");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, supplier } = req.body;

        if (!name || !price || !category || !supplier) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const newProduct = new Product({ name, description, price, category, supplier });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Error updating product" });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
