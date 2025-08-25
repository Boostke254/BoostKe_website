const express = require("express");
const pool = require("../../db");

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    Fetch all distinct categories from listings
 * @access  Public
 */
router.get("/categories", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT category 
      FROM listings 
      WHERE category IS NOT NULL AND category != ''
    `);

    const categories = result.rows.map((row) => row.category);

    res.status(200).json({
      message: "Categories fetched successfully.",
      categories,
    });
  } catch (err) {
    console.error("Failed to fetch categories:", err.message);
    res.status(500).json({
      error: "Failed to fetch categories.",
      details: err.message,
    });
  }
});

module.exports = router;
