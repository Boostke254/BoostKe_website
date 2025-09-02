const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const pool = require("../../db");

// Replace with your email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
},
{
    debug: true, // Enable debug output
    logger: true, // Log SMTP messages
}
);

// POST route to handle form submission
router.post('/contact', async (req, res) => {
    const { user_name, lastName, user_email, user_subject, message } = req.body;

    // Validate input
    if (!user_name || !user_email || !user_subject || !message) {
        return res.status(400).json({ error: 'Please fill out all required fields.' });
    }

    // Email content
    const mailOptions = {
        from: 'info@boostke.co.ke',
        to: 'info@boostke.co.ke', // Replace with your receiving email
        subject: `Contact Form: ${user_subject}`,
        text: `You have received a new message from your website contact form:
        
        Name: ${user_name} ${lastName || ''}
        Email: ${user_email}
        Subject: ${user_subject}
        Message: ${message}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message successfully sent!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

// POST route to handle FAQ submissions
router.post('/faqs', async (req, res) => {
    const { question } = req.body;

    // Validate input
    if (!question || question.trim() === '') {
        return res.status(400).json({ error: 'Question field is required.' });
    }

    try {
        // Insert the question into the "faqs" table
        const result = await pool.query(
            'INSERT INTO faqs (question, created_at) VALUES ($1, NOW()) RETURNING id',
            [question]
        );

        res.status(201).json({
            message: 'Question successfully submitted!',
            faqId: result.rows[0].id, // Return the inserted FAQ ID for reference
        });
    } catch (error) {
        console.error('Error saving question to database:', error);
        res.status(500).json({ error: 'Failed to submit the question. Please try again later.' });
    }
});

module.exports = router;
