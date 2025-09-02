const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Database connection
const pool = require("../../db");

const router = express.Router();

// Function to generate tokens
const generateAccessToken = (retailer) => {
  return jwt.sign(
    { retailer_id: retailer.retailer_id, email: retailer.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const generateRefreshToken = (retailer) => {
  return jwt.sign(
    { retailer_id: retailer.retailer_id, email: retailer.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // Refresh token valid for 7 days
  );
};

// Refresh token storage (in memory for simplicity, can be stored in DB)
let refreshTokens = [];

// ðŸ›¡ï¸ Retailer Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Check if retailer exists
    const result = await pool.query(
      "SELECT * FROM retailers WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const retailer = result.rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, retailer.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Check if the account is verified
    if (!retailer.is_verified) {
      return res.status(403).json({
        error: "Email not verified.",
      });
    }

    // Check if the account is verified
    if (!retailer.approved) {
      return res.status(401).json({
        error: "Your application as a vendor hasn't been approved.",
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(retailer);
    const refreshToken = generateRefreshToken(retailer);

    // Store the refresh token
    refreshTokens.push(refreshToken);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      retailer: {
        retailer_id: retailer.retailer_id,
        full_name: retailer.full_name,
        email: retailer.email,
        mobile: retailer.mobile,
        photo_url: retailer.photo_url,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

// ðŸ›¡ï¸ Refresh Token Route
router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token is required." });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: "Invalid refresh token." });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, retailer) => {
    if (err) {
      return res.status(403).json({ error: "Invalid refresh token." });
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(retailer);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  });
});

// ðŸ›¡ï¸ Logout Route (to invalidate refresh tokens)
router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  res.status(200).json({ message: "Logged out successfully." });
});

module.exports = router;
