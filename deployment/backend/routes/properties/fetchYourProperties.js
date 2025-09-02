const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Database connection
const pool = require("../../db");

const router = express.Router();

// 🛡️ Middleware for JWT Authentication
const authenticateLandlord = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.landlord = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// 📚 GET: Fetch All Properties by Landlord
router.get("/properties", authenticateLandlord, async (req, res) => {
  const landlord_id = req.landlord.landlord_id;

  try {
    // Fetch all properties for this landlord
    const result = await pool.query(
      `SELECT * FROM properties WHERE landlord_id = $1`,
      [landlord_id]
    );

    res.status(200).json({
      message: "Properties fetched successfully",
      properties: result.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch properties",
      details: err.message,
    });
  }
});

module.exports = router;
