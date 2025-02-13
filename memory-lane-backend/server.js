require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { startEmailScheduler } = require('./services/schedulerService');

const authRoutes = require("./routes/authRoutes");
const memoryRoutes = require("./routes/memoryRoutes");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
startEmailScheduler(); // Start the email scheduler

app.use("/api/auth", authRoutes);
app.use("/api/memory", memoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
