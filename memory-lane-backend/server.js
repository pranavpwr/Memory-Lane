require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/userRoutes");
const memoryRoutes = require("./routes/memoryRoutes");
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

// API routes
app.use("/api/users", authRoutes);
app.use("/api/memory", memoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Something broke!' });
});

const PORT = process.env.PORT || 5001;

// Connect to MongoDB
const startServer = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        console.log("✅ Connected to MongoDB successfully");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            startEmailScheduler();
        });
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", {
            message: error.message,
            code: error.code,
            state: mongoose.connection.readyState
        });
        process.exit(1);
    }
};

startServer();
