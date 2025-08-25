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

// 🗑️ DELETE: Remove a Property
router.delete(
  "/properties/:property_id",
  authenticateLandlord,
  async (req, res) => {
    const { property_id } = req.params;
    const landlord_id = req.landlord.landlord_id;

    try {
      // Check if the property exists and belongs to the landlord
      const propertyCheck = await pool.query(
        "SELECT * FROM properties WHERE property_id = $1 AND landlord_id = $2",
        [property_id, landlord_id]
      );

      if (propertyCheck.rows.length === 0) {
        return res.status(404).json({
          error:
            "Property not found or you are not authorized to delete this property.",
        });
      }

      // Delete the property
      await pool.query("DELETE FROM properties WHERE property_id = $1", [
        property_id,
      ]);

      res.status(200).json({
        message: "Property deleted successfully",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        error: "Failed to delete property",
        details: err.message,
      });
    }
  }
);

module.exports = router;
