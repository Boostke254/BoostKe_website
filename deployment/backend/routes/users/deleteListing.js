const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../../db");

const router = express.Router();

// 🛡️ Middleware for JWT Authentication
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// 🗑️ DELETE: Delete a Listing
router.delete("/listings/:listing_id", authenticateUser, async (req, res) => {
  const { listing_id } = req.params;

  if (!listing_id || isNaN(listing_id)) {
    return res.status(400).json({ error: "Invalid or missing listing_id" });
  }
  
  const user_id = req.user.user_id;

  try {
    // 🔍 Check if the listing exists and belongs to the user
    const listing = await pool.query(
      `SELECT * FROM listings WHERE listing_id = $1 AND user_id = $2`,
      [listing_id, user_id]
    );

    if (listing.rows.length === 0) {
      return res.status(404).json({
        error: "Listing not found or you don't have permission to delete it.",
      });
    }

    // 🗑️ Delete the listing
    await pool.query(`DELETE FROM listings WHERE listing_id = $1`, [
      listing_id,
    ]);

    res.status(200).json({
      message: "Listing deleted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to delete listing",
      details: err.message,
    });
  }
});

module.exports = router;
