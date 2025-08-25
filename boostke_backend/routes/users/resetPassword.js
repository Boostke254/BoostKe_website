const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail"); // Utility for sending emails
const pool = require("../../db");

const router = express.Router();

/**
 * @route POST /api/users/request-password-reset
 * @description Request a password reset by email
 * @access Public
 */
router.post("/request-password-reset", async (req, res) => {
  const { email } = req.body;

  try {
    // 🛡️ Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User with this email not found." });
    }

    const normalUser = user.rows[0];

    // 🔑 Generate a reset code
    const resetCode = crypto.randomInt(100000, 999999); // 6-digit code

    // 💾 Save reset code and expiry time in the database
    await pool.query(
      `UPDATE users SET reset_code = $1, reset_code_expiry = NOW() + INTERVAL '15 minutes' WHERE email = $2`,
      [resetCode, email]
    );

    // 📧 Send reset code via email
    await sendEmail(
      email,
      "Password Reset Code - BoostKE",
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset - BoostKE</title>
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

      .reset-code {
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
        <h2>Account Verification</h2>
        <p>Hello <strong>${normalUser.full_name}</strong>,</p>
        <p>
          Thank you for registering with <strong>BoostKE</strong>. Please use
          the code below to reset your password:
        </p>
        <div class="reset-code">${resetCode}</div>
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

    res.status(200).json({
      message: "Password reset code sent to your email.",
    });
  } catch (err) {
    console.error("Error requesting password reset:", err.message);
    res.status(500).json({
      error: "Failed to send password reset code.",
      details: err.message,
    });
  }
});

/**
 * @route POST /api/users/verify-reset-code
 * @description Verify the password reset code
 * @access Public
 */
router.post("/verify-reset-code", async (req, res) => {
  const { email, resetCode } = req.body;

  try {
    // 🛡️ Validate email and reset code
    const user = await pool.query(
      `SELECT * FROM users 
       WHERE email = $1 AND reset_code = $2 
       AND reset_code_expiry > NOW()`,
      [email, resetCode]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid or expired reset code." });
    }

    res.status(200).json({
      message:
        "Reset code verified successfully. Proceed to reset your password.",
    });
  } catch (err) {
    console.error("Error verifying reset code:", err.message);
    res.status(500).json({
      error: "Failed to verify reset code.",
      details: err.message,
    });
  }
});

/**
 * @route POST /api/users/reset-password
 * @description Reset the user's password after code verification
 * @access Public
 */
router.post("/reset-password", async (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  try {
    // 🛡️ Validate email and reset code before updating password
    const user = await pool.query(
      `SELECT * FROM users 
       WHERE email = $1 AND reset_code = $2 
       AND reset_code_expiry > NOW()`,
      [email, resetCode]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid or expired reset code." });
    }

    // 🔒 Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 💾 Update the password and clear reset fields
    await pool.query(
      `UPDATE users 
       SET password = $1, reset_code = NULL, reset_code_expiry = NULL 
       WHERE email = $2`,
      [hashedPassword, email]
    );

    res.status(200).json({
      message:
        "Password reset successfully. You can now log in with your new password.",
    });
  } catch (err) {
    console.error("Error resetting password:", err.message);
    res.status(500).json({
      error: "Failed to reset password.",
      details: err.message,
    });
  }
});

module.exports = router;
