const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:");
        console.error("Error message:", error.message);
        console.error("Connection state:", mongoose.connection.readyState);
        console.error("MongoDB URI:", process.env.MONGO_URI);
        throw error;
    }
};

module.exports = connectDB;
