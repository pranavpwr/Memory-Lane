const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailPreferences: {
        receiveEmails: { type: Boolean, default: true },
        emailFrequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
