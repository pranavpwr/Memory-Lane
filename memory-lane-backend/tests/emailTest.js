require('dotenv').config();
const nodemailer = require('nodemailer');
const User = require('../models/User');
const connectDB = require('../config/db');

const testEmail = async () => {
    try {
        await connectDB();
        console.log('Checking email configuration:', {
            emailUser: process.env.EMAIL_USER,
            hasPassword: !!process.env.EMAIL_PASSWORD
        });

        const testUser = await User.findOne();
        if (!testUser) {
            console.error('No users found');
            process.exit(1);
        }
        
        console.log('Found test user:', {
            name: testUser.name,
            email: testUser.email,
            id: testUser._id
        });

        // Create test transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Send test email directly
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: testUser.email,
            subject: 'Memory Lane - Test Email',
            html: `
                <h2>Hello ${testUser.name}!</h2>
                <p>This is a test email from Memory Lane.</p>
                <p>If you received this email, the email functionality is working correctly.</p>
                <p>Time sent: ${new Date().toLocaleString()}</p>
            `
        });

        console.log('Test email sent successfully');
        
        // Wait for email to be sent
        setTimeout(() => {
            process.exit(0);
        }, 5000);
    } catch (error) {
        console.error('Test failed:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
};

testEmail();