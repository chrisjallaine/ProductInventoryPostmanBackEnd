const Supplier = require("../models/Supplier");

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Public
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new supplier
// @route   POST /api/suppliers
// @access  Public
const createSupplier = async (req, res) => {
    try {
        const { name, contact_info } = req.body;
        const newSupplier = new Supplier({ name, contact_info });
        await newSupplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a supplier
// @route   PUT /api/suppliers/:id
// @access  Public
const updateSupplier = async (req, res) => {
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a supplier
// @route   DELETE /api/suppliers/:id
// @access  Public
const deleteSupplier = async (req, res) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        res.status(200).json({ message: "Supplier deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export functions
module.exports = {
    getSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier
};
