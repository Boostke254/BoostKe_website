const express = require("express");
const pool = require("../../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// 🛍️ Fetch Retailer's Shop Details
router.get("/my-shop", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  try {
    // 🔒 Validate Token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const retailer_id = decoded.retailer_id;

    // 🔍 Check if the retailer owns a shop
    const shopResult = await pool.query(
      "SELECT * FROM shops WHERE retailer_id = $1",
      [retailer_id]
    );

    if (shopResult.rows.length === 0) {
      return res.status(404).json({
        error: "No shop found for this retailer",
      });
    }

    const shop = shopResult.rows[0];

    res.status(200).json({
      message: "Shop details fetched successfully",
      shop: {
        id: shop.shop_id,
        name: shop.shop_name,
        description: shop.shop_description,
        logo: shop.shop_logo,
        created_at: shop.created_at,
      },
    });
  } catch (err) {
    console.error(err.message);

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    res.status(500).json({
      error: "Failed to fetch shop details",
      details: err.message,
    });
  }
});

module.exports = router;
