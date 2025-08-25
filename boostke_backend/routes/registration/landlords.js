const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail"); // Utility for sending emails
const pool = require("../../db");

const router = express.Router();

/**
 * @route POST /api/landlords/register
 * @description Register a landlord and send a verification email
 * @access Public
 */
router.post("/register", async (req, res) => {
  const { full_Name, email, mobile, password } = req.body;

  try {
    // 🛡️ Check if the email already exists
    const emailCheck = await pool.query(
      "SELECT * FROM landlords WHERE email = $1",
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // 🔒 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔑 Generate a verification code
    const verificationCode = crypto.randomInt(100000, 999999); // 6-digit code

    // 💾 Save landlord with verification code
    const result = await pool.query(
      `INSERT INTO landlords (full_Name, email, mobile, password, verification_code, is_verified) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [full_Name, email, mobile, hashedPassword, verificationCode, false]
    );

    // 📧 Send verification email
    await sendEmail(
      email,
      "Verify Your Landlord Account",
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Landlord Account Verification - BoostKE</title>
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
        <h2>Account Verification</h2>
        <p>Hello <strong>${full_Name}</strong>,</p>
        <p>
          Thank you for registering with <strong>BoostKE</strong>. Please use
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

    res.status(201).json({
      message: "Landlord registered successfully. Verification email sent.",
    });
  } catch (err) {
    console.error("Error registering landlord:", err.message);
    res.status(500).json({
      error: "Landlord registration failed",
      details: err.message,
    });
  }
});

/**
 * @route POST /api/landlords/verify
 * @description Verify landlord account using email and verification code
 * @access Public
 */
router.post("/verify", async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    // 🛡️ Validate request data
    if (!email || !verificationCode) {
      return res
        .status(400)
        .json({ error: "Email and verification code are required." });
    }

    // 🔍 Check if the user exists with the provided email and code
    const user = await pool.query(
      "SELECT * FROM landlords WHERE email = $1 AND verification_code = $2",
      [email, verificationCode]
    );

    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid verification code or email." });
    }

    // ✅ Mark account as verified and clear the verification code
    await pool.query(
      "UPDATE landlords SET is_verified = true, verification_code = NULL WHERE email = $1",
      [email]
    );

    res.status(200).json({
      message: "Account successfully verified. You can now log in.",
    });
  } catch (err) {
    console.error("Error verifying landlord:", err.message);
    res.status(500).json({
      error: "Failed to verify account",
      details: err.message,
    });
  }
});

/**
 * @route POST /api/landlords/resend-verification
 * @description Resend a verification code to a landlord
 * @access Public
 */
router.post("/resend-verification-code", async (req, res) => {
  const { email } = req.body;

  try {
    // 1️⃣ Validate Input
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // 2️⃣ Check if the landlord exists
    const user = await pool.query("SELECT * FROM landlords WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "Landlord not found." });
    }

    const landlord = user.rows[0];

    // 3️⃣ Check if the account is already verified
    if (landlord.is_verified) {
      return res.status(400).json({ error: "Account is already verified." });
    }

    // 4️⃣ Generate a new verification code
    const newVerificationCode = crypto.randomInt(100000, 999999);

    // 5️⃣ Update verification code in the database
    await pool.query(
      "UPDATE landlords SET verification_code = $1 WHERE email = $2",
      [newVerificationCode, email]
    );

    // 6️⃣ Send verification email
    await sendEmail(
      email,
      "Resend Verification Code",
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Landlord Account Verification - BoostKE</title>
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
        <h2>Account Verification</h2>
        <p>Hello <strong>${landlord.full_name}</strong>,</p>
        <p>
          Thank you for registering with <strong>BoostKE</strong>. Please use
          the code below to verify your account:
        </p>
        <div class="verification-code">${newVerificationCode}</div>
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
</html>`,
      `Hello ${landlord.full_name},\nYour new verification code is: ${newVerificationCode}\nPlease use this code to verify your account.`
    );

    // 7️⃣ Response
    res.status(200).json({
      message: "A new verification code has been sent to your email.",
    });
  } catch (err) {
    console.error("Error resending verification code:", err.message);
    res.status(500).json({
      error: "Failed to resend verification code.",
      details: err.message,
    });
  }
});

module.exports = router;
