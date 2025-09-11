require("dotenv").config();
const nodemailer = require("nodemailer");

// Configure transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email function
async function sendEmail(to, subject, html, text = null) {
  try {
    const info = await transporter.sendMail({
      from: `"BoostKE Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text: text || "Your email client does not support HTML emails.",
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    throw error;
  }
}

// Example test run
if (require.main === module) {
  sendEmail(
    "soullessdesire34@gmail.com",
    "Test Email",
    "<h1>This is a test email</h1><p>Sent using Nodemailer & Zoho!</p>"
  ).catch(console.error);
}

module.exports = sendEmail;
