const Supplier = require("../models/Supplier"); // Ensure this model exists
const Product = require("../models/Product"); // Import Product model

// Get all suppliers
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single supplier by ID
const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ message: "Supplier not found" });
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get supplier by a given product ID
const getSupplierByProduct = async (req, res) => {
    try {
        const productId = req.params.product_id;

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Find the supplier based on the product's supplier_id
        const supplier = await Supplier.findById(product.supplier_id);
        if (!supplier) return res.status(404).json({ message: "Supplier not found for this product" });

        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new supplier
const createSupplier = async (req, res) => {
    try {
        const { name, contact_info, email, address } = req.body;
        const newSupplier = new Supplier({ name, contact_info, email, address });
        await newSupplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a supplier
const updateSupplier = async (req, res) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSupplier) return res.status(404).json({ message: "Supplier not found" });
        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a supplier
const deleteSupplier = async (req, res) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) return res.status(404).json({ message: "Supplier not found" });
        res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getSuppliers, 
    getSupplierById, 
    getSupplierByProduct,
    createSupplier, 
    updateSupplier, 
    deleteSupplier 
};
