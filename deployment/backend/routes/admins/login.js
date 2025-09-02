const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../db"); // Assuming you have a database pool connection
const router = express.Router();

// const roleMap = {
//   1: "Super Admin",
//   2: "Admin",
//   3: "Manager",
//   4: "Retailer",
//   5: "Guest",
// };

/**
 * @route POST /api/admin/login
 * @description Admin login route
 * @access Public
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Use email instead of mobile

  try {
    // 🛡️ Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." }); // Change the error message
    }

    // 🔍 Check if the user exists with the provided email
    const admin = await pool.query("SELECT * FROM admin WHERE email = $1", [
      email, // Query with email
    ]);

    if (admin.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const adminUser = admin.rows[0];

    // 🔒 Compare password
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { adminId: adminUser.admin_id, email: adminUser.email }, // Use email in the payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Expiration time (1 hour)
    );

    // 📩 Return response with user details and token
    res.status(200).json({
      message: "Login successful",
      token, // Send the token back
      user: {
        adminId: adminUser.admin_id,
        userId: adminUser.user_id,
        fullName: adminUser.full_name,
        email: adminUser.email, // Send the email as part of the user object
        role: adminUser.role,
        photoUrl: adminUser.photo_url,
        createdAt: adminUser.created_at,
      },
    });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

module.exports = router;
