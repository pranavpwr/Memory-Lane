const cron = require('node-cron');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { getOnThisDayMemories } = require('../services/memoryService');
const { generateOnThisDayTemplate, generateDailyReminderTemplate } = require('../services/emailTemplateService');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendDailyReminder = async (user) => {
  try {
    const emailContent = generateDailyReminderTemplate(user.name);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: '📝 Time to Capture Today\'s Memories!',
      html: emailContent
    });
    console.log(`Daily reminder sent to ${user.email}`);
  } catch (error) {
    console.error(`Failed to send daily reminder to ${user.email}:`, error);
  }
};

const sendOnThisDayEmail = async (user) => {
    try {
        const memories = await getOnThisDayMemories(user._id);
        
        if (memories.length === 0) return;

        const emailContent = generateOnThisDayTemplate(memories, user.name);
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Your Memories On This Day - Memory Lane',
            html: emailContent
        });
        
        console.log(`On This Day email sent to ${user.email}`);
    } catch (error) {
        console.error(`Failed to send On This Day email to ${user.email}:`, error);
    }
};

const startEmailScheduler = () => {
  // Daily reminder at 8 PM
  cron.schedule('0 20 * * *', async () => {
    try {
      const users = await User.find({ 
        'emailPreferences.receiveEmails': true,
        'emailPreferences.emailFrequency': 'daily'
      });
      
      for (const user of users) {
        await sendDailyReminder(user);
      }
    } catch (error) {
      console.error('Daily reminder scheduler error:', error);
    }
  });

  // "On This Day" memories at 9 AM
  cron.schedule('0 9 * * *', async () => {
    try {
      const users = await User.find({ 
        'emailPreferences.receiveEmails': true 
      });
      
      for (const user of users) {
        await sendOnThisDayEmail(user);
      }
    } catch (error) {
      console.error('On This Day scheduler error:', error);
    }
  });

  console.log('Email scheduler started - Daily reminders at 8 PM, On This Day at 9 AM');
};

module.exports = { 
    startEmailScheduler, 
    sendOnThisDayEmail,
    sendDailyReminder 
};