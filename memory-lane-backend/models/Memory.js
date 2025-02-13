const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    media: {
        url: String,
        public_id: String,
        resource_type: String
    },
    date: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Memory", memorySchema);
