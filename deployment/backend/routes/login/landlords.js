const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Database connection
const pool = require("../../db");

const router = express.Router();

// 🛡️ Landlord Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Check if landlord exists
    const result = await pool.query(
      "SELECT * FROM landlords WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const landlord = result.rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, landlord.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Check if the account is verified
    if (!landlord.is_verified) {
      return res.status(400).json({
        error:
          "Account not verified. Please check your email for verification instructions.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { landlord_id: landlord.landlord_id, email: landlord.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful",
      token,
      landlord: {
        landlord_id: landlord.landlord_id,
        full_name: landlord.full_name,
        email: landlord.email,
        mobile: landlord.mobile,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

module.exports = router;
