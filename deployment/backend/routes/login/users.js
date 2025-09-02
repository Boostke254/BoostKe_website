const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../db");

const router = express.Router();

// 🛡️ User Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const user = userResult.rows[0];

    // Check if the user is verified
    // if (!user.is_verified) {
    //   return res.status(403).json({ error: "Please verify your email first." });
    // }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        mobile: user.mobile,
        balance: user.balance,
        is_verified: user.is_verified,
        created_at: user.created_at,
        account_deactivate: user.account_deactivate
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

module.exports = router;
