exports.createInventory = async (req, res) => {
  try {
    const { product_id, warehouse_id, stock } = req.body;
    const inventory = new Inventory({
      product_id: new mongoose.Types.ObjectId(product_id),
      warehouse_id: new mongoose.Types.ObjectId(warehouse_id),
      stock
    });

    const savedInventory = await inventory.save();
    res.status(201).json(savedInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating inventory" });
  }
};
