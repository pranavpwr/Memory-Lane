require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const memoryRoutes = require("./routes/memoryRoutes");
const connectDB = require("./config/db");
const { startEmailScheduler } = require('./utils/emailScheduler');

const app = express();

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic routes
app.get("/", (req, res) => {
    res.json({ message: "API is working" });
});

app.get("/test", (req, res) => {
    res.json({ message: "Test endpoint working" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/memory", memoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Something broke!' });
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5001;
        const server = app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            startEmailScheduler();
        });

        server.on('error', (error) => {
            console.error('Server error:', error);
            process.exit(1);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
