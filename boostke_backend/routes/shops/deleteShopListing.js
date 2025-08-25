const express = require("express");
const pool = require("../../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// 🗑️ Delete a Listing from a Retailer's Shop
router.delete("/shop/listings/delete/:listing_id", async (req, res) => {
  const { listing_id } = req.params;
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  try {
    // 🔒 Validate Token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const retailer_id = decoded.userId;

    // 🔍 Check if the listing exists
    const listingCheck = await pool.query(
      "SELECT * FROM listings WHERE listing_id = $1",
      [listing_id]
    );

    if (listingCheck.rows.length === 0) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const listing = listingCheck.rows[0];

    // 🏬 Check if the listing belongs to the retailer's shop
    const shopCheck = await pool.query(
      "SELECT * FROM shops WHERE retailer_id = $1",
      [retailer_id]
    );

    if (shopCheck.rows.length === 0) {
      return res.status(400).json({
        error: "Retailer does not own a shop. Create a shop first.",
      });
    }

    // ✅ Check if the listing belongs to the retailer's shop (via retailer_id)
    if (listing.retailer_id !== retailer_id) {
      return res.status(403).json({
        error: "You are not authorized to delete this listing from your shop",
      });
    }

    // 🚮 Delete the listing from the database
    await pool.query("DELETE FROM listings WHERE listing_id = $1", [
      listing_id,
    ]);

    res.status(200).json({
      message: "Listing deleted successfully from your shop",
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
      .json({ error: "Failed to delete listing", details: err.message });
  }
});

module.exports = router;
