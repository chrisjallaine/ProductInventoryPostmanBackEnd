const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

const productRoutes = require("./routes/productRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes"); 

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware for JSON parsing

// Routes
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/warehouses", warehouseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
