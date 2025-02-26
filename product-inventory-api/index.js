const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware for JSON parsing

// Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//debugging