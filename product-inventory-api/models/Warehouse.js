const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    capacity: {
        type: Number,
        default: 0,
        min: [0, 'Capacity must be a non-negative number']
    }
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);
