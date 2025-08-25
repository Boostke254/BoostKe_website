const express = require("express");
const pool = require("../../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.get("/retailer-listing/:listingId", async (req, res) => {
  const { listingId } = req.params;
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  try {
    // 🔒 Validate Token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    // Decode token to get retailer information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const retailerId = decoded.retailer_id;

    // 🔍 Fetch the listing details only if the retailer owns the listing
    const listingResult = await pool.query(
      `
        SELECT * FROM listings 
        WHERE listing_id = $1 AND retailer_id = $2
        `,
      [listingId, retailerId]
    );

    if (listingResult.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Listing not found or unauthorized access" });
    }

    res.status(200).json({
      message: "Listing details fetched successfully",
      listing: listingResult.rows[0],
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
      error: "Failed to fetch listing details",
      details: err.message,
    });
  }
});

router.get("/retailer-listings", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  try {
    // 🔒 Validate Token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    // Decode token to get retailer information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const retailerId = decoded.retailer_id;

    // 🔍 Fetch all listings by the retailer
    const listingsResult = await pool.query(
      `
        SELECT * FROM listings 
        WHERE retailer_id = $1
        `,
      [retailerId]
    );

    if (listingsResult.rows.length === 0) {
      return res.status(404).json({ error: "No listings found for this retailer" });
    }

    res.status(200).json({
      message: "Listings fetched successfully",
      listings: listingsResult.rows,
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
      error: "Failed to fetch listings",
      details: err.message,
    });
  }
});

// 🛑 Mark a listing as unavailable
router.patch("/retailer-listing/:listingId/unavailable", async (req, res) => {
  const { listingId } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const retailerId = decoded.retailer_id;

    // ✅ Check if listing belongs to retailer
    const listingResult = await pool.query(
      `SELECT * FROM listings WHERE listing_id = $1 AND retailer_id = $2`,
      [listingId, retailerId]
    );

    if (listingResult.rows.length === 0) {
      return res.status(404).json({ error: "Listing not found or unauthorized access" });
    }

    // 🚀 Update listing to unavailable
    await pool.query(
      `UPDATE listings SET is_available = false WHERE listing_id = $1 AND retailer_id = $2`,
      [listingId, retailerId]
    );

    res.status(200).json({ message: "Listing marked as unavailable" });
  } catch (err) {
    console.error(err.message);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(500).json({ error: "Failed to update listing", details: err.message });
  }
});

// 📊 Get total view count and total listings for retailer's listings
router.get("/retailer-listings/view-count", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const retailerId = decoded.retailer_id;

    // 🏆 Sum up all view_counts and count total listings for retailer's listings
    const result = await pool.query(
      `SELECT 
         COALESCE(SUM(view_count), 0) AS total_views,
         COUNT(listing_id) AS total_listings
       FROM listings
       WHERE retailer_id = $1`,
      [retailerId]
    );

    res.status(200).json({
      message: "Total view count and total listings fetched successfully",
      totalViews: result.rows[0].total_views,
      totalListings: result.rows[0].total_listings
    });
  } catch (err) {
    console.error(err.message);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(500).json({ error: "Failed to fetch total view count and total listings", details: err.message });
  }
});


module.exports = router;
