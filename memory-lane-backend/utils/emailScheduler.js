const cron = require('node-cron');
const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendReminderEmail = async (user) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Memory Lane - Daily Reminder',
      html: `
        <h2>Hello ${user.name}!</h2>
        <p>Don't forget to capture your precious memories today!</p>
        <p>Visit Memory Lane to add new memories and relive your existing ones.</p>
      `
    });
    console.log(`Reminder email sent to ${user.email}`);
  } catch (error) {
    console.error(`Failed to send email to ${user.email}:`, error);
  }
};

const startEmailScheduler = () => {
  // Schedule to run every day at 10 AM
  cron.schedule('0 10 * * *', async () => {
    try {
      const users = await User.find();
      for (const user of users) {
        await sendReminderEmail(user);
      }
    } catch (error) {
      console.error('Email scheduler error:', error);
    }
  });
  console.log('Email scheduler started');
};

module.exports = { startEmailScheduler };