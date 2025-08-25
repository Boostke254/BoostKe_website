const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 📦 Fetch Total and Available Listings Count
router.get("/count", async (req, res) => {
  try {
    // Query to count total listings
    const totalListingsResult = await pool.query(
      "SELECT COUNT(*) AS total_listings FROM listings"
    );

    // Query to count available listings
    const availableListingsResult = await pool.query(
      "SELECT COUNT(*) AS available_listings FROM listings WHERE is_available = TRUE"
    );

    // Extract counts
    const totalListings = parseInt(
      totalListingsResult.rows[0].total_listings,
      10
    );
    const availableListings = parseInt(
      availableListingsResult.rows[0].available_listings,
      10
    );

    res.status(200).json({
      message: "Listings counts fetched successfully",
      total_listings: totalListings,
      available_listings: availableListings,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch listings counts",
      details: err.message,
    });
  }
});

module.exports = router;
