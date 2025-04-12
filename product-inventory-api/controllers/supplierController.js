const Supplier = require("../models/Supplier");
const Product = require("../models/Product");

// Log Delivery
exports.recordSupplierDelivery = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const { product_id, quantity } = req.body;

    const updated = await Supplier.findByIdAndUpdate(
      supplierId,
      {
        $push: {
          deliveryLogs: { product_id, quantity, date: new Date() }
        },
        $inc: { orderCount: 1 }
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Supplier not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
