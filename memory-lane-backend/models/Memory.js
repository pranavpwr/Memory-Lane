const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    media: String, // Image/Video URL
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Memory", memorySchema);
