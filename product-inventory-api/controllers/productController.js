const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, category_id, supplier_id } = req.body;

        // Validate required fields
        if (!name || !price || !quantity || !category_id || !supplier_id) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        // Ensure `category_id` exists in the database
        const categoryExists = await Category.findById(category_id);
        if (!categoryExists) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Ensure `supplier_id` exists in the database
        const supplierExists = await Supplier.findById(supplier_id);
        if (!supplierExists) {
            return res.status(404).json({ message: "Supplier not found" });
        }

        // Create and save the product
        const newProduct = new Product({ name, description, price, quantity, category_id, supplier_id });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category_id", "name") // Fetch category name
            .populate("supplier_id", "name contact email"); // Fetch supplier details

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category_id", "name")
            .populate("supplier_id", "name contact email");

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product", error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, category_id, supplier_id } = req.body;

        // Ensure `category_id` exists if provided
        if (category_id) {
            const categoryExists = await Category.findById(category_id);
            if (!categoryExists) return res.status(404).json({ message: "Category not found" });
        }

        // Ensure `supplier_id` exists if provided
        if (supplier_id) {
            const supplierExists = await Supplier.findById(supplier_id);
            if (!supplierExists) return res.status(404).json({ message: "Supplier not found" });
        }

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("category_id", "name")
            .populate("supplier_id", "name contact email");

        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};
