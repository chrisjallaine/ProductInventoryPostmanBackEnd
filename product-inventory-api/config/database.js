const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false); // Prevents strict mode issues

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Exit the process if connection fails
    }
};

// Handle MongoDB connection events
mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB Disconnected. Retrying...");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB Error:", err);
});

module.exports = connectDB;
