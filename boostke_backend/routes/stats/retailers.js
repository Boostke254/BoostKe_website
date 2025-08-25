const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 🛍️ Fetch Total and Verified Retailers Count
router.get("/count", async (req, res) => {
  try {
    // Query to count total retailers
    const totalResult = await pool.query(
      "SELECT COUNT(*) AS total_retailers FROM retailers"
    );

    // Query to count verified retailers
    const verifiedResult = await pool.query(
      "SELECT COUNT(*) AS verified_retailers FROM retailers WHERE is_verified = TRUE"
    );

    // Extract counts
    const totalRetailers = parseInt(totalResult.rows[0].total_retailers, 10);
    const verifiedRetailers = parseInt(
      verifiedResult.rows[0].verified_retailers,
      10
    );

    res.status(200).json({
      message: "Retailer counts fetched successfully",
      total_retailers: totalRetailers,
      verified_retailers: verifiedRetailers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch retailer counts",
      details: err.message,
    });
  }
});

module.exports = router;
