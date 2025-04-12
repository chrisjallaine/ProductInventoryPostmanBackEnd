const { Types } = require("mongoose"); // ✅ Import Mongoose types

// Inside your createInventory controller:
exports.createInventory = async (req, res) => {
  try {
    const { product_id, warehouse_id, stock } = req.body;

    // Validate ObjectIds
    if (!Types.ObjectId.isValid(product_id) || !Types.ObjectId.isValid(warehouse_id)) {
      return res.status(400).json({ error: "Invalid product_id or warehouse_id" });
    }

    const inventory = new Inventory({
      product_id: new Types.ObjectId(product_id),
      warehouse_id: new Types.ObjectId(warehouse_id),
      stock
    });

    const savedInventory = await inventory.save();
    res.status(201).json(savedInventory);

  } catch (err) {
    console.error("Error creating inventory:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
