const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail"); // Utility for sending emails
const pool = require("../../db");

const router = express.Router();

/**
 * @route POST /api/landlords/request-password-reset
 * @description Request a password reset by email
 * @access Public
 */
router.post("/request-password-reset", async (req, res) => {
  const { email } = req.body;

  try {
    // 🛡️ Check if landlord exists
    const user = await pool.query("SELECT * FROM landlords WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Landlord with this email not found." });
    }

    const landlord = user.rows[0];

    // 🔑 Generate a reset code
    const resetCode = crypto.randomInt(100000, 999999); // 6-digit code

    // 💾 Save reset code and expiry time in the database
    await pool.query(
      `UPDATE landlords SET reset_code = $1, reset_code_expiry = NOW() + INTERVAL '15 minutes' WHERE email = $2`,
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
          .container { text-align: center; font-family: Arial, sans-serif; }
          .code { font-size: 24px; font-weight: bold; color: #ff6f00; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Password Reset Code</h2>
          <p>Hello <strong>${landlord.full_name}</strong>,</p>
          <p>Use the code below to reset your password:</p>
          <p class="code">${resetCode}</p>
          <p>This code is valid for 15 minutes.</p>
        </div>
      </body>
      </html>`,
      `Hello ${landlord.full_name},\nYour password reset code is: ${resetCode}\nThis code is valid for 15 minutes.`
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
 * @route POST /api/landlords/verify-reset-code
 * @description Verify the password reset code
 * @access Public
 */
router.post("/verify-reset-code", async (req, res) => {
  const { email, resetCode } = req.body;

  try {
    // 🛡️ Validate email and reset code
    const user = await pool.query(
      `SELECT * FROM landlords 
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
 * @route POST /api/landlords/reset-password
 * @description Reset the landlord's password after code verification
 * @access Public
 */
router.post("/reset-password", async (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  try {
    // 🛡️ Validate email and reset code again before updating password
    const user = await pool.query(
      `SELECT * FROM landlords 
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
      `UPDATE landlords 
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

// 📝 Endpoints Summary
// Request Password Reset:

// Route: POST /api/landlords/request-password-reset
// Body: { "email": "landlord@example.com" }
// Response: Email with reset code sent.
// Verify Reset Code:

// Route: POST /api/landlords/verify-reset-code
// Body: { "email": "landlord@example.com", "resetCode": "123456" }
// Response: Reset code verified.
// Reset Password:

// Route: POST /api/landlords/reset-password
// Body: { "email": "landlord@example.com", "resetCode": "123456", "newPassword": "securePassword123" }
// Response: Password reset successful.
