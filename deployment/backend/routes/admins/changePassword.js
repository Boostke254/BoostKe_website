const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../db"); // Assuming you're using a PostgreSQL connection pool
const router = express.Router();
const saltRounds = 10;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

// Function to hash the new password
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Admin Change Password Route
router.post("/change-password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const adminId = req.admin.adminId;

  try {
    // 🛡️ Validate input
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Current and new password are required." });
    }

    // 🔍 Check if admin exists in the database
    const admin = await pool.query("SELECT * FROM admin WHERE admin_id = $1", [
      adminId,
    ]);

    if (admin.rows.length === 0) {
      return res.status(404).json({ error: "Admin not found." });
    }

    const adminUser = admin.rows[0];

    // 🔒 Compare current password
    const isMatch = await bcrypt.compare(currentPassword, adminUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect." });
    }

    // Hash the new password
    const hashedNewPassword = await hashPassword(newPassword);

    // 🔄 Update the password in the database
    const updatedAdmin = await pool.query(
      "UPDATE admin SET password = $1 WHERE admin_id = $2 RETURNING *",
      [hashedNewPassword, adminId]
    );

    res.status(200).json({
      message: "Password changed successfully.",
      admin: updatedAdmin.rows[0],
    });
  } catch (err) {
    console.error("Error changing password:", err.message);
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});

module.exports = router;
