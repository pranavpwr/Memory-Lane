const nodemailer = require('nodemailer');
const { generateEmailTemplate } = require('./emailTemplateService');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendMemoryEmail = async (user, memory) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: `Your Memory Lane - Remember This Day`,
            html: generateEmailTemplate(memory, user.name)
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

module.exports = { sendMemoryEmail };