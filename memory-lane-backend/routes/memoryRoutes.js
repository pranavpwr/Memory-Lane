const express = require("express");
const { addMemory, getMemories, deleteMemory } = require("../controllers/memoryController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const User = require("../models/User");
const Memory = require("../models/Memory");
const { sendOnThisDayEmail, sendDailyReminder } = require("../utils/emailScheduler");

const router = express.Router();

// Memory routes
router.post("/add-memory", protect, upload.single('media'), addMemory);
router.get("/memories", protect, getMemories);
router.delete("/delete/:id", protect, deleteMemory);

// Test route to add a memory with past date
router.post("/test-add-past-memory", protect, async (req, res) => {
    try {
        const pastDate = new Date();
        pastDate.setFullYear(pastDate.getFullYear() - 1); // Set to 1 year ago
        
        const memory = new Memory({
            user: req.user,
            title: "Test Memory from Last Year",
            description: "This is a test memory created exactly one year ago to test the On This Day feature.",
            createdAt: pastDate,
            date: pastDate
        });
        
        await memory.save();
        res.json({ 
            success: true, 
            message: "Test memory added with past date",
            memory
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Email test routes
router.post("/test-daily-reminder", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        await sendDailyReminder(user);
        res.json({ success: true, message: "Daily reminder test email sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/test-on-this-day", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        await sendOnThisDayEmail(user);
        res.json({ success: true, message: "On This Day test email sent successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
