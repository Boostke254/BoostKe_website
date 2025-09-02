const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 📍 GET: Retrieve Listings for a Shop by Shop ID
router.get("/:shop_id/listings", async (req, res) => {
  try {
    const { shop_id } = req.params;

    // Query the shops table to get the retailer_id for the given shop_id
    const shopQuery = `
      SELECT retailer_id
      FROM shops
      WHERE shop_id = $1
    `;
    const shopResult = await pool.query(shopQuery, [shop_id]);

    // If the shop doesn't exist, return a 404 error
    if (shopResult.rows.length === 0) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const retailer_id = shopResult.rows[0].retailer_id;

    // Optionally, check if the retailer_id is valid
    if (!retailer_id) {
      return res.status(404).json({ message: "Retailer not found for this shop" });
    }

    // Query the listings table for all listings with the retrieved retailer_id
    const listingsQuery = `
      SELECT *
      FROM listings
      WHERE retailer_id = $1
      ORDER BY created_at DESC
    `;
    const listingsResult = await pool.query(listingsQuery, [retailer_id]);

    // If no listings are found for this retailer, return a 404 error
    if (listingsResult.rows.length === 0) {
      return res.status(404).json({ message: "No listings found for this retailer" });
    }

    // Return the retrieved listings
    res.status(200).json({
      message: "Listings fetched successfully",
      listings: listingsResult.rows,
    });
  } catch (err) {
    console.error("Error fetching listings for shop:", err.message);
    res.status(500).json({
      error: "Failed to fetch listings for shop",
      details: err.message,
    });
  }
});

module.exports = router;