const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductBySKU
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/sku/:sku", getProductBySKU);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
