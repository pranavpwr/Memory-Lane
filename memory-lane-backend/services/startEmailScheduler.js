const cron = require('node-cron');
const Memory = require('../models/Memory');
const User = require('../models/User');
const { sendMemoryEmail } = require('./emailService');

const startEmailScheduler = () => {
    // Run daily at 9 AM
    cron.schedule('0 9 * * *', async () => {
        try {
            // Get all users who have enabled email notifications
            const users = await User.find({ 'emailPreferences.receiveEmails': true });

            for (const user of users) {
                // Check email frequency preference
                if (user.emailPreferences.emailFrequency === 'weekly' && new Date().getDay() !== 1) {
                    continue; // Skip if it's not Monday for weekly subscribers
                }

                const memories = await Memory.find({
                    user: user._id,
                    date: {
                        $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 10)) // Get memories up to 10 years old
                    }
                });

                if (memories.length > 0) {
                    const randomMemory = memories[Math.floor(Math.random() * memories.length)];
                    await sendMemoryEmail(user, randomMemory);
                }
            }
        } catch (error) {
            console.error('Email scheduler error:', error);
        }
    });
};

module.exports = { startEmailScheduler };