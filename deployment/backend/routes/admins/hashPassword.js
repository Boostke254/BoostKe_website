const bcrypt = require("bcrypt");
const express = require("express");
const pool = require("../../db"); // Assuming you're using a PostgreSQL connection pool

const router = express.Router();
const saltRounds = 10;

// Function to hash the password
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Insert/Update route for matching mobile and password
router.post("/update-password", async (req, res) => {
  const { mobile } = req.body; // Only need mobile since we are hashing it

  try {
    if (!mobile) {
      return res.status(400).json({ error: "Mobile number is required." });
    }

    // Check if the mobile exists in the admin table
    const user = await pool.query("SELECT * FROM admin WHERE mobile = $1", [
      mobile,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "User with this mobile number not found." });
    }

    // Hash the mobile number (since password is the mobile in this case)
    const hashedPassword = await hashPassword(mobile);

    // Update the password in the database with the hashed mobile number
    const updatedUser = await pool.query(
      "UPDATE admin SET password = $1 WHERE mobile = $2 RETURNING *",
      [hashedPassword, mobile]
    );

    res.status(200).json({
      message: "Password updated successfully.",
      user: updatedUser.rows[0],
    });
  } catch (err) {
    console.error("Error updating password:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
