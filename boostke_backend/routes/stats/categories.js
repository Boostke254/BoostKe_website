const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 📊 Fetch Count of All Distinct Categories
router.get("/count", async (req, res) => {
  try {
    // Query to count distinct categories
    const result = await pool.query(
      "SELECT COUNT(DISTINCT category) AS distinct_category_count FROM listings WHERE category IS NOT NULL"
    );

    // Extract count and convert to integer
    const distinctCategoryCount = parseInt(
      result.rows[0].distinct_category_count,
      10
    );

    res.status(200).json({
      message: "Distinct category count fetched successfully",
      distinct_category_count: distinctCategoryCount,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch distinct category count",
      details: err.message,
    });
  }
});

module.exports = router;
