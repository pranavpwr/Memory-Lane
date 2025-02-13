const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    emailPreferences: {
        receiveEmails: { type: Boolean, default: true },
        emailFrequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' }
    }
});

module.exports = mongoose.model("User", userSchema);
