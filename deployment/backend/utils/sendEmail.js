const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendEmail(to, subject, html, text = null) {
  try {
    await transporter.sendMail({
      from: '"BoostKE Support" <info@boostke.co.ke>',
      to,
      subject,
      html, // HTML content takes priority
      text: text || "Your email client does not support HTML emails.", // Fallback to text if not provided
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw error;
  }
}

module.exports = sendEmail;
