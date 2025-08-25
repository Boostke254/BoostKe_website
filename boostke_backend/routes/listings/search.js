const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 🔍 Search Listings
// 📦 GET: Filter Listings by Search Query (Title and Description)
router.get("/filter-by-search", async (req, res) => {
  try {
    const { query } = req.query;

    // Check if search query is provided
    if (!query) {
      return res.status(400).json({ error: "Search query is required for filtering" });
    }

    // Query to filter listings by matching title or description with the search query (case-insensitive)
    const searchQuery = `%${query}%`;
    const queryString = `
      SELECT *
      FROM listings
      WHERE title ILIKE $1 OR description ILIKE $1
      ORDER BY created_at DESC
    `;

    const result = await pool.query(queryString, [searchQuery]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No listings found matching the search query" });
    }

    res.status(200).json({
      message: "Listings filtered by search query fetched successfully",
      listings: result.rows,
    });
  } catch (err) {
    console.error("Error fetching listings by search query:", err.message);
    res.status(500).json({
      error: "Failed to fetch listings by search query",
      details: err.message,
    });
  }
});

module.exports = router;
