const express = require("express");
const pool = require("../../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// 🗑️ Delete a Shop
router.delete("/delete", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  try {
    // 🔒 Validate Token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const retailer_id = decoded.userId;

    // 🔍 Check if the retailer owns a shop
    const shopCheck = await pool.query(
      "SELECT * FROM shops WHERE retailer_id = $1",
      [retailer_id]
    );

    if (shopCheck.rows.length === 0) {
      return res
        .status(404)
        .json({
          error: "Shop not found or you are not authorized to delete it",
        });
    }

    // 🗑️ Delete the shop
    await pool.query("DELETE FROM shops WHERE retailer_id = $1", [retailer_id]);

    res.status(200).json({
      message: "Shop deleted successfully",
    });
  } catch (err) {
    console.error(err.message);

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    res
      .status(500)
      .json({ error: "Failed to delete shop", details: err.message });
  }
});

module.exports = router;
