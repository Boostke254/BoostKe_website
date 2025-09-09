require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../utils/sendEmail"); // Utility for sending emails

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Database connection
const pool = require("../../db");

const router = express.Router();

// 🛡️ Session Middleware
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());

// 🛡️ Passport Serialization
passport.serializeUser((user, done) => done(null, user.user_id));
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

// 🛡️ Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await pool.query("SELECT * FROM users WHERE email = $1", [
          profile.emails[0].value,
        ]);
        if (user.rows.length === 0) {
          const newUser = await pool.query(
            "INSERT INTO users (full_name, email, photo_url, is_verified) VALUES ($1, $2, $3, $4) RETURNING *",
            [
              profile.displayName,
              profile.emails[0].value,
              profile.photos[0].value,
              true, // Google OAuth users are considered verified
            ]
          );
          return done(null, newUser.rows[0]);
        }
        return done(null, user.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// 🛡️ Google OAuth Routes (moved to correct position)
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Fixed Google token verification route
router.post("/user/google", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    if (!payload.email_verified) {
      return res.status(400).json({ error: "Email not verified by Google" });
    }

    // Check if user exists
    let user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      // Create new user if doesn't exist
      const dummyPassword = crypto.randomBytes(16).toString("hex");
      const hashedPassword = await bcrypt.hash(dummyPassword, 10);

      const newUserResult = await pool.query(
        "INSERT INTO users (full_name, email, photo_url, password, is_verified) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [payload.name, email, payload.picture, hashedPassword, true]
      );

      user = newUserResult;
    } else if (user.rows[0].is_verified === false) {
      // Update verification status if user exists but not verified
      await pool.query("UPDATE users SET is_verified = true WHERE email = $1", [
        email,
      ]);
    }

    // Get the user data (either newly created or existing)
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const normal_user = userResult.rows[0];

    // Generate JWT token
    const jwtToken = jwt.sign(
      { user_id: normal_user.user_id, email: normal_user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Extended to 24 hours for better UX
    );

    res.status(200).json({
      message: "User authenticated successfully",
      token: jwtToken,
      user: {
        user_id: normal_user.user_id,
        full_name: normal_user.full_name,
        email: normal_user.email,
        mobile: normal_user.mobile,
        balance: normal_user.balance,
        is_verified: normal_user.is_verified,
        created_at: normal_user.created_at,
        account_deactivate: normal_user.account_deactivate,
      },
    });
  } catch (err) {
    console.error("Google token verification error:", err.message);
    res.status(400).json({ error: "Invalid token or authentication failed" });
  }
});

/**
 * @route POST /register
 * @description Manual User Registration with Email Verification
 * @access Public
 */
router.post("/register", async (req, res) => {
  const { full_Name, email, mobile, password } = req.body;

  try {
    // Input validation
    if (!full_Name || !email || !password) {
      return res.status(400).json({ 
        error: "Full name, email, and password are required" 
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({ 
        error: "Password must be at least 6 characters long" 
      });
    }

    // 🛡️ Check if the email already exists
    const emailCheck = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // 🔒 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔐 Generate a verification code
    const verificationCode = crypto.randomInt(100000, 999999); // 6-digit code

    // 💾 Save user with verification code
    const result = await pool.query(
      `INSERT INTO users (full_name, email, mobile, password, verification_code, is_verified) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [full_Name, email, mobile, hashedPassword, verificationCode, false]
    );

    // 📧 Send verification email
    try {
      await sendEmail(
        email,
        "Verify Your Account",
        `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Verification - BoostKE</title>
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
          src="https://retail.boostke.co.ke/logo.png"
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
      console.log("Verification email sent successfully");
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError.message);
      // Continue with registration even if email fails
    }

    res.status(201).json({
      message: "User registered successfully. Please check your email for verification code.",
      note: "If you don't receive the email, you can request a new verification code later.",
      // Remove verification code from response in production
      ...(process.env.NODE_ENV === 'development' && { verificationCode: verificationCode })
    });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({
      error: "User registration failed",
      details: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    });
  }
});

/**
 * @route POST /verify
 * @description Verify User Account using Email and Verification Code
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

    // Convert verificationCode to number for comparison
    const code = parseInt(verificationCode);
    if (isNaN(code)) {
      return res
        .status(400)
        .json({ error: "Invalid verification code format." });
    }

    // 🔍 Check if the user exists with the provided email and code
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND verification_code = $2",
      [email, code]
    );

    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid verification code or email." });
    }

    // ✅ Mark account as verified and clear the verification code
    await pool.query(
      "UPDATE users SET is_verified = true, verification_code = NULL WHERE email = $1",
      [email]
    );

    res.status(200).json({
      message: "Account successfully verified. You can now log in.",
    });
  } catch (err) {
    console.error("Error verifying user:", err.message);
    res.status(500).json({
      error: "Failed to verify account",
      details: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    });
  }
});

/**
 * @route POST /resend-verification-code
 * @description Resend verification code to the user's email
 * @access Public
 */
router.post("/resend-verification-code", async (req, res) => {
  const { email } = req.body;

  try {
    // 🛡️ Validate request data
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // 🔍 Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.rows[0].is_verified) {
      return res.status(400).json({ error: "Account is already verified." });
    }

    // 🔐 Generate a new verification code
    const newVerificationCode = crypto.randomInt(100000, 999999);

    // 💾 Update the user's verification code in the database
    await pool.query(
      "UPDATE users SET verification_code = $1 WHERE email = $2",
      [newVerificationCode, email]
    );

    // 📧 Resend verification email
    try {
      await sendEmail(
        email,
        "Resend Verification Code",
        `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Verification - BoostKE</title>
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
          src="https://retail.boostke.co.ke/logo.png"
          alt="BoostKE Logo"
        />
      </div>

      <!-- Content Section -->
      <div class="content">
        <h2>Account Verification</h2>
        <p>Hello <strong>${user.rows[0].full_name}</strong>,</p>
        <p>
          Here is your new verification code for <strong>BoostKE</strong>:
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
</html>
`,
        null
      );
      console.log("Verification code resent successfully");
    } catch (emailError) {
      console.error("Failed to resend verification email:", emailError.message);
      return res.status(500).json({
        error: "Failed to send verification email",
        details: process.env.NODE_ENV === 'development' ? emailError.message : 'Internal server error',
      });
    }

    res.status(200).json({
      message: "A new verification code has been sent to your email.",
    });
  } catch (err) {
    console.error("Error resending verification code:", err.message);
    res.status(500).json({
      error: "Failed to resend verification code",
      details: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    });
  }
});

module.exports = router;