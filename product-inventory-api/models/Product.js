const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    }
}, { timestamps: true });

// Virtual: compute total quantity from inventory
productSchema.virtual('quantity', {
    ref: 'Inventory',
    localField: '_id',
    foreignField: 'product_id',
    justOne: false
});

module.exports = mongoose.model('Product', productSchema);
