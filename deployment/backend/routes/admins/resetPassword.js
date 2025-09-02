const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const pool = require("../../db"); // Assuming you have a database pool connection
const router = express.Router();
const sendEmail = require("../../utils/sendEmail");

// Generate a random verification code
const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString("hex"); // Generates a 6-character hex code
};

// Send email with verification code
// const sendVerificationEmail = (email, code) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail", // You can use other services as well
//     auth: {
//       user: process.env.EMAIL_USER, // Your email user
//       pass: process.env.EMAIL_PASS, // Your email password
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Password Reset Verification Code",
//     text: `Your password reset verification code is: ${code}`,
//   };

//   return transporter.sendMail(mailOptions);
// };

// Function to hash the new password
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// 1. Request Password Reset (Send Email)
router.post("/request-reset", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // Check if the admin exists
    const admin = await pool.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);

    if (admin.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Admin with this email not found." });
    }

    const verificationCode = generateVerificationCode();

    // Send the verification email
    // await sendVerificationEmail(email, verificationCode); // 📧 Send verification email
    await sendEmail(
      email,
      "Verify Your Account",
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Account Verification - BoostKE</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9fafc;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .header {
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid #e0e0e0;
      }

      .header img {
        max-width: 150px;
      }

      .content {
        padding: 20px;
        text-align: center;
      }

      .content h2 {
        color: #333333;
      }

      .content p {
        font-size: 16px;
        color: #555555;
        margin: 10px 0;
      }

      .verification-code {
        display: inline-block;
        margin: 20px 0;
        padding: 10px 20px;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
        background-color: #ff6f00;
        border-radius: 5px;
      }

      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #999999;
      }

      .footer a {
        color: #ff6f00;
        text-decoration: none;
      }

      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header Section -->
      <div class="header">
        <img
          src="https://boostke.co.ke/assets/boost_logo-MuefOPka.png"
          alt="BoostKE Logo"
        />
      </div>

      <!-- Content Section -->
      <div class="content">
        <h2>Admin Account Verification</h2>
        <p>
          Thank you for using <strong>BoostKE Admin Panel</strong>. Please use
          the code below to verify your account:
        </p>
        <div class="verification-code">${verificationCode}</div>
        <p>
          If you did not request this, please ignore this email or contact our
          support team immediately.
        </p>
      </div>

      <!-- Footer Section -->
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} BoostKE. All Rights Reserved.</p>
        <p>
          Need help? <a href="mailto:info@boostke.co.ke">Contact Support</a>
        </p>
      </div>
    </div>
  </body>
</html>
`,
      null
    );

    // Store the verification code temporarily (You can implement an expiration time if needed)
    await pool.query("UPDATE admin SET reset_code = $1 WHERE email = $2", [
      verificationCode,
      email,
    ]);

    res.status(200).json({ message: "Verification code sent to your email." });
  } catch (err) {
    console.error("Error sending verification email:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// 2. Reset Password (Verify Code and Update Password)
router.post("/reset-password", async (req, res) => {
  const { email, verification_code, new_password } = req.body;

  try {
    if (!email || !verification_code || !new_password) {
      return res.status(400).json({
        error: "Email, verification code, and new password are required.",
      });
    }

    // Check if the admin exists and has the correct verification code
    const admin = await pool.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);

    if (admin.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Admin with this email not found." });
    }

    const adminUser = admin.rows[0];

    if (adminUser.reset_code !== verification_code) {
      return res.status(400).json({ error: "Invalid verification code." });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(new_password);

    // Update the password in the database
    await pool.query(
      "UPDATE admin SET password = $1, reset_code = NULL WHERE email = $2",
      [hashedPassword, email]
    );

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Error resetting password:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
