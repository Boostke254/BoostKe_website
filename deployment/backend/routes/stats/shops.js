const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 🛍️ Fetch Total Shops Count
router.get("/count", async (req, res) => {
  try {
    // 📊 Query to count total shops
    const totalResult = await pool.query(
      "SELECT COUNT(*) AS total_shops FROM shops"
    );

    // Extract count and convert to integer
    const totalShops = parseInt(totalResult.rows[0].total_shops, 10);

    res.status(200).json({
      message: "Shop count fetched successfully",
      total_shops: totalShops,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch shop count",
      details: err.message,
    });
  }
});

module.exports = router;
