const express = require("express");
const pool = require("../../db");

const router = express.Router();

// 🏠 Fetch Total and Verified Landlords Count
router.get("/count", async (req, res) => {
  try {
    // Query to count total landlords
    const totalResult = await pool.query(
      "SELECT COUNT(*) AS total_landlords FROM landlords"
    );

    // Query to count verified landlords
    const verifiedResult = await pool.query(
      "SELECT COUNT(*) AS verified_landlords FROM landlords WHERE is_verified = TRUE"
    );

    // Extract counts
    const totalLandlords = parseInt(totalResult.rows[0].total_landlords, 10);
    const verifiedLandlords = parseInt(
      verifiedResult.rows[0].verified_landlords,
      10
    );

    res.status(200).json({
      message: "Landlord counts fetched successfully",
      total_landlords: totalLandlords,
      verified_landlords: verifiedLandlords,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch landlord counts",
      details: err.message,
    });
  }
});

module.exports = router;
